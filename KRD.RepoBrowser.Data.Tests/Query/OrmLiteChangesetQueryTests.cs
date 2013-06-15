using System;
using System.Collections.Generic;
using System.Linq;

using KRD.RepoBrowser.Data.Models;
using KRD.RepoBrowser.Data.Query;
using KRD.RepoBrowser.Data.Query.Filters;
using KRD.RepoBrowser.Data.Query.Interfaces;
using KRD.RepoBrowser.Data.Tests.Utils;

using NUnit.Framework;

using ServiceStack.OrmLite;
using ServiceStack.OrmLite.Sqlite;

namespace KRD.RepoBrowser.Data.Tests.Query
{
  [TestFixture]
  public class OrmLiteChangesetQueryTests
  {
    private const string UserName1 = "User1";

    private const string UserName2 = "User2";

    private const string Repo1 = "Repo1";

    private const string Repo2 = "Repo2";

    private const string Branch1 = "Branch1";

    private const string Branch2 = "Branch2";

    private IDbConnectionFactory _connectionFactory;

    private IChangesetQuery _changesetQuery;

    [TestFixtureSetUp]
    public void TestFixtureSetup()
    {
      _connectionFactory = new OrmLiteConnectionFactory(":memory:", false, SqliteOrmLiteDialectProvider.Instance);

      /*
       * Use this factory for intergration tests using SQL Server
      _connectionFactory = new OrmLiteConnectionFactory(ConfigurationManager.ConnectionStrings["SourceMiner"].ConnectionString, SqlServerDialect.Provider);
       */

      _changesetQuery = new OrmLiteChangesetQuery(_connectionFactory);

      PrepareTestData();
    }

    [TestFixtureTearDown]
    public void TestFixtureTeardown()
    {
    }

    [Test]
    public void Get_should_get_changesets_properly_only_with_userName()
    {
      var changesetFilter = new ChangesetFilter();
      changesetFilter.Usernames.Add(UserName1);

      IEnumerable<Changeset> changesets = _changesetQuery.Get(changesetFilter);

      Assert.NotNull(changesets);

      Assert.AreEqual(4, changesets.Count());
    }
    
    [Test]
    public void Get_should_get_changesets_properly_only_with_repositoryName()
    {
      var changesetFilter = new ChangesetFilter();
      changesetFilter.RepositoryNames.Add(Repo1);

      IEnumerable<Changeset> changesets = _changesetQuery.Get(changesetFilter);

      Assert.NotNull(changesets);

      Assert.AreEqual(4, changesets.Count());
    }
    
    [Test]
    public void Get_should_get_changesets_properly_only_with_branchName()
    {
      var changesetFilter = new ChangesetFilter();
      changesetFilter.BranchNames.Add(Branch1);

      IEnumerable<Changeset> changesets = _changesetQuery.Get(changesetFilter);

      Assert.NotNull(changesets);

      Assert.AreEqual(4, changesets.Count());
    }
    
    [Test]
    public void Get_should_get_changesets_properly_only_with_timestampFrom()
    {
      var changesetFilter = new ChangesetFilter { TimestampFrom = new DateTime(2013, 2, 1) };

      IEnumerable<Changeset> changesets = _changesetQuery.Get(changesetFilter);

      Assert.NotNull(changesets);

      Assert.AreEqual(5, changesets.Count());
    }
    
    [Test]
    public void Get_should_get_changesets_properly_only_with_timestampTo()
    {
      var changesetFilter = new ChangesetFilter { TimestampTo = new DateTime(2013, 2, 1) };

      IEnumerable<Changeset> changesets = _changesetQuery.Get(changesetFilter);

      Assert.NotNull(changesets);

      Assert.AreEqual(4, changesets.Count());
    }
    
    [Test]
    public void Get_should_get_changesets_properly_combined()
    {
      var changesetFilter = new ChangesetFilter { TimestampTo = new DateTime(2013, 3, 1) };
      changesetFilter.Usernames.Add(UserName1);
      changesetFilter.Usernames.Add(UserName2);
      changesetFilter.RepositoryNames.Add(Repo2);
      changesetFilter.BranchNames.Add(Branch2);


      IEnumerable<Changeset> changesets = _changesetQuery.Get(changesetFilter);

      Assert.NotNull(changesets);

      Assert.AreEqual(1, changesets.Count());
    }

    [Test]
    public void GetUsernames_should_get_list_of_unique_usernames()
    {
      IEnumerable<string> usernames = _changesetQuery.GetUsernames();

      Assert.NotNull(usernames);

      Assert.AreEqual(2, usernames.Count());
    }
    
    [Test]
    public void GetBranchNames_should_get_list_of_unique_usernames()
    {
      IEnumerable<string> branchNames = _changesetQuery.GetBranchNames();

      Assert.NotNull(branchNames);

      Assert.AreEqual(2, branchNames.Count());
    }
    
    [Test]
    public void GetRepositoryName_should_get_list_of_unique_usernames()
    {
      IEnumerable<string> repositoryNames = _changesetQuery.GetRepositoryNames();

      Assert.NotNull(repositoryNames);

      Assert.AreEqual(2, repositoryNames.Count());
    }

    private void PrepareTestData()
    {
      using (var db = _connectionFactory.OpenDbConnection())
      {
        db.CreateTable<Changeset>();

        db.Insert<Changeset>(ChangesetDataUtil.Create(UserName1, Repo1, Branch1, new DateTime(2013, 1, 1)));
        db.Insert<Changeset>(ChangesetDataUtil.Create(UserName1, Repo1, Branch2, new DateTime(2013, 1, 10)));
        db.Insert<Changeset>(ChangesetDataUtil.Create(UserName1, Repo2, Branch1, new DateTime(2013, 1, 20)));
        db.Insert<Changeset>(ChangesetDataUtil.Create(UserName1, Repo2, Branch2, new DateTime(2013, 2, 1)));
        db.Insert<Changeset>(ChangesetDataUtil.Create(UserName2, Repo1, Branch1, new DateTime(2013, 2, 10)));
        db.Insert<Changeset>(ChangesetDataUtil.Create(UserName2, Repo1, Branch2, new DateTime(2013, 2, 20)));
        db.Insert<Changeset>(ChangesetDataUtil.Create(UserName2, Repo2, Branch1, new DateTime(2013, 3, 1)));
        db.Insert<Changeset>(ChangesetDataUtil.Create(UserName2, Repo2, Branch2, new DateTime(2013, 3, 10)));
      }
    }
  }
}