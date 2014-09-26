(function() {

    var COUNT_CIRCLES = 40, // count
        DEFAULT_CHANGE_COLOR_DURATION = 2000, // ms
        MOTION_DURATION = 400, // ms
        MOTION_DISTANCE = 60, // px
        CIRCLE_DIAMETER = 40; // px
    
    var minLeftPos = 0,
        maxLeftPos = document.body.clientWidth - CIRCLE_DIAMETER,
        minTopPos = 0,
        maxTopPos = document.body.clientHeight - CIRCLE_DIAMETER;

    var body = d3.select('body'),
        data = generateStartData(),
        circles = body.selectAll('div').data(data).enter().append('div'),
        circlesColors = circles.append('span'),
        mouseCoordinates = [0, 0];

    body.on("mousemove", function() {
        mouseCoordinates = d3.mouse(this);
    });

    circles.on("mousemove", function() {
        var circle = d3.select(this),
            data = circle.data()[0];

        circle.datum(generateNewData(data));
        applyData(circle.transition());
    });

    applyData(circles);
    
    circles.each(function() {
        var circle = d3.select(this);
        animateMotion(circle);
    });
    circlesColors.each(function() {
        var circle = d3.select(this);
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
            id: oldData.id,
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
            newColor = Math.random() > 0.5 ? 'yellow' : 'red';

        circle
            .transition()
            .duration(duration)
            .style('border-color', newColor);

        setTimeout(function() { animateChangeColor(circle); }, duration);
    }
    
    function generateStartData() {
        var data = [];
        for (var i = COUNT_CIRCLES; i--;) {
            data.push({
                id: 'id_' + i,
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
