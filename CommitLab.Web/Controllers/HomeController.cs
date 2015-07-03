using System.Web.Mvc;

namespace CommitLab.Web.Controllers
{
  public class HomeController : Controller
  {
    public ActionResult Index()
    {
      return View();
    }
  }
}