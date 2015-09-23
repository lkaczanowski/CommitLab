var nugetPackagesViewModel = (function () {

    function nugetPackagesViewModel() {
        var that = this;
        searchPackageName = ko.observable("");        // Initially blank

        Changesets = ko.observableArray([]);
        ChangesetsAll = ko.observableArray([]);

        gridNuGet = {
            data: Changesets,
            showGroupPanel: true,
            columnDefs: [{ field: 'Id', displayName: 'Package Name' },
                { field: 'Version', displayName: 'Version' },
                {
                    field: 'Published', displayName: 'Last Published',
                },
            ]
        };

        gridNuGetAll = {
            data: ChangesetsAll,
            showGroupPanel: true,
            columnDefs: [{ field: 'Id', displayName: 'Package Name' },
                { field: 'Version', displayName: 'Version' },
                { field: 'vSpec', displayName: 'Use searched package version' },
            ]
        };



        getDependencies = function () {
            if (searchPackageName != "") {

                var path = GetChangedUriInfo();
                StartLoading("loadingDependencies", null);
                $('#labelDependencies').empty();
                $.ajax({
                    type: 'POST',
                    async: true,
                    contentType: 'application/json',
                    url: path + 'GetPackages/SinglePackageDependencies',
                    data: JSON.stringify({ name: ko.toJS(searchPackageName) }),
                }).done(function (data) {
                    var content = "<table>"
                    if (data[0] == null) {
                        content += '<tr><td>' + "No packages" + '</td></tr>';
                    } else {
                        for (var i = 0; data[i] != null; i++) {
                            content += '<tr><td>' + data[i] + '</td></tr>';
                        }
                    }
                    content += "</table>"
                    StopLoading("loadingDependencies", null);
                    $('#labelDependencies').append(content);
                });

            }
        }

        getChangesetsAll = function () {
            if (searchPackageName != "") {

                var path = GetChangedUriInfo();
                StartLoading("loadingBottom", "bottomGrid");
                $.ajax({
                    type: 'POST',
                    async: true,
                    contentType: 'application/json',
                    url: path + 'GetPackages/AllPackages',
                    data: JSON.stringify({ name: ko.toJS(searchPackageName) }),
                }).done(function (data) {
                    ChangesetsAll(data);

                    StopLoading("loadingBottom", "bottomGrid");
                });

            }
        }

        getChangesets = function () {
                document.getElementById("wrongNameInfo").textContent = "";
                var path = GetChangedUriInfo();
                StartLoading("loading", "topGrid");
                $.ajax({
                    type: 'POST',
                    async: true,
                    contentType: 'application/json',
                    url: path + 'GetPackages/SinglePackage',
                    data: JSON.stringify({ name: ko.toJS(searchPackageName) }),
                }).done(function (data) {
                    Changesets.removeAll();
                    if (data[0] == null) {
                        document.getElementById("wrongNameInfo").textContent = "Sorry, package doesn't exist.";
                        document.getElementById("labelPackageName").textContent = "Package Name";
                        document.getElementById("labelPackagePublished").textContent = "";
                        ChangesetsAll.removeAll();
                        $('#labelDependencies').empty();
                    }
                    else {
                        document.getElementById("labelPackageName").textContent = data[0].Id + " " + data[0].Version;
                        document.getElementById("labelPackagePublished").textContent = data[0].Published;

                        Changesets(data);
                        getDependencies();
                        getChangesetsAll();
                    }
                    StopLoading("loading", "topGrid");
                });
        }

    }

    return nugetPackagesViewModel;
})();