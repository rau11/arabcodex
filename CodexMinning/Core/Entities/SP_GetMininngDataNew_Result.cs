//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CodexMinning.Core.Entities
{
    using System;
    
    public partial class SP_GetMininngDataNew_Result
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
        public string Recovery { get; set; }
        public string Concentration { get; set; }
        public string ConcentrationRangeMax { get; set; }
        public string Average { get; set; }
        public string Median { get; set; }
        public string Unit { get; set; }
        public string RSD { get; set; }
        public string SamplesBelow { get; set; }
        public string IndividualSampleAverageResults { get; set; }
        public string Referece { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<int> TotalRecords { get; set; }
        public int IsValueExists { get; set; }
        public string HrefReferece { get; set; }
    }
}
