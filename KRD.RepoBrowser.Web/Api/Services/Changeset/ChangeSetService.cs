using System;
using System.Collections.Generic;
using System.Linq;

using KRD.RepoBrowser.Data.Query.Filters;
using KRD.RepoBrowser.Data.Query.Interfaces;
using KRD.RepoBrowser.Web.Api.Helpers;
using KRD.RepoBrowser.Web.Api.Services.Changeset.Dto;

using ServiceStack.Common;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace KRD.RepoBrowser.Web.Api.Services.Changeset
{
  public class ChangesetService : Service
  {
    private readonly IChangesetQuery _changesetQuery;

    private Dictionary<string, Func<object>> _columnSwitch;

    public ChangesetService(IChangesetQuery changesetQuery)
    {
      if (changesetQuery == null)
      {
        throw new ArgumentNullException("changesetQuery");
      }

      _changesetQuery = changesetQuery;
    }

    public object Post(ChangesetRequest request)
    {
      if (request == null)
      {
        throw new ArgumentNullException("request");
      }

      if (request.ArePropertiesNull())
      {
        // TODO: change this to more appriopriate exception
        throw new ArgumentNullException("request");
      }

      var changesetFilter = request.TranslateTo<ChangesetFilter>();

      IEnumerable<Data.Models.Changeset> changesets = _changesetQuery.Get(changesetFilter);

      List<ChangesetResponse> responses =
        changesets.Select(changeset => changeset.TranslateTo<ChangesetResponse>()).ToList();

      return responses;
    }

    public object Get(ChangeSetColumnRequest request)
    {
      if (request == null || string.IsNullOrWhiteSpace(request.ColumnName))
      {
        throw new ArgumentNullException("request");
      }

      InitializeColumnSwitch();

      string columnName = request.ColumnName.ToLower();

      if (_columnSwitch.ContainsKey(columnName))
      {
        return RequestContext.ToOptimizedResultUsingCache(base.Cache, columnName, new TimeSpan(24, 0, 0), () => _columnSwitch[columnName]());
      }

      return null;
    }

    private void InitializeColumnSwitch()
    {
      _columnSwitch = new Dictionary<string, Func<object>>
                      {
                        { "username", () => _changesetQuery.GetUsernames() }, 
                        { "branchnames", () => _changesetQuery.GetBranchNames() }, 
                        {
                          "repositorynames", 
                          () => _changesetQuery.GetRepositoryNames()
                        }
                      };
    }
  }
}