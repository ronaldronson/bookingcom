;// you can enter your JS here!
/*jslint browser: true, devel: true, eqeq: true, nomen: true, plusplus: true, regexp: true*/
(function ($, w, utils, undefined) {
    "use strict";

    /**
     * DOM ready handler
     */
    $(function () {
        var $table = $('.rooms_table'),
            $reviews = $('.reviews_list'),
            page = utils.namespace('controllers.hotelpage');

        $table.sorTable(); // init sorter
        $reviews.paginator(); // init paginator
        page.changeTotal($table, $('.total_price', $table)); // init change total observer
    });
}(this.jQuery, this, this.utils));