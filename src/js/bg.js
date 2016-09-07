var bokeh = (function() { //background effect
    var _bg = document.querySelector('.background');
    return {
        //----------------------------------------------------------
        clear: function() {
            _bg.innerHTML = '';
        },

        //----------------------------------------------------------
        refresh: function() {
            _bg.style.opacity = 0;
            setTimeout(function() {
                bokeh.fill(20, 20);
            }, 700);
        },

        //----------------------------------------------------------
        fill: function(count1, count2) {
            this.clear();
            _bg.bgWidth = _bg.offsetWidth;
            _bg.bgHeight = _bg.offsetHeight;
            var i, circle = '',
                radius, x, y, alpha, count = parseInt(Math.random() * count1 + count2);
            for (i = 0; i < count; i++) {
                radius = parseInt(100 * Math.random() + 60);
                y = parseInt((_bg.bgHeight - radius) * Math.random());
                x = parseInt((_bg.bgWidth - radius) * Math.random());
                alpha = Math.random() * .75;
                circle += '<div class="bokeh-circle" style="width: ' + radius +
                    'px;height: ' + radius +
                    'px;top: ' + y +
                    'px;left: ' + x +
                    'px; opacity: ' + alpha +
                    ';"></div>';
                _bg.innerHTML = circle;
            }
            _bg.style.opacity = 1;
        },

        //----------------------------------------------------------
        show: (function() {
                if (check.isMobile()) {
                    this.clear();
                } else {
                    this.fill(20, 20);
                    var timerId = false;
                    var self = this;
                    window.onresize = function() {
                        clearTimeout(timerId);
                        timerId = setTimeout(function() {
                            self.refresh();
                        }, 1000)
                    };
                }
            })
            //----------------------------------------------------------
    }
}());