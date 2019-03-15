import argparse
import sys

import version
from workflow import Workflow

log = None


def refresh_vehicles():
    log.debug("Refreshing vehicles by deleting cached data...")
    wf.clear_data(lambda f: 'cached_vehicles' in f)
    print("OK")


def main(wf):
    # type: (Workflow) -> int

    log.debug("Refresh Vehicles Script Called!")
    refresh_vehicles()
    return 0


if __name__ == u"__main__":
    wf = Workflow(libraries=['./lib'])
    wf.set_last_version(version.version)
    log = wf.logger
    sys.exit(wf.run(main))
