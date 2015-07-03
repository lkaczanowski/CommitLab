using System;
using System.Collections.Generic;

namespace CommitLab.Data.Query.Filters
{
  public class ChangesetFilter
  {
    public ChangesetFilter()
    {
      Usernames = new List<string>();

      RepositoryNames = new List<string>();

      BranchNames = new List<string>();
    }

    public DateTime? TimestampFrom { get; set; }

    public DateTime? TimestampTo { get; set; }

    public IList<string> Usernames { get; set; }

    public IList<string> RepositoryNames { get; set; }

    public IList<string> BranchNames { get; set; }
  }
}
