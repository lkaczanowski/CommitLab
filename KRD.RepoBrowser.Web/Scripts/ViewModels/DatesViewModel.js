var DatesViewModel = (function () {
  function DatesViewModel() {
    var _this = this;
    this.DateFrom = ko.observable('').publishOn('dateFromTopic');
    this.DateTo = ko.observable('').publishOn('dateToTopic');

    this.clearDateFrom = function() {
      this.DateFrom('');
      
      // TODO: remove dependencies if possible
      document.getElementById('dateFrom').value = '';

    };

    this.clearDateTo = function() {
      this.DateTo('');
      
      // TODO: sic! remove dependencies if possible
      document.getElementById('dateTo').value = '';
    };
  }
  return DatesViewModel;
})();