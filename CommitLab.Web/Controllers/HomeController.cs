using System.Text.RegularExpressions;
using System.Web.Mvc;

namespace CommitLab.Web.Controllers
{
  public class HomeController : Controller
  {
    public ActionResult Index(string id)
    {     
      if (string.IsNullOrWhiteSpace(id))
      {
        return View((object)ParseLoginName(User.Identity.Name));
      }
      else
      {
        return View((object)id);
      }
    }

    private string ParseLoginName(string model)
    {
      var match = Regex.Match(model, @"KI-CENTRALA\\([A-Za-z0-9.]+)");
      return match.Groups[1].Value;
    }

    public ActionResult Search()
    {
      return View();
    }
  }
}