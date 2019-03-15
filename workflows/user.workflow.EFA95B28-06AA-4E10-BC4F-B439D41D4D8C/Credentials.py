from typing import Optional


class Credentials:
    def __init__(self, account_key, username, password):
        # type: (str, str, Optional[str]) -> None
        self.account_key = account_key
        self.username = username
        self.password = password

