var RepositoryNameViewModel = (function () {
  function RepositoryNameViewModel() {
    var _this = this;
    this.RepositoryNameToAdd = ko.observable('');
    this.RepositoryNameSelected = ko.observable('');
    this.RepositoryNameList = ko.observableArray([]);
    this.RepositoryNames = ko.observableArray([]).publishOn('repositoryNamesTopic');
    
    this.loadRepositoryNameList = function (list) {
      for (var i = 0; i < list.length; i++) {
        this.RepositoryNameList.push(list[i]);
      }
    };

    this.addRepositoryName = function () {
      this.RepositoryNames.push(this.RepositoryNameToAdd());
      this.RepositoryNameToAdd('');
    };

    this.removeRepositoryName = function () {
      this.RepositoryNames.removeAll(this.RepositoryNameSelected());
    };
  }
  return RepositoryNameViewModel;
})();