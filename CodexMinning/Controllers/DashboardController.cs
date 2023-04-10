using CodexMinning.Core.Common.Helper;
using CodexMinning.Core.Entities;
using CodexMinning.Core.Services.LoginService;
using ExcelDataReader;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace CodexMinning.Controllers
{
    public class DashboardController : Controller
    {


        // GET: Dashboard
        public ActionResult Index()
        {
            if (Session["userid"] == null)
            {
                return RedirectToAction("Login", "Account");
            }

            DashboardService _service = new DashboardService();
            var data = _service.CheckUserRoles();
            ViewBag.data = data;

            return View();
        }

        public ActionResult AddEdit()
        {
            if (Session["userid"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            return PartialView();
        }
        public ActionResult Profile()
        {
            if (Session["userid"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            return PartialView();
        }
        public List<ListViewModel> GetDataFromCSVFile(Stream stream)
        {
            var empList = new List<ListViewModel>();
            try
            {
                using (var reader = ExcelReaderFactory.CreateCsvReader(stream))
                {
                    var dataSet = reader.AsDataSet(new ExcelDataSetConfiguration
                    {
                        ConfigureDataTable = _ => new ExcelDataTableConfiguration
                        {
                            UseHeaderRow = true // To set First Row As Column Names    
                        }
                    });

                    if (dataSet.Tables.Count > 0)
                    {



                        var dataTable = dataSet.Tables[0];
                        foreach (DataRow objDataRow in dataTable.Rows)
                        {

                            var average = objDataRow["Average"].ToString();

                            if (objDataRow.ItemArray.All(x => string.IsNullOrEmpty(x?.ToString()))) continue;
                            empList.Add(new ListViewModel()
                            {
                                Id = 0,
                                Year = objDataRow["Year"].ToString(),
                                Country = objDataRow["Country/Region"].ToString(),
                                Contaminant = objDataRow["Contaminant"].ToString(),
                                FoodGroup = objDataRow["FoodGroup"].ToString(),
                                FoodIdentifier = objDataRow["FoodIdentifier"].ToString(),
                                FoodCode = objDataRow["FoodCode"].ToString(),
                                FoodOrigin = objDataRow["FoodOrigin"].ToString(),
                                FoodAnalyzed = objDataRow["FoodAnalyzed"].ToString(),
                                StudyObjective = objDataRow["StudyObjective"].ToString(),
                                SamplingPlan = objDataRow["SamplingPlan"].ToString(),
                                AnalyticalTechnique = objDataRow["AnalyticalTechnique"].ToString(),
                                QualityAssurance = objDataRow["QualityAssurance"].ToString(),
                                LOD = objDataRow["LOD"].ToString(),
                                LODUnit = objDataRow["LODUnit"].ToString(),
                                LOQ = objDataRow["LOQ"].ToString(),
                                LOQUnit = objDataRow["LOQUnit"].ToString(),
                                Recovery = Convert.ToInt32(objDataRow["Recovery"].ToString()),
                                Concentration = objDataRow["Concentration"].ToString(),
                                //Average = Convert.ToInt32(objDataRow["Average"].ToString()),
                                Average = Convert.ToInt32(average),
                                Median = objDataRow["Median"].ToString(),
                                RSD = Convert.ToInt32(objDataRow["RSD"].ToString()),
                                SamplesBelow = Convert.ToInt32(objDataRow["SamplesBelow"].ToString()),
                                Referece = objDataRow["Referece"].ToString(),

                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return empList;
        }

        public List<ListViewModel> GetDataFromExcelFile(Stream stream)
        {
            var empList = new List<ListViewModel>();
            try
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    var dataSet = reader.AsDataSet(new ExcelDataSetConfiguration
                    {
                        ConfigureDataTable = _ => new ExcelDataTableConfiguration
                        {
                            UseHeaderRow = true // To set First Row As Column Names    
                        }
                    });

                    if (dataSet.Tables.Count > 0)
                    {


                        DataTable mytable = new DataTable();
                        mytable = dataSet.Tables[0];



                        var dataTable = dataSet.Tables[0];
                        foreach (DataRow objDataRow in mytable.Rows)
                        {

                            //var average = objDataRow["Average"];

                            if (objDataRow.ItemArray.All(x => string.IsNullOrEmpty(x?.ToString()))) continue;
                            empList.Add(new ListViewModel()
                            {
                                Id = 0,
                                Year = objDataRow["Year"].ToString(),
                                Country = objDataRow["Country/Region"].ToString(),
                                Contaminant = objDataRow["Contaminant"].ToString(),
                                FoodGroup = objDataRow["FoodGroup"].ToString(),
                                FoodIdentifier = objDataRow["FoodIdentifier"].ToString(),
                                FoodCode = objDataRow["FoodCode"].ToString(),
                                FoodOrigin = objDataRow["FoodOrigin"].ToString(),
                                FoodAnalyzed = objDataRow["FoodAnalyzed"].ToString(),
                                StudyObjective = objDataRow["StudyObjective"].ToString(),
                                SamplingPlan = objDataRow["SamplingPlan"].ToString(),
                                AnalyticalTechnique = objDataRow["AnalyticalTechnique"].ToString(),
                                QualityAssurance = objDataRow["QualityAssurance"].ToString(),
                                LOD = objDataRow["LOD"].ToString(),
                                LODUnit = objDataRow["LODUnit"].ToString(),
                                LOQ = objDataRow["LOQ"].ToString(),
                                LOQUnit = objDataRow["LOQUnit"].ToString(),
                                Recovery = Convert.ToInt32(objDataRow["Recovery"].ToString()),
                                Concentration = objDataRow["Concentration"].ToString(),
                                Average = Convert.ToInt32(objDataRow["Avrage"].ToString()),
                                //Average = Convert.ToInt32(average),
                                Median = objDataRow["Median"].ToString(),
                                RSD = Convert.ToInt32(objDataRow["RSD"].ToString()),
                                SamplesBelow = Convert.ToInt32(objDataRow["SamplesBelow"].ToString()),
                                Referece = objDataRow["Referece"].ToString(),

                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return empList;
        }

        [HttpPost]
        public ActionResult ImportFile(HttpPostedFileBase importFile)
        {
            if (importFile == null) return Json(new { Status = 0, Message = "No File Selected" });

            try
            {
                var empList = new List<ListViewModel>();
                List<ListViewModel> fileData = new List<ListViewModel>();

                // ExcelDataReader works with the binary Excel file, so it needs a FileStream
                // to get started. This is how we avoid dependencies on ACE or Interop:
                Stream stream = importFile.InputStream;

                IExcelDataReader reader = null;


                if (importFile.FileName.EndsWith(".xls"))
                {
                    reader = ExcelReaderFactory.CreateReader(stream);
                }
                else if (importFile.FileName.EndsWith(".xlsx"))
                {
                    reader = ExcelReaderFactory.CreateReader(stream);
                }
                else if (importFile.FileName.EndsWith(".csv"))
                {
                    reader = ExcelReaderFactory.CreateCsvReader(stream);
                }
                else
                {
                    return Json(new { Status = 0, Message = "This file format is not supported" });
                }
                int fieldcount = reader.FieldCount;
                int rowcount = reader.RowCount;
                DataTable dt1 = new DataTable();
                DataRow row;
                DataTable dt_ = new DataTable();

                dt_ = reader.AsDataSet().Tables[0];
                for (int i = 0; i < dt_.Columns.Count; i++)
                {
                    dt1.Columns.Add(dt_.Rows[0][i].ToString());
                }
                int rowcounter = 0;
                for (int row_ = 1; row_ < dt_.Rows.Count; row_++)
                {
                    row = dt1.NewRow();

                    for (int col = 0; col < dt_.Columns.Count; col++)
                    {
                        row[col] = dt_.Rows[row_][col].ToString();
                        rowcounter++;
                    }
                    dt1.Rows.Add(row);
                }



                DataSet result = new DataSet();
                result.Tables.Add(dt1);
                reader.Close();
                reader.Dispose();


                var dt = result.Tables[0];

                //var dtable = ObjectToDatatable.ToDataTable(dt);

                //var tblEmployeeParameter = new SqlParameter("tblEmployeeTableType", SqlDbType.Structured)
                //{
                //    TypeName = "dbo.tblTypeEmployee",
                //    Value = dtEmployee
                //};
                //await _dbContext.Database.ExecuteSqlCommandAsync("EXEC spBulkImportEmployee @tblEmployeeTableType", tblEmployeeParameter);
                CodexMinningEntities _ctx = new CodexMinningEntities();

                SqlParameter[] parameters =
               {
                    new SqlParameter
                    {
                        SqlDbType = SqlDbType.Structured,
                        Direction = ParameterDirection.Input,
                        ParameterName = "MinningType",
                        TypeName = "MinningTableType", //Don't forget this one!
                        Value = dt
                    }
                };
                var list = _ctx.Database.ExecuteSqlCommand("exec Sp_AddUpdateMinning @MinningType", parameters);

                return Json(new { Status = 1, Message = "File Imported Successfully " });
            }
            catch (Exception ex)
            {
                return Json(new { Status = 0, Message = "Error In Transaction.Failed to Import" });
            }
        }


        public class ListViewModel
        {
            public int Id { get; set; }
            public string Year { get; set; }
            public string Country { get; set; }
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
            public int Recovery { get; set; }
            public string Concentration { get; set; }
            public int Average { get; set; }
            public string Median { get; set; }
            public int RSD { get; set; }
            public int SamplesBelow { get; set; }
            public string Referece { get; set; }
            //public DateTime CreatedOn { get; set; }
            //public int CreatedBy { get; set; }
            //public DateTime ModifiedOn { get; set; }
            //public int ModifiedBy { get; set; }
        }


        [HttpGet]
        public JsonResult DownloadFile()
        {
            string localFilePath = HttpContext.Server.MapPath("~/Content/file/CodexMinning.xlsx");

            //string fileExtension = Path.GetExtension(path);

            //S2:Read File as Byte Array
            byte[] fileData = System.IO.File.ReadAllBytes(localFilePath);
            //var bytes = Convert.FromBase64String(res.ReportContent);
            Response.Clear();
            MemoryStream ms = new MemoryStream(fileData);
            Response.ContentType = "application/vnd.ms-excel";
            Response.AddHeader("content-disposition", "attachment;filename=CodexMinning.xlsx");
            Response.Buffer = true;
            ms.WriteTo(Response.OutputStream);
            Response.End();

            return Json("", JsonRequestBehavior.AllowGet);

        }

        [HttpGet]
        public JsonResult GetAnalytics()
        {
            CodexMinningEntities _ctx = new CodexMinningEntities();
            var data = _ctx.SP_GetAnalyticsDetails().FirstOrDefault();
            return Json(data, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult ImportLookUpFile(HttpPostedFileBase importFile)
        {
            if (importFile == null) return Json(new { Status = 0, Message = "No File Selected" });

            try
            {
                var empList = new List<LookUpViewModel>();
                List<LookUpViewModel> fileData = new List<LookUpViewModel>();

                // ExcelDataReader works with the binary Excel file, so it needs a FileStream
                // to get started. This is how we avoid dependencies on ACE or Interop:
                Stream stream = importFile.InputStream;

                IExcelDataReader reader = null;


                if (importFile.FileName.EndsWith(".xls"))
                {
                    reader = ExcelReaderFactory.CreateReader(stream);
                }
                else if (importFile.FileName.EndsWith(".xlsx"))
                {
                    reader = ExcelReaderFactory.CreateReader(stream);
                }
                else if (importFile.FileName.EndsWith(".csv"))
                {
                    reader = ExcelReaderFactory.CreateCsvReader(stream);
                }
                else
                {
                    return Json(new { Status = 0, Message = "This file format is not supported" });
                }
                int fieldcount = reader.FieldCount;
                int rowcount = reader.RowCount;
                DataTable dt1 = new DataTable();
                DataRow row;
                DataTable dt_ = new DataTable();

                dt_ = reader.AsDataSet().Tables[0];
                for (int i = 0; i < dt_.Columns.Count; i++)
                {
                    dt1.Columns.Add(dt_.Rows[0][i].ToString());
                }
                int rowcounter = 0;
                for (int row_ = 1; row_ < dt_.Rows.Count; row_++)
                {
                    row = dt1.NewRow();

                    for (int col = 0; col < dt_.Columns.Count; col++)
                    {
                        row[col] = dt_.Rows[row_][col].ToString();
                        rowcounter++;
                    }
                    dt1.Rows.Add(row);
                }

                DataSet result = new DataSet();
                result.Tables.Add(dt1);
                reader.Close();
                reader.Dispose();

                var dt = result.Tables[0];
                CodexMinningEntities _ctx = new CodexMinningEntities();

                SqlParameter[] parameters =
               {
                    new SqlParameter
                    {
                        SqlDbType = SqlDbType.Structured,
                        Direction = ParameterDirection.Input,
                        ParameterName = "MinningType",
                        TypeName = "MinningTableType", //Don't forget this one!
                        Value = dt
                    }
                };
                var list = _ctx.Database.ExecuteSqlCommand("exec Sp_AddUpdateMinning @MinningType", parameters);

                return Json(new { Status = 1, Message = "File Imported Successfully " });
            }
            catch (Exception ex)
            {
                return Json(new { Status = 0, Message = "Error In Transaction.Failed to Import" });
            }
        }
        [HttpGet]
        public JsonResult DownloadLookUpFile()
        {
            string localFilePath = HttpContext.Server.MapPath("~/Content/file/CodexMinningLookUp.xlsx");

            //string fileExtension = Path.GetExtension(path);

            //S2:Read File as Byte Array
            byte[] fileData = System.IO.File.ReadAllBytes(localFilePath);
            //var bytes = Convert.FromBase64String(res.ReportContent);
            Response.Clear();
            MemoryStream ms = new MemoryStream(fileData);
            Response.ContentType = "application/vnd.ms-excel";
            Response.AddHeader("content-disposition", "attachment;filename=CodexMinningLookUp.xlsx");
            Response.Buffer = true;
            ms.WriteTo(Response.OutputStream);
            Response.End();

            return Json("", JsonRequestBehavior.AllowGet);

        }
        public class LookUpViewModel
        {
            public string Type { get; set; }
            public string LookupKey { get; set; }
            public string LookupValue { get; set; }
        }



        [HttpGet, Route("exportMininngData")]
        public void ExportMininngData()
        {
            try
            {
                CodexMinningEntities _ctx = new CodexMinningEntities();

                var list = _ctx.SP_ExportMininngData().ToList();
                var table = list.ToDataTable();

                var fileConfig = _ctx.Settings.FirstOrDefault(x => x.Key == "ExportMininngData");

                var exportFile = new ExportFileVM()
                {
                    FileName = "MininngData",
                    FileColumnsSequence = fileConfig.Value.Split(',').ToArray(),
                    FileType = "xlsx",
                    TableFieldsCount = table?.Columns?.Count
                };

                ExportData.ExportExcel(exportFile, table);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

    }
    public static class ObjectToDatatable
    {
        public static DataTable ToDataTable<T>(this IEnumerable<T> self)
        {
            var properties = typeof(T).GetProperties();


            var dataTable = new DataTable();
            foreach (var info in properties)
                dataTable.Columns.Add(info.Name, Nullable.GetUnderlyingType(info.PropertyType)
                   ?? info.PropertyType);


            foreach (var entity in self)
                dataTable.Rows.Add(properties.Select(p => p.GetValue(entity)).ToArray());

            return dataTable;
        }
    }


}