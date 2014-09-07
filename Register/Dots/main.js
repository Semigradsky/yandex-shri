(function() {

    var COUNT_CIRCLES = 20, // count
        DEFAULT_CHANGE_COLOR_DURATION = 2000, // ms
        MOTION_DURATION = 100, // ms
        MOTION_DISTANCE = 20, // px
        CIRCLE_DIAMETER = 20; // px
    
    var minLeftPos = 0,
        maxLeftPos = document.body.clientWidth - CIRCLE_DIAMETER,
        minTopPos = 0,
        maxTopPos = document.body.clientHeight - CIRCLE_DIAMETER;

    var body = d3.select('body'),
        data = generateData(),
        circles = body.selectAll('div').data(data).enter().append('div');
    applyData(circles);
    
    circles.each(function() {
        var circle = d3.select(this);
        animateMotion(circle);
        animateChangeColor(circle);
    });

    function animateMotion(circle) {
        var newData = generateNewData(circle.data()[0]);
        circle.datum(newData);

        var motionCircle = circle
            .transition()
            .duration(MOTION_DURATION)
            .ease('linear');
        applyData(motionCircle);
        setTimeout(function() { animateMotion(circle); }, MOTION_DURATION);
    }
    
    function generateNewData(oldData) {
        var cos = Math.random() * (Math.random() > 0.5 ? 1 : -1),
            sin = Math.sqrt(1 - cos*cos) * (Math.random() > 0.5 ? 1 : -1),
            newLeftPos = Math.round(oldData.x + MOTION_DISTANCE * cos),
            newTopPos = Math.round(oldData.y + MOTION_DISTANCE * sin);
        
        newLeftPos = Math.max(minLeftPos, Math.min(maxLeftPos, newLeftPos));
        newTopPos = Math.max(minTopPos, Math.min(maxTopPos, newTopPos));
        
        return {
            x: newLeftPos,
            y: newTopPos
        };
    }
    
    function applyData(el) {
        el.style('left', function(data) {
            return data.x + 'px';
        })
        .style('top', function(data) {
            return data.y + 'px';
        });
        return el;
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
    
    function generateData() {
        var data = [];
        for (var i = COUNT_CIRCLES; i--;) {
            data.push({
                x: random(minLeftPos, maxLeftPos),
                y: random(minTopPos, maxTopPos)
            });
        }
        return data;
    }
    
    function random(lower, upper) {
        return Math.round(Math.random() * (upper - lower)) + lower;
    }

})();
