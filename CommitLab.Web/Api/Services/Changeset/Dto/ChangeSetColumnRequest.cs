using System.Collections.Generic;

using ServiceStack.ServiceHost;

namespace CommitLab.Web.Api.Services.Changeset.Dto
{
  [Route("/changeset/{columnName}", "GET")]
  public class ChangeSetColumnRequest : IReturn<List<string>>
  {
    public string ColumnName { get; set; }
  }
}