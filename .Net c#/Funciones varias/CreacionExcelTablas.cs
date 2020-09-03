using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Office.Interop.Excel;

namespace CreacionMasivaDeAsegurados.Forms
{
    class Creacion_Excel_TablasP
    {

        private Microsoft.Office.Interop.Excel.Application aplicacion;
        private Microsoft.Office.Interop.Excel.Workbook libros_trabajo;
        private Microsoft.Office.Interop.Excel.Worksheet Ihoja_Tipo_Doc;
        private Microsoft.Office.Interop.Excel.Worksheet Ihoja_test_civil;
        private Microsoft.Office.Interop.Excel.Worksheet Ihoja_Tocupacion;
        private Microsoft.Office.Interop.Excel.Worksheet Ihoja_Ttipo_telef;
        private Microsoft.Office.Interop.Excel.Worksheet Ihoja_Ttipo_dir;
        private Microsoft.Office.Interop.Excel.Worksheet Ihoja_Tmunicipio;
        private Microsoft.Office.Interop.Excel.Worksheet Ihoja_Tdpto;



        public string crear_Doc_Excel()
        {
            string respuesta = string.Empty;
            try
            {

                SaveFileDialog fichero = new SaveFileDialog();
                fichero.Filter = "Excel (*.xls)|*.xls";
                fichero.FileName = "Tablas Parametricas SISE";
                if (fichero.ShowDialog() == DialogResult.OK)
                {              


                    aplicacion = new Microsoft.Office.Interop.Excel.Application();
                    libros_trabajo = aplicacion.Workbooks.Add();
                    Hoja_Tipo_Doc doc = new Hoja_Tipo_Doc();
                    Hoja_test_civil civil = new Hoja_test_civil();
                    Hoja_Ttipo_telef teleft = new Hoja_Ttipo_telef();
                    Hoja_Ttipo_dir dir = new Hoja_Ttipo_dir();
                    Hoja_Tmunicipio municipio = new Hoja_Tmunicipio();
                    Hoja_Tdpto departamento = new Hoja_Tdpto();
                    Hoja_Tocupacion ocupacion = new Hoja_Tocupacion();

                    var watch = System.Diagnostics.Stopwatch.StartNew();

                    Ihoja_Tipo_Doc = doc.creacionExcelHTD(Ihoja_Tipo_Doc, libros_trabajo); //pinta la hoja Ihoja_Tipo_Doc
                    Ihoja_test_civil = civil.creacionExcelHTD(Ihoja_test_civil, libros_trabajo); //pinta la hoja Ihoja_test_civil
                    Ihoja_Ttipo_telef = teleft.creacionExcelHTD(Ihoja_Ttipo_telef, libros_trabajo); //pinta la hoja Ihoja_Ttipo_telef
                    Ihoja_Tocupacion = ocupacion.creacionExcelHTD(Ihoja_Tocupacion, libros_trabajo);//pinta la hoja Ihoja_Tocupacion
                    Ihoja_Ttipo_dir = dir.creacionExcelHTD(Ihoja_Ttipo_dir, libros_trabajo);//pinta la hoja Ihoja_Ttipo_dir
                    Ihoja_Tmunicipio = municipio.creacionExcelHTD(Ihoja_Tmunicipio, libros_trabajo);//pinta la hoja Ihoja_Tmunicipio
                    Ihoja_Tdpto = departamento.creacionExcelHTD(Ihoja_Tdpto, libros_trabajo); //pinta la hoja Ihoja_Tdpto

                    watch.Stop();
                    var elapsedMs = watch.ElapsedMilliseconds;
                  
                    libros_trabajo.SaveAs(fichero.FileName, Microsoft.Office.Interop.Excel.XlPaperSize.xlPaperLetter);
                    libros_trabajo.Close(false, fichero.FileName, null);
                    aplicacion.Quit();
                    System.Runtime.InteropServices.Marshal.FinalReleaseComObject(libros_trabajo);
                    System.Runtime.InteropServices.Marshal.FinalReleaseComObject(aplicacion);
                }
                else {
                    return respuesta = null;
                }
            }

            catch (Exception ex)
            {

                MessageBox.Show(ex.Message, "lo mas probable es que tengas el archvo con el mismo nombre abierto");
            }
            return respuesta;
        }
    }
}


