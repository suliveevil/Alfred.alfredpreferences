#!/usr/bin/env osascript -l JavaScript
'use strict';

var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers.extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers.slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

babelHelpers.taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};

babelHelpers.toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

babelHelpers.toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

babelHelpers;

var ATTRIBUTES = ['uid', 'arg', 'valid', 'autocomplete', 'type'];
var ELEMENTS = ['title', 'subtitle', 'subtitle_shift', 'subtitle_fn', 'subtitle_ctrl', 'subtitle_alt', 'subtitle_cmd', 'icon', 'icon_filetype', 'icon_fileicon', 'text_copy', 'text_largetype'];

var DEFAULT_CONFIG = {
    autoSort: true
};

function escapeXML(str) {
    return ('' + str).replace(/[<>&"']/g, function (c) {
        return {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&apos;'
        }[c];
    });
}

var Item = function () {
    function Item(props) {
        babelHelpers.classCallCheck(this, Item);

        this.props = {};
        this.set(props);
    }

    babelHelpers.createClass(Item, [{
        key: 'reset',
        value: function reset() {
            this.props = {};
        }
    }, {
        key: 'get',
        value: function get(key, defaultValue) {
            var value = key ? this.props[key] : this.props;
            return value == null ? defaultValue : value;
        }
    }, {
        key: 'set',
        value: function set(ps, value) {
            var _this = this;

            if ((typeof ps === 'undefined' ? 'undefined' : babelHelpers.typeof(ps)) === 'object') {
                Object.keys(ps).forEach(function (key) {
                    return _this.set(key, ps[key]);
                });
                return;
            }

            if (value) {
                this.props[ps] = value;
            } else {
                delete this.props[ps];
            }
        }
    }, {
        key: 'buildXML',
        value: function buildXML() {
            var _this2 = this;

            var attributes = ATTRIBUTES.map(function (name) {
                return _this2.props[name] !== undefined ? name + '="' + escapeXML(_this2.props[name]) + '"' : '';
            }).filter(function (attr) {
                return attr !== '';
            }).join(' ');

            var elements = ELEMENTS.map(function (e) {
                if (_this2.props[e] === undefined) {
                    return '';
                }
                var attr = '';

                var _e$split = e.split('_');

                var _e$split2 = babelHelpers.slicedToArray(_e$split, 2);

                var tag = _e$split2[0];
                var attrValue = _e$split2[1];

                if (attrValue !== undefined) {
                    attr += ' ' + (tag === 'subtitle' ? 'mod' : 'type') + '="' + attrValue + '"';
                }
                return '<' + tag + attr + '>' + escapeXML(_this2.props[e]) + '</' + tag + '>';
            }).filter(function (elem) {
                return elem !== '';
            }).join('\n');

            return '<item ' + attributes + '>\n' + elements + '\n</item>';
        }
    }]);
    return Item;
}();

var Items = function () {
    function Items() {
        var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        var _this3 = this;

        var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var presets = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        babelHelpers.classCallCheck(this, Items);

        this.config = babelHelpers.extends({}, DEFAULT_CONFIG, config);
        this.presets = presets;
        items = items.map(function (item) {
            return _this3.prepareItem(item);
        });
        this.items = items.map(function (item) {
            return new Item(item);
        });
    }

    babelHelpers.createClass(Items, [{
        key: 'prepareItem',
        value: function prepareItem(item) {
            var _this4 = this;

            var _split = (item._type || '').split('_');

            var _split2 = babelHelpers.slicedToArray(_split, 2);

            var _type = _split2[0];
            var _subType = _split2[1];

            // apply presets to item props

            Object.keys(this.presets).forEach(function (p) {
                var preset = _this4.presets[p];
                switch (p) {
                    // apply icon
                    case 'icons':
                        var icon = item.icon || preset[item._type] || preset[_type];
                        if (icon) {
                            item.icon = icon;
                            delete item.icon_fileicon;
                            delete item.icon_filetype;
                        }
                        break;

                    // prepare title
                    case 'titlePrefix':
                        var titlePrefix = preset[item._type] || preset[_type];
                        if (titlePrefix) {
                            item.title = titlePrefix + item.title;
                        }
                        break;

                }
            });

            // config-specific
            // remove `uid` to disable alfred auto sort
            if (!this.config.autoSort) {
                delete item.uid;
            }

            // type-specific
            switch (_type) {
                case 'error':
                    item.valid = item.valid || 'no';
                    item.title = item.title || 'You\'ve caught by an error monkey!';

                    break;
            }

            return item;
        }
    }, {
        key: 'length',
        value: function length() {
            return this.items.length;
        }
    }, {
        key: 'get',
        value: function get(i) {
            return i == null ? this.items : this.items[i];
        }
    }, {
        key: 'set',
        value: function set(i, item) {
            this.items[i] = new Item(this.prepareItem(item));
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.items = [];
        }
    }, {
        key: 'add',
        value: function add(item) {
            var i = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            item = new Item(this.prepareItem(item));
            i = i > this.items.length ? this.items.length : i;
            this.items = this.items.slice(0, i).concat(item, this.items.slice(i));
        }
    }, {
        key: 'remove',
        value: function remove(i) {
            this.items = this.items.slice(0, i).concat(this.items.slice(i + 1));
        }
    }, {
        key: 'sort',
        value: function sort() {
            this.items.forEach(function (item) {
                return item.set('uid');
            });
        }
    }, {
        key: 'filter',
        value: function filter(callback) {
            return this.items.filter(callback);
        }
    }, {
        key: 'buildXML',
        value: function buildXML() {
            //console.log(JSON.stringify(this.items))
            var content = this.items.map(function (item) {
                return item.buildXML();
            }).join('\n');
            return '<?xml version="1.0"?>\n<items>\n' + content + '\n</items>';
        }
    }]);
    return Items;
}();

ObjC.import('Foundation');

var USER_HOME_FOLDER = ObjC.unwrap($.NSHomeDirectory());
var WORKFLOW_CONFIG_FOLDER = USER_HOME_FOLDER + '/.config/bs-alfredworkflow';
var DEFAULT_BROWSERS = {
    safari: ['Safari'],
    chrome: ['Google Chrome']
};
var USER_DFEAULTS = null;
var BROWSERS = null;

var SystemEvents = Application('System Events');
SystemEvents.includeStandardAdditions = true;
var frontmostApp = function frontmostApp() {
    return SystemEvents.processes.whose({ frontmost: true })[0].name();
};

var FileManager = $.NSFileManager.defaultManager;

// ================================================================================================

function getAllBrowsers() {
    if (!BROWSERS) {
        (function () {
            BROWSERS = {};
            var userBrowsers = userDefaults('browsers') || {};
            //console.log(JSON.stringify(userBrowsers))
            Object.keys(DEFAULT_BROWSERS).forEach(function (b) {
                BROWSERS[b] = userBrowsers[b] || DEFAULT_BROWSERS[b];
            });
        })();
    }
    return BROWSERS;
}

