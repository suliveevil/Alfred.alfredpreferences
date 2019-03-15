import teslajson
import keyring
from Credentials import *
from typing import Optional


class TeslaPy:
    account_key = "tesla-app"

    def __init__(self, username):
        # type: (str) -> None
        self.username = username

    def connect(self, given_password):
        # type: (Optional[str]) -> None

        if not given_password:
            creds = Credentials(self.account_key, self.username, None)

            try:
                stored_access_token = self.get_credentials(creds)
            except Exception as e:
                print(e)
                raise Exception("For user %s: Password not provided and not found in keyring" % self.username)

            self.connection = teslajson.Connection(email=self.username, access_token=stored_access_token)

        else:
            self.connection = teslajson.Connection(email=self.username, password=given_password)

    def set_credentials(self, creds):
        # type: (Credentials) -> None
        keyring.set_password(creds.account_key, creds.username, creds.password)

    def get_credentials(self, creds):
        # type: (Credentials) -> str
        return keyring.get_password(creds.account_key, creds.username)

    def get_vehicles(self):
        return self.connection.vehicles

    def wake_and_auto_condition_vin(self, vin):
        vehicle = self.ensure_connection_and_awake_vin(vin)
        vehicle.command('auto_conditioning_start')

    def wake_and_auto_condition_first(self):
        first_vehicle = self.ensure_connection_and_awake()
        first_vehicle.command('auto_conditioning_start')

    def turn_off_auto_condition_vin(self, vin):
        vehicle = self.ensure_connection_and_awake_vin(vin)
        vehicle.command('auto_conditioning_stop')

    def turn_off_auto_condition_first(self):
        first_vehicle = self.ensure_connection_and_awake()
        first_vehicle.command('auto_conditioning_stop')

    def ensure_connection_and_awake_vin(self, vin):
        # type: () -> teslajson.Vehicle
        vehicle = self.ensure_connection_vin(vin)
        vehicle.wake_up()
        return vehicle

    def ensure_connection_and_awake(self):
        # type: () -> teslajson.Vehicle
        first_vehicle = self.ensure_connection()
        first_vehicle.wake_up()
        return first_vehicle

    def ensure_connection_vin(self, vin):
        # type: () -> teslajson.Vehicle
        if not hasattr(self, "connection"):
            self.connect(None)

        for v in self.connection.vehicles:
            if v['vin'] == vin:
                return v
        return None

    def ensure_connection(self):
        # type: () -> teslajson.Vehicle
        if not hasattr(self, "connection"):
            self.connect(None)
        first_vehicle = self.connection.vehicles[0]
        return first_vehicle

    def get_access_token(self):
        # type: () -> str
        self.ensure_connection()
        return self.connection.access_token

