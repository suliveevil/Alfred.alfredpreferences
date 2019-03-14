#!/bin/bash

X23345_WORKFLOW_OUTPUT="";

function WORKFLOW_RESULT {
	local vUID="$1";
	local vARG="$2";
	local vTITLE="$3";
	local vSUBTITLE="$4";
	local vICON="$5";
	local vAUTOCOMPLETE="$6";
	local vACTIONABLE="${7:-yes}";
	local vTYPE="${8:-default}";

	X23345_WORKFLOW_OUTPUT="${X23345_WORKFLOW_OUTPUT}  <item uid=\"$vUID\" arg=\"$vARG\" valid=\"$vACTIONABLE\" autocomplete=\"$vAUTOCOMPLETE\" type=\"$vTYPE\">\n"
	X23345_WORKFLOW_OUTPUT="${X23345_WORKFLOW_OUTPUT}    <title>$vTITLE</title>\n"
	X23345_WORKFLOW_OUTPUT="${X23345_WORKFLOW_OUTPUT}    <subtitle>$vSUBTITLE</subtitle>\n"
	X23345_WORKFLOW_OUTPUT="${X23345_WORKFLOW_OUTPUT}    <icon type=\"fileicon\">$vICON</icon>\n"
	X23345_WORKFLOW_OUTPUT="${X23345_WORKFLOW_OUTPUT}  </item>\n"
}

function WORKFLOW_TOXML {
	if [ -z "${X23345_WORKFLOW_OUTPUT}" ]; then
		return;
	fi

	echo -e "<?xml version=\"1.0\"?>";
	echo -e "<items>";
	echo -e "${X23345_WORKFLOW_OUTPUT}</items>";
}