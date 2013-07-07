var ChangesetFilter = (function () {
  function ChangesetFilter() {
    var _this = this;
    this.DateFrom = ko.observable('');
    this.DateTo = ko.observable('');
    this.UserNames = ko.observableArray([]);
    this.RepositoryNames = ko.observableArray([]);
    this.BranchNames = ko.observableArray([]);
  }
  return ChangesetFilter;
})();

var ChangesetViewModel = (function () {
  function ChangesetViewModel() {
    var _this = this;
    this.DateFrom = ko.observable('');
    this.DateTo = ko.observable('');
    this.UserNameToAdd = ko.observable('');
    this.UserNameSelected = ko.observable('');
    this.RepositoryNameToAdd = ko.observable('');
    this.RepositoryNameSelected = ko.observable('');
    this.BranchNameToAdd = ko.observable('');
    this.BranchNameSelected = ko.observable('');
    
    this.UserNameList = ko.observableArray([]);
    this.RepositoryNameList = ko.observableArray([]);
    this.BranchNameList = ko.observableArray([]);

    this.ChangesetFilter = new ChangesetFilter();

    this.loadUserNameList = function (list) {
      for (var i = 0; i < list.length; i++) {
        this.UserNameList.push(list[i]);
      }
    };

    this.loadBranchNameList = function (list) {
      for (var i = 0; i < list.length; i++) {
        this.BranchNameList.push(list[i]);
      }
    };

    this.loadRepositoryNameList = function (list) {
      for (var i = 0; i < list.length; i++) {
        this.RepositoryNameList.push(list[i]);
      }
    };

    this.addUserName = function() {
      this.ChangesetFilter.UserNames.push(this.UserNameToAdd());
    };

    this.removeUserName = function() {
      this.ChangesetFilter.UserNames.removeAll(this.UserNameSelected());
    };
  }
  return ChangesetViewModel;
})();