//--------------------------------------------------------------------------------------------------------------------
//creacion de hoja


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Office.Interop.Excel;
using CreacionMasivaDeAsegurados.Entidades;
using CreacionMasivaDeAsegurados.Negocio;

namespace CreacionMasivaDeAsegurados.Forms
{
    class Hoja_Tdpto
    {
        Microsoft.Office.Interop.Excel.Application aplicacion;



        public Worksheet creacionExcelHTD(Microsoft.Office.Interop.Excel.Worksheet hoja_trabajo, Microsoft.Office.Interop.Excel.Workbook libros_trabajo)
        {

            hoja_trabajo = (Worksheet)libros_trabajo.Worksheets.Add(Type.Missing, Type.Missing, Type.Missing);
            hoja_trabajo = (Microsoft.Office.Interop.Excel.Worksheet)libros_trabajo.Worksheets.get_Item(2);
            hoja_trabajo.Activate();
            hoja_trabajo.Name = "Departamentos";
            hoja_trabajo.Columns.AutoFit();
            hoja_trabajo.Rows.AutoFit();
            Microsoft.Office.Interop.Excel.Range chartRange1; chartRange1 = hoja_trabajo.get_Range("A5", "B5");
            chartRange1.BorderAround2();
            //----------------------------------------------------

            Procesos_tablas_paramBLL p_Departamento = new Procesos_tablas_paramBLL();
            List<Departamento> lista_Departamento = new List<Departamento>();
            lista_Departamento = p_Departamento.procesar_Departamentos();
            hoja_trabajo.Columns.ColumnWidth = 20; 
            hoja_trabajo.Cells[5, 1] = "Codigo";
            hoja_trabajo.Cells[5, 1].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.Orange);
            hoja_trabajo.Cells[5, 2] = "Descripcion";
            hoja_trabajo.Cells[5, 2].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.Orange);
            int incremento = 6;
            foreach (var item in lista_Departamento)
            {
             Microsoft.Office.Interop.Excel.Range chartRange2; chartRange2 = hoja_trabajo.get_Range("A" + incremento, "B" + incremento);
             chartRange2.BorderAround2();
             hoja_trabajo.get_Range("A" + incremento).Value2 = item.cod_dpto;
             hoja_trabajo.get_Range("B" + incremento).Value2 = item.txt_desc;
             incremento = incremento + 1;
            }
            return hoja_trabajo;
        }
    }
}


//-----------------------leer xcel especifico



using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CreacionMasivaDeAsegurados.Entidades;
using CreacionMasivaDeAsegurados.Negocio;
using System.Windows.Forms;
using Microsoft.Office.Interop.Excel;

namespace CreacionMasivaDeAsegurados.Forms
{
   public class LeerPersonasMarcasPdp
    {


        public string Registrar_PersonasMarcasPdp()
        {

            Microsoft.Office.Interop.Excel.Application Aplic = new Microsoft.Office.Interop.Excel.Application();
            Microsoft.Office.Interop.Excel.Workbook Libro = Aplic.Workbooks.Open("ruta", Type.Missing, true, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);
            Microsoft.Office.Interop.Excel.Worksheet Hoja3 = (Microsoft.Office.Interop.Excel.Worksheet)Libro.Worksheets.get_Item(3);
            PersonasMarca PersonasMarcasPdp = new PersonasMarca();

            string respuesta = string.Empty;

            if (Hoja3.Name != "Personas_MarcasPDP")
            {
                return respuesta = "El Formato que esta utilizando es el incorrecto";
            }
            if (Hoja3.Columns.Count == 3)
            {
                return respuesta = "las columnas no concuerdan con el formato";
            }

            int incremento = 2;

            foreach (var item in Hoja3.Rows.EntireRow)
            {
            Microsoft.Office.Interop.Excel.Range rangoh31 = Hoja3.get_Range("A2", "A2");
            PersonasMarcasPdp.ID_REGISTRO = rangoh31.Text.ToString();
            Microsoft.Office.Interop.Excel.Range rangoh32 = Hoja3.get_Range("B2", "B2");
            PersonasMarcasPdp.cod_marca = rangoh32.Text.ToString();
            Microsoft.Office.Interop.Excel.Range rangoh33 = Hoja3.get_Range("C2", "C2");
            PersonasMarcasPdp.sn_activa = rangoh33.Text.ToString();

                incremento = 1 + incremento;
            }

            return respuesta;
        }
    }
}
//--------------------------crear una plantilla ------------------


