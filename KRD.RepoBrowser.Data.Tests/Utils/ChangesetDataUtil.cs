using System;
using System.Collections.Generic;

using KRD.RepoBrowser.Data.Models;

using ServiceStack.OrmLite;

namespace KRD.RepoBrowser.Data.Tests.Utils
{
  public class ChangesetDataUtil
  {
    public static Changeset Create(
      string userName, string repositoryName, string branchName, DateTime timestamp)
    {
      return new Changeset
               {
                 BranchName = branchName, 
                 ChangeId = Guid.NewGuid().ToString(), 
                 RepositoryName = repositoryName, 
                 Username = userName, 
                 Timestamp = timestamp
               };
    }
  }
}