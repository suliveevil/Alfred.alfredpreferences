#!/bin/bash

DEBUG=false;

# if search is empty, exit
APP_PATH="$1";
if [ -z "$APP_PATH" ]; then
	exit 1;
fi

# if app is not currently open, exit
THIS_FILENAME=$(basename "$0"); # exclude this script from matching processes
IS_APP_OPEN=$(ps axg | grep -v "./$THIS_FILENAME $APP_PATH" | grep "$APP_PATH" | grep -v "grep $APP_PATH");
if [ -z "$IS_APP_OPEN" ]; then
	if [ "$DEBUG" = true ]; then
		echo "not found";
	fi

	exit 1;
else
	if [ "$DEBUG" = true ]; then
		echo "found";
		echo "$IS_APP_OPEN";
	fi
fi

# close app
osascript -e "tell application \"$APP_PATH\" to quit";

# wait for app to close
MAX_LOOP_TIME_IN_SECONDS=60; # if app has not ended by this time, exit this script
LOOP_ELAPSE_INCREMENT_IN_SECONDS=0.5;
while ps axg | grep -v "./$THIS_FILENAME $APP_PATH" | grep "$APP_PATH" | grep -v "grep $APP_PATH" > /dev/null; do
	if [ "$DEBUG" = true ]; then
		echo "waiting for '$APP_PATH' to close (termintaing in ${MAX_LOOP_TIME_IN_SECONDS}s)";
	fi

	sleep "$LOOP_ELAPSE_INCREMENT_IN_SECONDS";

	MAX_LOOP_TIME_IN_SECONDS=$(python -c "print $MAX_LOOP_TIME_IN_SECONDS - $LOOP_ELAPSE_INCREMENT_IN_SECONDS");
	SHOULD_SCRIPT_END=$(python -c "print $MAX_LOOP_TIME_IN_SECONDS < $LOOP_ELAPSE_INCREMENT_IN_SECONDS");

	if "$SHOULD_SCRIPT_END"; then
		if [ "$DEBUG" = true ]; then
			echo "script terminated.";
		fi
		exit 1;
	fi
done

# reopen the app
if [ "$DEBUG" = true ]; then
	echo "time to open '$APP_PATH' again";
fi

osascript -e "tell application \"$APP_PATH\" to activate";