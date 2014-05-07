;/*jslint browser: true, devel: true, eqeq: true, nomen: true, plusplus: true, regexp: true*/
(function ($, w, utils, undefined) {
    "use strict";

    var page = utils.namespace('controllers.hotelpage');

    /**
     * Price class
     *
     * @param el jQuery object
     * @constructor
     */
    function PriceText(el) {
        this.$el = el;
        this.text = el.closest('.one_room').find('.room_price').text();

        /**
         * Get price from string
         *
         * @returns {string}
         */
        this.getPrice = function () {
            return this.text.replace(/[^0-9\.]/g, '');
        };

        /**
         * Get currency format from sting
         *
         * @returns {string}
         */
        this.getCurrency = function () {
            return this.text.replace(/\d.+/g, '');
        };
    }

    page.changeTotal = function ($table, $cell) {
        $table.on('change', '.room_quantity select', function () {
            var $this = $(this), price = new PriceText($this);
            $cell.text(price.getCurrency() + (+$this.val() * price.getPrice()).toFixed(2));
        });
    };
}(this.jQuery, this, this.utils));