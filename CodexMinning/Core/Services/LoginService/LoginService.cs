using CodexMinning.Core.Entities;
using CodexMinning.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CodexMinning.Core.Services.LoginService
{
    public class LoginService
    {
        private CodexMinningEntities _ctx;
        public LoginService()
        {
            _ctx = new CodexMinningEntities();
        }

        

        public SP_ValidateUser_Result ValidateUser(LoginViewModel vm)
        {
            SP_ValidateUser_Result result = new SP_ValidateUser_Result();
            try
            {
                result = _ctx.SP_ValidateUser(vm.UserName,vm.Password).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }
    }
}