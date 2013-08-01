var ChangesetViewModel = (function() {

  function ChangesetViewModel(changesetFilter) {
    var _this = this;
    this.Filter = changesetFilter;
    this.Changesets = ko.observableArray([{ "timestamp": "2013-07-01T08:34:18.0000000", "username": "l.kaczanowski", "repositoryName": "Lindel", "branchName": "CW15.2_MonitoringLink" }, { "timestamp": "2013-07-01T13:23:16.0000000", "username": "l.kaczanowski", "repositoryName": "Lindel", "branchName": "CW15.2_MonitoringLink" }, { "timestamp": "2013-07-01T13:23:38.0000000", "username": "l.kaczanowski", "repositoryName": "Lindel", "branchName": "CW15.2_MonitoringLink" }]);

    this.gridOptions = {
      data: _this.Changesets,
      showGroupPanel: true
    };

    this.getChangesets = function() {
      var model = ko.toJSON(_this.Filter);
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: '/api/changeset',
        data: model
      }).done(function(data) {
        _this.Changesets(data);
      });
    };
  }

  return ChangesetViewModel;
})();