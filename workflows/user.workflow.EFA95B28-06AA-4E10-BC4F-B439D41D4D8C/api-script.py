import sys
import argparse
import json
import version
from workflow import Workflow

log = None


def api_call(args):
    import teslapy

    command = args.api_command
    log.debug("API Call %s..." % command)
    log.debug("Retrieving username from alfred stored data...")
    username = wf.stored_data('username')
    log.debug("Found username %s" % username)

    log.debug("Retrieving active vehicle vin from stored data...")
    active_vin = wf.stored_data('active_vin')

    tesla = teslapy.TeslaPy(username)
    log.debug("Connecting to Tesla...")
    tesla.ensure_connection()

    variables = {'command' : command}

    if command == "api_climate_on":
        log.debug("Waking vehicle and turning on climate...")
        tesla.wake_and_auto_condition_vin(active_vin)
        log.debug("Vehicle is awake! Climate Turned on!")
    elif command == "api_climate_off":
        log.debug("Waking vehicle and turning off climate...")
        tesla.turn_off_auto_condition_vin(active_vin)
        log.debug("Vehicle is awake! Climate Turned off!")
    else:
        log.debug("Could not understand command %s" % command)
        variables['command'] = variables['command'] + ' failed!'

    alfred_workflow = {'arg': variables['command'], 'variables': variables}

    print(json.dumps({'alfredworkflow': alfred_workflow}))


def main(wf):
    # type: (Workflow) -> int
    parser = argparse.ArgumentParser()
    parser.add_argument('--api', dest='api_command', nargs='?', default=None)

    args = parser.parse_args(wf.args)

    log.debug("API Script Called! args=%s" % wf.args)
    api_call(args)
    return 0


if __name__ == u"__main__":
    wf = Workflow(libraries=['./lib'])
    wf.set_last_version(version.version)
    log = wf.logger
    sys.exit(wf.run(main))
