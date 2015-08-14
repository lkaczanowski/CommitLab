//date format: RRRR-MM-DD"T"HH-MM
display = {}  //json format data unixtime : 1
var _data; //all data, commits, dates, branches, repositories ... not need probably ()
var uniqueDates = []
var unixtimestamp = [] //sorted dates unix time format

var repoDateMap = [];

function getDate(value)  //FORMAT: MONTH DD, YYYY
{
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
  var string = months[value.getMonth()] + " " + value.getDate() + ", " + value.getFullYear()
  return string;;
}

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
      var string = getDate(date1) + " - " + getDate(date2);
      return string;
    }

    function compare(a, b) {
      if (a.time < b.time)
        return -1;
      if (a.time > b.time)
        return 1;
      return 0;
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

        for (var i = 0; i < data.length; i++) {
          var d = getUnixTimestamp(data[i]);
          repoDateMap.push({ repo: data[i].repositoryName, time: d });
        }
        repoDateMap.sort(compare);
        for (var i = 0; i < repoDateMap.length; i++) {
          repoDateMap[i].time = new Date(repoDateMap[i].time * 1000);
        }
        updateCommits();
        unixtimestamp.sort();

        uniqueDates.push(repoDateMap[0].time);
        for (var i = 1; i < repoDateMap.length; i++) {
          if (repoDateMap[i - 1].time.getFullYear() === repoDateMap[i].time.getFullYear()
            && repoDateMap[i - 1].time.getMonth() === repoDateMap[i].time.getMonth()
            && repoDateMap[i - 1].time.getDate() === repoDateMap[i].time.getDate()) {
            continue;
          } else {
            uniqueDates.push(repoDateMap[i].time);
          }
        }
        var now = new Date();
        var yearAgo = new Date();
        now.setDate(now.getDate() - 1);
        yearAgo.setFullYear(now.getFullYear() - 1);
        yearAgo.setDate(now.getDate());
        _this.periodLastYear(getPeriodString(yearAgo, now));
        _this.commitsLastYear(data.length + " total");

        var dat = new Date();
        dat.setDate(dat.getDate() - 1);
        var from = new Date();
        //from.setDate(from.getDate() - 1);
        var to = new Date();
        to.setDate(to.getDate() - 1);
        var streak = 0;


        for (var i = uniqueDates.length - 1; i >= 0; i--) {
          if (dat.getFullYear() == uniqueDates[i].getFullYear()
            && dat.getMonth() == uniqueDates[i].getMonth()
            && dat.getDay() == uniqueDates[i].getDay()) {
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
          _this.currentStreak(streak + " days");
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
          if (dat.getFullYear() == uniqueDates[i].getFullYear()
            && dat.getMonth() == uniqueDates[i].getMonth()
            && dat.getDay() == uniqueDates[i].getDay()) {
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
        _this.longestStreak(bestStreak + " days");
        _this.longestStreakPeriod(getPeriodString(fromBest, toBest));
      });
    };
  }

  return CalendarViewModel;
})();
