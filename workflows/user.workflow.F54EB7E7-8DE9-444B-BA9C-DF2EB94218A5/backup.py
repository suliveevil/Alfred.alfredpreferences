#!/usr/bin/python
# encoding: utf-8

import sys

from workflow import Workflow, web

log = None

def main(wf):
    # Get args from Workflow as normalized Unicode
    args = wf.args
    
    if not 'defaults' in wf.settings:
        wf.settings['defaults'] = { 'fr': 'USD', 'to': 'EUR' }
    
    if args[0] == 'from' or args[0] == 'to':
        return set_defaults(args)
        
    fr = wf.settings['defaults']['fr']
    to = wf.settings['defaults']['to']
    
    try:
        amount = float(args[0])
    except:
        amount = 0
        
    if len(args) == 2:
      fr = args[1].upper()
    elif len(args) == 3:
      fr = args[1].upper()
      to = args[2].upper()
    
    if len(fr) != 3 or len(to) != 3:
        wait()
    
    value = amount * get_rate(fr, to)
    formatted = "{:.2f}".format(value)
    
    # Add an item to Alfred feedback
    wf.add_item('%d %s = %s %s' % (amount, fr, formatted, to), valid=True, subtitle='Press enter to copy to clipboard', copytext=formatted, arg=formatted)

    # Send output to Alfred
    wf.send_feedback()
    
def set_defaults(args):
    if len(args[1]) == 3:
        cur = args[1].upper()
        
        if args[0] == 'from':
            wf.settings['defaults'] = { 'fr': cur, 'to': wf.settings['defaults']['to'] }
        if args[0] == 'to':
            wf.settings['defaults'] = { 'fr': wf.settings['defaults']['fr'], 'to': cur }

        print cur
        return
    
def wait():
    wf.add_item('Please enter a valid format', 'cur amount [currency code] [currency code]')
    
    wf.send_feedback()

def get_rate(fr, to):
    data = web.get('http://apilayer.net/api/live?access_key=c938bcf13e0aff152614745f41414ed4&currencies=%s,%s' % (fr, to)).json()
    
    try:
        return (1 / data['quotes']['USD%s' % fr]) * data['quotes']['USD%s' % to]
    except:
        wait()

if __name__ == '__main__':
    wf = Workflow()
    # Assign Workflow logger to a global variable for convenience
    log = wf.logger
    sys.exit(wf.run(main))