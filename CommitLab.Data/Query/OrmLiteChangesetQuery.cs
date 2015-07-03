using System;
using System.Collections.Generic;
using System.Linq.Expressions;

using CommitLab.Data.Helpers;
using CommitLab.Data.Models;
using CommitLab.Data.Query.Filters;
using CommitLab.Data.Query.Interfaces;

using ServiceStack.OrmLite;

namespace CommitLab.Data.Query
{
  public class OrmLiteChangesetQuery : IChangesetQuery
  {
    private const string TableName = "Changeset";

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

        bool hasNoFilter = predicate.Body.ToString().Equals("True");

        IEnumerable<Changeset> changesets = hasNoFilter
                                              ? db.Select<Changeset>()
                                              : db.Select<Changeset>(predicate);

        return changesets;
      }
    }

    public IEnumerable<string> GetUsernames()
    {
      return SelectDistinct(s => s.Username);
    }

    public IEnumerable<string> GetRepositoryNames()
    {
      return SelectDistinct(s => s.RepositoryName);
    }

    public IEnumerable<string> GetBranchNames()
    {
      return SelectDistinct(s => s.BranchName);
    }

    private IEnumerable<string> SelectDistinct(Expression<Func<Changeset, object>> selector)
    {
      string memberName = ReflectionHelper.GetMemberName(selector);

      using (var db = _dbConnectionFactory.OpenDbConnection())
      {
        return db.HashSet<string>(string.Format("SELECT {0} FROM {1}", memberName, TableName));
      }
    }
  }
}