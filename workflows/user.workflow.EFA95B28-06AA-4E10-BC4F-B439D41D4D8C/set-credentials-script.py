import subprocess
import sys
import version
import argparse
import os
import signal
import getpass
from workflow import Workflow

log = None


try:
    input = raw_input
except NameError:
    pass


def notify(title, text):
    os.system("""
              osascript -e 'display notification "{}" with title "{}"'
              """.format(text, title))


def store_credentials():
    import teslapy
    import keyring

    username_osascript_cmd = """
                    osascript -e 'display dialog \"Username for Tesla\" default answer \"\"' -e 'text returned of result' 2>/dev/null
                    """
    password_osascript_cmd = """
                    osascript -e 'display dialog \"Password for Tesla\" default answer \"\" with hidden answer' -e 'text returned of result' 2>/dev/null
                    """
    username = subprocess.check_output(username_osascript_cmd, shell=True).strip()
    password = subprocess.check_output(password_osascript_cmd, shell=True).strip()

    tesla = teslapy.TeslaPy(username)
    log.debug("Connecting to Tesla")
    tesla.connect(password)
    log.debug("Requesting access token")
    access_token = tesla.get_access_token()

    log.debug("storing access token in keyring")
    keyring.set_password(tesla.account_key, username, access_token)
    log.debug("storing username in workflow data directory")
    wf.store_data('username', username)


def main(wf):
    # type: (Workflow) -> int

    log.debug("Set Credentials Script Called! args=%s" % wf.args)

    try:
        store_credentials()
        notify("Tesla Credentials", "Tesla credentials have been set successfully")
    except Exception as e:
        log.error(e)

    return 0


if __name__ == u"__main__":
    wf = Workflow(libraries=['./lib'])
    wf.set_last_version(version.version)
    log = wf.logger
    sys.exit(wf.run(main))
