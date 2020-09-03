using System;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;

namespace EnvioAutomaticoPoliza.Datos
{
    public class Procedimiento
    {


        //Metodo que llama el sp que se encarga de ejcutar las acciones que se utilizan para generar
        //muestras y modificaciones en los datos de la tabla de impresion(Tb_Mt_impresion)
        public static DataSet OperacionesProcesos(int Cod_Sucursal, int Cod_Ramo, string Nro_Poliza, int Nro_Endoso,string Usuario,string NombreImpresora, 
            int CodTipoDocumento, string NroDocumento, int TipoTransaccion,int Aplicacion,string CorreoAsegOp,string NombreAsegOp,int AsegOp)
        {

            using (var con = new SqlConnection(Conexion.Cadena_Conexion("SISE")))
            {
                SqlDataAdapter ad = new SqlDataAdapter();
                SqlCommand cmd = new SqlCommand();
                SqlCommand comm = null;
                DataSet ds;

                try
                {
                    comm = new SqlCommand("Usp_ImpPol_FuncionesImpresion", con);
                    comm.CommandText = "Usp_ImpPol_FuncionesImpresion";
                    comm.CommandType = CommandType.StoredProcedure;
                    comm.Parameters.Add("@VAR_IN_TipoTransaccion", SqlDbType.Int).Value = TipoTransaccion;
                    comm.Parameters.Add("@VAR_IN_CodigoSucursal", SqlDbType.Int).Value = Cod_Sucursal;
                    comm.Parameters.Add("@VAR_IN_CodigoRamo", SqlDbType.Int).Value = Cod_Ramo;
                    comm.Parameters.Add("@VAR_VC_NumeroPoliza", SqlDbType.VarChar).Value = Nro_Poliza;
                    comm.Parameters.Add("@VAR_IN_NumeroEndoso", SqlDbType.Int).Value = Nro_Endoso;
                    comm.Parameters.Add("@VAR_VC_Usuario", SqlDbType.VarChar).Value = Usuario;
                    comm.Parameters.Add("@VAR_VC_NombreImpresora", SqlDbType.VarChar).Value = NombreImpresora;
                    comm.Parameters.Add("@VAR_IN_TipoDocumento", SqlDbType.Int).Value = CodTipoDocumento;
                    comm.Parameters.Add("@VAR_VC_NroDocumento", SqlDbType.VarChar).Value = NroDocumento;
                    comm.Parameters.Add("@VAR_IN_aplicacion", SqlDbType.Int).Value = Aplicacion;
                    comm.Parameters.Add("@VAR_VC_CorreoAsegOp", SqlDbType.VarChar).Value = CorreoAsegOp;
                    comm.Parameters.Add("@VAR_VC_NombreAsegOp", SqlDbType.VarChar).Value = NombreAsegOp;
                    comm.Parameters.Add("@VAR_Sn_AsegOp", SqlDbType.Int).Value = AsegOp;


                    ds = new DataSet();
                    ad = new SqlDataAdapter();
                    ad.SelectCommand = comm;
                    ad.Fill(ds, "Registro");
                    con.Close();
                    
                }
                catch (SqlException exSql)
                {
                    EventLog.WriteEntry("Hay algun problema con la operacion de procesos", "Error: " + exSql.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                catch (Exception ex)
                {
                    EventLog.WriteEntry("Error", "Error : " + ex.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                finally
                {
                    if (con.State == ConnectionState.Open)
                    {
                        con.Close();
                        con.Dispose();
                        SqlConnection.ClearPool(con);
                    }
                    if (comm != null)
                        comm.Dispose();
                }
                return ds;
            }
           
        }

        public static DataSet OperacionesLog(int id_proceso,int id_operacion, string Mensaje, string Usuario, int TipoTransaccion)
        {
            using (var con = new SqlConnection(Conexion.Cadena_Conexion("SISE")))
            {
                SqlDataAdapter ad = new SqlDataAdapter();
                SqlCommand cmd = new SqlCommand();
                SqlCommand comm = null;
                DataSet ds;
                try
                {
                    comm = new SqlCommand("Usp_ImpPol_FuncionesLog", con);
                    comm.CommandType = CommandType.StoredProcedure;
                    comm.CommandText = "Usp_ImpPol_FuncionesLog";
                    comm.Parameters.Add("@VAR_IN_Id_Proceso", SqlDbType.Int).Value = id_proceso;
                    comm.Parameters.Add("@VAR_IN_COD_Opera", SqlDbType.Int).Value = id_operacion;
                    comm.Parameters.Add("@VAR_VC_Mensage", SqlDbType.VarChar).Value = Mensaje;
                    comm.Parameters.Add("@VAR_VC_Usuario", SqlDbType.VarChar).Value = Usuario;
                    comm.Parameters.Add("@VAR_IN_TipoTransaccion", SqlDbType.Int).Value = TipoTransaccion;
                    ds = new DataSet();
                    ad = new SqlDataAdapter();
                    ad.SelectCommand = comm;
                    ad.Fill(ds, "Registro");
                    con.Close();
                }
                catch (SqlException exSql)
                {
                    EventLog.WriteEntry("Hay algun problema con la operacion de log", "Error: " + exSql.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                catch (Exception ex)
                {
                    EventLog.WriteEntry("Error", "Error : " + ex.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                finally
                {
                    if (con.State == ConnectionState.Open)
                    {
                        con.Close();
                        con.Dispose();
                        SqlConnection.ClearPool(con);
                    }
                    if (comm != null)
                        comm.Dispose();
                }
                return ds;
            }
        }



        public static DataSet OperacionesDeParametrizacion(int id, int Cod_Ramo, int Cod_Tipo_Pol, int Cod_Tipo_Doc,bool Sn_Hab, int TipoTransaccion)
        {
            using (var con = new SqlConnection(Conexion.Cadena_Conexion("SISE")))
            {
                SqlDataAdapter ad = new SqlDataAdapter();
                SqlCommand cmd = new SqlCommand();
                SqlCommand comm = null;
                DataSet ds;
                try
                {
                    comm = new SqlCommand("Usp_ImpPol_FuncionesParamRamo", con);
                    comm.CommandType = CommandType.StoredProcedure;
                    comm.CommandText = "Usp_ImpPol_FuncionesParamRamo";
                    comm.Parameters.Add("@VAR_IN_ID", SqlDbType.Int).Value = id;
                    comm.Parameters.Add("@VAR_IN_Cod_Ramo", SqlDbType.Int).Value = Cod_Ramo;
                    comm.Parameters.Add("@VAR_IN_Cod_Tipo_Pol", SqlDbType.Int).Value = Cod_Tipo_Pol;
                    comm.Parameters.Add("@VAR_IN_Cod_Tipo_Doc", SqlDbType.Int).Value = Cod_Tipo_Doc;
                    comm.Parameters.Add("@VAR_IN_Sn_Hab", SqlDbType.Bit).Value = Sn_Hab;
                    comm.Parameters.Add("@VAR_IN_Transaccion", SqlDbType.Int).Value = TipoTransaccion;
                    ds = new DataSet();
                    ad = new SqlDataAdapter();
                    ad.SelectCommand = comm;
                    ad.Fill(ds, "Registro");
                    con.Close();
                }
                catch (SqlException exSql)
                {
                    EventLog.WriteEntry("Hay algun problema con la operacion de Parametrizacion", "Error: " + exSql.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                catch (Exception ex)
                {
                    EventLog.WriteEntry("Error", "Error : " + ex.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                finally
                {
                    if (con.State == ConnectionState.Open)
                    {
                        con.Close();
                        con.Dispose();
                        SqlConnection.ClearPool(con);
                    }
                    if (comm != null)
                        comm.Dispose();
                }
                return ds;
            }
        }



        public static DataSet DatosDeParametrizacionNombres(int id, string Ramo, string Pol, string Tipo_Doc, bool Sn_Hab, int TipoTransaccion)
        {
            using (var con = new SqlConnection(Conexion.Cadena_Conexion("SISE")))
            {
                SqlDataAdapter ad = new SqlDataAdapter();
                SqlCommand cmd = new SqlCommand();
                SqlCommand comm = null;
                DataSet ds;
                try
                {
                    comm = new SqlCommand("Sp_Parametrizacion_Nombres", con);
                    comm.CommandType = CommandType.StoredProcedure;
                    comm.CommandText = "Sp_Parametrizacion_Nombres";
                    comm.Parameters.Add("@VAR_IN_ID", SqlDbType.Int).Value = id;
                    comm.Parameters.Add("@VAR_IN_Cod_Ramo", SqlDbType.VarChar).Value = Ramo;
                    comm.Parameters.Add("@VAR_IN_Cod_Tipo_Pol", SqlDbType.VarChar).Value = Pol;
                    comm.Parameters.Add("@VAR_IN_Cod_Tipo_Doc", SqlDbType.VarChar).Value = Tipo_Doc;
                    comm.Parameters.Add("@VAR_IN_Sn_Hab", SqlDbType.Int).Value = Sn_Hab;
                    comm.Parameters.Add("@VAR_IN_Transaccion", SqlDbType.Int).Value = TipoTransaccion;
                    ds = new DataSet();
                    ad = new SqlDataAdapter();
                    ad.SelectCommand = comm;
                    ad.Fill(ds, "Registro");
                    con.Close();
                }
                catch (SqlException exSql)
                {
                    EventLog.WriteEntry("Hay algun problema con la operacion de Parametrizacion", "Error: " + exSql.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                catch (Exception ex)
                {
                    EventLog.WriteEntry("Error", "Error : " + ex.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                finally
                {
                    if (con.State == ConnectionState.Open)
                    {
                        con.Close();
                        con.Dispose();
                        SqlConnection.ClearPool(con);
                    }
                    if (comm != null)
                        comm.Dispose();
                }
                return ds;
            }
        }


        //-----------------------------------------------------------------------------------------------------------------------


        public static DataSet DatosCorreoCopia(int Procedimiento, int id_app, string cod_Usuario, string VC_correo, int sn_cc_hab, int sn_cco_hab)
        {
            using (var con = new SqlConnection(Conexion.Cadena_Conexion("SISE")))
            {
                SqlDataAdapter ad = new SqlDataAdapter();
                SqlCommand cmd = new SqlCommand();
                SqlCommand comm = null;
                DataSet ds;
                try
                {
                    comm = new SqlCommand("Usp_ImpPol_FuncionesCopiaCorreo", con);
                    comm.CommandType = CommandType.StoredProcedure;
                   // comm.CommandText = "Sp_Parametrizacion_Nombres";
                    comm.Parameters.Add("@IN_Transaccion", SqlDbType.Int).Value = Procedimiento;
                    comm.Parameters.Add("@IN_id_app", SqlDbType.Int).Value = id_app;
                    comm.Parameters.Add("@VC_cod_Usuario", SqlDbType.VarChar).Value = cod_Usuario;
                    comm.Parameters.Add("@VC_correo", SqlDbType.VarChar).Value = VC_correo;
                    comm.Parameters.Add("@IN_sn_cc_hab", SqlDbType.Int).Value = sn_cc_hab;
                    comm.Parameters.Add("@IN_sn_cco_hab", SqlDbType.Int).Value = sn_cco_hab;
                    ds = new DataSet();
                    ad = new SqlDataAdapter();
                    ad.SelectCommand = comm;
                    ad.Fill(ds, "Registro");
                    con.Close();
                }
                catch (SqlException exSql)
                {
                    EventLog.WriteEntry("Hay algun problema con la operacion de Parametrizacion", "Error: " + exSql.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                catch (Exception ex)
                {
                    EventLog.WriteEntry("Error", "Error : " + ex.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                finally
                {
                    if (con.State == ConnectionState.Open)
                    {
                        con.Close();
                        con.Dispose();
                        SqlConnection.ClearPool(con);
                    }
                    if (comm != null)
                        comm.Dispose();
                }
                return ds;
            }
        }

        //-------------------------------------------------------generar cuerpo de html------------------------------------------------------------------------



        public static DataSet EstructuraCorreo(int Procedimiento, int id_app, int id_html,string htmlcabecera, string htmlcuerpo, string htmlopcional, string imagen1)
        {
            using (var con = new SqlConnection(Conexion.Cadena_Conexion("SISE")))
            {
                SqlDataAdapter ad = new SqlDataAdapter();
                SqlCommand cmd = new SqlCommand();
                SqlCommand comm = null;
                DataSet ds;
                try
                {
                    comm = new SqlCommand("Usp_ImpPol_FuncionesHtmlCorreo", con);
                    comm.CommandType = CommandType.StoredProcedure;
                    // comm.CommandText = "Sp_Parametrizacion_Nombres";
                    comm.Parameters.Add("@VAR_IN_Transaccion", SqlDbType.Int).Value = Procedimiento;
                    comm.Parameters.Add("@VAR_app", SqlDbType.Int).Value = id_app;
                    comm.Parameters.Add("@VAR_id_html", SqlDbType.Int).Value = id_html;
                    comm.Parameters.Add("@VAR_htmlcabecera", SqlDbType.VarChar).Value = htmlcabecera;
                    comm.Parameters.Add("@VAR_htmlcuerpo", SqlDbType.VarChar).Value = htmlcuerpo;
                    comm.Parameters.Add("@VAR_htmlopcional", SqlDbType.VarChar).Value = htmlopcional;
                    comm.Parameters.Add("@VAR_imagen1", SqlDbType.VarChar).Value = imagen1;
                   

                    ds = new DataSet();
                    ad = new SqlDataAdapter();
                    ad.SelectCommand = comm;
                    ad.Fill(ds, "Registro");
                    con.Close();
                }
                catch (SqlException exSql)
                {
                    EventLog.WriteEntry("Hay algun problema con la generacion del cuerpo del correo", "Error: " + exSql.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                catch (Exception ex)
                {
                    EventLog.WriteEntry("Error", "Error : " + ex.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                finally
                {
                    if (con.State == ConnectionState.Open)
                    {
                        con.Close();
                        con.Dispose();
                        SqlConnection.ClearPool(con);
                    }
                    if (comm != null)
                        comm.Dispose();
                }
                return ds;
            }
        }

        //------------------------------------------------------ Generar nueva aplicacion De Impresion------------------------------------------------------------



        public static DataSet CrearAplicacion(int IN_IdApp, string NombreAplicacion, string AppCorto, int IN_TipoTransaccion)
        {
            using (var con = new SqlConnection(Conexion.Cadena_Conexion("SISE")))
            {
                SqlDataAdapter ad = new SqlDataAdapter();
                SqlCommand cmd = new SqlCommand();
                SqlCommand comm = null;
                DataSet ds;
                try
                {
                    comm = new SqlCommand("Usp_ImpPol_FuncionesAplicacion", con);
                    comm.CommandType = CommandType.StoredProcedure;
                    // comm.CommandText = "Sp_Parametrizacion_Nombres";
                    comm.Parameters.Add("@VAR_IN_IdApp", SqlDbType.Int).Value = IN_IdApp;
                    comm.Parameters.Add("@VAR_VC_NombreLargoApp", SqlDbType.VarChar).Value = NombreAplicacion;
                    comm.Parameters.Add("@VAR_VC_NombreCortoApp", SqlDbType.VarChar).Value = AppCorto;
                    comm.Parameters.Add("@VAR_IN_TipoTransaccion", SqlDbType.Int).Value = IN_TipoTransaccion;

                    ds = new DataSet();
                    ad = new SqlDataAdapter();
                    ad.SelectCommand = comm;
                    ad.Fill(ds, "Registro");
                    con.Close();
                }
                catch (SqlException exSql)
                {
                    EventLog.WriteEntry("Hay algun problema con la generacion del cuerpo del correo", "Error: " + exSql.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                catch (Exception ex)
                {
                    EventLog.WriteEntry("Error", "Error : " + ex.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                finally
                {
                    if (con.State == ConnectionState.Open)
                    {
                        con.Close();
                        con.Dispose();
                        SqlConnection.ClearPool(con);
                    }
                    if (comm != null)
                        comm.Dispose();
                }
                return ds;
            }
        }

        //-----------------------------------------------------------------------------------------------------------------------------------------------

                       
        public static DataSet CrearRutas(int proceso,int Id_Doc,int in_app,int hab)
        {
            using (var con = new SqlConnection(Conexion.Cadena_Conexion("SISE")))
            {
                SqlDataAdapter ad = new SqlDataAdapter();
                SqlCommand cmd = new SqlCommand();
                SqlCommand comm = null;
                DataSet ds;
                try
                {
                    comm = new SqlCommand("Usp_ImpPol_FuncionesDocumentos", con);
                    comm.CommandType = CommandType.StoredProcedure;
                    // comm.CommandText = "Sp_Parametrizacion_Nombres";
                    comm.Parameters.Add("@VAR_IN_Transaccion", SqlDbType.Int).Value = proceso;
                    comm.Parameters.Add("@VAR_IN_Id_doc_param", SqlDbType.Int).Value = Id_Doc;
                    comm.Parameters.Add("@VAR_IN_id_App", SqlDbType.Int).Value = in_app;
                    comm.Parameters.Add("@VAR_IN_Hab", SqlDbType.Int).Value = hab;

                    ds = new DataSet();
                    ad = new SqlDataAdapter();
                    ad.SelectCommand = comm;
                    ad.Fill(ds, "Registro");
                    con.Close();
                }
                catch (SqlException exSql)
                {
                    EventLog.WriteEntry("no se puede generar la ruta", "Error: " + exSql.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                catch (Exception ex)
                {
                    EventLog.WriteEntry("Error", "Error : " + ex.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                finally
                {
                    if (con.State == ConnectionState.Open)
                    {
                        con.Close();
                        con.Dispose();
                        SqlConnection.ClearPool(con);
                    }
                    if (comm != null)
                        comm.Dispose();
                }
                return ds;
            }
        }


        //--------------------------------------------------------------------------------------------------------------------------------




        public static DataSet CrearOtrosDocumentos(int proceso,int IdDocumento, int IN_id_App, int IN_Ramo, string VAR_NombreDocumento, int SN_Habilitar)
        {
            using (var con = new SqlConnection(Conexion.Cadena_Conexion("SISE")))
            {
                SqlDataAdapter ad = new SqlDataAdapter();
                SqlCommand cmd = new SqlCommand();
                SqlCommand comm = null;
                DataSet ds;
                try
                {
                    comm = new SqlCommand("Usp_ImpPol_FuncionesOtrosDocumentos", con);
                    comm.CommandType = CommandType.StoredProcedure;
                    // comm.CommandText = "Sp_Parametrizacion_Nombres";
                    comm.Parameters.Add("@VAR_IN_Transaccion", SqlDbType.Int).Value = proceso;
                    comm.Parameters.Add("@VAR_IN_IdDocumento", SqlDbType.Int).Value = IdDocumento;
                    comm.Parameters.Add("@VAR_IN_id_App", SqlDbType.Int).Value = IN_id_App;
                    comm.Parameters.Add("@VAR_IN_Ramo", SqlDbType.Int).Value = IN_Ramo;
                    comm.Parameters.Add("@VAR_VAR_NombreDocumento", SqlDbType.VarChar).Value = VAR_NombreDocumento;
                    comm.Parameters.Add("@VAR_SN_Habilitar", SqlDbType.Int).Value = SN_Habilitar;

                    ds = new DataSet();
                    ad = new SqlDataAdapter();
                    ad.SelectCommand = comm;
                    ad.Fill(ds, "Registro");
                    con.Close();
                }
                catch (SqlException exSql)
                {
                    EventLog.WriteEntry("no se puede generar la ruta", "Error: " + exSql.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                catch (Exception ex)
                {
                    EventLog.WriteEntry("Error", "Error : " + ex.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                finally
                {
                    if (con.State == ConnectionState.Open)
                    {
                        con.Close();
                        con.Dispose();
                        SqlConnection.ClearPool(con);
                    }
                    if (comm != null)
                        comm.Dispose();
                }
                return ds;
            }
        }




    }
}
