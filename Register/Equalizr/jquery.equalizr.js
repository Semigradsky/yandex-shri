// Based on jquery.basic.plugin-boilerplate | jQuery lightweight plugin boilerplate
// https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js
;(function($, undefined) {

    var pluginName = "equalizr",
        defaults = {
            timeout: 5000,
            colWidth: 1,
            bgColor: 'pink',
            topColor: 'red'
        };

    function Plugin(element, options) {
        this.element = $(element);
        this.containerHeight = this.element.height();

        this.options = $.extend({}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    function shuffleHeights(elements, k) {
        elements.each(function() { $(this).css('height', getRandomHeight(k)); });
    }

    function getRandomHeight(k) {
        return Math.round(k * Math.random());
    }

    Plugin.prototype = {

        init: function() {
            this.prepareContainer();
            var cols = this.makeColumns();
            shuffleHeights(cols, this.containerHeight);
            this.runEqualizer(cols, this.options.timeout);
        },

        prepareContainer: function() {
            this.element.css({
                verticalAlign: 'bottom',
                lineHeight: this.element.height() + 'px'
            });
        },

        makeColumns: function() {
            // Кол-во столбиков
            var colQuantity = Math.ceil(this.element.width()/this.options.colWidth),
                cols = new Array(colQuantity),
                colsHtml = '';

            for (var i = 0; i < cols.length; i++) {
                colsHtml += '<span/>';
            }
            this.element.append($(colsHtml));
            return this.element.find('span').css({
                verticalAlign: 'bottom',
                display: 'inline-block',
                fontSize: 0,
                lineHeight: 0,
                width: this.options.colWidth,
                background: this.options.bgColor,
                borderTop: '2px solid ' + this.options.topColor
            });
        },

        runEqualizer: function(cols, timeout) {
            var self = this;

            $.when(
                cols.animate(
                    { height: self.containerHeight/2 },
                    timeout,
                    'linear'
                ).each(function() {
                    $(this).animate(
                        { height: getRandomHeight(self.containerHeight) },
                        timeout,
                        'linear'
                    )
                }).promise()
            ).done(function() {
                self.runEqualizer(cols, timeout);
            });
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery);