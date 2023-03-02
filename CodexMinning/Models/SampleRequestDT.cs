﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI.WebControls;

namespace CodexMinning.Models
{
    public class RequestDTParameters : DTParameters
    {
        public long Id { get; set; }
        public string name { get; set; }
       
        public int? UserId { get; set; }

        public string Year                { get; set; }
        public string Country             { get; set; }
        public string Contaminant                { get; set; }
        public string FoodCategory          { get; set; }
        public string FoodGroup             { get; set; }
        public string FoodIdentifier            { get; set; }
        public string FoodCode                   { get; set; }
        public string FoodOrigin            { get; set; }
        public string FoodName            { get; set; }
        public string FoodAnalyzed              { get; set; }
        public string StudyObjective                { get; set; }
        public string SamplingPlan              { get; set; }
        public string AnalyticalTechnique           { get; set; }
        public string QualityAssurance          { get; set; }
        public string LOD                   { get; set; }
        public string LODUnit               { get; set; }
        public string LOQ                       { get; set; }
        public string LOQUnit                   { get; set; }
        public string Recovery              { get; set; }
        public string Concentration             { get; set; }
        public string ConcentrationRangeMax { get; set; }
        public string Average               { get; set; }
        public string Median                { get; set; }
        public string Unit                { get; set; }
        public string RSD               { get; set; }
        public string SamplesBelow              { get; set; }
        public string IndividualSampleAverageResults { get; set; }
        public string Referece              { get; set; }
    }
}