function getBrowser(name, browserTypes, defaultBrowser) {
    var browsers = getAllBrowsers();
    browserTypes = browserTypes || Object.keys(browsers);

    name = name || defaultBrowser;
    if (!name) {
        return [];
    }

    if (!Array.isArray(browserTypes)) {
        browserTypes = [browserTypes];
    }
    name = name.toLowerCase();

    if (browsers[name] && browsers[name].length) {
        return [browsers[name][0], name];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = browserTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var type = _step.value;

            if (!browsers[type]) {
                continue;
            }
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = browsers[type][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var browser = _step2.value;

                    if (name === browser.toLowerCase()) {
                        return [browser, type];
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return [];
}

function getFromToBrowsers(from, to, reverse) {
    var fromType = void 0;

    var _getBrowser = getBrowser(from);

    var _getBrowser2 = babelHelpers.slicedToArray(_getBrowser, 2);

    from = _getBrowser2[0];
    fromType = _getBrowser2[1];

    to = getBrowser(to)[0];

    if (!from) {
        var front = frontmostApp();

        var _getBrowser3 = getBrowser(front);

        var _getBrowser4 = babelHelpers.slicedToArray(_getBrowser3, 2);

        from = _getBrowser4[0];
        fromType = _getBrowser4[1];

        if (!from) {
            throw new Error(front + ' is not supported browser.');return;
        }
    }

    if (!to) {
        if (fromType === 'safari') {
            to = getBrowser('chrome')[0];
        } else if (fromType === 'chrome') {
            to = getBrowser('safari')[0];
        } else {
            throw new Error(from + ' is not supported browser.');return;
        }
    }

    if (from === to) {
        throw new Error('Source and target browsers cannot be same application.');return;
    }

    if (reverse) {
        var _ref = [to, from];
        from = _ref[0];
        to = _ref[1];
    }

    return [from, to];
}

function getDefaultBrowser() {
    var app = Application.currentApplication();
    try {
        app.includeStandardAdditions = true;
    } catch (err) {
        app = Application('Finder');
        app.includeStandardAdditions = true;
    }

    return app.doShellScript("export VERSIONER_PERL_PREFER_32_BIT=yes;" + "perl -MMac::InternetConfig -le 'print +(GetICHelper \"http\")[1]'");
}

function theClipboard(sth) {
    if (sth === '__frontmostapp_selection__') {
        // Method 1: call keystroke `cmd + c` to copy text
        //SystemEvents.keystroke('c', { using: 'command down' })

        // Method 2: click menu item `Edit - Copy`
        SystemEvents.processes.whose({ frontmost: true })[0].menuBars[0].menuBarItems.whose({ name: 'Edit' })[0].menus[0].menuItems.whose({ name: 'Copy' })[0].click();

        delay(0.1); // wait 0.1s to let keystroke take effect
    } else if (sth) {
            SystemEvents.setTheClipboardTo(sth);
        }
    return SystemEvents.theClipboard();
}

function _getSelectionByCopy() {
    var clipboardBackup = theClipboard();
    theClipboard('__frontmostapp_selection__');
    var selection = theClipboard();
    // TODO better way to detect selection over this buggy workaround
    if (selection === clipboardBackup) {
        selection = null;
    } else {
        theClipboard(clipboardBackup);
    }
    return selection;
}

// propsIn: {appName}
function getApp() {
    var appName = arguments.length <= 0 || arguments[0] === undefined ? frontmostApp() : arguments[0];

    var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref2$activate = _ref2.activate;
    var activate = _ref2$activate === undefined ? false : _ref2$activate;
    var _ref2$appOnly = _ref2.appOnly;
    var appOnly = _ref2$appOnly === undefined ? false : _ref2$appOnly;
    var index = _ref2.index;

    appName = /^frontmostapp$/i.test(appName) ? frontmostApp() : appName;

    var app = null;
    try {
        app = Application(appName);
    } catch (err) {
        throw new Error('Application ' + appName + ' was not found.');
    }

    app.includeStandardAdditions = true;
    activate && app.activate();
    //activate ? (app.activate()) : (app.launch())

    if (appOnly) {
        return app;
    }

    var windows = void 0,
        targetTab = void 0,
        targetTabIndex = void 0,
        title = void 0,
        url = void 0;
    try {
        windows = app.windows();
    } catch (err) {
        // Non-standard native app might not support, e.g. Neovim.app
        console.log('Non-standard native app ' + appName + ': ' + err);
        return [app];
    }

    var browserType = getBrowser(appName)[1];

    if (browserType === 'safari') {
        windows = windows.filter(function (win) {
            return win.document() !== undefined;
        });
        if (windows.length) {
            targetTab = index > 0 ? windows[0].tabs[index - 1] : windows[0].currentTab();
            if (targetTab) {
                targetTabIndex = targetTab.index();
                title = targetTab.name();
                url = targetTab.url();
            }
        }
    } else if (browserType === 'chrome') {
        if (windows.length) {
            targetTab = index > 0 ? windows[0].tabs[index - 1] : windows[0].activeTab();
            if (targetTab) {
                targetTabIndex = windows[0].activeTabIndex();
                title = targetTab.title();
                url = targetTab.url();
            }
        }
    }

    return [app, windows, browserType, targetTab, targetTabIndex, title, url];
}

function getAppData(appName) {
    var clips = arguments.length <= 1 || arguments[1] === undefined ? new Set() : arguments[1];

    var _ref3 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var index = _ref3.index;
    var appData = _ref3.appData;
    var stringify = _ref3.stringify;

    var data = {};

    var _ref4 = appData || getApp(appName, { index: index });

    var _ref5 = babelHelpers.slicedToArray(_ref4, 7);

    var app = _ref5[0];
    var windows = _ref5[1];
    var browserType = _ref5[2];
    var targetTab = _ref5[3];
    var targetTabIndex = _ref5[4];
    var title = _ref5[5];
    var url = _ref5[6];

    appName = app.name();

    data.appName = appName;

    clips = new Set(clips);

    if (clips.has('browserType')) {
        data.browserType = browserType;
    }

    // get title/name data
    if (clips.has('title') || clips.has('markdown')) {
        if (title) {
            data.title = title;
        } else if (windows && windows[0]) {
            data.title = windows[0].name();
        } else {
            data.title = appName;
        }
    }

    // url for browsers
    if (clips.has('url') || clips.has('markdown')) {
        data.url = url;
    }

    // markdown stringify
    if (clips.has('markdown')) {
        data.markdown = '[' + data.title + '](' + data.url + ')';
    }

    // selected text
    if (clips.has('selection')) {

        try {
            // do javascript trick to get selection text in browser tab
            if (targetTab) {
                // http://stackoverflow.com/questions/10990690/content-getselection-is-not-working-when-selected-text-is-in-iframe
                var js = "function _getSelection(w){var r=w.getSelection();for(var i=0;!r&&i<w.frames.length;i++){r=_getSelection(w.frames[i])}return r;}''+_getSelection(window)";
                if (browserType === 'safari') {
                    data.selection = app.doJavaScript(js, { in: targetTab });
                } else if (browserType === 'chrome') {
                    data.selection = targetTab.execute({ javascript: js });
                }

                if (data.selection[0] === '\u0001') {
                    var frontApp = frontmostApp();
                    app.activate();
                    delay(0.1); // make sure target app goes frontmost
                    data.selection = _getSelectionByCopy();
                    if (app.name() !== frontApp) {
                        getApp(frontApp, { activate: true, appOnly: true });
                    }
                }
            } else if (app.frontmost()) {
                data.selection = _getSelectionByCopy();
            }
        } catch (err) {
            throw new Error('Unable to get selection in ' + appName);
        }
    }

    // From here, rest flags require native window interface
    if (!Array.isArray(windows) || !windows.length) {
        // Just return empty data instead when no active window detected,
        // or because it does not support standard suite
        return data;
        //throw new Error(`No active window was found in ${appName}`)
    }

    // all tabs
    if (clips.has('tabs')) {
        if (browserType === 'safari') {
            data.tabs = windows[0].tabs().map(function (t, i) {
                return {
                    browser: appName,
                    browserType: browserType,
                    url: t.url(),
                    title: t.name(),
                    index: t.index(),
                    id: null,
                    active: targetTabIndex === t.index()
                };
            });
        } else if (browserType === 'chrome') {
            data.tabs = windows[0].tabs().map(function (t, i) {
                return {
                    browser: appName,
                    browserType: browserType,
                    url: t.url(),
                    title: t.title(),
                    index: i + 1,
                    id: t.id(),
                    active: targetTabIndex === i + 1
                };
            });
        } else {
            data.tabs = [];
        }

        if (stringify) {
            data.tabs = JSON.stringify(data.tabs);
        }
    }

    return data;
}

function closeTab(appName) {
    var _ref6 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref6$closeWindow = _ref6.closeWindow;
    var closeWindow = _ref6$closeWindow === undefined ? false : _ref6$closeWindow;
    var index = _ref6.index;

    var _getApp = getApp(appName, { index: index });

    var _getApp2 = babelHelpers.slicedToArray(_getApp, 4);

    var app = _getApp2[0];
    var windows = _getApp2[1];
    var browserType = _getApp2[2];
    var targetTab = _getApp2[3];

    appName = app.name();
    try {
        if (windows.length && closeWindow) {
            app.close(windows[0]);
        } else if (targetTab) {
            app.close(targetTab);
        } else {
            throw new Error(appName + ' is not a browser or not supported yet.');
        }
    } catch (err) {
        throw new Error('Unable to close tab in ' + appName);
    }
}

function _searchByText(text) {
    var clipboardBackup = theClipboard();
    theClipboard(text);

    delay(0.1);
    SystemEvents.keystroke('l', { using: 'command down' }); // Focus onto address bar
    delay(0.1);
    SystemEvents.keystroke('v', { using: 'command down' }); // Paste text
    delay(0.1);
    SystemEvents.keyCode(36); // Press Enter

    theClipboard(clipboardBackup);
}

function openUrl(_url) {
    var target = arguments.length <= 1 || arguments[1] === undefined ? frontmostApp() : arguments[1];

    var _ref7 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var _ref7$activate = _ref7.activate;
    var activate = _ref7$activate === undefined ? true : _ref7$activate;
    var dedupe = _ref7.dedupe;
    var _ref7$newTab = _ref7.newTab;
    var newTab = _ref7$newTab === undefined ? true : _ref7$newTab;
    var background = _ref7.background;
    var appData = _ref7.appData;
    var noValidation = _ref7.noValidation;
    var fallbackSearch = _ref7.fallbackSearch;


    var url = noValidation ? _url : validateUrl(_url);
    if (!noValidation && typeof url === 'string' && !/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }

    if (!url && !fallbackSearch) {
        throw new Error('No valid URL was detected in text: ' + _url);
    }

    if (!appData) {
        target = getBrowser(target)[0] || getDefaultBrowser();
        appData = getApp(target, { activate: activate });
    }

    var _appData = appData;

    var _appData2 = babelHelpers.slicedToArray(_appData, 4);

    var app = _appData2[0];
    var windows = _appData2[1];
    var browserType = _appData2[2];
    var frontTab = _appData2[3];

    var appName = app.name();

    // create new window if no valid ones
    if (!windows.length) {
        browserType === 'safari' ? app.Document().make() : app.Window().make();
        //delay(0.1)
        if (url) {
            app.windows[0].tabs[0].url = url;
        } else if (fallbackSearch) {
            _searchByText(_url);
        }
        return [url, appName];
    }

    var exists = false;

    if (url && dedupe) {
        windows.some(function (win) {
            win.tabs().some(function (tab, i) {
                //console.log(tab.url(), ' ??? ', url)
                var tabUrl = tab.url();
                if (typeof tabUrl === 'string') {
                    tabUrl = tabUrl.replace(/[\/?&]+$/, '').toLowerCase();
                    var cleanUrl = url.replace(/[\/?&]+$/, '').toLowerCase();
                    if (tabUrl === cleanUrl) {
                        exists = [win, tab, i + 1];
                        return true;
                    }
                }

                return exists; // false
            });

            return exists; // false
        });
    }

    exists = exists || [windows[0]];
    var _exists = exists;

    var _exists2 = babelHelpers.slicedToArray(_exists, 3);

    var win = _exists2[0];
    var tab = _exists2[1];
    var tabIndex = _exists2[2];


    if (!url) {
        if (fallbackSearch) {
            tab = app.Tab();
            tabIndex = win.tabs.push(tab);
            if (browserType === 'safari') {
                win.currentTab = tab;
            }
            _searchByText(_url);
        }
    } else if (!tab) {
        if (newTab) {
            tab = app.Tab({ url: url });
            tabIndex = win.tabs.push(tab);
        } else {
            frontTab && (frontTab.url = url);
        }
    }

    //if (!tab) { throw new Error(`Unable to create tab in ${appName}`) }

    if (!background && tab) {
        if (browserType === 'safari') {
            win.currentTab = tab;
        } else if (browserType === 'chrome' && tabIndex) {
            win.activeTabIndex = tabIndex;
        }
    }
    // always bring window to front within app
    win.index = 1;

    return [url, appName];
}

function openUrls(urls, target) {
    var _ref8 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var _ref8$activate = _ref8.activate;
    var activate = _ref8$activate === undefined ? true : _ref8$activate;
    var dedupe = _ref8.dedupe;
    var newWindow = _ref8.newWindow;
    var background = _ref8.background;
    var noValidation = _ref8.noValidation;

    target = getBrowser(target)[0] || getDefaultBrowser();
    var appData = getApp(target, { activate: activate });
    var _appData3 = appData;

    var _appData4 = babelHelpers.slicedToArray(_appData3, 3);

    var app = _appData4[0];
    var windows = _appData4[1];
    var browserType = _appData4[2];


    if (!windows.length || newWindow) {
        browserType === 'safari' ? app.Document().make() : app.Window().make();
        delay(0.1);
        appData = getApp(target, { activate: activate });
    }

    var appName = void 0;
    urls.forEach(function (url, i) {
        var newTab = i !== 0;

        var _openUrl = openUrl(url, target, { dedupe: dedupe, appData: appData, newTab: newTab, background: background, noValidation: noValidation });

        var _openUrl2 = babelHelpers.slicedToArray(_openUrl, 2);

        url = _openUrl2[0];
        appName = _openUrl2[1];
    });

    return [urls, appName];
}

// http://forums.devshed.com/javascript-development-115/regexp-to-match-url-pattern-493764.html
// https://github.com/ttscoff/popclipextensions/blob/master/OpenURLS.popclipext/openurls.rb
function validateUrl(str, all, debug) {
    var urls = [];
    if (typeof str === 'string') {
        var re = new RegExp('(?:(?:https?:\\/\\/))?' + // protocol
        '(localhost|' + // local host
        '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?' // fragment locater
        , 'ig');

        var match = re.exec(str);
        while (match) {
            if (debug) {
                console.log(match);
            }
            if (typeof match[0] === 'string') {
                urls.push(match[0]);
                if (!all) {
                    break;
                }
            }
            match = re.exec(str);
        }
    }
    return all ? urls : urls[0];
}

function extractFilePath(fileName) {
    var absoulte = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    var path = fileName.substring(0, fileName.lastIndexOf('/'));
    fileName = fileName.substring(fileName.lastIndexOf('/') + 1);
    if (!absoulte) {
        if (path[0] !== '/') {
            path = '/' + path;
        }
        path = WORKFLOW_CONFIG_FOLDER + path;
    }
    return [path, fileName];
}

//function listFilesInPath(path, absoulte = false) {
//path = extractFilePath(path, absoulte).join('/')
//const contents = FileManager.contentsOfDirectoryAtPathError(path, null)
//return ObjC.unwrap(contents).map(c => ObjC.unwrap(c))
//}

function readFromFile(file) {
    var absoulte = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    var path = extractFilePath(file, absoulte).join('/');
    var content = FileManager.contentsAtPath(path);
    content = $.NSString.alloc.initWithDataEncoding(content, $.NSUTF8StringEncoding);
    return ObjC.unwrap(content);
}

function writeToFile(content, file) {
    var absoulte = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    var _extractFilePath = extractFilePath(file, absoulte);

    var _extractFilePath2 = babelHelpers.slicedToArray(_extractFilePath, 2);

    var path = _extractFilePath2[0];
    var fileName = _extractFilePath2[1];

    // make sure target folder exists or created

    FileManager.createDirectoryAtPathWithIntermediateDirectoriesAttributesError(path, true, {}, null);

    content = $.NSString.alloc.initWithUTF8String(JSON.stringify(content));
    content.writeToFileAtomically(path + '/' + fileName, true);
}

function userDefaults() {
    if (!USER_DFEAULTS) {
        try {
            USER_DFEAULTS = JSON.parse(readFromFile('config.json'));
        } catch (err) {
            console.log('Failed to read user config file.', err);
        }
    }
    USER_DFEAULTS = USER_DFEAULTS || {};

    for (var _len = arguments.length, pathValuePairs = Array(_len), _key = 0; _key < _len; _key++) {
        pathValuePairs[_key] = arguments[_key];
    }

    if (!pathValuePairs.length) {
        return USER_DFEAULTS;
    }

    var modified = false;
    var values = pathValuePairs.map(function (pair) {
        if (!Array.isArray(pair)) {
            pair = [pair];
        }
        var _pair = pair;

        var _pair2 = babelHelpers.slicedToArray(_pair, 2);

        var path = _pair2[0];
        var value = _pair2[1];

        if (typeof path === 'string') {
            path = path.split('.');
        }
        if (!Array.isArray(path) || !path[0]) {
            return null;
        }

        var v = null,
            obj = USER_DFEAULTS;
        for (var i in path) {
            var p = path[i];
            v = obj[p];

            if (i == path.length - 1) {
                if (value === null) {
                    delete obj[p];
                } else if (value !== undefined && v !== value) {
                    obj[p] = value;
                    v = value;
                    modified = true;
                }
            } else if (v == null) {
                if (value === undefined) {
                    break;
                } else {
                    obj[p] = {};obj = obj[p];
                }
            } else if ((typeof v === 'undefined' ? 'undefined' : babelHelpers.typeof(v)) !== 'object') {
                v = null;break;
            } else {
                obj = obj[p];
            }
        }

        return v;
    });

    if (modified) {
        writeToFile(USER_DFEAULTS, 'config.json');
    }

    return values.length === 1 ? values[0] : values;
}

function getTester(str, t) {
    if (t instanceof RegExp) {
        return function (s) {
            return t.test(s);
        };
    } else if (typeof t === 'number' && t > 0) {
        return function (s) {
            var re = new RegExp('^' + str.slice(0, t) + Array.from(str.slice(t)).join('?') + '?$', 'i');
            return re.test(s);
        };
    } else if (typeof t === 'string') {
        var _ret2 = function () {
            var _t$split = t.split('_');

            var _t$split2 = babelHelpers.slicedToArray(_t$split, 2);

            var type = _t$split2[0];
            var flag = _t$split2[1];

            if (type === 'fuzzy') {
                return {
                    v: function v(s) {
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = s[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var c = _step3.value;

                                var re = new RegExp(c, flag);
                                var found = re.exec(str);
                                if (!found) {
                                    return false;
                                }
                                str = str.slice(found.index + 1);
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }

                        return true;
                    }
                };
            } else if (type === 'words') {
                return {
                    v: function v(s) {
                        var ss = s.split(/\s+/);
                        return ss.every(function (_s) {
                            //_s = _s.replace(/[^\w_-@]/g, '')
                            var re = new RegExp(_s, flag);
                            return re.test(str);
                        });
                    }
                };
            } else {
                return {
                    v: function v(s) {
                        var re = new RegExp(s, flag);
                        return re.test(str);
                    }
                };
            }
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret2)) === "object") return _ret2.v;
    } else {
        return function (s) {
            return s === str;
        };
    }
}

function isTrue(val) {
    switch (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) {
        case 'string':
            return val !== '' && !/^(false|no|off|ko)$/i.test(val);

        case 'number':
            return val > 0;

        case 'boolean':
            return val;

        default:
            return val != null;
    }
}

Error.prototype.toString = function (noDetails) {
    var obj = Object(this);
    if (obj !== this) {
        throw new TypeError();
    }

    var props = [];
    if (this.name === undefined) {
        props.push('Error');
    } else {
        props.push(String(this.name));
    }
    if (this.message !== undefined) {
        props.push(String(this.message));
    }

    if (!noDetails) {
        props.push('[' + String(this.line) + '-' + String(this.column) + '] ' + String(this.stack));
    }

    return props.join(': ');
};

var FORMATS_FILE = 'formats.json';

var PRESETS = {
    icons: {
        'error': 'error.png',

        'browser': 'browser.png',
        'browser_safari': 'browser_safari.png',
        'browser_chrome': 'browser_chrome.png',

        'action': 'icon.png',
        'action_switch': 'action_switch.png',
        'action_copy': 'action_copy.png',
        'action_open': 'action_open.png',
        'action_stash': 'action_stash.png',
        'action_unstash': 'action_unstash.png',

        'actionflag_on': 'actionflag_on.png',
        'actionflag_off': 'actionflag_off.png',
        'actionflagvalue_checked': 'actionflagvalue_checked.png',
        'actionflagvalue_unchecked': 'actionflagvalue_unchecked.png'

    }
};

//titlePrefix: {
//'error': '(；￣Д￣）',
//}

var Preview = function (_Items) {
    babelHelpers.inherits(Preview, _Items);

    function Preview(items, config) {
        babelHelpers.classCallCheck(this, Preview);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Preview).call(this, items, config, PRESETS));
    }

    babelHelpers.createClass(Preview, [{
        key: 'hasError',
        value: function hasError() {
            return this.filter(function (item) {
                return item.get('_type', '').startsWith('error');
            }).length > 0;
        }
    }, {
        key: 'addOptionItems',
        value: function addOptionItems(types, action, filter, opt) {
            var _this2 = this;

            var data = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];

            types = Array.isArray(types) ? types : [types];
            types.forEach(function (type) {
                switch (type) {
                    case 'frontmost':
                        _this2.addFrontmostApp(action, filter, opt, 999);break;
                    case 'browsers':
                        _this2.addBrowsers(action, filter, opt, 999);break;
                    //case 'actions'            : this.addActions(data.actions, filter, opt, 999); break
                    case 'action_flags':
                        _this2.addActionFlags(action, filter, opt, 999);break;
                    case 'action_flag_values':
                        _this2.addActionFlagValues(action, data.flag, filter, opt, 999);break;
                    case 'textformat_presets':
                        _this2.addTextFormatPresets(action, filter, opt, 999);break;

                }
            });
        }
    }, {
        key: 'addFrontmostApp',
        value: function addFrontmostApp(action, filter, opt, insertBefore) {
            try {
                var _getApp = getApp();

                var _getApp2 = babelHelpers.slicedToArray(_getApp, 7);

                var app = _getApp2[0];
                var windows = _getApp2[1];
                var browserType = _getApp2[2];
                var targetTab = _getApp2[3];
                var targetTabIndex = _getApp2[4];
                var title = _getApp2[5];
                var url = _getApp2[6];

                var appName = app.name();

                if (filter) {
                    var fuzzyTest_1 = getTester('frontmostapp', 'fuzzy_i');
                    var fuzzyTest_2 = getTester(appName, 'fuzzy_i');
                    if (!fuzzyTest_1(filter) && !fuzzyTest_2(filter)) {
                        return;
                    }
                }

                title = title || appName;
                var subtitle = url || '';

                var override = this.getOverride(opt, 'frontmostapp');
                var item = {
                    _type: 'app_frontmostapp',
                    uid: 'app_frontmost',
                    valid: 'no',
                    autocomplete: action.constructQueryString(override),
                    title: '[FRONT: ' + appName + '] ' + title,
                    subtitle: subtitle,
                    icon_fileicon: '/Applications/' + appName + '.app'
                };

                this.add(item, insertBefore);
            } catch (err) {
                var _override = this.getOverride(opt);
                this.addError(action, {
                    _type: 'error',
                    autocomplete: action.constructQueryString(_override),
                    title: 'Front app is not available.',
                    subtitle: err
                }, 999);
            }
        }
    }, {
        key: 'addBrowsers',
        value: function addBrowsers(action, filter, opt, insertBefore) {
            var _this3 = this;

            var BROWSERS = getAllBrowsers();
            Object.keys(BROWSERS).forEach(function (b) {
                var firstBrowser = BROWSERS[b][0];
                if (filter) {
                    var fuzzyTest = getTester(firstBrowser, 'fuzzy_i');
                    if (!fuzzyTest(filter)) {
                        return;
                    }
                }

                var override = _this3.getOverride(opt, firstBrowser);
                var item = {
                    _type: 'browser_' + b,
                    uid: 'browser_' + firstBrowser,
                    valid: 'no',
                    autocomplete: action.constructQueryString(override),
                    title: firstBrowser,
                    icon_fileicon: '/Applications/' + firstBrowser + '.app'
                };

                _this3.add(item, insertBefore);
            });
        }

        //addActions(actions, filter, opt, insertBefore) {
        //actions.forEach(action => {
        //if (filter && !action.fuzzyTestName(filter)) { return }
        //const override = this.getOverride(opt, action.name)
        //this.add({
        //_type        : `action_${action.name}`,
        //uid          : `action_${action.name}`,
        //valid        : 'no',
        //autocomplete : action.constructQueryString(override),
        //title        : action.name,
        //subtitle     : action.title
        //}, insertBefore)
        //})
        //}

    }, {
        key: 'addActionFlags',
        value: function addActionFlags(action, filter, opt, insertBefore) {
            for (var flag in action.flags) {
                var _action$flags$flag = action.flags[flag];
                var nameTest = _action$flags$flag.nameTest;
                var defaultValue = _action$flags$flag.defaultValue;
                var description = _action$flags$flag.description;

                if (filter && !nameTest(filter)) {
                    continue;
                }

                var override = this.getOverride(opt, flag);
                var _type = 'actionflag_' + flag;
                var item = {
                    _type: _type,
                    uid: _type,
                    valid: 'no',
                    autocomplete: action.constructQueryString(override),
                    title: flag,
                    subtitle: action.name + '/' + flag + ': ' + (description || ''),
                    icon: 'actionflag_' + (isTrue(defaultValue) ? 'on' : 'off') + '.png'
                };

                this.add(item, insertBefore);
            }
        }
    }, {
        key: 'addActionFlagValues',
        value: function addActionFlagValues(action, flag, filter, opt, insertBefore) {
            var _this4 = this;

            var _action$flags$flag2 = action.flags[flag];
            var defaultValue = _action$flags$flag2.defaultValue;
            var description = _action$flags$flag2.description;

            ['on', 'off'].forEach(function (v) {
                if (filter) {
                    var fuzzyTest = getTester(v, 'fuzzy_i');
                    if (!fuzzyTest(filter)) {
                        return;
                    }
                }
                var _type = 'actionflagvalue_' + v;
                var query = action.constructQueryString(_this4.getOverride(opt, v));
                _this4.add({
                    _type: _type,
                    //uid          : _type,
                    arg: query,
                    //autocomplete : query,
                    title: v,
                    subtitle: action.name + '/' + flag + ': ' + (description || ''),
                    icon: 'actionflagvalue_' + (isTrue(defaultValue) === isTrue(v) ? 'checked' : 'unchecked') + '.png'
                }, insertBefore);
            });
        }
    }, {
        key: 'addTextFormatPresets',
        value: function addTextFormatPresets(action, filter, opt, insertBefore) {
            var _this5 = this;

            var formats = void 0;
            try {
                formats = JSON.parse(readFromFile(FORMATS_FILE));
            } catch (err) {
                console.log(err);
            }
            formats = formats || {};

            Object.keys(formats).forEach(function (f) {
                var formatString = formats[f];
                if (filter) {
                    var tester = getTester(f, 'fuzzy_i');
                    if (!tester(filter)) {
                        return;
                    }
                }

                var _type = 'textformat_' + f;
                var query = action.constructQueryString(_this5.getOverride(opt, f));
                _this5.add({
                    _type: _type,
                    uid: _type,
                    valid: 'no',
                    autocomplete: query,
                    title: f,
                    subtitle: formatString.replace(/[\r\n]/g, '⏎')
                }, //icon: 'textformat.png'
                insertBefore);
            });

            if (!this.length()) {
                var query = action.constructQueryString(this.getOverride(opt));
                this.addError(action, {
                    autocomplete: query,
                    title: 'No matched text formatting preset was found for \'' + (filter || '') + '\'',
                    subtitle: 'Press ENTER / TAB to choose from a list'
                });
            }
        }
    }, {
        key: 'addError',
        value: function addError(action, props, insertBefore) {
            var serialized = action.serialize();
            var item = babelHelpers.extends({
                _type: 'error_' + action.name,
                valid: 'no',
                title: 'You\'ve caught by an error monkey!',
                subtitle: serialized,
                text_copy: serialized
            }, props);

            item.subtitle_cmd = item.subtitle_cmd || item.text_copy;
            item.text_largetype = item.text_largetype || item.subtitle_cmd;

            this.add(item, insertBefore);
        }
    }, {
        key: 'getOverride',
        value: function getOverride(opt) {
            var value = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            var options = {};
            if (opt) {
                options[opt] = value;return { options: options };
            } else {
                return {};
            }
        }
    }]);
    return Preview;
}(Items);

