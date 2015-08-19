var CommitsViewModel = (function () {
  function CommitsViewModel() {
    var _this = this;
    var period = 8;
    var _value;
    var option = 1; //1 - by repos, 0 - by dates
    var username;
    var type = 1; //1 - getCommits, 0 - getCommitsOneDay
    this.noActivity = ko.observable('');
    this.periodInfo = ko.observable("Period: 1 week");
    this.sortInfo = ko.observable("Sort: by repositories");
    this.commitsPeriodTable = ko.observableArray([]);
    this.groupArray = ko.observableArray([]);
    this.reposArray = ko.observableArray([]);
    this.commitsArraySortedBydate = ko.observableArray([]);


    this.setPeriod = function (value) {
      period = value;
      type = 1;
      if (value === 2) {
        _this.periodInfo("Period: 1 day")
      } else if (value === 4) {
        _this.periodInfo("Period: 3 days")
      } else if (value === 8) {
        _this.periodInfo("Period: 1 week")
      } else if (value === 22) {
        _this.periodInfo("Period: 3 weeks")
      } else if (value === 31) {
        _this.periodInfo("Period: 30 days")
      } else if (value === 61) {
        _this.periodInfo("Period: 60 days")
      }
    }
    this.setUsername = function (value) {
      username = value;
    }
    this.clearArrays = function () {
      while (_this.commitsPeriodTable().length > 0) {
        _this.commitsPeriodTable.pop();
      }
      while (_this.groupArray().length > 0) {
        _this.groupArray.pop();
      }
      while (_this.reposArray().length > 0) {
        _this.reposArray.pop();
      }
      while (_this.commitsArraySortedBydate().length > 0) {
        _this.commitsArraySortedBydate.pop();
      }
    }
    this.setSortOption = function (value) {
      option = value;
      if (option === 1) {
        _this.sortInfo("Sort: by repositories");
      } else {
        _this.sortInfo("Sort: by dates");
      }
    }
    this.setDateValue = function (value) {
      _value = value;
      type = 0;
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
            var string = "Pushed " + "<b>" + _this.commitsPeriodTable()[i].number + "</b>" + " commit to " + "<b>" + _this.commitsPeriodTable()[i].branchName + "</b>" + ", " + shortDate;
          } else {
            var string = "Pushed " + "<b>" + _this.commitsPeriodTable()[i].number + "</b>" + " commits to " + "<b>" + _this.commitsPeriodTable()[i].branchName + "</b>" + ", " + shortDate;
          }

          _this.commitsPeriodTable()[i].information = string;
        }
        _this.noActivity('');
      }
    }

    function compareCommits(val1, val2) {
      if (val1.repositoryName > val2.repositoryName) {
        return -1;
      } else if (val1.repositoryName < val2.repositoryName) {
        return 1;
      } else {
        if (val1.date > val2.date) {
          return 1;
        } else if (val1.date < val2.date) {
          return -1;
        }
        return 0;
      }
    }

    function compareCommitsBydate(val1, val2) {
      if (val1.date > val2.date) {
        return -1;
      } else if (val1.date < val2.date) {
        return 1;
      }
      return 0;
    }

    function fillGroupArray() {
      for (var i = 0; i < _this.commitsPeriodTable().length; i++) {
        var exists = 0;
        for (var j = 0; j < _this.groupArray().length; j++) {
          if (_this.commitsPeriodTable()[i].repositoryName === _this.groupArray()[j].name) {
            _this.groupArray()[j].repos.push({ rep: _this.commitsPeriodTable()[i].information });
            _this.groupArray()[j].numberOfCommits += _this.commitsPeriodTable()[i].number;
            exists = 1;
          }
        }
        if (exists === 0) {
          _this.groupArray.push({ name: _this.commitsPeriodTable()[i].repositoryName, repos: [], numberOfCommits: _this.commitsPeriodTable()[i].number });
          _this.groupArray()[_this.groupArray().length - 1].repos.push({ rep: _this.commitsPeriodTable()[i].information });
        }
      }
      for (var i = 0; i < _this.groupArray().length; i++) {
        var numer = _this.groupArray()[i].numberOfCommits;
        if (numer == 1) {
          numer += " Commit";
        } else {
          numer += " Commits";
        }
        _this.reposArray.push({ name: _this.groupArray()[i].name, repos: _this.groupArray()[i].repos, numberOfCommits: numer });
      }
    }

    this.getCommits = function () {
        var date = new Date();
        date.setDate(date.getDate() - period);

        _this.clearArrays();

        var index = repoDateMap.length - 1;
        if (index >= 0) {
          while (repoDateMap[index].time.getFullYear() > date.getFullYear() || repoDateMap[index].time.getMonth() > date.getMonth() || repoDateMap[index].time.getDate() > date.getDate()) {
            var exists = 0;
            for (var i = 0; i < _this.commitsPeriodTable().length; i++) {
              if (repoDateMap[index].repo === _this.commitsPeriodTable()[i].repositoryName
                && repoDateMap[index].branch === _this.commitsPeriodTable()[i].branchName
                && repoDateMap[index].time.getFullYear() === _this.commitsPeriodTable()[i].date.getFullYear()
                && repoDateMap[index].time.getMonth() === _this.commitsPeriodTable()[i].date.getMonth()
                && repoDateMap[index].time.getDate() === _this.commitsPeriodTable()[i].date.getDate()) {
                _this.commitsPeriodTable()[i].number++;
                exists = 1;
              }
            }
            if (exists === 0) {
              _this.commitsPeriodTable.push({ number: 1, date: repoDateMap[index].time, repositoryName: repoDateMap[index].repo, information: "", branchName: repoDateMap[index].branch });
            }
            --index;
          }
        }
        if (option === 1) {
        _this.commitsPeriodTable.sort(compareCommits);
        createInfoString();
        fillGroupArray();
        } else {
          _this.commitsPeriodTable.sort(compareCommitsBydate);
          if (_this.commitsPeriodTable().length === 0) {
            _this.noActivity(username + " has no activity during this period.");
          } else {
            for (var i = 0; i < _this.commitsPeriodTable().length; i++) {
              var shortDate = getShortDate(_this.commitsPeriodTable()[i].date);
              if (_this.commitsPeriodTable()[i].number === 1) {
                var string = "Pushed " + "<b>" + _this.commitsPeriodTable()[i].number + "</b>" + " commit to " + "<b>" + _this.commitsPeriodTable()[i].repositoryName + "/" + _this.commitsPeriodTable()[i].branchName + "</b>" + ", " + shortDate;
              } else {
                var string = "Pushed " + "<b>" + _this.commitsPeriodTable()[i].number + "</b>" + " commits to " + "<b>" + _this.commitsPeriodTable()[i].repositoryName + "/" + _this.commitsPeriodTable()[i].branchName + "</b>" + ", " + shortDate;
              }
              _this.commitsPeriodTable()[i].information = string;
              _this.commitsArraySortedBydate.push({ name: string });
            }
            _this.noActivity('');
          }
        }
    };

    this.getCommitsOneDay = function () {
      var value = _value;
      _this.periodInfo("Period: " + getDate(value));

      _this.clearArrays();

      for (var i = 0; i < repoDateMap.length; i++) {
        if (repoDateMap[i].time.getFullYear() === value.getFullYear() && repoDateMap[i].time.getMonth() === value.getMonth() && repoDateMap[i].time.getDate() === value.getDate()) {
          var exists = 0;
          for (var j = 0; j < _this.commitsPeriodTable().length; j++) {
            if (repoDateMap[i].repo === _this.commitsPeriodTable()[j].repositoryName
              && repoDateMap[i].branch === _this.commitsPeriodTable()[j].branchName) {
              _this.commitsPeriodTable()[j].number++;
              exists = 1;
            }
          }
          if (exists === 0) {
            _this.commitsPeriodTable.push({ number: 1, date: repoDateMap[i].time, repositoryName: repoDateMap[i].repo, information: "", branchName: repoDateMap[i].branch });
          }
        }
      }
      if (option === 1) {
        createInfoString();
        fillGroupArray();
      } else {
        _this.commitsPeriodTable.sort(compareCommitsBydate);
        if (_this.commitsPeriodTable().length === 0) {
          _this.noActivity(username + " has no activity during this period.");
        } else {
          for (var i = 0; i < _this.commitsPeriodTable().length; i++) {
            var shortDate = getShortDate(_this.commitsPeriodTable()[i].date);
            if (_this.commitsPeriodTable()[i].number === 1) {
              var string = "Pushed " + "<b>" + _this.commitsPeriodTable()[i].number + "</b>" + " commit to " + "<b>" + _this.commitsPeriodTable()[i].repositoryName + "/" + _this.commitsPeriodTable()[i].branchName + "</b>" + ", " + shortDate;
            } else {
              var string = "Pushed " + "<b>" + _this.commitsPeriodTable()[i].number + "</b>" + " commits to " + "<b>" + _this.commitsPeriodTable()[i].repositoryName + "/" + _this.commitsPeriodTable()[i].branchName + "</b>" + ", " + shortDate;
            }
            _this.commitsPeriodTable()[i].information = string;
            _this.commitsArraySortedBydate.push({ name: string });
          }
          _this.noActivity('');
        }
      }
    };

    this.getComm = function () {
      if (type === 1) {
        _this.getCommits();
      } else {
        _this.getCommitsOneDay();
      }
    }
  }

  return CommitsViewModel;
})();