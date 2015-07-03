using System;
using System.Collections.Generic;

using ServiceStack.ServiceHost;

namespace CommitLab.Web.Api.Services.Changeset.Dto
{
  [Route("/changeset", "POST")]
  public class ChangesetRequest : IReturn<List<ChangesetResponse>>
  {
    public DateTime? TimestampFrom { get; set; }

    public DateTime? TimestampTo { get; set; }

    public List<string> Usernames { get; set; }

    public List<string> RepositoryNames { get; set; }

    public List<string> BranchNames { get; set; }
  }
}