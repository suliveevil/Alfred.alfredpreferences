# encoding: utf-8

import sys

import version
from icons import ICON_ACCOUNT, ICON_REFRESH
from workflow import Workflow

log = None


def refresh_vehicles():
    username = wf.stored_data('username')
    log.debug("Connecting to Tesla and retrieving list of vehicles")

    import teslapy

    tesla = teslapy.TeslaPy(username)
    tesla.connect(None)

    vehicles = tesla.get_vehicles()

    if vehicles:
        cached_vehicles_list = []
        cached_vehicles_dict = {'vehicles' : cached_vehicles_list}

        for vehicle in vehicles:
            cached_vehicles_list.append(vehicle)

        wf.store_data('cached_vehicles', cached_vehicles_dict)


def main(wf):
    # type: (Workflow) -> int

    username = wf.stored_data('username')

    if not username:
        wf.add_item(title="Set Tesla Login Credentials",
                    subtitle="Please wait for credential dialog to appear",
                    valid=True,
                    arg="credentials",
                    icon=ICON_ACCOUNT)
        wf.send_feedback()
    else:
        cached_vehicles_dict = wf.stored_data('cached_vehicles')

        if not cached_vehicles_dict:
            refresh_vehicles()
            cached_vehicles_dict = wf.stored_data('cached_vehicles')

        cached_vehicles_list = cached_vehicles_dict['vehicles']

        for vehicle in cached_vehicles_list:
            name = vehicle['display_name']
            vin = vehicle['vin']

            wf.add_item(title="%s (VIN %s)" % (name, vin),
                        subtitle="Set %s as the active vehicle for this workflow" % name,
                        valid=True,
                        arg="--vin %s --name %s" % (vin, name))

        wf.add_item(title="Refresh list of Tesla Vehicles",
                    subtitle="Clear and refresh the list of your Tesla Vehicles",
                    valid=True,
                    arg="refresh_vehicles",
                    icon=ICON_REFRESH)
        wf.add_item(title="Change Tesla account",
                    subtitle="Please wait for credential dialog to appear",
                    valid=True,
                    arg="credentials",
                    icon=ICON_ACCOUNT)

    wf.send_feedback()

    return 0




if __name__ == u"__main__":
    wf = Workflow(libraries=['./lib'])
    wf.set_last_version(version.version)
    log = wf.logger
    sys.exit(wf.run(main))

