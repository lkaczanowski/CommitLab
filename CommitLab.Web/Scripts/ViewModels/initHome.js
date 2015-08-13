var datesViewModel = new DatesViewModel();
var userNameViewModel = new UserNameViewModel();
var branchNameViewModel = new BranchNameViewModel();
var repositoryNameViewModel = new RepositoryNameViewModel();
var calendarViewModel = new CalendarViewModel(new ChangesetFilter());
var commitsViewModel = new CommitsViewModel();

$.getJSON('/api/changeset/usernames', function (data, status) {
    userNameViewModel.loadUserNameList(data);
});

$.getJSON('/api/changeset/branchnames', function (data, status) {
    branchNameViewModel.loadBranchNameList(data);
});

$.getJSON('/api/changeset/repositorynames', function (data, status) {
    repositoryNameViewModel.loadRepositoryNameList(data);
});

ko.applyBindings(calendarViewModel, document.getElementById('calendarViewModel'));
ko.applyBindings(commitsViewModel, document.getElementById('commitsViewModel'));