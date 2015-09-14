using log4net;
using log4net.Config;
using System;
using System.Configuration;
using System.IO;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CommitLab.Web
{
  public class MvcApplication : System.Web.HttpApplication
  {
      private static readonly ILog _log = LogManager.GetLogger(typeof(MvcApplication));//(MethodBase.GetCurrentMethod().DeclaringType);

     /*void initialize(){
      * GlobalContext.Properties["applicationName"] = "CommitLab";

        BasicConfigurator.Configure();
      * _log.Info("start");
        _log.Debug("start_debug");
      * */

    protected void Application_Start()
    {
        

      AreaRegistration.RegisterAllAreas();

      FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
      RouteConfig.RegisterRoutes(RouteTable.Routes);

    }


    protected void Application_Error(object sender, EventArgs e)
    {
        if (Context == null)
            return;

        HttpException httpException = Context.Error as HttpException;

        if (httpException != null)
        {
            if (httpException.GetHttpCode() == 404)
            {
                //  _log.WarnIfIsEnabled(string.Empty, Context.Error);
                  if(_log.IsWarnEnabled)
                _log.Warn(string.Empty, Context.Error);

                return;
            }
        }

        //_log.ErrorIfIsEnabled(Context.Error.Message, Context.Error);
             if(_log.IsErrorEnabled)
        _log.Error(Context.Error.Message, Context.Error);
    }

  }
}