using System.Configuration;
using System.Web.Mvc;

using CommitLab.Data.Query;
using CommitLab.Data.Query.Interfaces;
using CommitLab.Web;
using CommitLab.Web.Api.Services.Changeset;

using ServiceStack.CacheAccess;
using ServiceStack.CacheAccess.Providers;
using ServiceStack.Mvc;
using ServiceStack.OrmLite;
using ServiceStack.Text;
using ServiceStack.WebHost.Endpoints;
using CommitLab.Web.Services;
using NuGet;

[assembly: WebActivator.PreApplicationStartMethod(typeof(AppHost), "Start")]

namespace CommitLab.Web
{
  public class AppHost
    : AppHostBase
  {
    public AppHost()
      : base("CommitLab ASP.NET Host", typeof(ChangesetService).Assembly)
    {
    }

    public static void Start()
    {
      new AppHost().Init();
    }

    public override void Configure(Funq.Container container)
    {
      JsConfig.EmitCamelCaseNames = true;
      JsConfig.DateHandler = JsonDateHandler.ISO8601;

      RegisterIoC(container);

      ControllerBuilder.Current.SetControllerFactory(new FunqControllerFactory(container));
    }

    private void RegisterIoC(Funq.Container container)
    {
      var connectionString = ConfigurationManager.ConnectionStrings["SourceMiner"].ConnectionString;

      container.Register<IDbConnectionFactory>(c => new OrmLiteConnectionFactory(connectionString, SqlServerDialect.Provider));

      container.RegisterAs<OrmLiteChangesetQuery, IChangesetQuery>();

      var nuGetPackageFeed = ConfigurationManager.AppSettings["NugetPackageFeedUrl"];

      container.Register<INugetFeedClient>(c => new NugetFeedClient(PackageRepositoryFactory.Default.CreateRepository(nuGetPackageFeed)));
      
      container.Register<ICacheClient>(new MemoryCacheClient());
    }
  }
}