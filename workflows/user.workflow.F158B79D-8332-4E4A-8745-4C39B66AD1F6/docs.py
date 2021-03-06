#!/usr/bin/python
# encoding: utf-8

from __future__ import print_function, unicode_literals, absolute_import

import functools
import re
import sys
from HTMLParser import HTMLParser

from algoliasearch import algoliasearch
from config import Config
from workflow import Workflow, ICON_WARNING

# h.unescape() turns HTML escapes back into real characters
h = HTMLParser()

# Algolia client
client = algoliasearch.Client(Config.ALGOLIA_APP_ID,
                              Config.ALGOLIA_SEARCH_ONLY_API_KEY)
index = client.init_index(Config.ALGOLIA_SEARCH_INDEX)

# log
log = None


def cache_key(query):
    """Make filesystem-friendly cache key"""
    key = query
    key = key.lower()
    key = re.sub(r'[^a-z0-9-_;.]', '-', key)
    key = re.sub(r'-+', '-', key)
    log.debug('Cache key : {!r} -> {!r}'.format(query, key))
    return key


def handle_result(api_dict):
    """Extract relevant info from API result"""
    result = {}

    for key in {'id', 'title', 'permalink', 'default', 'content'}:
        result[key] = h.unescape(api_dict[key])

    return result


def search(query=None, limit=Config.RESULT_COUNT):
    if query:
        results = index.search(query, {'page': 0,
                                       'hitsPerPage': limit})
        if results is not None and 'hits' in results:
            return results['hits']
    return []


def main(wf):
    query = wf.args[0].strip()

    log.debug('query : {!r}'.format(query))

    if not query:
        wf.add_item('Search the Flask docs...')
        wf.send_feedback()
        return 0

    # Parse query into query string and tags
    words = query.split(' ')

    query = ' '.join(words)

    key = cache_key(query)

    results = wf.cached_data(key, functools.partial(search, query),
                             max_age=Config.CACHE_MAX_AGE)

    log.debug('{} results for {!r}'.format(len(results),
                                           query))
    # Show results
    if not results:
        wf.add_item('No matching answers found',
                    'Try a different query',
                    icon=ICON_WARNING)

    for result in results:
        wf.add_item(uid=result['id'],
                    title=result['id'],
                    subtitle=result['content'],
                    arg=result['permalink'],
                    valid=True,
                    largetext=result['title'],
                    copytext=result['permalink'],
                    quicklookurl=result['permalink'],
                    icon=Config.FLASK_ICON)
        # log.debug(result)

    wf.send_feedback()


if __name__ == '__main__':
    wf = Workflow()
    log = wf.logger
    sys.exit(wf.run(main))
