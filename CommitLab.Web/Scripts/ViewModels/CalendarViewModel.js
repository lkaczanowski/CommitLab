//date format: RRRR-MM-DD"T"HH-MM
display = {}

function getUnixTimestamp() {

}

var CalendarViewModel = (function () {

    function CalendarViewModel(changesetFilter) {
        var _this = this;
        this.Filter = changesetFilter;
        this.Changesets = ko.observableArray([]);

        this.getChangesets = function () {
            var model = ko.toJSON(_this.Filter);
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/api/changeset',
                data: model
            }).done(function (data) {
                _this.Changesets(data);
                for (var i = 0; i < data.length; i++) {
                    //to move
                    var year = data[i].timestamp[0] + data[i].timestamp[1] + data[i].timestamp[2] + data[i].timestamp[3];
                    var month = data[i].timestamp[5] + data[i].timestamp[6];
                    var day = data[i].timestamp[8] + data[i].timestamp[9];
                    var hour = data[i].timestamp[11] + data[i].timestamp[12];
                    var min = data[i].timestamp[14] + data[i].timestamp[15];
                    var inputDate = year + "-" + month + "-" + day + " " + hour + ":" + min;
                    var d = Date.parse(inputDate) / 1000;
                    display[d] = 1;
                }
                show();
            });
        };
    }

    return CalendarViewModel;
})();