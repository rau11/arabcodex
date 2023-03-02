using CodexMinning.Core.Entities;
using CodexMinning.Core.Services;
using CodexMinning.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CodexMinning.Controllers.Api
{
    [RoutePrefix("api/masterconfiguration")]
    public class MasterConfigurationController : ApiController
    {
        private CodexMinningEntities _ctx;
        private MasterConfigurationService _service;
        private CacheService cacheService;
        public MasterConfigurationController()
        {
            _ctx = new CodexMinningEntities();
            _service = new MasterConfigurationService();
            cacheService = new CacheService();
        }
        [HttpPost]
        [Route("getdatatable")]
        public IHttpActionResult GetDataTable(SearchViewModel param)
        {
            var data = _service.GetData(param);
            return Ok(data);
        }

        [HttpPost]
        [Route("addUpdate")]
        public IHttpActionResult addUpdate(UserViewModel param)
        {
            var data = _service.AddEdit(param);
            return Ok(data);
        }
        [HttpPost]
        [Route("addUpdateProfile")]
        public IHttpActionResult AddUpdateProfile(UserViewModel param)
        {
            var data = _service.AddEditProfile(param);
            return Ok(data);
        }
        [HttpPost]
        [Route("addUpdateUserRoles")]
        public IHttpActionResult AddUpdateUserRols(UserRoleViewModel param)
        {
            var data = _service.AddUpdateUserRoles(param);
            return Ok(data);
        }
        [HttpPost]
        [Route("addUpdateRoles")]
        public IHttpActionResult AddUpdateRoles(UserRoleViewModel param)
        {
            var data = _service.AddUpdateRoles(param);
            return Ok(data);
        }
        [HttpGet]
        [Route("getDataById")]
        public IHttpActionResult GetDataById(int Id)
        {
            var data = _service.GetDataById(Id);
            var roles = _service.GetRolesById(Id);
            return Ok(new { data = data, roles = roles });
        }
        [HttpGet]
        [Route("getProfile")]
        public IHttpActionResult GetProfile(int Id)
        {
            var data = _service.GetProfile(Id);
            return Ok(data);
        }
        [HttpPost]
        [Route("getAllRoles")]
        public IHttpActionResult GetAllRoles()
        {
            var data = _service.GetAllRoles();
            return Ok(data);
        }
        [HttpGet]
        [Route("getRoleById")]
        public IHttpActionResult GetRoleById(int Id)
        {
            var data = _service.GetRoleById(Id);
            return Ok(data);
        }

        [HttpPost]
        [Route("getLookUp")]
        public IHttpActionResult GetLookUp(SearchViewModel vm)
        {
            //LookupsConfiguration Dropdowns = new LookupsConfiguration();
            //var services = this.cacheService.Get<List<Vw_GetLookupParameter>>(Dropdowns.All);
            //if (services == null)
            //{

            //    services = _service.GetLookup(vm);
            //    this.cacheService.Add(Dropdowns.All, services);
            //}

            var data = _service.GetLookup(vm);
            return Ok(data);


            //return Ok(services);
        }
        [HttpPost]
        [Route("getLookUpAndSAResult")]
        public IHttpActionResult GetLookUpAndSAResult(SearchViewModel vm)
        {
            var data = _service.GetLookup(vm);
            var dataSA = _service.GetLookupSAResults(vm);
            return Ok(new { data = data, dataSA = dataSA });
        }
        [HttpGet]
        [Route("getLookUpById")]
        public IHttpActionResult GetLookUpById(int Id)
        {
            var data = _service.GetLookupById(Id);
            return Ok(data);
        }

        [HttpPost]
        [Route("addUpdateLookUp")]
        public IHttpActionResult AddUpdateLookUp(LookupParameterViewModel param)
        {
            var data = _service.AddUpdateLookupParameter(param);
            return Ok(data);
        }
        [HttpGet]
        [Route("getTypes")]
        public IHttpActionResult getTypes(int Id)
        {
            var data = _service.GetTypes();
            return Ok(data);
        }
        [HttpGet]
        [Route("getLookUpByTypeId")]
        public IHttpActionResult GetLookUpByTypeId(int Id)
        {
            var data = _service.GetLookUpByTypeId(Id);
            return Ok(data);
        }

        [HttpGet]
        [Route("getCountryList")]
        public IHttpActionResult GetCountryList()
        {
            var data = _service.GetCountryList();
            return Ok(data);
        }

    }
}
