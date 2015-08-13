var CommitsViewModel = (function () {
  function CommitsViewModel() {
    var _this = this;
    var period = 2; //only for options last week, last month etc
    this.noActivity = ko.observable('');
    this.commitsPeriodTable = ko.observableArray([]);
    this.info = ko.observable(''); //Pushed number: commit(s) to repo" shortdate:
    var username;

    this.setPeriod = function (value) {
      period = value;
    }
    this.setUsername = function (value) {
      username = value;
    }


    this.getCommits = function () {
      var date = new Date();
      date.setDate(date.getDate() - period);
      while (_this.commitsPeriodTable().length > 0) {
        _this.commitsPeriodTable.pop();
      }
      var index = repoDateMap.length - 1;
      while (repoDateMap[index].time.getFullYear() > date.getFullYear() || repoDateMap[index].time.getMonth() > date.getMonth() || repoDateMap[index].time.getDate() > date.getDate()) {
        _this.commitsPeriodTable.push({ name: repoDateMap[index].time });
        --index;
      }
      if (_this.commitsPeriodTable().length === 0) {
        _this.noActivity(username + " has no activity during this period.");
      } else {
        _this.noActivity('');
      }
    };


    this.getCommitsOneDay = function (value) {
      while (_this.commitsPeriodTable().length > 0) {
        _this.commitsPeriodTable.pop();
      }
      for (var i = 0; i < repoDateMap.length; i++) {
        if (repoDateMap[i].time.getFullYear() === value.getFullYear() && repoDateMap[i].time.getMonth() === value.getMonth() && repoDateMap[i].time.getDate() === value.getDate()) {
          _this.commitsPeriodTable.push({ name: repoDateMap[i].time });
        }
      }
      if (_this.commitsPeriodTable().length === 0) {
        _this.noActivity(username + " has no activity during this period.");
      } else {
        _this.noActivity('');
      }
    };

  }

  return CommitsViewModel;
})();