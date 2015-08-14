var CommitsViewModel = (function () {
  function CommitsViewModel() {
    var _this = this;
    var period = 8; //only for options last week, last month etc
    this.noActivity = ko.observable('');
    this.periodInfo = ko.observable("Period: 1 week");
    this.commitsPeriodTable = ko.observableArray([]);
    this.information = ko.observableArray([]);
    var username;

    this.setPeriod = function (value) {
      period = value;
      if (value === 2) {
        _this.periodInfo("Period: 1 day")
      } else if (value === 4) {
        _this.periodInfo("Period: 3 days")
      } else if (value === 8) {
        _this.periodInfo("Period: 1 week")
      } else if (value === 31) {
        _this.periodInfo("Period: 30 days")
      } else if (value === 61) {
        _this.periodInfo("Period: 60 days")
      }
    }
    this.setUsername = function (value) {
      username = value;
    }

    function getShortMonth(value) {
      if (value === 0) {
        return "Jan";
      } else if (value === 1) {
        return "Feb";
      } else if (value === 2) {
        return "Mar";
      } else if (value === 3) {
        return "Apr";
      } else if (value === 4) {
        return "May";
      } else if (value === 5) {
        return "Jun";
      } else if (value === 6) {
        return "Jul";
      } else if (value === 7) {
        return "Aug";
      } else if (value === 8) {
        return "Sep";
      } else if (value === 9) {
        return "Oct";
      } else if (value === 10) {
        return "Nov";
      } else if (value === 11) {
        return "Dec";
      }
    }

    function getShortDate(value) {
      return getShortMonth(value.getMonth()) + " " + value.getDate();
    }


    function createInfoString() {
      if (_this.commitsPeriodTable().length === 0) {
        _this.noActivity(username + " has no activity during this period.");
      } else {
        for (var i = 0; i < _this.commitsPeriodTable().length; i++) {
          var shortDate = getShortDate(_this.commitsPeriodTable()[i].date);
          if (_this.commitsPeriodTable()[i].number === 1) {
            var string = "Pushed " + _this.commitsPeriodTable()[i].number + " commit to " + _this.commitsPeriodTable()[i].repositoryName + ", " + shortDate;
          } else {
            var string = "Pushed " + _this.commitsPeriodTable()[i].number + " commits to " + _this.commitsPeriodTable()[i].repositoryName + ", " + shortDate;
          }
          _this.information.push({ info: string });
        }
        _this.noActivity('');
      }
    }

    this.getCommits = function () {
      var date = new Date();
      date.setDate(date.getDate() - period);
      while (_this.information().length > 0) {
        _this.information.pop();
      }
      while (_this.commitsPeriodTable().length > 0) {
        _this.commitsPeriodTable.pop();
      }
      var index = repoDateMap.length - 1;
      while (repoDateMap[index].time.getFullYear() > date.getFullYear() || repoDateMap[index].time.getMonth() > date.getMonth() || repoDateMap[index].time.getDate() > date.getDate()) {
        var exists = 0;
        for (var i = 0; i < _this.commitsPeriodTable().length; i++) {
          if (repoDateMap[index].repo === _this.commitsPeriodTable()[i].repositoryName
            && repoDateMap[index].time.getFullYear() === _this.commitsPeriodTable()[i].date.getFullYear()
            && repoDateMap[index].time.getMonth() === _this.commitsPeriodTable()[i].date.getMonth()
            && repoDateMap[index].time.getDate() === _this.commitsPeriodTable()[i].date.getDate()) {
            _this.commitsPeriodTable()[i].number++;
            exists = 1;
          }
        }
        if (exists === 0) {
          _this.commitsPeriodTable.push({ number: 1, date: repoDateMap[index].time, repositoryName: repoDateMap[index].repo });
        }
        --index;
      }
      createInfoString();
    };

    this.getCommitsOneDay = function (value) {
      _this.periodInfo("Period: " + getDate(value));
      while (_this.information().length > 0) {
        _this.information.pop();
      }
      while (_this.commitsPeriodTable().length > 0) {
        _this.commitsPeriodTable.pop();
      }
      for (var i = 0; i < repoDateMap.length; i++) {
        if (repoDateMap[i].time.getFullYear() === value.getFullYear() && repoDateMap[i].time.getMonth() === value.getMonth() && repoDateMap[i].time.getDate() === value.getDate()) {
          var exists = 0;
          for (var j = 0; j < _this.commitsPeriodTable().length; j++) {
            if (repoDateMap[i].repo === _this.commitsPeriodTable()[j].repositoryName) {
              _this.commitsPeriodTable()[j].number++;
              exists = 1;
            }
          }
          if (exists === 0) {
            _this.commitsPeriodTable.push({ number: 1, date: repoDateMap[i].time, repositoryName: repoDateMap[i].repo });
          }
        }
      }
      
      createInfoString();
    };

  }

  return CommitsViewModel;
})();