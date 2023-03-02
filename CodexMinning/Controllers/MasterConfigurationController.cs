using CodexMinning.Core.Services.LoginService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CodexMinning.Controllers
{
    public class MasterConfigurationController : Controller
    {
        // GET: MasterConfiguration
        public ActionResult Index()
        {
            if (Session["userid"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            DashboardService _service = new DashboardService();
            var data = _service.CheckUserRoles();
            ViewBag.data = data;
            return View();
        }
        public ActionResult AddEdit()
        {
            if (Session["userid"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            return PartialView();
        }
        public ActionResult AddEditRole()
        {
            if (Session["userid"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            return PartialView();
        }
        public ActionResult AddEditLKP()
        {
            if (Session["userid"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            return PartialView();
        }
        public ActionResult AddEditLookUp()
        {
            if (Session["userid"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            return PartialView();
        }
    }
}