using System.Collections.Generic;

using KRD.RepoBrowser.Data.Models;
using KRD.RepoBrowser.Data.Query.Filters;

namespace KRD.RepoBrowser.Data.Query.Interfaces
{
  public interface IChangesetQuery
  {
    IEnumerable<Changeset> Get(ChangesetFilter filter);
  }
}
