/**
 * 工具集
 */
var Utils = {
    // 注册事件监听器（惰性模式）
    addEvent: function (dom, type, fn) {
        if (dom.addEventListener) {
            Utils.addEvent = function (dom, type, fn) {
                dom.addEventListener(type, function (e) {
                    fn.call(dom, e);
                }, false);
            }
        } else if (dom.attachEvent) {
            Utils.addEvent = function (dom, type, fn) {
                dom.attachEvent('on' + type, function (e) {
                    fn.call(dom, e);
                });
            }
        } else {
            Utils.addEvent = function (dom, type, fn) {
                dom['on' + type] = function (e) {
                    fn.call(dom, e);
                };
            }
        }
        Utils.addEvent(dom, type, fn);
    },
    // 获取可视区域高度
    getClientHeight: function () {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        } else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    },
    // 获取页面高度
    getScrollTop: function () {
        var scrollTop = 0;
        scrollTop = (document.body.scrollTop > document.documentElement.scrollTop) ? document.body.scrollTop : document.documentElement.scrollTop;
        return scrollTop;
    },
    // 检测当前浏览器
    browserSupport: function () {
        var browser = this.getBrowser(),
            temp = browser.split(' '),
            appname = temp[0],
            version = temp[1];
        if (['msie', 'firefox', 'opera', 'safari', 'chrome'].contains(appname)) {
            if (appname == 'msie' && version < 10) {
                alert('请使用IE10及以上浏览器访问此页面！');
            }
        } else {
            // Do Nothing
        }
    },
    // 获取浏览器信息
    getBrowser: function () {
        var browser = {
            msie: false,
            firefox: false,
            opera: false,
            safari: false,
            chrome: false,
            netscape: false,
            appname: 'unknown',
            version: 0
        }, ua = window.navigator.userAgent.toLowerCase();
        if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(ua)) {
            browser[RegExp.$1] = true;
            browser.appname = RegExp.$1;
            browser.version = RegExp.$2;
        } else if (/version\D+(\d[\d.]*).*safari/.test(ua)) { // safari
            browser.safari = true;
            browser.appname = 'safari';
            browser.version = RegExp.$2;
        }
        return browser.appname + ' ' + browser.version;
    },
    // 格式化字符串
    formatString: function (str, data) {
        return str.replace(/\{#(\w+)#\}/g, function (match, key) {
            return typeof data[key] === undefined ? '' : data[key];
        });
    },
    // 表单转JSON对象
    serializeObject: function (form) {
        var o = {};
        $.each($(form).serializeArray(), function (index) {
            if (o[this['name']]) {
                o[this['name']] = o[this['name']] + "," + this['value'];
            } else {
                o[this['name']] = this['value'];
            }
        });
        return o;
    }
}

/**
 * LocalStorage数据访问类
 * @param {string} prefix Key前缀
 * @param {string} timeSplit 时间戳与存储数据之间的分割符
 */
var Dao = function (prefix, timeSplit) {
    this.prefix = prefix;
    this.timeSplit = timeSplit || '|-|';
}
Dao.prototype = {
    // 操作状态
    status: {
        SUCCESS: 0,     // 成功
        FAILURE: 1,     // 失败
        OVERFLOW: 2,    // 溢出
        TIMEOUT: 3      // 过期
    },
    // 本地存储
    storage: localStorage || window.localStorage,
    // 获取带前缀的Key
    getKey: function (key) {
        return this.prefix + key;
    },
    /**
    * 添加（修改）数据
    * @param key 数据字段标识
    * @param value 数据值
    * @param callback 回调函数
    * @param time 过期时间
    */
    set: function (key, value, callback, time) {
        // 默认为成功状态
        var status = this.status.SUCCESS,
            key = this.getKey(key);
        try {
            // 获取过期时间戳
            time = new Date(time).getTime() || time.getTime();
        } catch (e) {
            // 未设置过期时间时默认为一个月
            time = new Date().getTime() + 1000 * 60 * 60 * 24 * 30;
        }
        try {
            // 向本地存储中添加（修改）数据
            this.storage.setItem(key, time + this.timeSplit + value);
        } catch (e) {
            // 发生溢出
            status = this.status.OVERFLOW;
        }
        // 执行回调并传入参数
        callback && callback.call(this, status, key, value);
    },
    /**
    * 获取数据
    * @param key 数据字段标识
    * @param callback 回调函数
    */
    get: function (key, callback) {
        var key = this.getKey(key),
            // 获取数据结果
            result = {
                // 默认为成功状态
                status: this.status.SUCCESS,
                value: null
            };

        try {
            // 从本地存储获取数据
            result.value = this.storage.getItem(key);
        } catch (e) {
            // 获取数据失败
            resutl.status = this.status.FAILURE;
            resutl.value = null;
            // 执行回调并返回结果
            callback && callback.call(this, resutl.status, resutl.value);
            return result;
        }

        // 如果成功获取数据
        if (result.value) {
            var index = result.value.indexOf(this.timeSplit),
                timeSplitLen = this.timeSplit.length,
                // 获取时间戳
                time = parseInt(result.value.slice(0, index));
            // 如果数据未过期
            if (new Date(time).getTime() > new Date().getTime() || time == 0) {
                // 获取数据值
                result.value = result.value.slice(index + timeSplitLen);
            } else {
                // 数据已过期，删除数据
                result.value = null;
                result.status = this.status.TIMEOUT;
                this.remove(key);
            }
        } else {
            // 获取数据失败
            result.status = this.status.FAILURE;
        }
        // 执行回调并返回结果
        callback && callback.call(this, result.status, result.value);
        return result;
    },
    /**
    * 删除数据
    * @param key 数据字段标识
    * @param callback 回调函数
    */
    remove: function (key, callback) {
        // 设置默认状态为失败
        var status = this.status.FAILURE,
            key = this.getKey(key),
            value = null;
        try {
            // 获取数据值
            value = this.storage.getItem(key);
        } catch (e) {
            // 数据不存在，不采取操作
        }
        // 如果数据存在
        if (value) {
            try {
                // 删除数据并更改为成功状态
                this.storage.removeItem(key);
                status = this.status.SUCCESS;
            } catch (e) {
                // 数据删除失败，不采取操作
            }
        }
        // 执行回调并传入参数，删除成功则传入被删除的数据值
        callback && callback.call(this, status, status > 0 ? null : value.slice(value.indexOf(this.timeSplit) + this.timeSplit.length));
    }
}

// 数据访问工厂
var DaoFactory = (function(){
    // 数据访问对象缓存
    var daoCache = {};

    return {
        // 获取数据访问对象
        getDao: function(prefix){
            daoCache[prefix] || (daoCache[prefix] = new Dao(prefix));
            return daoCache[prefix];
        },
        // 获取数据
        get: function(prefix, key, callback){
            return this.getDao(prefix).get(key, callback);
        },
        // 删除数据
        remove: function(prefix, key, callback){
            return this.getDao(prefix).remove(key, callback);
        },
        // 添加（修改）数据
        set: function(prefix, key, value, callback, time){
            return this.getDao(prefix).set(key, value, callback, time);
        }
    }
})();