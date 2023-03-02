using CodexMinning.Core.Common.Helper;
using CodexMinning.Core.Entities;
using CodexMinning.Core.Services;
using CodexMinning.Core.Services.LoginService;
using CodexMinning.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace CodexMinning.Controllers.Api
{
    [RoutePrefix("api/login")]
    public class AccountController : ApiController
    {

        private CodexMinningEntities _ctx;
        private LoginService _service;
        private MasterConfigurationService _serviceMasterConfiguration;
        public AccountController()
        {
            _ctx = new CodexMinningEntities();
            _service = new LoginService();
            _serviceMasterConfiguration = new MasterConfigurationService();
        }
        [HttpPost]
        [Route("validate")]
        public IHttpActionResult Login(LoginViewModel model)
        {
            var result = _service.ValidateUser(model);
            return Ok(result);
        }

        [HttpPost]
        [Route("addUsers")]
        public IHttpActionResult addUpdate(UserViewModel param)
        {
            EncrptDecrypt obj = new EncrptDecrypt();
            param.Password = obj.encrypt(param.Password);

            var data = _serviceMasterConfiguration.AddEdit(param);
            return Ok(data);
        }

        [HttpGet]
        [Route("getencryptdecrypt")]
        public IHttpActionResult GetEncryptDecrypt(string val, bool ende = false)
        {
            var result = string.Empty;
            EncrptDecrypt obj = new EncrptDecrypt();
            if (!ende)
                result = obj.encrypt(val);
            else
                result = obj.Decrypt(val);
            return Ok(result);
        }

    }

}
