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
    using System.Collections.Generic;
    
    public partial class Download
    {
        public string Year { get; set; }
        public string Country_Region { get; set; }
        public string Contaminant { get; set; }
        public string FoodGroup { get; set; }
        public string FoodIdentifier { get; set; }
        public string FoodCode { get; set; }
        public string FoodOrigin { get; set; }
        public string FoodAnalyzed { get; set; }
        public string StudyObjective { get; set; }
        public string SamplingPlan { get; set; }
        public string AnalyticalTechnique { get; set; }
        public string QualityAssurance { get; set; }
        public string LOD { get; set; }
        public string LODUnit { get; set; }
        public string LOQ { get; set; }
        public string LOQUnit { get; set; }
        public Nullable<int> Recovery { get; set; }
        public string Concentration { get; set; }
        public Nullable<int> Average { get; set; }
        public string Median { get; set; }
        public Nullable<int> RSD { get; set; }
        public Nullable<int> SamplesBelow { get; set; }
        public string Referece { get; set; }
        public int Id { get; set; }
    }
}
