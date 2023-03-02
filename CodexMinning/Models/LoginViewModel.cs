using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CodexMinning.Models
{
    public class LoginViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
    public class SearchViewModel
    {
        public int Id { get; set; }
        public string name { get; set; }
    }
    public class MinnigTableViewModel
    {
        public int Id { get; set; }
        public string Year { get; set; }
        public string Country { get; set; }
        public string FoodCategory { get; set; }
        public string Contaminant { get; set; }
        public string FoodGroup { get; set; }
        public string FoodIdentifier { get; set; }
        public string FoodCode { get; set; }
        public string FoodOrigin { get; set; }
        public string FoodName { get; set; }
        public string FoodAnalyzed { get; set; }
        public string StudyObjective { get; set; }
        public string SamplingPlan { get; set; }
        public string AnalyticalTechnique { get; set; }
        public string QualityAssurance { get; set; }
        public string LOD { get; set; }
        public string LODUnit { get; set; }
        public string LOQ { get; set; }
        public string LOQUnit { get; set; }
        public decimal Recovery { get; set; }
        public string Concentration { get; set; }
        public string ConcentrationRangeMax { get; set; }
        //public int Average { get; set; }
        public string Average { get; set; }
        public string Median { get; set; }
        public string Unit { get; set; }
        //public int RSD { get; set; }
        public string RSD { get; set; }
        //public int SamplesBelow { get; set; }
        public string SamplesBelow { get; set; }
        public string IndividualSampleAverageResults { get; set; }
        public string Referece { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }
    public class UserRoleViewModel
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public bool IsAcive { get; set; }

    }

    public class CheckUserRolesViewModel
    {
        public int Admin { get; set; }
        public int Write { get; set; }
        public int Read { get; set; }
    }

    public class LookupParameterViewModel
    {
        public int Id { get; set; }
        public string TypeId { get; set; }
        public string LookupKey { get; set; }
        public string LookupValue { get; set; }
        public bool IsActive { get; set; }
    }
    public class UserViewModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool IsActive { get; set; }
        public bool IsUserRegistration { get; set; }
        public int CountryId { get; set; }
        public string Organization { get; set; }
    }
    public class LookupsConfiguration
    {
        public string All = "All";
        public string AnalyticalTechnique = "Analytical Technique";
        public string Contaminant = "Contaminant";
        public string Country = "Country";
        public string FoodOrigin = "Food Origin";
        public string IndividualSampleResultAverageResults = "Individual Sample Result / Average Results";
        public string StateOfFoodAnalyzed = "State of Food Analyzed";
        public string Unit = "Unit";
        public string Year = "Year";
    }
    public enum EnumLookupsConfiguration
    {
        Country = 1,
        Year = 2,
        Contaminant = 3,
        FoodOrigin = 4,
        StateOfFoodAnalyzed = 5,
        AnalyticalTechnique = 6,
        Unit = 7,
        IndividualSampleResultAverageResults=8
    }
}