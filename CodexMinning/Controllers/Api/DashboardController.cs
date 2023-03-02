using CodexMinning.Core.Entities;
using CodexMinning.Core.Services.LoginService;
using CodexMinning.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace CodexMinning.Controllers.Api
{
    [RoutePrefix("api/dashboard")]
    public class DashboardController : ApiController
    {
        
        private CodexMinningEntities _ctx;
        private DashboardService _service;
        public DashboardController()
        {
            _ctx = new CodexMinningEntities();
            _service = new DashboardService();
        }
        [HttpPost]
        [Route("getdatatable")]
        public IHttpActionResult GetDataTable(RequestDTParameters param)
        {
            //var data = _service.GetData(param);
            var data = _service.GetFilterResult(param);
            //var data = _service.GetFilterResultByView(param);
            return Ok(data);
        }
        [HttpPost]
        [Route("addUpdate")]
        public IHttpActionResult addUpdate(MinnigTableViewModel param)
        {
            var data = _service.AddEdit(param);
            return Ok(data);
        }
        [HttpGet]
        [Route("getDataById")]
        public IHttpActionResult GetDataById(int Id)
        {
            var data = _service.GetDataById(Id);
            return Ok(data);
        }

        [HttpGet]
        [Route("checkUserRoles")]
        public IHttpActionResult CheckUserRoles(int Id)
        {
            
            var data = _service.CheckUserRoles();
            return Ok(data);
        }
        


    }
    
}