using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Office.Interop.Excel;

namespace CreacionMasivaDeAsegurados.Forms
{
    class Plantilla
    {
        private Microsoft.Office.Interop.Excel.Application aplicacion;
        private Microsoft.Office.Interop.Excel.Workbook libros_trabajo;
      

        public String GenerarPlantilla() {
            Microsoft.Office.Interop.Excel.Worksheet hoja_trabajo;
            Microsoft.Office.Interop.Excel.Worksheet hoja_trabajo2;

            string respuesta = string.Empty;


            SaveFileDialog fichero = new SaveFileDialog();
            fichero.Filter = "Excel (*.xls)|*.xls";
            fichero.FileName = "Plantilla";
            if (fichero.ShowDialog() == DialogResult.OK)
            {

                aplicacion = new Microsoft.Office.Interop.Excel.Application();
                libros_trabajo = aplicacion.Workbooks.Add();




                //-------------------------------------------------------Marcas Pdp---------------------------------------------------------------------------------------------



                Microsoft.Office.Interop.Excel.Worksheet hoja_trabajo3;

                hoja_trabajo3 = (Worksheet)libros_trabajo.Worksheets.Add(Type.Missing, Type.Missing, Type.Missing);
                hoja_trabajo3 = (Microsoft.Office.Interop.Excel.Worksheet)libros_trabajo.Worksheets.get_Item(1);
                hoja_trabajo3.Activate();
                hoja_trabajo3.Name = "PERSONAS_MARCAS_PDP";
                hoja_trabajo3.Columns.AutoFit();
                hoja_trabajo3.Rows.AutoFit();

                hoja_trabajo3.Columns.ColumnWidth = 30;

                hoja_trabajo3.Cells[1, 1] = "ID_REGISTRO";
                hoja_trabajo3.Cells[1, 1].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo3.Cells[1, 1].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));

