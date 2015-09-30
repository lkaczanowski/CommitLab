using System;
using System.Collections.Generic;
using System.Linq;

using CommitLab.Web.Services.Entities;

using NuGet;

namespace CommitLab.Web.Services
{
  public class NugetFeedClient : INugetFeedClient
  {
    private readonly IPackageRepository _repository;

    public NugetFeedClient(IPackageRepository repository)
    {
      if (repository == null)
      {
        throw new ArgumentException("repository");
      }

      _repository = repository;
    }

    public IEnumerable<NuGetPackageInfo> GetPackage(string packageName)
    {
      var searchPackage = packageName;
      var packages = from x in _repository.GetPackages() orderby x.Version descending where x.Id.ToLower() == searchPackage.ToLower() select x;
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

    public IEnumerable<string> GetPackageDependencies(string packageName)
    {
      var searchPackage = packageName;
      var packages = from x in _repository.GetPackages() orderby x.Version descending where x.Id.ToLower() == searchPackage.ToLower() select x;
      var dataList = new List<String>();

      if (packages.IsEmpty())
      {
        return dataList;
      }
      var packageFirst = packages.First();
      foreach (var packageDependencySet in packageFirst.DependencySets)
      {
        foreach (var dependency in packageDependencySet.Dependencies)
        {
          dataList.Add(dependency.Id + " " + dependency.VersionSpec);
        }
      }

      return dataList;
    }

    public IEnumerable<NuGetPackageInfo> GetPackagesThatUseGivenPackage(string packageName)
    {
      var searchPackage = packageName;
      var packages = from x in _repository.GetPackages() orderby x.Id, x.Version descending where x.IsLatestVersion == true select x;
      var dataList = new List<NuGetPackageInfo>();

      foreach (IPackage package in packages)
      {
        foreach (var packageDependencySet in package.DependencySets)
        {
          foreach (var dependency in packageDependencySet.Dependencies)
          {
            if (dependency.Id.ToLower() == searchPackage.ToLower())
            {
              dataList.Add(new NuGetPackageInfo(package, dependency.VersionSpec));
            }
          }
        }
      }

      return dataList;
    }
  }
}