;/*jslint browser: true, devel: true, eqeq: true, nomen: true, plusplus: true, regexp: true*/
(function ($, w, utils, undefined) {
    "use strict";

    /**
     * Paginator plugin
     *
     * @type {*}
     */
    var Paginator = w.utils.createPlugin('paginator', {
        elemsOnPage: 5,
        currentButton: 1,
        sorterTitle: {
            asc: 'Best first',
            desc: 'Worst last'
        },
        sortSelector: {
            review: '.review_score'
        },
        classes: {
            current: 'current',
            sorter: 'sort-header',
            sorter_title: 'sort-title',
            items: 'reviews_list',
            buttons: 'cm_pagination_wrp',
            button: 'cm_pagination_item'
        },
        childSelector: '.one_review',
        mainWrpTpl: '<div class="paginator_wrp"><h3 class="{{sorter}}">Order Reviews By:<span class="{{sorter_title}}">' +
            'Date</span></h3><ul class="{{items}}"></ul><ul class="{{buttons}}"></ul></div>',
        btnTpl: '<li class="cm_pagination_item"><a href="#" data-value="{{number}}" class="sr_pagination_link">{{number}}</a></li>'
    }, {
        /**
         *  Init plugin
         */
        init: function () {
            var opts = this.settings,
                $main = $(utils.template(opts.mainWrpTpl, opts.classes));

            this.getItems();

            this.$el.replaceWith($main);
            this.$el = $main.find('.' + opts.classes.items);

            this.createButtons($main);
            this.setEventHandlers($main);
            this.setCurrent(opts.currentButton);
        },
        /**
         * Get items to sort, from any places
         */
        getItems: function () {
            this.items = this.$el.children(this.settings.childSelector).clone().toArray();
        },
        /**
         * Create paginator buttons
         *
         * @param $main jQuery object
         */
        createButtons: function ($main) {
            var opt = this.settings, template = '', i,
                num = Math.ceil(this.items.length / +opt.elemsOnPage);

            for (i = 1; i <= num; i++) {
                template += utils.template(opt.btnTpl, {number: i});
            }

            this.$buttons = $main.find('.' + opt.classes.buttons).html(template).children();
        },
        /**
         * Set all event handlers
         *
         * @param $main jQuery object
         */
        setEventHandlers: function ($main) {
            var self = this, opts = this.settings, order = false,
                title = $main.find('.' + opts.classes.sorter_title);

            $main
                .on('click', '.' + opts.classes.button, function (e) {
                    var $el = $(this);
                    e.preventDefault();
                    self.setCurrent($el.find('a').data('value'), $el);
                })
                .on('click', '.' + opts.classes.sorter, function (e) {
                    order = !order;
                    title.text(opts.sorterTitle[order ? 'asc' : 'desc']);

                    self.sortItems(order);
                    self.setCurrent();
                });
        },
        /**
         * Sort items by any param
         *
         * @param order bool
         */
        sortItems: function (order) {
            var selector = this.settings.sortSelector.review;

            function getValue(val) {
                return +$(val).find(selector).text();
            }

            this.items.sort(function (pre, cur) {
                var res = getValue(pre) < getValue(cur) ? 1 : -1;
                return order ? res : -res;
            });
        },
        /**
         * Set current page
         *
         * @param i number
         * @param el jQuery object
         */
        setCurrent: function (i, el) {
            var opt = this.settings, clName = opt.classes.current, $el, start;

            this.current = +i || this.current;
            $el = el || this.$buttons.eq(this.current - 1);

            this.$buttons.removeClass(clName);
            $el.addClass(clName);

            start = (this.current - 1) * +opt.elemsOnPage;
            this.$el.empty().append(this.items.slice(start, start + (+opt.elemsOnPage)));
        }
    });
}(this.jQuery, this, this.utils));
