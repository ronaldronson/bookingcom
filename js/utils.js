;/*jslint browser: true, devel: true, eqeq: true, nomen: true, plusplus: true, regexp: true*/
(function ($, w, undefined) {
    "use strict";

    var filters;

    /**
     * Create jQuery plugin
     *
     * @param name string name of plugin
     * @param defaults object default options
     * @param proto object plugin prototype
     * @returns {Plugin}
     */
    function createPlugin(name, defaults, proto) {

        var params = defaults, prototype = proto;

        if (2 == arguments.length) {
            prototype = defaults;
            params = {};
        }

        if ("function" == typeof proto) {
            prototype = {init: proto};
        }

        function Plugin(element, options) {
            this.$el = $(element);
            this._name = name;
            this._defaults = params;
            this.settings = $.extend({}, params, options);

            if ("function" == typeof this.init) {
                this.init();
            }
        }

        prototype.constructor = prototype.constructor || Plugin;
        Plugin.prototype = prototype;

        $.fn[name] = function (options) {
            return this.each(function () {
                if (!$.data(this, "plugin_" + name)) {
                    $.data(this, "plugin_" + name, new Plugin(this, options));
                }
            });
        };

        return Plugin;
    }

    filters = {
        /**
         * Get input value from cell
         *
         * @param el
         * @returns {string}
         */
        'input': function (el) {
            return el.addBack().find(':input').val();
        },

        /**
         * Get number value from cell
         *
         * @param el
         * @returns {number}
         */
        'number': function (el) {
            return +el.text().replace(/[^0-9\.]/g, '');
        },

        /**
         * By default simply return string
         *
         * @param el
         * @returns {string}
         */
        'text': function (el) {
            return el.text();
        }
    };

    /**
     * Simple templater
     *
     * @param tpl string
     * @param opt object
     * @returns {Object}
     */
    function template(tpl, opt) {
        return Object.keys(opt).reduce(function (str, name) {
            return str.replace(new RegExp('{{' + name + '}}', 'g'), opt[name]);
        }, tpl);
    }

    /**
     * Create namespace for object
     *
     * @param names
     * @param root
     * @returns {Object}
     */
    function namespace(names, root) {
        return names.split('.').reduce(function (pre, cur) {
            return pre[cur] = pre[cur] || {};
        }, root || window);
    }

    w.utils = {
        filters: filters,
        template: template,
        namespace: namespace,
        createPlugin: createPlugin
    };

}(this.jQuery, this));