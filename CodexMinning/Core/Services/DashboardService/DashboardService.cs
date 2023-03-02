using CodexMinning.Core.Entities;
using CodexMinning.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CodexMinning.Core.Services.LoginService
{
    public class DashboardService
    {

        private CodexMinningEntities _ctx;
        public DashboardService()
        {
            _ctx = new CodexMinningEntities();
        }

    
        public List<Vw_GetMinnigTable> GetData(RequestDTParameters param)
        {
            List<Vw_GetMinnigTable> result = new List<Vw_GetMinnigTable>();
            try
            {
                result = _ctx.Vw_GetMinnigTable.ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }
        public DTResult<SP_GetMininngDataNew_Result> GetFilterResult(RequestDTParameters param)
        {

            List<SP_GetMininngDataNew_Result> query = new List<SP_GetMininngDataNew_Result>();
            //query = _ctx.Vw_GetMinnigTable.ToList();
            if (param.Length == 0)
                param.Length = 10;


             query = _ctx.SP_GetMininngDataNew(param.Start, param.Length, 
                 param.Year, param.FoodCategory, param.Country, param.Contaminant, param.FoodGroup, param.FoodIdentifier, param.FoodCode, param.FoodOrigin,param.FoodName, param.FoodAnalyzed,
                 param.StudyObjective, param.SamplingPlan, param.AnalyticalTechnique, param.QualityAssurance, param.LOD, param.LODUnit, param.LOQ, param.LOQUnit, 
                 param.Recovery, param.Concentration, param.ConcentrationRangeMax, param.Average, param.Median,param.Unit, param.RSD, param.SamplesBelow, param.IndividualSampleAverageResults, param.Referece,param.SortOrder,param.Search.Value).ToList();

            var sortOrder = param.SortOrder;
            //if (!string.IsNullOrEmpty(sortOrder))
            //    query = query.OrderByDescending(;
            //var dataQuery = query.Skip(param.Start).Take(param.Length);

            //var resultData = dataQuery.ToList();
            var count = 0;
            if (query != null)
            {
                if (query.Count() > 0)
                {
                    count = Convert.ToInt32(query[0].TotalRecords);
                }
            }
             

            var result = new DTResult<SP_GetMininngDataNew_Result>
            {
                draw = param.Draw,
                data = query,
                recordsFiltered = count,
                recordsTotal = count
            };
            return result;
        }

        public DTResult<Vw_GetMinnigTable> GetFilterResultByView(RequestDTParameters param)
        {
            if (param.Length == 0)
                param.Length = 10;

            var searchString = param.Search.Value;

            var query = from s in _ctx.Vw_GetMinnigTable
                           select s;
            if (!String.IsNullOrEmpty(param.Search.Value))
            {
                query = query.Where(s => s.Year.ToUpper().Contains(searchString.ToUpper())
                                       || s.Country.ToUpper().Contains(searchString.ToUpper()));
            }

            var sortOrder1 = param.SortOrder;
            if (!string.IsNullOrEmpty(sortOrder1))
                query = query.OrderByDescending(x => x.Year);

            var dataQuery = query.Skip(param.Start).Take(param.Length);
            var resultData = dataQuery.ToList();
            var count = query.Count();


            var result = new DTResult<Vw_GetMinnigTable>
            {
                draw = param.Draw,
                data = resultData,
                recordsFiltered = count,
                recordsTotal = count
            };
            return result;
        }

        public Sp_AddUpdateCodexMinning_Result AddEdit(MinnigTableViewModel vm)
        {
            Sp_AddUpdateCodexMinning_Result result = new Sp_AddUpdateCodexMinning_Result();
            try
            {
                int UserId = 1;
                if (HttpContext.Current.Session["userid"] != null)
                {
                    UserId = Convert.ToInt32(HttpContext.Current.Session["userid"].ToString());
                }
                result = _ctx.Sp_AddUpdateCodexMinning(vm.Id, vm.Year,vm.Country, vm.FoodCategory,vm.Contaminant, vm.FoodGroup, vm.FoodIdentifier, vm.FoodCode,
                    vm.FoodOrigin,vm.FoodName, vm.FoodAnalyzed, vm.StudyObjective, vm.SamplingPlan, vm.AnalyticalTechnique, vm.QualityAssurance, vm.LOD,
                    vm.LODUnit, vm.LOQ, vm.LOQUnit, vm.Recovery, vm.Concentration,vm.ConcentrationRangeMax, vm.Average, vm.Median,vm.Unit, vm.RSD, vm.SamplesBelow,vm.IndividualSampleAverageResults, vm.Referece,
                    vm.IsActive, UserId).FirstOrDefault();

            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }

        public Vw_GetMinnigTable GetDataById(int Id)
        {
            Vw_GetMinnigTable result = new Vw_GetMinnigTable();
            try
            {
                result = _ctx.Vw_GetMinnigTable.Where(z=>z.Id==Id).FirstOrDefault();
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
    }
}