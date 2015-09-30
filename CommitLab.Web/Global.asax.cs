﻿using System;
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
    protected void Application_Start()
    {
        
      AreaRegistration.RegisterAllAreas();

      FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
      RouteConfig.RegisterRoutes(RouteTable.Routes);

    }

  }
}