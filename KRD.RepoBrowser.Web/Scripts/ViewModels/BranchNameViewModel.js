var BranchNameViewModel = (function () {
  function BranchNameViewModel() {
    var _this = this;
    this.BranchNameToAdd = ko.observable('');
    this.BranchNameSelected = ko.observable('');
    this.BranchNameList = ko.observableArray([]);
    this.BranchNames = ko.observableArray([]).publishOn('branchNamesTopic');
    
    this.loadBranchNameList = function (list) {
      for (var i = 0; i < list.length; i++) {
        this.BranchNameList.push(list[i]);
      }
    };

    this.addBranchName = function () {
      this.BranchNames.push(this.BranchNameToAdd());
      this.BranchNameToAdd('');
    };

    this.removeBranchName = function () {
      this.BranchNames.removeAll(this.BranchNameSelected());
    };
  }
  return BranchNameViewModel;
})();