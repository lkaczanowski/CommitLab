var UserNameViewModel = (function () {
  function UserNameViewModel() {
    var _this = this;
    this.UserNameToAdd = ko.observable('');
    this.UserNameSelected = ko.observable('');
    this.UserNameList = ko.observableArray([]);
    this.UserNames = ko.observableArray([]).publishOn('userNamesTopic');
    
    this.loadUserNameList = function (list) {
      for (var i = 0; i < list.length; i++) {
        this.UserNameList.push(list[i]);
      }
    };

    this.addUserName = function () {
      this.UserNames.push(this.UserNameToAdd());
      this.UserNameToAdd('');
    };

    this.removeUserName = function () {
      this.UserNames.removeAll(this.UserNameSelected());
    };
  }
  return UserNameViewModel;
})();