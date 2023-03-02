using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CodexMinning.Models
{
    
    public  class LookUpModels
    {
        public int Id { get; set; }
        public string TypeName { get; set; }
        public string LookupKey { get; set; }
        public string LookupValue { get; set; }
        public bool IsActive { get; set; }
        public string Status { get; set; }
        public string BackgroundColor { get; set; }
        public int TypeId { get; set; }
    }
}