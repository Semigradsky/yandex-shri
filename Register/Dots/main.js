(function() {

    init();

    var DEFAULT_CHANGE_COLOR_DURATION = 2000,
        MOTION_DURATION = 1000,
        CIRCLE_DIAMETER = 20;

    var circles = d3.selectAll('div');

    circles.each(function() {
        var circle = d3.select(this);
        animateMotion(circle);
        animateChangeColor(circle);
    });

    function animateMotion(circle) {
        var newLeftPos = document.body.clientWidth * Math.random() - CIRCLE_DIAMETER,
            newTopPos = document.body.clientHeight * Math.random() - CIRCLE_DIAMETER;
        newLeftPos = newLeftPos < 0 ? 0 : newLeftPos;
        newTopPos = newTopPos < 0 ? 0 : newTopPos;
        circle
            .transition()
            .duration(MOTION_DURATION)
            .ease('linear')
            .style('left', newLeftPos + 'px')
            .style('top', newTopPos + 'px');
        setTimeout(function() { animateMotion(circle); }, MOTION_DURATION);
    }

    function animateChangeColor(circle) {
        var duration = DEFAULT_CHANGE_COLOR_DURATION * Math.random();
        circle
            .transition()
            .duration(duration)
            .ease('elastic')
            .style('border-color', 'rgb(255, ' + Math.ceil(Math.random() * 255) + ', 0)');
        setTimeout(function() { animateChangeColor(circle); }, duration);
    }

    function init() {
        createCircles(100);

        function createCircles(count) {
            for (var i = count; i--;) {
                var circle = document.createElement('div');
                document.body.appendChild(circle);
            }
        }
    }

})();
