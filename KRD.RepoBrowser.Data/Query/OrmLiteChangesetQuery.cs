using System;
using System.Collections.Generic;

using KRD.RepoBrowser.Data.Models;
using KRD.RepoBrowser.Data.Query.Filters;
using KRD.RepoBrowser.Data.Query.Interfaces;

using ServiceStack.OrmLite;

namespace KRD.RepoBrowser.Data.Query
{
  public class OrmLiteChangesetQuery : IChangesetQuery
  {
    private readonly IDbConnectionFactory _dbConnectionFactory;

    private readonly IPredicateComposer<Changeset, ChangesetFilter> _predicateComposer; 

    public OrmLiteChangesetQuery(IDbConnectionFactory dbConnectionFactory)
    {
      if (dbConnectionFactory == null)
      {
        throw new ArgumentNullException("dbConnectionFactory");
      }

      _dbConnectionFactory = dbConnectionFactory;

      _predicateComposer = new ChangesetPredicateComposer();
    }

    public IEnumerable<Changeset> Get(ChangesetFilter filter)
    {
      if (filter == null)
      {
        throw new ArgumentNullException("filter");
      }

      using (var db = _dbConnectionFactory.OpenDbConnection())
      {
        var predicate = _predicateComposer.Compose(filter);

        IEnumerable<Changeset> changesets = db.Select<Changeset>(predicate);

        return changesets;
      }
    }
  }
}