                hoja_trabajo3.Cells[1, 2] = "COD_MARCA";
                hoja_trabajo3.Cells[1, 2].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo3.Cells[1, 2].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));


                hoja_trabajo3.Cells[1, 3] = "SN_ACTIVA";
                hoja_trabajo3.Cells[1, 3].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo3.Cells[1, 3].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));



                //-----------------------------------------------------PERSONAS ASOCIADAS--------------------------------------------------------------------------------------------------------------


                hoja_trabajo2 = (Worksheet)libros_trabajo.Worksheets.Add(Type.Missing, Type.Missing, Type.Missing);
                hoja_trabajo2 = (Microsoft.Office.Interop.Excel.Worksheet)libros_trabajo.Worksheets.get_Item(1);
                hoja_trabajo2.Activate();
                hoja_trabajo2.Name = "PERSONAS_ASOCIADAS";
                hoja_trabajo2.Columns.AutoFit();
                hoja_trabajo2.Rows.AutoFit();

                hoja_trabajo2.Columns.ColumnWidth = 30;

                hoja_trabajo2.Cells[1, 1] = "ID_REGISTRO";
                hoja_trabajo2.Cells[1, 1].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo2.Cells[1, 1].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));

                hoja_trabajo2.Cells[1, 2] = "COD_TIPO_DOC";
                hoja_trabajo2.Cells[1, 2].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo2.Cells[1, 2].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));

                hoja_trabajo2.Cells[1, 3] = "NRO_DOC";
                hoja_trabajo2.Cells[1, 3].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo2.Cells[1, 3].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));


                hoja_trabajo2.Cells[1, 4] = "TXT_APELLIDO1";
                hoja_trabajo2.Cells[1, 4].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo2.Cells[1, 4].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));

                hoja_trabajo2.Cells[1, 5] = "TXT_APELLIDO2";
                hoja_trabajo2.Cells[1, 5].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo2.Cells[1, 5].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));

                hoja_trabajo2.Cells[1, 6] = "TXT_NOMBRE1";
                hoja_trabajo2.Cells[1, 6].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo2.Cells[1, 6].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));

                hoja_trabajo2.Cells[1, 7] = "TXT_NOMBRE2";
                hoja_trabajo2.Cells[1, 7].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo2.Cells[1, 7].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));


                hoja_trabajo2.Cells[1, 8] = "COD_TIPO_ASOC";
                hoja_trabajo2.Cells[1, 8].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo2.Cells[1, 8].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));

                hoja_trabajo2.Cells[1, 9] = "PORC_PARTICIP";
                hoja_trabajo2.Cells[1, 9].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo2.Cells[1, 9].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));

                //-----------------------------------------------------Personas--------------------------------------------------------


                hoja_trabajo = (Worksheet)libros_trabajo.Worksheets.Add(Type.Missing, Type.Missing, Type.Missing);
                hoja_trabajo = (Microsoft.Office.Interop.Excel.Worksheet)libros_trabajo.Worksheets.get_Item(1);
                hoja_trabajo.Activate();
                hoja_trabajo.Name = "PERSONAS";
                hoja_trabajo.Columns.AutoFit();
                hoja_trabajo.Rows.AutoFit();


                Microsoft.Office.Interop.Excel.Range chartRange1; chartRange1 = hoja_trabajo.get_Range("A1", "R1");
                chartRange1.BorderAround2();

                hoja_trabajo.Columns.ColumnWidth = 30;
                hoja_trabajo.Columns.ColumnWidth = 20;
                hoja_trabajo.Cells[1, 1] = "ID_REGISTRO";
                hoja_trabajo.Cells[1, 1].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 1].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 2] = "COD_RAMO";
                hoja_trabajo.Cells[1, 2].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 2].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 3] = "ID_ASOCIADOR";
                hoja_trabajo.Cells[1, 3].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 3].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 4] = "TIPO_DOCUMENTO";
                hoja_trabajo.Cells[1, 4].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 4].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 5] = "NUMERO_DE_DOCUMENTO";
                hoja_trabajo.Cells[1, 5].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 5].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 6] = "PRIMER_APELLIDO";
                hoja_trabajo.Cells[1, 6].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 6].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 7] = "TXT_SEXO";
                hoja_trabajo.Cells[1, 7].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 7].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 8] = "COD_ESTADO_CIVIL";
                hoja_trabajo.Cells[1, 8].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 8].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 9] = "FEC_NAC";
                hoja_trabajo.Cells[1, 9].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 9].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 10] = "COD_CIUDAD_LUGAR_NAC";
                hoja_trabajo.Cells[1, 10].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 10].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 11] = "COD_TIPO_DIRECCIÓN";
                hoja_trabajo.Cells[1, 11].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 11].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 12] = "DIRECCION";
                hoja_trabajo.Cells[1, 12].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 12].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 13] = "COD_MUNICIPIO";
                hoja_trabajo.Cells[1, 13].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 13].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 14] = "COD_TIPO_DE_TELEFONO";
                hoja_trabajo.Cells[1, 14].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 14].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 15] = "TELEFONO";
                hoja_trabajo.Cells[1, 15].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 15].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 16] = "COD_OCUPACION";
                hoja_trabajo.Cells[1, 16].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 16].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 17] = "COD_CONDICION";
                hoja_trabajo.Cells[1, 17].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 17].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                hoja_trabajo.Cells[1, 18] = "SN_ONEROSO";
                hoja_trabajo.Cells[1, 18].Interior.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(0, 0, 128));
                hoja_trabajo.Cells[1, 18].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.FromArgb(240, 248, 255));
                //----------------------------------------------------------------------------------------------------------------------------------------------------------
                libros_trabajo.SaveAs(fichero.FileName, Microsoft.Office.Interop.Excel.XlPaperSize.xlPaperLetter);
                libros_trabajo.Close(true);
                aplicacion.Quit();
                ProcessStartInfo startInfo = new ProcessStartInfo();
                startInfo.FileName = fichero.FileName;
                Process.Start(startInfo);
                MessageBox.Show("se ha creado la Plantilla");
                return respuesta;
            }
            else {
                return null;
            }

        }
    }
}
//-----------------------------validar hoja excel


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Windows.Forms;
using CreacionMasivaDeAsegurados.Entidades;
using System.Data.SqlClient;
using CreacionMasivaDeAsegurados.Negocio;



namespace CreacionMasivaDeAsegurados.Forms
{
    public class ValidarDatosHojasExcel
    {

