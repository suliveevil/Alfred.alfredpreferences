# encoding: utf-8

import sys

import updatesettings
import version
from icons import ICON_CLIMATE, ICON_CLIMATE_OFF, ICON_ACCOUNT, ICON_CAR
from workflow import Workflow, ICON_INFO

log = None


def main(wf):
    # type: (Workflow) -> int

    args = wf.args # so magic args are parsed
    log.debug("parsed args: %s" % args)

    if wf.update_available:
        wf.add_item('New version available',
                    'Action this item to install the update',
                    autocomplete='workflow:update',
                    valid=False,
                    icon=ICON_INFO)

    username = wf.stored_data('username')

    if not username:
        wf.add_item(title="Set Credentials for 45 days",
                    subtitle="Please wait for credential dialog to appear",
                    valid=True,
                    arg="credentials",
                    icon=ICON_ACCOUNT)
    else:
        active_vin = wf.stored_data("active_vin")

        if active_vin:
            wf.add_item(title="Turn on climate control",
                        subtitle="Activate heater or A/C, defrost, seat heaters, etc",
                        valid=True,
                        arg="--api %s" % ("api_climate_on"),
                        icon=ICON_CLIMATE)
            wf.add_item(title="Turn off climate control",
                        subtitle="Deactivate heater or A/C, defrost, seat heaters, etc",
                        valid=True,
                        arg="--api %s" % ("api_climate_off"),
                        icon=ICON_CLIMATE_OFF)
            wf.add_item(title="Change Tesla account",
                        subtitle="Please wait for credential dialog to appear",
                        valid=True,
                        arg="credentials",
                        icon=ICON_ACCOUNT)
        wf.add_item(title="Set active Tesla Vehicle",
                    subtitle="Select the vehicle to use for this workflow",
                    valid=True,
                    arg="vin",
                    icon=ICON_CAR)

    wf.send_feedback()

    return 0


if __name__ == u"__main__":
    wf = Workflow(libraries=['./lib'], update_settings=updatesettings.update_settings)
    wf.set_last_version(version.version)
    log = wf.logger
    sys.exit(wf.run(main))

