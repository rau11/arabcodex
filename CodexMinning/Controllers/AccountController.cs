using CodexMinning.Core.Entities;
using CodexMinning.Core.Services.LoginService;
using CodexMinning.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CodexMinning.Core.Common.Helper;

namespace CodexMinning.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Index()
        {
            if (Session["userid"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            return View();
        }
        public ActionResult Login()
        {
            Session["userid"] = null;
            Session.Abandon();
            Session.Clear();

            return View();
        }

        [HttpPost]
        public ActionResult LoginPost(LoginViewModel model)
        {
            EncrptDecrypt obj = new EncrptDecrypt();

            //var enryptString = obj.EnryptString(model.Password);

            //var decryptString = obj.DecryptString(enryptString);


            model.Password = obj.encrypt(model.Password);

            //var decrypt = obj.Decrypt(encrypt);


            CodexMinningEntities _ctx = new CodexMinningEntities();
            LoginService _service = new LoginService();
            var result = _service.ValidateUser(model);
           
            if (result != null)
            {
                if (Convert.ToBoolean(result.Success))
                {
                    Session["userid"] = result.Id.ToString();
                    Session["username"] = result.FullName.ToString();
                    HttpContext.Session["userid"]= result.Id.ToString();
                }
            }
            return Json(result);
        }
       

    }
}