        public int Verifica(DataSet ds)
        {
            Insertar_Registro_ExcelBLL info = new Insertar_Registro_ExcelBLL();
            DataSet idInfo = info.buscaIdInformacion();
            int IdExcel = Convert.ToInt32(idInfo.Tables["Registro"].Rows[0]["IN_Id_Proceso"]);
            int aceptado = 0;
            int rechazado = 0;
            int DatosValidados = 0;
           
            try
            {
       

            foreach (DataColumn dc in ds.Tables[0].Columns)
            {
                if (dc.ColumnName == "TIPO_DOCUMENTO")
                    dc.AllowDBNull = true;
            }
            List<PersonaExcel> lista1 = new List<PersonaExcel>();
            Insertar_Registro_ExcelBLL excel = new Insertar_Registro_ExcelBLL();
            string[] error = new string[ds.Tables[0].Columns.Count];
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                
                DatosValidados++;
                string mensaje = string.Empty;
                int i = 0;
                foreach (DataColumn dc in ds.Tables[0].Columns)
                {
                    if (dr[dc].ToString() == string.Empty)
                    {
                        error[i] = dc.ColumnName;
                        i++;
                    }
                }
                if (i > 0)
                {
                    Array.Resize(ref error, i);
                    for (int j = 0; j < error.Length; j++)
                    {
                        mensaje += error[j] + ", ";
                    }
                    excel.InsertarDatosError(Convert.ToInt32(dr["ID_REGISTRO"].ToString()), "Los campos " + mensaje.Substring(0, mensaje.Length - 2) + " de este registro no tienen el formato correcto o esta vacio", IdExcel);
                    rechazado++;
                }
                else
                {
                    PersonaExcel item = new PersonaExcel();
                    lista1.Add(llenarListaPersona(dr));
                }
            }
            List<PersonaAsociada> lista2 = new List<PersonaAsociada>();
            foreach (DataRow dr in ds.Tables[1].Rows)
            {
                string mensaje = string.Empty;
                int i = 0;
                int cod_tipo_doc = 0;
                foreach (DataColumn dc in ds.Tables[1].Columns)
                {
                    if (dc.ColumnName == "COD_TIPO_DOC")
                        cod_tipo_doc = int.Parse(dr[dc].ToString());
                    if (dr[dc].ToString() == string.Empty)
                    {
                        if (!(((cod_tipo_doc == 3) && ((dc.ColumnName == "TXT_APELLIDO2") || (dc.ColumnName == "TXT_NOMBRE1") || (dc.ColumnName == "TXT_NOMBRE2"))) ||
                                ((cod_tipo_doc != 3) && ((dc.ColumnName == "TXT_APELLIDO2") || (dc.ColumnName == "TXT_NOMBRE2")))))
                        {
                            error[i] = dc.ColumnName;
                            i++;
                        }
                    }
                }
                if (i > 0)
                {
                    var resul = Resultado(error, i);
                    excel.InsertarDatosError(Convert.ToInt32(dr["ID_REGISTRO"].ToString()), "Los campos " + resul + " de este registro no tienen el formato correcto o esta vacio", IdExcel);
                    rechazado++;
                }
                else
                {
                    PersonaAsociada item = new PersonaAsociada();
                    lista2.Add(LLenar_PersonaAsociada(dr));
                }
            }
            List<PersonasMarca> lista3 = new List<PersonasMarca>();
      //     string[] error = new string[ds.Tables[2].Columns.Count];
            foreach (DataRow dr in ds.Tables[2].Rows)
            {
                string mensaje = string.Empty;
                int i = 0;
                foreach (DataColumn dc in ds.Tables[2].Columns)
                {
                    if (dr[dc].ToString() == string.Empty)
                    {
                    
                       error[i] = dc.ColumnName;
                       i++;

                    }
                }
                if (i > 0)
                {
                    Array.Resize(ref error,i);
                    for (int j = 0; j < error.Length; j++)
                    {
                        mensaje += error[j] + ", ";
                    }
                    excel.InsertarDatosError(Convert.ToInt32(dr["ID_REGISTRO"].ToString()), "Los campos " + mensaje.Substring(0, mensaje.Length - 2) + " de este registro no tienen el formato correcto o esta vacio", IdExcel);
                    rechazado++;
                }
                else
                {
                    PersonasMarca item = new PersonasMarca();
                    lista3.Add(LLenar_PersonasMarcasPdp(dr));
                }
            }
            PersonaAsociada LLenar_PersonaAsociada(DataRow dr)
            {
                PersonaAsociada obj = new PersonaAsociada()
                {
                    ID_REGISTRO = Convert.ToInt32(dr[0]),
                    cod_tipo_doc = Convert.ToInt32(dr[1]),
                    nro_doc = Convert.ToString(dr[2]),
                    txt_apellido1 = Convert.ToString(dr[3]),
                    txt_apellido2 = Convert.ToString(dr[4]),
                    txt_nombre = Convert.ToString(dr[5]),
                    txt_nombre2 = Convert.ToString(dr[6]),
                    cod_tipo_Asoc = Convert.ToInt32(dr[7]),
                    porc_particip = Convert.ToInt32(dr[8]),
                };
                return obj;
            }
            PersonasMarca LLenar_PersonasMarcasPdp(DataRow dr)
            {
                PersonasMarca obj = new PersonasMarca()
                {
                    ID_REGISTRO = Convert.ToInt32(dr[0]),
                    cod_marca = Convert.ToInt32(dr[1]),
                    sn_activa = Convert.ToInt32(dr[2])
                };
                return obj;
            }
            //-----------------------------------compara que la lista sin errores tambien se encuentra en las otras listas creando listas finales para cada uno -------------------------------------------------//
            List<PersonaExcel> personaLista = new List<PersonaExcel>();
            List<PersonaAsociada> asociadaLista = new List<PersonaAsociada>();
            List<PersonasMarca> personamarcaLista = new List<PersonasMarca>();
            personaLista = (from t in lista1 where lista2.Any(x => x.ID_REGISTRO == t.IN_id_registro) select t).ToList();
            asociadaLista = (from t in lista2 where lista1.Any(x => x.IN_id_registro == t.ID_REGISTRO) select t).ToList();
            personamarcaLista = (from t in lista3 where asociadaLista.Any(x => x.ID_REGISTRO == t.ID_REGISTRO) select t).ToList();
            aceptado = personaLista.Count;
            info.actualizarInformacionExcel(DatosValidados, rechazado, aceptado, IdExcel);
            Insertar_Registro_ExcelBLL excel1 = new Insertar_Registro_ExcelBLL();
            excel1.InsertarExcel2(personaLista, asociadaLista, personamarcaLista, IdExcel);
            return IdExcel;


            }
            catch (Exception)
            {

                return 0;
            }


        }

