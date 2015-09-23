using CommitLab.Web.Models;
using NuGet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace CommitLab.Web.Controllers
{
    public class GetPackagesController : AsyncController
    {
        string packageSource = "http://teamcity/krd.nugetgallery/nuget/";

        [HttpPost]
        public JsonResult SinglePackage(string name)
        {
            return Json(GetSinglePackage(name));
        }

        [HttpPost]
        public JsonResult SinglePackageDependencies(string name)
        {
            return Json(GetSinglePackageDependencies(name));
        }

        [HttpPost]
        public async Task<JsonResult> AllPackagesAsync(string name)
        {
            return await Task.FromResult<JsonResult>(Json((GetAllPackages(name))));
        }


        private List<NuGetPackageInfo> GetSinglePackage(string name)
        {
                
                var searchPackage = name;

                var repository = PackageRepositoryFactory.Default.CreateRepository(packageSource);

                //var packages = repository.GetPackages().Where(p => p.IsLatestVersion);
                var packages = from x in repository.GetPackages() orderby x.Version descending where x.Id == searchPackage select x;

               // var pCount = packages.Count();
                var dataList = new List<NuGetPackageInfo>();
                if (!packages.IsEmpty())
                {
                    foreach (var package in packages)
                    {
                        dataList.Add(new NuGetPackageInfo(package));
                    }
                }

                return dataList;
        }

        private List<String> GetSinglePackageDependencies(string name)
        {

            var searchPackage = name;

            var repository = PackageRepositoryFactory.Default.CreateRepository(packageSource);

            //var packages = repository.GetPackages().Where(p => p.IsLatestVersion);
            var packages = from x in repository.GetPackages() orderby x.Version descending where x.Id == searchPackage select x;

         //   var pCount = packages.Count();
            var dataList = new List<String>();
            

            if (!packages.IsEmpty())
            {
                var packageFirst = packages.First();

                foreach (var packageDependencySet in packageFirst.DependencySets)
                {
                    foreach (var dependency in packageDependencySet.Dependencies)
                    {
                        dataList.Add(dependency.Id + " " + dependency.VersionSpec);                       
                    }
                }
            }

            return dataList;
        }


        private List<NuGetPackageInfo> GetAllPackages(string name)
        {
            var searchPackage = name;

            var repository = PackageRepositoryFactory.Default.CreateRepository(packageSource);

            //var packages = repository.GetPackages().Where(p => p.IsLatestVersion);
            var packages = from x in repository.GetPackages() orderby x.Id, x.Version descending where x.IsLatestVersion == true select x;

        //    var pCount = packages.Count();
            var dataList = new List<NuGetPackageInfo>();
  
            foreach (IPackage package in packages)
            {
                foreach (var packageDependencySet in package.DependencySets)
                {
                    foreach (var dependency in packageDependencySet.Dependencies)
                    {
                        if (dependency.Id == searchPackage)
                        {
                            dataList.Add( new NuGetPackageInfo(package, dependency.VersionSpec));
                        }
                    }
                }
            }


            return dataList;
        }

        
    }
}