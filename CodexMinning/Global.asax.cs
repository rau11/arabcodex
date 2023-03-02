using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Http;
using AutoMapper;
using CodexMinning.Core.Entities;
using CodexMinning.Models;

namespace CodexMinning
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register); // <--- this MUST be first 
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            this.InitializeMapper();

            // Load Master data into Cache
            this.LoadMasterDataIntoCache();
        }


        protected void InitializeMapper()
        {
            Mapper.CreateMap<Vw_GetLookupParameter, LookUpModels>();



            //Mapper.CreateMap<LookUpModels, Vw_GetLookupParameter>()
            //.ForMember(c => c.Id, option => option.Ignore())
            //.ForMember(c => c.TypeId, option => option.Ignore());


        }

        protected void Application_PostAuthorizeRequest()
        {
            System.Web.HttpContext.Current.SetSessionStateBehavior(System.Web.SessionState.SessionStateBehavior.Required);
        }
        private void LoadMasterDataIntoCache()
        {
            var cacheManager = DependencyResolver.Current.GetService<Core.Services.MasterConfigurationService>();
            Models.SearchViewModel vm = new Models.SearchViewModel();
            vm.Id = 0;
            vm.name = "";
            cacheManager.BuildMasterDataCache(vm);
        }
    }
}
