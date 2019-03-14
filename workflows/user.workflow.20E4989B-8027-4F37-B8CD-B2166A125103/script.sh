#!/bin/bash

source ./workflows.sh

EXCLUDE_APPNAME_LIST="./exclude_app_path_list.txt";

# if search is empty, show all
SEARCH_TERM="$1";
if [ -z "$SEARCH_TERM" ]; then
	SEARCH_TERM=".";
fi

# get list of running apps
# APP_PATHS_POSIX=$(osascript -e 'tell application "System Events" to get the POSIX path of file of every process whose background only is false');
APP_PATHS_POSIX=$(osascript -e 'tell application "System Events" to get the POSIX path of file of every process');

# rewrite file paths, to one line each; sort alphabetically
IFS="," read -ra APP_PATHS <<< "$APP_PATHS_POSIX"
APP_PATHS=$(printf '%s\n' "${APP_PATHS[@]}" | grep -v "missing value" | sort);

# loop each path
while read -r APP_PATH; do
	# protect system files
  if [[ $APP_PATH =~ ^/System/ ]]; then
  	continue;
  fi

  if [[ $APP_PATH =~ ^/Library/ ]]; then
  	continue;
  fi

  if [[ $APP_PATH =~ ^/usr/ ]]; then
  	continue;
  fi

	APP_PATH="$(echo "$APP_PATH" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"; # trim whitespace
  APP_NAME=$(basename "$APP_PATH")
	APP_NAME="${APP_NAME%.*}"
	APP_NAME_TO_LOWER=$(echo "$APP_NAME" | tr '[:upper:]' '[:lower:]');

	# if app name is in the exclude list, next
	EXCLUDE_MATCH=$(egrep "^${APP_PATH}$" "$EXCLUDE_APPNAME_LIST");
	if [ ! -z "$EXCLUDE_MATCH" ]; then
  	continue;
  fi

	# if search term does not match, next
	SEARCH_MATCH=$(echo "$APP_NAME" | grep -i "$SEARCH_TERM");
	if [ -z "$SEARCH_MATCH" ]; then
		continue;
	fi
	
	vUID="status"
	vARG="$APP_PATH"
	vTITLE="Restart $APP_NAME"
	vSUBTITLE="Press Enter to Restart $APP_PATH"
	vICON="$APP_PATH"
	vAUTOCOMPLETE="$APP_NAME_TO_LOWER";
	vACTIONABLE=true;

	WORKFLOW_RESULT "$vUID" "$vARG" "$vTITLE" "$vSUBTITLE" "$vICON" "$vAUTOCOMPLETE" "$vACTIONABLE";
done <<< "$APP_PATHS"

WORKFLOW_TOXML