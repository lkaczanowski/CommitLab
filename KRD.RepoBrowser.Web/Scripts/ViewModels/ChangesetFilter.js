var ChangesetFilter = (function () {
  function ChangesetFilter() {
    var _this = this;
    this.TimestampFrom = ko.observable('').subscribeTo('dateFromTopic');
    this.TimestampTo = ko.observable('').subscribeTo('dateToTopic');
    this.Usernames = ko.observableArray([]).subscribeTo('userNamesTopic');
    this.RepositoryNames = ko.observableArray([]).subscribeTo('repositoryNamesTopic');
    this.BranchNames = ko.observableArray([]).subscribeTo('branchNamesTopic');
  }
  return ChangesetFilter;
})();