using System;

namespace KRD.RepoBrowser.Data.Models
{
  using ServiceStack.DataAnnotations;

  public class Changeset
  {
    [AutoIncrement]
    public int Id { get; set; }

    public DateTime Timestamp { get; set; }

    public string ChangeId { get; set; }

    public string Username { get; set; }

    public string RepositoryName { get; set; }

    public string BranchName { get; set; }

    public int PathsAdded { get; set; }

    public int PathsDeleted { get; set; }

    public int PathsModified { get; set; }

    public string Description { get; set; }
  }
}
