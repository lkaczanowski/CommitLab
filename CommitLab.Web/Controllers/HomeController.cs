using System.Text.RegularExpressions;
using System.Web.Mvc;

namespace CommitLab.Web.Controllers
{
  public class HomeController : Controller
  {
    public ActionResult Index(string loginName)
    {

      
      return View((object)loginName);
      var model = string.IsNullOrWhiteSpace(loginName) ? User.Identity.Name : loginName;
      
      return View(ParseLoginName(model));
    }

    private string ParseLoginName(string model)
    {
      var match = Regex.Match(model, "ddodood ");
      return match.Groups[0].Value;
    }

    public ActionResult Search()
    {
      return View();
    }
  }
}