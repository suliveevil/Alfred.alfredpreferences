# Script to parse u, i, o, j, k, and l keys into a virtual number pad
# The upper row parsing goes as follows u = 4, i = 5, o = 6
# The lower row parsing goes as follows j = 1, k = 2, l = 3

import json
import sys

# Grabs the query
args = sys.argv[1]

if len(args) > 0:
    # Makes my initial string variable to start working with
    # and then starts converting certain letters into numbers
    phase0 = args
    phase1 = phase0.replace('j', '1')
    phase2 = phase1.replace('k', '2')
    phase3 = phase2.replace('l', '3')
    phase4 = phase3.replace('u', '4')
    phase5 = phase4.replace('i', '5')
    phase6 = phase5.replace('o', '6')

    # The json that Alfred requires is below
    result = {"items": [
      {
          "type": "file",
          "title": phase6,
          "subtitle": "Copy to Clipboard",
          "arg": phase6
      }
    ]}

    # Make the result useable by Aflred
    finalResult = json.dumps(result)

    # Passes the result json (made into a string first) to alfred
    print finalResult
