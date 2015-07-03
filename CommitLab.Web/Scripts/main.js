$(function() {
  $('#dateFrom').datepicker();
  $('#dateTo').datepicker();

  $('.btn-clear').click(function(ev) {
    ev.preventDefault();

    $(this).prev().val('');
  });
});