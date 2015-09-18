using NuGet;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using System.Linq;
using CommitLab.Data.Models;

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
    public JsonResult Create(string name)
    {
        return Json(GetNuGetData(name));
    }

    public NuGetData GetNuGetData(string name)
    {
        {
            var packageSource = "http://teamcity/krd.nugetgallery/nuget/";
            var searchPackage = name;// "KRD.Nhibernate";

            var repository = PackageRepositoryFactory.Default.CreateRepository(packageSource);
            
            //var packages = repository.GetPackages().Where(p => p.IsLatestVersion);
            var packages = from x in repository.GetPackages() where x.Id == searchPackage select x;

            var ret = new NuGetData();
            
            var pCount = packages.Count();
            if (pCount > 0)
            {
                string[] table = new string[pCount];
                var i = 0;
                foreach (var b in packages)
                {
                    table[i] = b.Id;
                    i++;
                }

                ret.name = table[0];
            }
            else
                ret.name = "";

            return ret;

            //Dictionary<IPackage, IVersionSpec> dependentPackages = new Dictionary<IPackage, IVersionSpec>();

            //foreach (IPackage package in packages)
            //{
            //    foreach (var packageDependencySet in package.DependencySets)
            //    {
            //        foreach (var dependency in packageDependencySet.Dependencies)
            //        {
            //            if (dependency.Id == searchPackage)
            //            {
            //                dependentPackages.Add(package, dependency.VersionSpec);
            //            }
            //        }
            //    }
            //}

            //foreach (var dependentPackage in dependentPackages)
            //{
            //    Console.WriteLine("{0} use {1} {2}", dependentPackage.Key.GetFullName(), searchPackage, dependentPackage.Value);
            //}
        }
    }

    private string ParseLoginName(string model)
    {
      var match = Regex.Match(model, @"([A-Za-z0-9.-]+\\)?([A-Za-z0-9.]+)");
      return match.Groups[2].Value;
    }
  }
}