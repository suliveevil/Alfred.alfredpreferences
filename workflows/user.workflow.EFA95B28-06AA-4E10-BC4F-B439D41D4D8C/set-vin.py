import argparse
import sys

import version
from workflow import Workflow

log = None


def set_vin(args):
    vin = args.vin
    name = args.name.strip()

    log.debug("Storing active name %s, active VIN %s" % (name, vin))
    wf.store_data('active_vin', vin)
    wf.store_data('active_name', name)

    print(name)


def main(wf):
    # type: (Workflow) -> int
    parser = argparse.ArgumentParser()
    parser.add_argument('--vin', dest='vin', nargs='?', default=None)
    parser.add_argument('--name', dest='name', nargs='?', default=None)

    args = parser.parse_args(wf.args)

    log.debug("Set Vin Script Called! args=%s" % wf.args)
    set_vin(args)
    return 0


if __name__ == u"__main__":
    wf = Workflow(libraries=['./lib'])
    wf.set_last_version(version.version)
    log = wf.logger
    sys.exit(wf.run(main))
