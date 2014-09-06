(function() {

    var COUNT_CIRCLES = 30,
        DEFAULT_CHANGE_COLOR_DURATION = 2000,
        MOTION_DURATION = 1000,
        MOTION_DISTANCE = 100,
        CIRCLE_DIAMETER = 20;

    init();
    
    var circles = d3.selectAll('div'),
        minLeftPos = 0,
        maxLeftPos = document.body.clientWidth - CIRCLE_DIAMETER,
        minTopPos = 0,
        maxTopPos = document.body.clientHeight - CIRCLE_DIAMETER;
    
    circles.each(function() {
        var circle = d3.select(this);
        animateMotion(circle);
        animateChangeColor(circle);
    });

    function animateMotion(circle) {
        var cos = Math.random() * (Math.random() > 0.5 ? 1 : -1),
            sin = Math.sqrt(1 - cos*cos) * (Math.random() > 0.5 ? 1 : -1),
            newLeftPos = parseInt(circle.style('left')) + MOTION_DISTANCE * cos,
            newTopPos = parseInt(circle.style('top')) + MOTION_DISTANCE * sin;
        
        newLeftPos = Math.max(minLeftPos, Math.min(maxLeftPos, newLeftPos));
        newTopPos = Math.max(minTopPos, Math.min(maxTopPos, newTopPos));

        circle
            .transition()
            .duration(MOTION_DURATION)
            .ease('linear')
            .style('left', newLeftPos + 'px')
            .style('top', newTopPos + 'px');
        setTimeout(function() { animateMotion(circle); }, MOTION_DURATION);
    }

    function animateChangeColor(circle) {
        var duration = DEFAULT_CHANGE_COLOR_DURATION * Math.random(),
            newColor = circle.style('border-color') === 'rgb(255, 0, 0)' ? 'rgb(255, 255, 0)' : 'rgb(255, 0, 0)';
        
        circle
            .transition()
            .duration(duration)
            .ease('linear')
            .style('border-color', newColor);
        setTimeout(function() { animateChangeColor(circle); }, duration);
    }

    function init() {
        createCircles(COUNT_CIRCLES);

        function createCircles(count) {
            for (var i = count; i--;) {
                var circle = document.createElement('div');
                document.body.appendChild(circle);
            }
        }
    }

})();