var _templateObject = babelHelpers.taggedTemplateLiteral(['Unknown call type \'', '\' for \'', '\''], ['Unknown call type \'', '\' for \'', '\'']);

function runner (action) {
    var argv = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    var resp = '';

    var _argv$join$split = argv.join(' ').split(/\s+/);

    var _argv$join$split2 = babelHelpers.toArray(_argv$join$split);

    var callType = _argv$join$split2[0];

    var qs = _argv$join$split2.slice(1);

    try {
        qs = qs.join(' ');
        action.setQuery(qs);
        if (typeof action[callType] === 'function') {
            resp = action[callType]();
        } else {
            throw new (Error(_templateObject, callType, action.name))();
        }
    } catch (err) {
        console.log(err);
        resp = err.message || err;
        if (['preview', 'defaults'].indexOf(callType) !== -1) {
            var preview = new Preview();
            preview.addError(action, {
                subtitle: resp
            });
            resp = preview.buildXML();
        }
    }

    return resp;
}

var Action = function () {
    function Action() {
        var _this = this;

        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var _ref$name = _ref.name;
        var name = _ref$name === undefined ? '_unknown_' : _ref$name;
        var _ref$title = _ref.title;
        var title = _ref$title === undefined ? 'UNKNOWN' : _ref$title;
        var _ref$opts = _ref.opts;
        var opts = _ref$opts === undefined ? [] : _ref$opts;
        var _ref$flags = _ref.flags;
        var flags = _ref$flags === undefined ? [] : _ref$flags;
        babelHelpers.classCallCheck(this, Action);

        this.name = name;
        this.title = title;

        this.opts = {};
        opts.forEach(function (opt) {
            if (!Array.isArray(opt)) {
                opt = [opt];
            }
            var _opt = opt;

            var _opt2 = babelHelpers.slicedToArray(_opt, 6);

            var optName = _opt2[0];
            var description = _opt2[1];
            var optTest = _opt2[2];
            var defaultValue = _opt2[3];
            var required = _opt2[4];
            var sanitizer = _opt2[5];

            var userDefaultValue = userDefaults([name, 'options', optName].join('.'));
            defaultValue = userDefaultValue != null ? userDefaultValue : defaultValue;
            _this.opts[optName] = {
                nameTest: getTester(optName, optTest),
                defaultValue: defaultValue,
                required: required,
                sanitizer: sanitizer,
                description: description
            };
        });

        // shared options to set defaults of action flags
        this.opts.set_flag = {
            nameTest: getTester('set_flag', 'same_i')
        };
        this.opts.set_value = {
            nameTest: getTester('set_value', 'same_i')
        };

        this.flags = {};
        flags.forEach(function (flag) {
            if (!Array.isArray(flag)) {
                flag = [flag];
            }
            var _flag = flag;

            var _flag2 = babelHelpers.slicedToArray(_flag, 4);

            var flagName = _flag2[0];
            var description = _flag2[1];
            var flagTest = _flag2[2];
            var defaultValue = _flag2[3];

            var userDefaultValue = userDefaults([name, 'flags', flagName].join('.'));
            defaultValue = userDefaultValue != null ? userDefaultValue : defaultValue;
            _this.flags[flagName] = {
                nameTest: getTester(flagName, flagTest),
                defaultValue: defaultValue,
                description: description
            };
        });

        this.query = {};

        // get testers
        this.testName = getTester(this.name, 'strict_i');
        this.fuzzyTestName = getTester(this.name, 'fuzzy_i');
    }

    babelHelpers.createClass(Action, [{
        key: 'serialize',
        value: function serialize() {
            return JSON.stringify({
                name: this.name,
                title: this.title,
                flags: Array.from(this.getQueryFlags()),
                options: this.getQueryOptions({ allowEmpty: false }),
                notes: this.query.notes
            });
        }
    }, {
        key: 'preview',
        value: function preview() {}
    }, {
        key: 'run',
        value: function run() {}
    }, {
        key: 'defaults',
        value: function defaults() {
            var preview = new Preview();
            var options = this.getQueryOptions();
            options.set_flag = options.set_flag || '';
            options.set_value = options.set_value || '';

            var xml = this.previewOptionSelects(['action_flags'], preview, options, ['set_flag']);
            if (xml) {
                return xml;
            }

            xml = this.previewOptionSelects(['action_flag_values'], preview, options, ['set_value'], { flag: options.set_flag });
            if (xml) {
                return xml;
            }

            return preview.buildXML();
        }
    }, {
        key: 'set',
        value: function set() {
            var _getQueryOptions = this.getQueryOptions();

            var set_flag = _getQueryOptions.set_flag;
            var set_value = _getQueryOptions.set_value;

            if (!set_flag || !set_value) {
                throw new Error('Incomplete options to set default value for ' + this.name.toUpperCase());
            }

            var value = userDefaults([[this.name, 'flags', set_flag].join('.'), isTrue(set_value)]);

            if (value != null) {
                return 'Turned ' + set_value + ' the flag ' + (this.name + '.' + set_flag).toUpperCase() + ' by default';
            } else {
                return '';
            }
        }
    }, {
        key: 'getOptionName',
        value: function getOptionName(name) {
            var _this2 = this;

            Object.keys(this.opts).some(function (k) {
                if (_this2.opts[k].nameTest(name)) {
                    name = k;
                    return true;
                }
                return false;
            });
            return name;
        }
    }, {
        key: 'getQueryFlags',
        value: function getQueryFlags(asObject) {
            var _this3 = this;

            var flags = new Set();
            var queryFlags = this.query.flags || new Set();
            //console.log(JSON.stringify(Array.from(queryFlags)))

            Object.keys(this.flags).forEach(function (f) {
                if (queryFlags.has('@' + f) || (queryFlags.has(f) || _this3.flags[f].defaultValue) && !queryFlags.has('!' + f)) {
                    flags.add(f);
                }
            });

            if (asObject) {
                var flagsObject = {};
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = flags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var f = _step.value;
                        flagsObject[f] = true;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return flagsObject;
            }

            return flags;
        }
    }, {
        key: 'getQueryOptions',
        value: function getQueryOptions() {
            var _this4 = this;

            var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _ref2$allowEmpty = _ref2.allowEmpty;
            var allowEmpty = _ref2$allowEmpty === undefined ? true : _ref2$allowEmpty;
            var _ref2$sanitize = _ref2.sanitize;
            var sanitize = _ref2$sanitize === undefined ? false : _ref2$sanitize;

            var options = {};
            var queryOptions = this.query.options || {};
            Object.keys(this.opts).forEach(function (opt) {
                var value = queryOptions[opt];

                if (!allowEmpty && value === '') {
                    value = null;
                }

                if (value == null) {
                    value = _this4.opts[opt].defaultValue;
                }

                if (sanitize) {
                    var sanitizer = _this4.opts[opt].sanitizer;
                    if (!Array.isArray(sanitizer)) {
                        sanitizer = [sanitizer];
                    }
                    sanitizer.some(function (s) {
                        if (value === s) {
                            return true;
                        }
                        if (typeof s === 'function') {
                            value = s(value);return true;
                        }
                        return false;
                    });
                }

                if (value != null) {
                    options[opt] = value;
                }
            });
            //console.log(JSON.stringify(options))
            return options;
        }
    }, {
        key: 'getQueryNotes',
        value: function getQueryNotes() {
            return (this.query.notes || '').trim();
        }
    }, {
        key: 'setQuery',
        value: function setQuery(qs) {
            var flags = void 0,
                options = void 0,
                notes = void 0;
            if (typeof qs === 'string') {
                var _parseQueryString = this.parseQueryString(qs);

                var _parseQueryString2 = babelHelpers.slicedToArray(_parseQueryString, 3);

                flags = _parseQueryString2[0];
                options = _parseQueryString2[1];
                notes = _parseQueryString2[2];
            } else if (Array.isArray(qs)) {
                var _qs = babelHelpers.slicedToArray(qs, 3);

                flags = _qs[0];
                options = _qs[1];
                notes = _qs[2];
            }
            this.query = { options: options, flags: flags, notes: notes };
        }
    }, {
        key: 'parseQueryString',
        value: function parseQueryString() {
            var _this5 = this;

            var qs = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var delimeter = arguments.length <= 1 || arguments[1] === undefined ? ';' : arguments[1];

            var _qs$trim$split = qs.trim().split(delimeter);

            var _qs$trim$split2 = babelHelpers.toArray(_qs$trim$split);

            var _qs$trim$split2$ = _qs$trim$split2[0];
            var flags = _qs$trim$split2$ === undefined ? '' : _qs$trim$split2$;
            var _qs$trim$split2$2 = _qs$trim$split2[1];
            var options = _qs$trim$split2$2 === undefined ? '' : _qs$trim$split2$2;

            var notes = _qs$trim$split2.slice(2);

            // overrides args


            var overrides = notes.length > 1 ? notes.pop() : '';

            // join notes string
            notes = notes.join(';');

            // parse flags
            var queryFlags = new Set();
            flags = flags.trim().toLowerCase().split(/\s+/);
            var flagsToCatch = new Set(Object.keys(this.flags));

            while (flags.length && flagsToCatch.size) {
                var disable = false;
                var flag = flags.pop();

                // deal with flag prefix: ! - force off, @ - force on
                var prefix = '';

                var _flag$split = flag.split(/^[!@]/);

                var _flag$split2 = babelHelpers.toArray(_flag$split);

                var head = _flag$split2[0];

                var rest = _flag$split2.slice(1);

                if (rest.length) {
                    prefix = flag[0];
                    flag = rest.join('');
                }

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = flagsToCatch[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var f = _step2.value;

                        if (this.flags[f].nameTest(flag)) {
                            queryFlags.add(prefix + f);
                            flagsToCatch.delete(f);
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }

            // parse options
            var queryOptions = {};
            var str = options.trim();
            var lastOption = null,
                lastValues = [];

            while (str.length) {
                var match = /\s*\w+\s*:\s*/.exec(str);

                // no substring was found, reach the end of `options` string
                if (!match) {
                    (function () {
                        var newOptions = {};
                        // reading values for last option
                        if (lastOption) {
                            lastValues.push(str);
                            newOptions[lastOption] = lastValues.join(' ');
                            // do not assign and reset lastOption state, will catch later
                        }
                        // although not followed by ':', it is the ending part of `options` string,
                        // just assign new option properties
                        else {
                                var opts = str.split(/\s+/);
                                opts.forEach(function (opt) {
                                    return newOptions[opt] = '';
                                });
                                lastOption = null;
                                lastValues = [];
                                _this5.assignQueryOptions(newOptions, queryOptions);
                            }
                        str = '';
                    })();
                } else {
                    if (lastOption) {
                        lastValues.push(str.slice(0, match.index).trim());
                        var _newOptions = {};
                        _newOptions[lastOption] = lastValues.join(' ');
                        this.assignQueryOptions(_newOptions, queryOptions);
                        lastValues = [];
                    }

                    lastOption = this.getOptionName(match[0].replace(/[\s:]/g, ''));
                    str = str.slice(match.index + match[0].length);
                }
            }

            // catch un-assigned last option value
            if (lastOption) {
                var _newOptions2 = {};
                _newOptions2[lastOption] = lastValues.join(' ');
                this.assignQueryOptions(_newOptions2, queryOptions);

                // last option should be valid for action
                if (Object.keys(this.opts).indexOf(lastOption) === -1) {
                    lastOption = null;
                }
            }

            // parse overrides
            if (overrides) {
                var _parseQueryString3 = this.parseQueryString(overrides, '|');

                var _parseQueryString4 = babelHelpers.toArray(_parseQueryString3);

                var ovrFlags = _parseQueryString4[0];
                var ovrOptions = _parseQueryString4[1];

                var ovrNotes = _parseQueryString4.slice(2);
                //console.log(JSON.stringify(ovrOptions))


                if (ovrFlags.size) {
                    queryFlags = new Set([].concat(babelHelpers.toConsumableArray(queryFlags), babelHelpers.toConsumableArray(ovrFlags)));
                }
                if (Object.keys(ovrOptions).length) {
                    queryOptions = this.assignQueryOptions(ovrOptions, queryOptions, true);
                    //console.log(JSON.stringify(queryOptions))
                }
                if (ovrNotes.length) {
                    notes = ovrNotes.join(' ');
                }
            }

            return [queryFlags, queryOptions, notes];
        }
    }, {
        key: 'assignQueryOptions',
        value: function assignQueryOptions(props) {
            var _this6 = this;

            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var overwrite = arguments[2];

            Object.keys(props).forEach(function (k) {
                if (_this6.opts.hasOwnProperty(k) && (!options.hasOwnProperty(k) || overwrite)) {
                    options[k] = props[k];
                }
            });
            return options;
        }
    }, {
        key: 'constructQueryString',
        value: function constructQueryString() {
            var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _ref3$flags = _ref3.flags;
            var flags = _ref3$flags === undefined ? [] : _ref3$flags;
            var _ref3$options = _ref3.options;
            var options = _ref3$options === undefined ? {} : _ref3$options;
            var _ref3$notes = _ref3.notes;
            var notes = _ref3$notes === undefined ? '' : _ref3$notes;
            var withActionName = arguments[1];

            flags = new Set(flags);
            if (this.query.flags) {
                flags = new Set([].concat(babelHelpers.toConsumableArray(flags), babelHelpers.toConsumableArray(this.query.flags)));
            }
            flags = Array.from(flags).join(' ');

            options = babelHelpers.extends({}, this.query.options, options);
            options = Object.keys(options).map(function (prop) {
                return prop + ':' + options[prop];
            }).join(' ');

            notes = '' + notes || this.query.notes;

            var qs = [flags, options, notes].join(' ; ');

            if (withActionName) {
                qs = this.name + ' ' + qs;
            }

            return qs;
        }
    }, {
        key: 'previewOptionSelects',
        value: function previewOptionSelects() {
            var types = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
            var preview = arguments[1];
            var options = arguments[2];
            var keys = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
            var data = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];

            var xml = null;
            types = Array.isArray(types) ? types : [types];
            keys = Array.isArray(keys) ? keys : [keys];

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = keys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var k = _step3.value;

                    var v = options[k];
                    if (typeof v === 'string') {
                        preview.addOptionItems(types, this, v, k, data);

                        if (preview.hasError()) {
                            xml = preview.buildXML();
                        } else {
                            var items = preview.get();
                            if (items.length === 0) {
                                var override = preview.getOverride(k);
                                preview.addError(this, {
                                    autocomplete: this.constructQueryString(override),
                                    title: 'No valid option value was found for: ' + v,
                                    subtitle: 'Press ENTER / TAB key to choose from a list.'
                                });
                                xml = preview.buildXML();
                            } else if (items.length === 1 && v !== '') {
                                options[k] = items[0].get('_type').split('_')[1];
                                preview.clear();
                            } else {
                                xml = preview.buildXML();
                            }
                        }
                    }

                    if (xml) {
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return xml;
        }
    }, {
        key: 'previewOptionSelectsError',
        value: function previewOptionSelectsError(err, preview, opt) {
            console.log(err);
            var override = preview.getOverride(opt);
            preview.addError(this, {
                autocomplete: this.constructQueryString(override),
                title: err.message,
                subtitle: 'Press ENTER / TAB key to choose from a list.',
                text_largetype: err.toString()
            });
            return preview.buildXML();
        }
    }]);
    return Action;
}();

var Switcher = function (_Action) {
    babelHelpers.inherits(Switcher, _Action);

    function Switcher() {
        babelHelpers.classCallCheck(this, Switcher);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Switcher).apply(this, arguments));
    }

    babelHelpers.createClass(Switcher, [{
        key: 'preview',
        value: function preview() {
            var _this2 = this;

            var preview = new Preview();
            var options = this.getQueryOptions();

            var _getQueryFlags = this.getQueryFlags(true);

            var clone = _getQueryFlags.clone;
            var dedupe = _getQueryFlags.dedupe;
            var reverse = _getQueryFlags.reverse;


            var xml = this.previewOptionSelects(['browsers'], preview, options, ['from', 'to']);
            if (xml) {
                return xml;
            }

            var fromBrowser = void 0,
                toBrowser = void 0;
            try {
                var _getFromToBrowsers = getFromToBrowsers(options.from, options.to, reverse);

                var _getFromToBrowsers2 = babelHelpers.slicedToArray(_getFromToBrowsers, 2);

                fromBrowser = _getFromToBrowsers2[0];
                toBrowser = _getFromToBrowsers2[1];
            } catch (err) {
                return this.previewOptionSelectsError(err, preview, fromBrowser ? 'to' : 'from');
            }

            var _getAppData = getAppData(fromBrowser, ['tabs']);

            var tabs = _getAppData.tabs;

            if (!tabs || !tabs.length) {
                return this.previewOptionSelectsError('No active tab in ' + fromBrowser, preview, reverse ? 'to' : 'from');
            }

            tabs.forEach(function (_ref) {
                var /*browser, */browserType = _ref.browserType;
                var url = _ref.url;
                var title = _ref.title;
                var index = _ref.index;
                var active = _ref.active;


                var query = _this2.constructQueryString({
                    options: {
                        from: fromBrowser,
                        to: toBrowser,
                        index: index
                    }
                });

                var item = {
                    _type: 'browser_' + browserType,
                    arg: query,
                    //autocomplete: query,
                    title: title,
                    subtitle: url,
                    subtitle_alt: 'Switch all tabs to ' + toBrowser,
                    text_copy: '[' + title + '](' + url + ')',
                    text_largetype: query
                };

                // TODO active / specified given index
                if (active) {
                    item.title = '[ACTIVE] ' + item.title;
                }

                preview.add(item, active ? 0 : 999);
            });

            return preview.buildXML();
        }
    }, {
        key: 'run',
        value: function run() {
            var _getQueryOptions = this.getQueryOptions({ allowEmpty: false, sanitize: true });

            var from = _getQueryOptions.from;
            var to = _getQueryOptions.to;
            var index = _getQueryOptions.index;

            var _getQueryFlags2 = this.getQueryFlags(true);

            var reverse = _getQueryFlags2.reverse;
            var dedupe = _getQueryFlags2.dedupe;
            var clone = _getQueryFlags2.clone;


            var fromBrowser = void 0,
                toBrowser = void 0;

            var _getFromToBrowsers3 = getFromToBrowsers(from, to, reverse);

            var _getFromToBrowsers4 = babelHelpers.slicedToArray(_getFromToBrowsers3, 2);

            fromBrowser = _getFromToBrowsers4[0];
            toBrowser = _getFromToBrowsers4[1];


            if (index === 'all') {
                var _getAppData2 = getAppData(fromBrowser, ['tabs']);

                var tabs = _getAppData2.tabs;

                if (!tabs || !tabs.length) {
                    throw new Error('No tab in front window of ' + fromBrowser + '.');
                }
                var urls = tabs.map(function (tab) {
                    return tab.url;
                });
                openUrls(urls, toBrowser, { noValidation: true });
                if (!clone) {
                    closeTab(fromBrowser, { closeWindow: true });
                }

                return fromBrowser + ' >> ' + toBrowser + ' | ' + urls.length + ' tabs';
            } else {
                var _getAppData3 = getAppData(fromBrowser, ['url', 'title'], { index: index });

                var url = _getAppData3.url;
                var title = _getAppData3.title;

                openUrl(url, toBrowser, { dedupe: dedupe });
                if (!clone) {
                    closeTab(fromBrowser, { index: index });
                }

                return fromBrowser + ' >> ' + toBrowser + ' | ' + title;
            }
        }
    }]);
    return Switcher;
}(Action);

var action = new Switcher({
    name: 'switch',
    title: 'Switch Browser',
    // opt: [ name, description, test, default, required, sanitizer]
    opts: [['from', 'Source browser to switch tab(s) from', 1], ['to', 'Target browser to switch tabs(s) to', 1], ['index', 'Tab index number', 1, null, false, ['all', Number.parseInt]]],
    // flag: [ name, test, default, description]
    flags: [['clone', 'Keep original tab after switch', 1], ['dedupe', 'Deduplicate URL in target browser', 1, true], ['reverse', 'Reverse lookups of source and target browsers', 1]]
});

run(false); // rollupjs build tool hack

//`run` applet
function run() {
    var argv = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    if (argv === false) {
        return;
    }
    return runner(action, argv);
}