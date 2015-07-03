using System;

namespace CommitLab.Web.Api.Services.Changeset.Dto
{
  public class ChangesetResponse
  {
    public DateTime Timestamp { get; set; }

    public string Username { get; set; }

    public string RepositoryName { get; set; }

    public string BranchName { get; set; }
  }
}