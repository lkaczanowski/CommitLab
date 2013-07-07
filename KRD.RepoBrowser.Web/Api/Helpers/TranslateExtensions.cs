using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using KRD.RepoBrowser.Data.Query.Filters;
using KRD.RepoBrowser.Web.Api.Services.Changeset.Dto;

using ServiceStack.Common;

namespace KRD.RepoBrowser.Web.Api.Helpers
{
  public static class TranslateExtensions
  {
    public static ChangesetFilter ToChangesetFilter(this ChangesetRequest request)
    {
      var result = request.TranslateTo<ChangesetFilter>();

      if (result.TimestampFrom.HasValue && result.TimestampFrom == DateTime.MinValue)
      {
        result.TimestampFrom = null;
      }

      if (result.TimestampTo.HasValue && result.TimestampTo == DateTime.MinValue)
      {
        result.TimestampTo = null;
      }

      return result;
    }
  }
}