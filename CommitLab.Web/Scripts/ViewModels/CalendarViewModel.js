var CalendarViewModel = (function () {
    var currentDate = new Date();
    var oneYearAgoDate = new Date();
    oneYearAgoDate.setFullYear(currentDate.getFullYear() - 1);


    var shape = document.getElementById("svgOne");
    var tooltip = document.getElementById('tooltip');

    function ShowTooltip(evt) {
            var tooltip = document.getElementById('tooltip');
            evt.target.setAttribute('opacity', '0.5');
            tooltip.setAttributeNS(null,"x",evt.clientX-8);
            tooltip.setAttributeNS(null,"y",evt.clientY-5);
            tooltip.setAttributeNS(null, "visibility", "visible");
        }

        function HideTooltip(evt) {
            tooltip.setAttributeNS(null, "visibility", "hidden");
            evt.target.setAttribute('opacity', '1.0');
            }


    function myFunc(evt) {
         window.alert(evt.target.myParam);
        evt.target.setAttribute('opacity', '0.5');
    }

    var svgns = "http://www.w3.org/2000/svg";
    var x = 0;
    while (oneYearAgoDate <= currentDate) {
        var rect = document.createElementNS(svgns, 'rect');
        rect.setAttributeNS(null, 'x', x * 13);
        rect.setAttributeNS(null, 'y', 13 * oneYearAgoDate.getDay() + 20);
        rect.setAttributeNS(null, 'height', '11');
        rect.setAttributeNS(null, 'width', '11');
        rect.setAttributeNS(null, 'fill', '#eeeeee');
      //  rect.setAttributeNS(null, 'data-date', oneYearAgoDate.getFullYear() + "-" + oneYearAgoDate)
        //rect.addEventListener("mouseover",myFunc, false)
        document.getElementById('svgOne').appendChild(rect);
        rect.myParam = oneYearAgoDate.toDateString();
        oneYearAgoDate.setDate(oneYearAgoDate.getDate() + 1);
        //rect.addEventListener('click', myFunc, false);
        rect.addEventListener('mouseover', ShowTooltip, false);
        rect.addEventListener('mouseout', HideTooltip, false);
        rect.addEventListener('click', myFunc, false);
        
        if (oneYearAgoDate.getDay() == 0) {
            ++x;
        }
    }
    for (var i = 0; i < 5; i++) {
        var rect = document.createElementNS(svgns, 'rect');
        rect.setAttributeNS(null, 'x', x * 13 - 13 * i);
        rect.setAttributeNS(null, 'y', 13 * 8 + 20);
        rect.setAttributeNS(null, 'height', '11');
        rect.setAttributeNS(null, 'width', '11');
        rect.setAttributeNS(null, 'fill', '#006600');
        rect.setAttributeNS(null, 'opacity', 1 - 0.2 * i);
        
        document.getElementById('svgOne').appendChild(rect);
    }



    return CalendarViewModel;
})();