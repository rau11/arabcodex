using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CodexMinning.Core.Common.Helper
{
    public class ExportFileVM
    {
        public string FileName { get; set; }
        public string[] FileColumnsSequence { get; set; }
        public string FileType { get; set; }
        public int? TableFieldsCount { get; set; } = 0;
    }
}