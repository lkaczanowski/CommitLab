using System;
using System.Linq.Expressions;

using KRD.RepoBrowser.Data.Models;
using KRD.RepoBrowser.Data.Query.Filters;
using KRD.RepoBrowser.Data.Query.Interfaces;

using ServiceStack.OrmLite;

namespace KRD.RepoBrowser.Data.Query
{
  public class ChangesetPredicateComposer : IPredicateComposer<Changeset, ChangesetFilter>
  {
    public Expression<Func<Changeset, bool>> Compose(ChangesetFilter filter)
    {
      if (filter == null)
      {
        throw new ArgumentNullException("filter");
      }

      var predicate = PredicateBuilder.True<Changeset>();

      if (filter.TimestampFrom.HasValue)
      {
        predicate = predicate.And(p => p.Timestamp >= filter.TimestampFrom.Value);
      }

      if (filter.TimestampTo.HasValue)
      {
        predicate = predicate.And(p => p.Timestamp <= filter.TimestampTo.Value);
      }

      if (filter.Usernames != null && filter.Usernames.Count > 0)
      {
        var usernamePredicate = UsernamePredicate(filter);

        predicate = predicate.And(usernamePredicate);
      }

      if (filter.BranchNames != null && filter.BranchNames.Count > 0)
      {
        var branchNamePredicate = BranchNamePredicate(filter);

        predicate = predicate.And(branchNamePredicate);
      }

      if (filter.RepositoryNames != null && filter.RepositoryNames.Count > 0)
      {
        var repositoryNamePredicate = RepositoryNamePredicate(filter);

        predicate = predicate.And(repositoryNamePredicate);
      }

      return predicate;
    }

    private static Expression<Func<Changeset, bool>> UsernamePredicate(ChangesetFilter filter)
    {
      var usernamePredicate = PredicateBuilder.False<Changeset>();
      foreach (var username in filter.Usernames)
      {
        var usernameTemp = username;

        usernamePredicate = usernamePredicate.Or(p => p.Username == usernameTemp);
      }

      return usernamePredicate;
    }

    private static Expression<Func<Changeset, bool>> BranchNamePredicate(ChangesetFilter filter)
    {
      var branchNamePredicate = PredicateBuilder.False<Changeset>();
      foreach (var branchName in filter.BranchNames)
      {
        var branchNameTemp = branchName;

        branchNamePredicate = branchNamePredicate.Or(p => p.BranchName == branchNameTemp);
      }
      return branchNamePredicate;
    }

    private static Expression<Func<Changeset, bool>> RepositoryNamePredicate(ChangesetFilter filter)
    {
      var repositoryNamePredicate = PredicateBuilder.False<Changeset>();
      foreach (var repositoryName in filter.RepositoryNames)
      {
        var repositoryNameTemp = repositoryName;

        repositoryNamePredicate = repositoryNamePredicate.Or(p => p.RepositoryName == repositoryNameTemp);
      }
      return repositoryNamePredicate;
    }
  }
}
