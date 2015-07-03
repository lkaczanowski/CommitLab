using System;

using CommitLab.Data.Models;

namespace CommitLab.Data.Tests.Utils
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