        private static PersonaExcel llenarListaPersona(DataRow dr)
        {
            PersonaExcel obj = new PersonaExcel()
            {
                IN_id_registro = Convert.ToInt32(dr[0]),
               IN_cod_ramo = Convert.ToInt32(dr[1]),
                VC_id_asociador = Convert.ToString(dr[2]),
                IN_tipo_documento = Convert.ToInt32(dr[3]),
                VC_numero_de_documento = Convert.ToString(dr[4]),
                VC_primer_apellido = Convert.ToString(dr[5]),
                CH_txt_sexo = Convert.ToString(dr[6]),
                IN_cod_estado_civil = Convert.ToInt32(dr[7]),
                DT_fec_nac = Convert.ToString(dr[8]),
                IN_cod_ciudad_lugar_nac = Convert.ToInt32(dr[9]),
                IN_cod_tipo_direccion = Convert.ToInt32(dr[10]),
                VC_direccion = Convert.ToString(dr[11]),
                IN_cod_municipio = Convert.ToInt32(dr[12]),
                IN_cod_tipo_de_telefono = Convert.ToInt32(dr[13]),
                VC_telefono = Convert.ToString(dr[14]),
                IN_cod_ocupacion = Convert.ToInt32(dr[15]),
                VC_cod_condicion = Convert.ToString(dr[16]),
                IN_sn_oneroso = Convert.ToInt32(dr[17]),
            };
            return obj;
        }
        private static string Resultado(string[] error, int i)
        {
            string resul = string.Empty;
            Array.Resize(ref error, i);
            for (int j = 0; j < error.Length; j++)
            {
                resul += error[j] + ", ";
            }
            resul = resul.Substring(0, resul.Length - 2);
            return resul;



        }

    }



}


