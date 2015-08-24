var UserName = (function () {
  function UserName() {
    var _this = this;
    this.username = ko.observable('');

    this.setUser = function (value) {
      _this.username(value);
    }
  }
  return UserName;
})();