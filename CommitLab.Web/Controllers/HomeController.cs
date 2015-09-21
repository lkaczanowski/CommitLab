using NuGet;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using System.Linq;
using CommitLab.Data.Models;
using CommitLab.Web.Models;

namespace CommitLab.Web.Controllers
{
  public class HomeController : Controller
  {
      [Authorize]
    public ActionResult Index(string id)
    {
      var model = string.IsNullOrWhiteSpace(id) ? ParseLoginName(User.Identity.Name) : id;

      return View((object)model);
    }
      [Authorize]
    public ActionResult Search()
    {
      return View();
    }

    [Authorize]
      public ActionResult NuGet()
      {
          ViewBag.nuGetData = "NugET";
          return View();
      }

    public ActionResult Test()
    {
        return View();
    }

    [HttpPost]
    public JsonResult SinglePackage(string name)
    {
        return Json(GetSinglePackage(name));
    }

    [HttpPost]
    public JsonResult AllPackages(string name)
    {
        return Json(GetAllPackages(name));
    }


    public NuGetPackageInfo[] GetSinglePackage(string name)
    {
        {
            var packageSource = "http://teamcity/krd.nugetgallery/nuget/";
            var searchPackage = name;

            var repository = PackageRepositoryFactory.Default.CreateRepository(packageSource);
            
            //var packages = repository.GetPackages().Where(p => p.IsLatestVersion);
            var packages = from x in repository.GetPackages() orderby x.Version descending where x.Id == searchPackage select x;
     

 
            var pCount = packages.Count();
            var tableOfData = new NuGetPackageInfo[pCount];
            if (pCount > 0)
            {
                string[] table = new string[pCount];
                var i = 0;

                foreach (var package in packages)
                {
                    tableOfData[i] = new NuGetPackageInfo(package);
                        i++;
                }

 
            }
            return tableOfData;
        }
    }

    public NuGetPackageInfo[] GetAllPackages(string name)
    {
        var packageSource = "http://teamcity/krd.nugetgallery/nuget/";
        var searchPackage = name;

        var repository = PackageRepositoryFactory.Default.CreateRepository(packageSource);

        //var packages = repository.GetPackages().Where(p => p.IsLatestVersion);
        var packages = from x in repository.GetPackages() orderby x.Id, x.Version descending where x.IsLatestVersion == true select x;

        var pCount = packages.Count();
        var tableOfData = new NuGetPackageInfo[pCount];
        var i = 0;
      foreach (IPackage package in packages)
      {
        foreach (var packageDependencySet in package.DependencySets)
        {
          foreach (var dependency in packageDependencySet.Dependencies)
          {
            if (dependency.Id == searchPackage)
            {
                tableOfData[i] = new NuGetPackageInfo(package, dependency.VersionSpec);
                i++;
            }
          }
        }
      }
 
        return tableOfData;
    }

 


    private string ParseLoginName(string model)
    {
      var match = Regex.Match(model, @"([A-Za-z0-9.-]+\\)?([A-Za-z0-9.]+)");
      return match.Groups[2].Value;
    }
  }
}