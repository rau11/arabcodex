using CodexMinning.Core.Common;
using CodexMinning.Core.Common.Helper;
using CodexMinning.Core.Entities;
using CodexMinning.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CodexMinning.Core.Services
{
    public class MasterConfigurationService
    {
        private CodexMinningEntities _ctx;
        private CacheService cacheService;
        public MasterConfigurationService()
        {
            _ctx = new CodexMinningEntities();
            cacheService = new CacheService();
        }

        public List<Vw_GetUsers> GetData(SearchViewModel param)
        {
            List<Vw_GetUsers> result = new List<Vw_GetUsers>();
            try
            {
                result = _ctx.Vw_GetUsers.ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }
        public Sp_AddUpdateUser_Result AddEdit(UserViewModel vm)
        {
            Sp_AddUpdateUser_Result result = new Sp_AddUpdateUser_Result();
            try
            {
                int UserId = 1;
                if (HttpContext.Current.Session["userid"] != null)
                {
                    UserId = Convert.ToInt32(HttpContext.Current.Session["userid"].ToString());
                }
                result = _ctx.Sp_AddUpdateUser(vm.Id, vm.UserName, vm.Password, vm.FullName, vm.Email, vm.Phone, vm.IsActive, UserId, vm.CountryId, vm.Organization, vm.IsUserRegistration).FirstOrDefault();

            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }
        public Sp_AddUpdateUserRoles_Result AddUpdateUserRoles(UserRoleViewModel vm)
        {
            Sp_AddUpdateUserRoles_Result result = new Sp_AddUpdateUserRoles_Result();
            try
            {
                int UserId = 1;
                if (HttpContext.Current.Session["userid"] != null)
                {
                    UserId = Convert.ToInt32(HttpContext.Current.Session["userid"].ToString());
                }
                result = _ctx.Sp_AddUpdateUserRoles(vm.UserId, vm.RoleId).FirstOrDefault();

            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }
        public Sp_AddUpdateRoles_Result AddUpdateRoles(UserRoleViewModel vm)
        {
            Sp_AddUpdateRoles_Result result = new Sp_AddUpdateRoles_Result();
            try
            {
                int UserId = 1;
                if (HttpContext.Current.Session["userid"] != null)
                {
                    UserId = Convert.ToInt32(HttpContext.Current.Session["userid"].ToString());
                }
                result = _ctx.Sp_AddUpdateRoles(vm.Id, vm.Name, vm.IsActive).FirstOrDefault();

            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }
        public Vw_GetUsers GetDataById(int Id)
        {
            Vw_GetUsers result = new Vw_GetUsers();
            try
            {
                result = _ctx.Vw_GetUsers.Where(z => z.Id == Id).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }
        public Vw_GetUsers GetProfile(int Id)
        {
            Vw_GetUsers result = new Vw_GetUsers();
            try
            {
                result = _ctx.Vw_GetUsers.Where(z => z.Id == Id).FirstOrDefault();
                if (result != null)
                {
                    EncrptDecrypt obj = new EncrptDecrypt();

                    result.Password = obj.Decrypt(result.Password);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }
        public Sp_AddUpdateUser_Result AddEditProfile(UserViewModel vm)
        {
            Sp_AddUpdateUser_Result result = new Sp_AddUpdateUser_Result();
            try
            {
                if (vm.Password != null && vm.Password != "")
                {
                    EncrptDecrypt obj = new EncrptDecrypt();
                    vm.Password = obj.encrypt(vm.Password);
                }
                int UserId = 1;
                if (HttpContext.Current.Session["userid"] != null)
                {
                    UserId = Convert.ToInt32(HttpContext.Current.Session["userid"].ToString());
                }
                result = _ctx.Sp_AddUpdateUser(vm.Id, vm.UserName, vm.Password, vm.FullName, vm.Email, vm.Phone, vm.IsActive, UserId, vm.CountryId, vm.Organization, vm.IsUserRegistration).FirstOrDefault();

            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }
        public List<SP_GetUserRoles_Result> GetRolesById(int Id)
        {
            List<SP_GetUserRoles_Result> result = new List<SP_GetUserRoles_Result>();
            try
            {
                result = _ctx.SP_GetUserRoles(Id).ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }
        public Vw_GetRoles GetRoleById(int Id)
        {
            var result = _ctx.Vw_GetRoles.Where(x => x.Id == Id).FirstOrDefault();
            return result;
        }
        public List<Vw_GetRoles> GetAllRoles()
        {
            var result = _ctx.Vw_GetRoles.ToList();
            return result;
        }
        public List<Vw_GetLookupParameter> GetLookup(SearchViewModel vm)
        {
            if (vm.Id > 0)
            {
                var res = _ctx.Vw_GetLookupParameter.Where(x => x.TypeId == vm.Id).ToList();
                return res;
            }
            var result = _ctx.Vw_GetLookupParameter.ToList();
            return result;
        }
        public List<Vw_Get_SA_Results> GetLookupSAResults(SearchViewModel vm)
        {
            if (vm.Id > 0)
            {
                var res = _ctx.Vw_Get_SA_Results.Where(x => x.TypeId == vm.Id).ToList();
                return res;
            }
            var result = _ctx.Vw_Get_SA_Results.ToList();
            return result;
        }
        public Vw_GetLookupParameter GetLookupById(int Id)
        {
            var result = _ctx.Vw_GetLookupParameter.Where(x => x.Id == Id).FirstOrDefault();
            return result;
        }
        public Sp_AddUpdateLookupParameter_Result AddUpdateLookupParameter(LookupParameterViewModel vm)
        {
            Sp_AddUpdateLookupParameter_Result result = new Sp_AddUpdateLookupParameter_Result();
            try
            {
                int UserId = 1;
                if (HttpContext.Current.Session["userid"] != null)
                {
                    UserId = Convert.ToInt32(HttpContext.Current.Session["userid"].ToString());
                }
                result = _ctx.Sp_AddUpdateLookupParameter(vm.Id, vm.TypeId, vm.LookupKey, vm.LookupValue, vm.IsActive).FirstOrDefault();

            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }
        public SP_CheckUserRoles_Result CheckUserRoles()
        {
            int UserId = 1;
            if (HttpContext.Current.Session["userid"] != null)
            {
                UserId = Convert.ToInt32(HttpContext.Current.Session["userid"].ToString());
            }
            var res = _ctx.SP_CheckUserRoles(UserId).FirstOrDefault();
            return res;
        }
        public List<LookupMaster> GetTypes()
        {
            List<LookupMaster> res = new List<LookupMaster>();
            res = _ctx.LookupMasters.ToList();
            return res;
        }
        public List<Vw_GetLookupParameter> GetLookUpByTypeId(int Id)
        {
            List<Vw_GetLookupParameter> res = new List<Vw_GetLookupParameter>();
            res = _ctx.Vw_GetLookupParameter.Where(x => x.Id == Id).ToList();
            return res;
        }
        public List<Vw_GetCountries> GetCountryList()
        {
            var res = _ctx.Vw_GetCountries.ToList();
            return res;
        }
        public void BuildMasterDataCache(SearchViewModel vm)
        {
            LookupsConfiguration Dropdowns = new LookupsConfiguration();
            
            // Get all dropdown vaues
            //var dropdownMasterData = _ctx.Vw_GetLookupParameter.ToList().MapCollectionTo<Vw_GetLookupParameter, LookUpModels>(); 
            var dropdownMasterData = _ctx.Vw_GetLookupParameter.ToList(); 

            // Save AnalyticalTechnique into Cache
            var AnalyticalTechnique = dropdownMasterData.Where(m => m.TypeId == (int)EnumLookupsConfiguration.AnalyticalTechnique).MapCollectionTo<Vw_GetLookupParameter, LookUpModels>();

            //AnalyticalTechnique = AnalyticalTechnique.MapTo<List<LookUpModels>>();

            this.cacheService.Add(Dropdowns.AnalyticalTechnique, AnalyticalTechnique);

            // Save Contaminant into Cache
            var Contaminant = dropdownMasterData.Where(m => m.TypeId == (int)EnumLookupsConfiguration.Contaminant).MapCollectionTo<Vw_GetLookupParameter, LookUpModels>();
            this.cacheService.Add(Dropdowns.Contaminant, Contaminant);

            // Save Country into Cache
            var Country = dropdownMasterData.Where(m => m.TypeId == (int)EnumLookupsConfiguration.Country).MapCollectionTo<Vw_GetLookupParameter, LookUpModels>();
            this.cacheService.Add(Dropdowns.Country, Country);

            // Save FoodOrigin into Cache
            var FoodOrigin = dropdownMasterData.Where(m => m.TypeId == (int)EnumLookupsConfiguration.FoodOrigin).MapCollectionTo<Vw_GetLookupParameter, LookUpModels>();
            this.cacheService.Add(Dropdowns.FoodOrigin, FoodOrigin);

            // Save IndividualSampleResultAverageResults into Cache
            var IndividualSampleResultAverageResults = dropdownMasterData.Where(m => m.TypeId == (int)EnumLookupsConfiguration.IndividualSampleResultAverageResults).MapCollectionTo<Vw_GetLookupParameter, LookUpModels>();
            this.cacheService.Add(Dropdowns.IndividualSampleResultAverageResults, IndividualSampleResultAverageResults);

            // Save StateOfFoodAnalyzed into Cache
            var StateOfFoodAnalyzed = dropdownMasterData.Where(m => m.TypeId == (int)EnumLookupsConfiguration.StateOfFoodAnalyzed).MapCollectionTo<Vw_GetLookupParameter, LookUpModels>();
            this.cacheService.Add(Dropdowns.StateOfFoodAnalyzed, StateOfFoodAnalyzed);

            // Save Unit into Cache
            var Unit = dropdownMasterData.Where(m => m.TypeId == (int)EnumLookupsConfiguration.Unit).MapCollectionTo<Vw_GetLookupParameter, LookUpModels>();
            this.cacheService.Add(Dropdowns.Unit, Unit);

            // Save Year into Cache
            var Year = dropdownMasterData.Where(m => m.TypeName == Dropdowns.Year).MapCollectionTo<Vw_GetLookupParameter, LookUpModels>();
            this.cacheService.Add(Dropdowns.Year, Year);

        }
        
    }
}