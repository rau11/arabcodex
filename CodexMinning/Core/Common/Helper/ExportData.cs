using SpreadsheetLight;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

namespace CodexMinning.Core.Common.Helper
{
    public static class ExportData
    {
        public static void ExportExcel(ExportFileVM exportFile, DataTable table)
        {
            //if table is null
            if (table?.Rows?.Count == 0)
            {
                foreach (var column in exportFile.FileColumnsSequence)
                {
                    table.Columns.Add(column);
                }
            }

            var tableToExport = table.Copy();
            for (int i = 0; i < exportFile.TableFieldsCount; i++)
            {
                string columnName = table?.Columns[i]?.ColumnName?.ToString();
                if (!exportFile.FileColumnsSequence.Contains(columnName))
                {
                    tableToExport.Columns.Remove(columnName);
                }
            }

            for (int i = 0; i < exportFile.FileColumnsSequence?.Count(); i++)
            {
                string columnName = exportFile.FileColumnsSequence[i];
                if (tableToExport.Columns.Contains(columnName))
                {
                    tableToExport.Columns[columnName].SetOrdinal(i);
                }
            }

            var buffer = tableToExport.GetExcelBytes();

            HttpContext.Current.Response.AddHeader("Content-Type", $"application/{exportFile.FileType}");
            HttpContext.Current.Response.AddHeader("Content-Disposition",
                $"attachment; filename={exportFile.FileName}.{exportFile.FileType};size ={buffer.Length.ToString()}");
            HttpContext.Current.Response.BinaryWrite(buffer);
            HttpContext.Current.Response.End();
        }

        public static byte[] GetExcelBytes(this DataTable rows)
        {
            byte[] excelBytes; using (MemoryStream stream = new MemoryStream())
            {
                using (SLDocument document = new SLDocument())
                {
                    SLStyle columnHeader = document.CreateStyle();
                    columnHeader.Font.Bold = true; columnHeader.Font.Italic = true;
                    DataTable dt = rows;
                    document.ImportDataTable(1, 1, dt, true);
                    document.SetCellStyle(1, 1, 1, dt.Columns.Count, columnHeader);
                    // excel formatting           
                    document.AutoFitColumn(1, dt.Columns.Count);
                    document.AutoFitRow(1, dt.Rows.Count);
                    document.SaveAs(stream);
                    stream.Position = 0;
                }
                excelBytes = stream.ToArray();
            }
            return excelBytes;
        }
    }
}