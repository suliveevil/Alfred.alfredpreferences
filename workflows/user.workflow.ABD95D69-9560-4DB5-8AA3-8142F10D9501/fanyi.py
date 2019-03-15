#!/usr/bin/python
# -*- coding:utf-8 -*-

__author__ = "Kun Wu"
__copyright__ = "Copyright 2018, Niuniu3's alfrad workflows"
__version__ = "1.0"
__maintainer__ = "Kun Wu"
__email__ = "lb_0574@163.com"

import httplib, hashlib, random, sys, argparse
from workflow import Workflow3, web, ICON_WEB, ICON_WARNING

# set the system encoding to utf-8
reload(sys)
sys.setdefaultencoding('utf-8')
log = None


def request_baidutrans(params):

    params['appid'] = '20180105000112216'

    params['salt'] = str(random.randint(32768, 65536))

    hash_md5 = hashlib.md5(params['appid'] + params['q'] + params['salt'] +
                           'bQJV16SGabV76NxE55a3')
    params['sign'] = hash_md5.hexdigest()

    # params should include url parameters: q, from, to, appid, salt and sign
    # q: query string
    # from: source language
    # to: target language
    # appid: in our baidu fanyi dev website, once you register your account, you will be provided an appid
    # salt: it can be any positive integer
    # sign: MD5 hash value of the combination of appid, q, salt and my own dev key in baidu API platform
    log.debug(params)
    myurl = 'http://api.fanyi.baidu.com/api/trans/vip/translate'

    response = web.get(myurl, params)

    # throw an error for the Workflow if request failed
    response.raise_for_status()

    # parse the json object from the response data

    if response.status_code == httplib.OK:
        result = response.json()
        if result.get('error_code') is None:
            # get the translated text
            return {'result': result['trans_result'][0]['dst']}
        else:
            return {'error': result.get('error_msg')}
    else:
        log.debug(response)


def main(wf):
    # build an argument parser to parse script args
    parser = argparse.ArgumentParser()
    parser.add_argument('query', nargs='+', default=None)
    # parse the script's arguments
    args = parser.parse_args(wf.args)
    query = args.query
    log.debug(query)

    # There should be 3 args provided: from, to and query
    if len(query) < 3:
        wf.add_item(
            'Arguments incorrect',
            'Please use {from language} {to language} {query} as the input arguments',
            valid=False,
            icon=ICON_WARNING)

    else:

        from_lan = query[0]

        to_lan = query[1]

        i = 2
        q = ''
        # Combine the results for multiple words in a sentence
        while i < len(query):
            q += query[i]
            i += 1
            if i < len(query):
                q += ' '

        result = request_baidutrans({'q': q, 'from': from_lan, 'to': to_lan})

        if result.get('result') is not None:
            wf.add_item(
                result.get('result'),
                'Translating text [' + q + '] from ' + from_lan + ' to ' +
                to_lan,
                valid=True,
                icon=ICON_WEB)
        else:
            wf.add_item(
                'Error happened: ',
                result.get('error'),
                valid=False,
                icon=ICON_WARNING)
    wf.send_feedback()
    return 0


if __name__ == u"__main__":
    wf = Workflow3()
    log = wf.logger
    sys.exit(wf.run(main))
