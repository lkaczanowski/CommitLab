using CommitLab.Web.Services.Entities;

using System;
using System.Collections.Generic;

namespace CommitLab.Web.Services
{
  public interface INugetFeedClient
  {
    IEnumerable<NuGetPackageInfo> GetPackage(string packageName);

    IEnumerable<String> GetPackageDependencies(string packageName);

    IEnumerable<NuGetPackageInfo> GetPackagesThatUseGivenPackage(string packageName);
  }
}
