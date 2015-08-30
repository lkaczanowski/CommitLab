var datesViewModel = new DatesViewModel();
var userNameViewModel = new UserNameViewModel();
var branchNameViewModel = new BranchNameViewModel();
var repositoryNameViewModel = new RepositoryNameViewModel();
var changesetViewModel = new ChangesetViewModel(new ChangesetFilter());

$.getJSON('/api/changeset/usernames', function (data, status) {
  userNameViewModel.loadUserNameList(data);
});

$.getJSON('/api/changeset/branchnames', function (data, status) {
  branchNameViewModel.loadBranchNameList(data);
});

 $.getJSON('/api/changeset/repositorynames', function (data, status) {
     repositoryNameViewModel.loadRepositoryNameList(data);
});

ko.applyBindings(datesViewModel, document.getElementById('datesViewModel'));
ko.applyBindings(userNameViewModel, document.getElementById('userNameViewModel'));
ko.applyBindings(branchNameViewModel, document.getElementById('branchNameViewModel'));
ko.applyBindings(repositoryNameViewModel, document.getElementById('repositoryNameViewModel'));
ko.applyBindings(changesetViewModel, document.getElementById('changesetViewModel'));

