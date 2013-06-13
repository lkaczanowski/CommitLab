using System;
using System.Collections.Generic;
using System.Linq;

using KRD.RepoBrowser.Data.Query.Filters;
using KRD.RepoBrowser.Data.Query.Interfaces;
using KRD.RepoBrowser.Web.Api.Services.Changeset.Dto;

using ServiceStack.Common;
using ServiceStack.ServiceInterface;

namespace KRD.RepoBrowser.Web.Api.Services.Changeset
{
  public class ChangesetService : Service
  {
    private readonly IChangesetQuery _changesetQuery;

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

      var changesetFilter = request.TranslateTo<ChangesetFilter>();

      IEnumerable<Data.Models.Changeset> changesets = _changesetQuery.Get(changesetFilter);

      List<ChangesetResponse> responses = changesets.Select(changeset => changeset.TranslateTo<ChangesetResponse>()).ToList();

      return responses;
    }
  }
}