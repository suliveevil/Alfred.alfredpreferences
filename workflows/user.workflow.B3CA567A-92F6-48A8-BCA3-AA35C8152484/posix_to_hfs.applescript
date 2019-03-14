-- Copy All Paths to Clipboard
-- Workflow For Alfred 2
-- Franz Heidl 2014
-- MIT license.

on run(q)
  set theTargets to {}
  set oldItemDelimiters to text item delimiters
  set text item delimiters to ", "
  set qList to every text item of (q as text)
  set text item delimiters to oldItemDelimiters
  repeat with aTarget in qList
    set aTarget to (POSIX file aTarget as text)
    set theTargets to theTargets & aTarget
  end repeat
  return (theTargets)
end run