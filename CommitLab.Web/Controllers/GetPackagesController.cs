using CommitLab.Web.Api.Services;
using CommitLab.Web.Services;
using NuGet;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace CommitLab.Web.Controllers
{
  public class GetPackagesController : AsyncController
  {
    private readonly INugetFeedClient _nugetFeedClient;

    public GetPackagesController(INugetFeedClient nugetFeedClient)
    {
      if (nugetFeedClient == null)
      {
        throw new ArgumentNullException("nugetFeedClient");
      }

      _nugetFeedClient = nugetFeedClient;
    }

    [HttpPost]
    public JsonResult SinglePackage(string name)
    {    
      return Json(_nugetFeedClient.GetPackage(name));
    }

    [HttpPost]
    public JsonResult SinglePackageDependencies(string name)
    {
      return Json(_nugetFeedClient.GetPackageDependencies(name));
    }

    [HttpPost]
    public async Task<JsonResult> AllPackagesAsync(string name)
    {
      return await Task.FromResult<JsonResult>(Json((_nugetFeedClient.GetPackagesThatUseGivenPackage(name))));
    }
  }
}