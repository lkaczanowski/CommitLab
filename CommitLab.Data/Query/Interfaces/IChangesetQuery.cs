using System.Collections.Generic;

using CommitLab.Data.Models;
using CommitLab.Data.Query.Filters;

namespace CommitLab.Data.Query.Interfaces
{
  public interface IChangesetQuery
  {
    IEnumerable<Changeset> Get(ChangesetFilter filter);

    IEnumerable<string> GetUsernames();

    IEnumerable<string> GetRepositoryNames();

    IEnumerable<string> GetBranchNames();
  }
}
