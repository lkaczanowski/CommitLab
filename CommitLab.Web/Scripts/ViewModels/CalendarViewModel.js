//date format: RRRR-MM-DD"T"HH-MM
display = {}  //json format data
var _data; //all data, commits, dates, branches, repositories ... not need probably ()
var dates = [] //sorted dates
var uniqueDates = []
var unixtimestamp = [] //sorted dates unix time format
var CalendarViewModel = (function () {
    function CalendarViewModel(changesetFilter) {
        var _this = this;
        this.Filter = changesetFilter;
        this.Changesets = ko.observableArray([]);

        this.commitsLastYear = ko.observable('');
        this.periodLastYear = ko.observable('');

        this.longestStreak = ko.observable('');
        this.longestStreakPeriod = ko.observable('');

        this.currentStreak = ko.observable('');
        this.currentStreakPeriod = ko.observable('');


        function getUnixTimestamp(value) {
            var year = value.timestamp[0] + value.timestamp[1] + value.timestamp[2] + value.timestamp[3];
            var month = value.timestamp[5] + value.timestamp[6];
            var day = value.timestamp[8] + value.timestamp[9];
            var hour = value.timestamp[11] + value.timestamp[12];
            var min = value.timestamp[14] + value.timestamp[15];
            var inputDate = year + "-" + month + "-" + day + " " + hour + ":" + min;
            var d = Date.parse(inputDate) / 1000;
            return d;
        }

        function getPeriodString(date1, date2) {
            var months = [];
            months.push("January");
            months.push("February");
            months.push("March");
            months.push("April");
            months.push("May");
            months.push("June");
            months.push("July");
            months.push("August");
            months.push("September");
            months.push("October");
            months.push("November");
            months.push("December");
            var string = months[date1.getMonth()] + " " + date1.getDate() + ", " + date1.getFullYear() + " - " + months[date2.getMonth()] + " " + date2.getDate() + ", " + date2.getFullYear();
            return string;
        }


        this.getChangesets = function () {
            var model = ko.toJSON(_this.Filter);
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/api/changeset',
                data: model
            }).done(function (data) {
                _this.Changesets(data);
                _data = data;

                for (var i = 0; i < data.length; i++) {
                    var d = getUnixTimestamp(data[i]);
                    unixtimestamp.push(d);
                    display[d] = 1;
                }
                show();
                unixtimestamp.sort();
                for (var i = 0 ; i < unixtimestamp.length; i++) {
                    dates.push(new Date(unixtimestamp[i] * 1000));
                }

                uniqueDates.push(dates[0]);
                for (var i = 1; i < dates.length; i++) {
                    if (dates[i - 1].getFullYear() === dates[i].getFullYear() && dates[i - 1].getMonth() === dates[i].getMonth() && dates[i - 1].getDate() === dates[i].getDate()) {
                        continue;
                    } else {
                        uniqueDates.push(dates[i]);
                    }
                }
                var now = new Date();
                var yearAgo = new Date();
                now.setDate(now.getDate() - 1);
                yearAgo.setFullYear(now.getFullYear() - 1);
                yearAgo.setDate(now.getDate());
                _this.periodLastYear(getPeriodString(yearAgo, now));
                _this.commitsLastYear(data.length);

                var dat = new Date();
                dat.setDate(dat.getDate() - 1);
                var from = new Date();
                from.setDate(from.getDate() - 1);
                var to = new Date();
                to.setDate(to.getDate() - 1);
                var streak = 0;


                for (var i = uniqueDates.length - 1; i >= 0; i--) {
                    if (dat.getFullYear() == uniqueDates[i].getFullYear() && dat.getMonth() == uniqueDates[i].getMonth() && dat.getDay() == uniqueDates[i].getDay()) {
                        streak++;
                        dat.setDate(dat.getDate() - 1);
                        from.setDate(from.getDate() - 1);
                    } else {
                        break;
                    }
                }

                if (streak === 0) {
                    var d = uniqueDates[uniqueDates.length - 1];
                    var now = new Date();
                    var diff = Math.floor((now - d) / 86400000);
                    _this.currentStreak("0 days");
                    _this.currentStreakPeriod("Last contributed " + diff + " days ago");
                } else {
                    _this.currentStreak(streak);
                    _this.currentStreakPeriod(getPeriodString(from, to));
                }


                var dat = new Date();
                dat.setDate(dat.getDate() - 1);
                var from = new Date();
                from.setDate(from.getDate() - 1);
                var to = new Date();
                to.setDate(to.getDate() - 1);
                var fromBest = new Date();
                fromBest.setDate(fromBest.getDate() - 1);
                var toBest = new Date();
                toBest.setDate(toBest.getDate() - 1);

                var streak = 0;
                var bestStreak = 0;
                var isToSet = 0;

                for (var i = uniqueDates.length - 1; i >= 0; i--) {
                    if (dat.getFullYear() == uniqueDates[i].getFullYear() && dat.getMonth() == uniqueDates[i].getMonth() && dat.getDay() == uniqueDates[i].getDay()) {
                        streak++;
                        if (isToSet === 0) {
                            to.setDate(dat.getDate());
                            to.setMonth(dat.getMonth());
                            to.setFullYear(dat.getFullYear());
                            isToSet = 1;
                        }
                        dat.setDate(dat.getDate() - 1);
                    } else {
                        from.setDate(dat.getDate() + 1);
                        from.setMonth(dat.getMonth());
                        from.setFullYear(dat.getFullYear());

                        if (streak > bestStreak) {
                            bestStreak = streak;
                            fromBest.setDate(from.getDate());
                            fromBest.setMonth(from.getMonth());
                            fromBest.setFullYear(from.getFullYear());
                            toBest.setDate(to.getDate());
                            toBest.setMonth(to.getMonth());
                            toBest.setFullYear(to.getFullYear());
                        }
                        streak = 0;
                        isToSet = 0;
                        ++i;
                        dat.setDate(dat.getDate() - 1);
                    }
                }
                _this.longestStreak(bestStreak);
                _this.longestStreakPeriod(getPeriodString(fromBest, toBest));
            });
        };
    }

    return CalendarViewModel;
})();
