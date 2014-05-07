;/*jslint browser: true, devel: true, eqeq: true, nomen: true, plusplus: true, regexp: true*/
(function ($, w, utils, undefined) {
    "use strict";

    /**
     * Create SorTable Plugin for adding sorting functionality to table
     *
     * @type {*}
     */
    var sorTable = w.utils.createPlugin('sorTable', {
        sortCell: 'td',
        sortContainer: 'tbody',
        sortFieldsEvent: 'click',
        sortableFields: 'thead th',
        sortableColumns: 'tbody tr'
    }, {
        /**
         * Init plugin params
         */
        init: function () {
            this.$cnt = this.$el.find(this.settings.sortContainer);

            this.$el
                .addClass('sortable')
                .find(this.settings.sortableFields)
                .filter(function () {
                    var data = $.data(this, 'sorTable');
                    return data ? !data.nonsortable : true;
                })
                .on(this.settings.sortFieldsEvent, {context: this}, this.onSortFieldsEvent);
        },

        /**
         * On sort handler
         *
         * @param e event
         */
        onSortFieldsEvent: function (e) {
            var el = $(this), i = el.index(), _this = e.data.context, elData = el.data(),
                clones = _this.$cnt.children(_this.settings.sortableColumns).toArray();

            /**
             * Get proper value for sorting
             *
             * @param el DOM object
             * @returns {*}
             */
            function getValue(el) {
                var val = $(el).find(_this.settings.sortCell).eq(i), filter = utils.filters[elData.filter];
                return filter ? filter(val) : $.trim(val.text());
            }

            elData.order = !elData.order;
            el.removeClass('asc desc').addClass(elData.order ? 'asc' : 'desc');
            el.siblings().removeClass('asc desc');

            _this.$cnt.append(clones.sort(function (pre, cur) {
                var res = getValue(pre) < getValue(cur) ? 1 : -1;
                return elData.order ? res : -res;
            }));
        }
    });
}(this.jQuery, this, this.utils));