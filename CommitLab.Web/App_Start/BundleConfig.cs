using System.Web.Optimization;

using CommitLab.Web;

[assembly:
  WebActivatorEx.PostApplicationStartMethod(typeof(BundleConfig), "RegisterBundles")]

namespace CommitLab.Web
{
  public class BundleConfig
  {
    public static void RegisterBundles()
    {
      // scripts
      BundleTable.Bundles.Add(
        new ScriptBundle("~/scripts/base").Include(
          "~/Scripts/jquery-{version}.js",
          "~/Scripts/bootstrap*",
          "~/Scripts/knockout-{version}.js",
          "~/Scripts/knockout-bootstrap.js",
          "~/Scripts/knockout-postbox.js",
          "~/Scripts/koGrid-{version}.js",
          "~/Scripts/datepicker.js"));
      BundleTable.Bundles.Add(
        new ScriptBundle("~/scripts/modernizr-respond").Include(
          "~/Scripts/modernizr-{version}.js", "~/Scripts/respond.js"));

      // css
      BundleTable.Bundles.Add(
        new StyleBundle("~/content/base").Include(
          "~/Content/bootstrap.css",
          "~/Content/bootstrap-responsive.css",
          "~/Content/KoGrid.css",
          "~/Content/datepicker.css",
          "~/Content/main.css"));
    }
  }
}