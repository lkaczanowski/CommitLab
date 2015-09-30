using NuGet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CommitLab.Web.Services.Entities
{
  public class NuGetPackageInfo
  {
    public NuGetPackageInfo(IPackage package, IVersionSpec dependency)
    {
      Id = package.Id;
      Version = package.Version.ToString();
      VersionSpec = dependency.ToString();
    }

    public NuGetPackageInfo(IPackage package)
    {
      Id = package.Id;
      Version = package.Version.ToString();
      Published = package.Published.ToString();
      DownloadCount = package.DownloadCount;
    }

    public string Id { get; set; }

    public string Version { get; set; }

    public string VersionSpec { get; set; }

    public string Published { get; set; }

    public int DownloadCount { get; set; }
  }
}