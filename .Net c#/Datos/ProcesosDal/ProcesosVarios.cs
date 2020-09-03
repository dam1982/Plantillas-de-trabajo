using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EnvioAutomaticoPoliza.Entidades;

namespace EnvioAutomaticoPoliza.Datos
{
    public class ProcesoDAL
    {
        public static DataSet ConsultarProcesosxImprimir()
        {
            DataSet ds = new DataSet();
            ds = Procedimiento.OperacionesProcesos(0, 0, "", 0, "", "",0,"",0,0,"","",0);
            if (ds.Tables.Count > 0)
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                }
            }
            return ds;
        }

        public static DataSet ConsultarDatosCliente(int cod_suc, int cod_ramo, string nro_pol, int nro_endo)
        {
            DataSet ds = new DataSet();
            try
            {
                ds = Procedimiento.OperacionesProcesos(cod_suc, cod_ramo, nro_pol, nro_endo, "", "", 0, "", 1,0, "", "", 0);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                    }
                }
            }
            catch (Exception ex)
            {

                EventLog.WriteEntry("error al consultar clientes", "Error : " + ex.Message, EventLogEntryType.Error);
            }
            finally
            {
            }
            return ds;
        }

        public static string ConfirmarImpresion(int cod_suc, int cod_ramo, string nro_pol, int nro_endo)
        {
            DataSet ds = new DataSet();
            string respuesta = string.Empty;
            try
            {
                ds = Procedimiento.OperacionesProcesos(cod_suc, cod_ramo, nro_pol, nro_endo, "", "", 0, "", 2,0, "", "", 0);
                respuesta = "Se ha confirmado la impresion";
            }
            catch (Exception ex)
            {
                respuesta = ex.Message;
            }
            finally
            {
            }
            return respuesta;
        }


        public static string ConfirmarEstado(int cod_suc, int cod_ramo, string nro_pol, int nro_endo)
        {
            DataSet ds = new DataSet();
            string respuesta = string.Empty;
            try
            {
                ds = Procedimiento.OperacionesProcesos(cod_suc, cod_ramo, nro_pol, nro_endo, "", "", 0, "", 3,0, "", "", 0);
                respuesta = "Se ha confirmado " +
                    " El estado";
            }
            catch (Exception ex)
            {
                respuesta = ex.Message;
            }
            finally
            {
            }
            return respuesta;
        }


        public static string ConfirmarCorreo(int cod_suc, int cod_ramo, string nro_pol, int nro_endo)
        {
            DataSet ds = new DataSet();
            string respuesta = string.Empty;
            try
            {
                ds = Procedimiento.OperacionesProcesos(cod_suc, cod_ramo, nro_pol, nro_endo, "", "", 0, "", 4,0, "", "", 0);
                if (ds.Tables.Count == 0)
                {
                   respuesta = "Se ha confirmado correo";
                   
                }
            }
            catch (Exception ex)
            {
                respuesta = ex.Message;
            }
            finally
            {
            }
            return respuesta;
        }



        public static DataSet ObtenerListadoPolizasProcesadas()
        {
            DataSet ds = new DataSet();
            try
            {
                ds = Procedimiento.OperacionesProcesos(0, 0, "", 0, "", "", 0, "", 5,0, "", "", 0);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        return ds;
                    }
                }
            }
            catch (Exception ex)
            {
                EventLog.WriteEntry("error al tener polizas procesadas", "Error : " + ex.Message, EventLogEntryType.Error);
            }
            finally
            {
            }
            return ds;
        }


        public static DataSet ObtenerListadodeConfirmacionImpresion()
        {
            DataSet ds = new DataSet();
            try
            {
                ds = Procedimiento.OperacionesProcesos(0, 0, "", 0, "", "", 0, "", 8,0, "", "", 0);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        return ds;
                    }
                }
            }
            catch (Exception ex)
            {
                EventLog.WriteEntry("error al tener listado de impresiones confirmadas", "Error : " + ex.Message, EventLogEntryType.Error);
            }
            finally
            {
            }
            return ds;
        }


        public static DataSet ObtenerListadodeConfirmacionEstado()
        {
            DataSet ds = new DataSet();
            try
            {
                ds = Procedimiento.OperacionesProcesos(0, 0, "", 0, "", "", 0, "", 9,0, "", "", 0);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        return ds;
                    }
                }
            }
            catch (Exception ex)
            {
                EventLog.WriteEntry("Error al tener confirmado el listado de estado", "Error : " + ex.Message, EventLogEntryType.Error);
            }
            finally
            {
            }
            return ds;
        }



        public static string ReiniciarOperacion(int cod_suc, int cod_ramo, string nro_pol, int nro_endo)
        {
            DataSet ds = new DataSet();
            string respuesta = string.Empty;
            try
            {
                ds = Procedimiento.OperacionesProcesos(cod_suc, cod_ramo, nro_pol, nro_endo, "", "", 0, "", 6,0, "", "", 0);
                if (ds.Tables.Count == 0)
                {
                   respuesta = "Empezando proceso de impresion de nuevo";
                }
            }
            catch (Exception ex)
            {
                respuesta = ex.Message;
            }
            finally
            {
            }
            return respuesta;
        }


        public static string ObtenerRutaDeImpresion(int cod_suc, int cod_ramo, string nro_pol, int nro_endo, string usuario, int CodTipoDocumento, string NroDocumento)
        {
            DataSet ds = new DataSet();
            string Respuesta = string.Empty;
            try
            {
                ds = Procedimiento.OperacionesProcesos(cod_suc, cod_ramo, nro_pol, nro_endo, usuario, "", CodTipoDocumento,NroDocumento, 7,0, "", "", 0);
                if (ds.Tables.Count > 0)
                {
                    Respuesta = Convert.ToString(ds.Tables[0].Rows[0][0]);
                }
            }
            catch (Exception ex)
            {
                Respuesta = ex.Message;
            }
            finally
            {
            }
            return Respuesta;
        }

       






       
        public static string InsertarDatosImpresion(int cod_suc, int cod_ramo, string nro_pol, int nro_endo,string Usuario,string NombreImpresora,int aplicacion, string CorreoAsegOp, string NombreAsegOp, int AsegOp)
        {
            DataSet ds = new DataSet();
            string respuesta = string.Empty;
            try
            {
                ds = Procedimiento.OperacionesProcesos(cod_suc, cod_ramo, nro_pol, nro_endo, Usuario, NombreImpresora, 0, "", 11, aplicacion, CorreoAsegOp, NombreAsegOp, AsegOp);
                if (ds.Tables.Count == 0)
                {
                     respuesta = "Se han Insertado los datos";
                }

            }
            catch (Exception ex)
            {
                respuesta = ex.Message;
            }
            finally
            {
            }
            return respuesta;
        }

        public static List<Rutas> ObtenerRutaLista(int cod_suc, int cod_ramo, string nro_pol, int nro_endo, string usuario, int CodTipoDocumento, string NroDocumento,int Aplicacion)
        {
            
            DataSet ds = new DataSet();
            List<Rutas> lista = new List<Rutas>();
            try
            {
                ds = Procedimiento.OperacionesProcesos(cod_suc, cod_ramo, nro_pol, nro_endo, usuario, "", CodTipoDocumento, NroDocumento, 7, Aplicacion, "", "", 0);
                if (ds.Tables.Count > 0)
                {
                    DataTable dt = ds.Tables[0];
                    foreach (DataRow dr in dt.Rows)
                        lista.Add(LlenarRegistro(dr));
                }
            }
            catch (Exception ex)
            {
                var a = ex.Message;
            }
            finally
            {
                ds = null;
            }
            return lista;
        }

        private static Rutas LlenarRegistro(DataRow dr)
        {
            Rutas obj = new Rutas()
            {
                Ruta = Convert.ToString(dr[0]),
            };
            return obj;
        }


                                    

        //------------------------------------buscar intermediarios----------------------------

        public static DataSet ObtenerIntermediario(int cod_suc, int cod_ramo, string nro_pol, int nro_endo)
        {
            DataSet ds = new DataSet();
            try
            {
                ds = Procedimiento.OperacionesProcesos(cod_suc, cod_ramo, nro_pol, nro_endo, "", "", 0, "", 13, 0, "", "", 0);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                    }
                }
            }
            catch (Exception ex)
            {
                EventLog.WriteEntry("Error al tener confirmado el listado de estado", "Error : " + ex.Message, EventLogEntryType.Error);
            }
            finally
            {
            }
            return ds;
        }






        //-------------------------------- crear rutas de impresion -------------------------


        public static string CrearRutasDeImpresion(int Id_Doc, int in_app, int hab)
        {
            DataSet ds = new DataSet();
            string respuesta = string.Empty;
            respuesta = "error";
            try
            {
                ds = Procedimiento.CrearRutas(0, Id_Doc, in_app, hab);
                
                    string mensaje = string.Empty;
                    DataTable dt = ds.Tables[0];

                    foreach (DataRow dr in dt.Rows)
                    {

                        respuesta = Convert.ToString(dr[0]);

                    }
               

            }
            catch (Exception ex)
            {
                respuesta = ex.Message;
            }
            finally
            {
            }
            return respuesta;
        }


        //--------------------------------------------------Actualizar rutas ------------------------

        public static string ActualizarRutasDeImpresion( int Id_Doc, int in_app, int hab)
        {
            DataSet ds = new DataSet();
            string respuesta = string.Empty;
            try
            {
                ds = Procedimiento.CrearRutas(1, Id_Doc, in_app, hab);
                if (ds.Tables.Count == 0)
                {
                    respuesta = "Se han Insertado los datos";
                }

            }
            catch (Exception ex)
            {
                respuesta = ex.Message;
            }
            finally
            {
            }
            return respuesta;
        }

        //-----------------------------------------------------------------------------------------

        public static List<RutaParam> ObtenerConfiguracionImpresion(int in_app)
        {

            DataSet ds = new DataSet();
            List<RutaParam> lista = new List<RutaParam>();
            try
            {
                ds = Procedimiento.CrearRutas(2,0, in_app,0);
                if (ds.Tables.Count > 0)
                {
                    DataTable dt = ds.Tables[0];
                    foreach (DataRow dr in dt.Rows)
                        lista.Add(verparametrosRutas(dr));
                }
            }
            catch (Exception ex)
            {
                var a = ex.Message;
            }
            finally
            {
                ds = null;
            }
            return lista;
        }



        private static RutaParam verparametrosRutas(DataRow dr) {


            RutaParam obj = new RutaParam()
            {
                Id_Documento = Convert.ToInt32(dr[0]),
                Id_Aplicacion = Convert.ToInt32(dr[1]),
                Habilitado =    Convert.ToInt32(dr[2]),
                               
            };
            return obj;

        }


        //---------------------------------------------------------------------------------------------------------------------------------------

       


        public static List<OtroDocumento> ObtenerotrosDocumentos(int IN_id_App)
        {

            DataSet ds = new DataSet();
            List<OtroDocumento> lista = new List<OtroDocumento>();
            try
            {
                ds = Procedimiento.CrearOtrosDocumentos(2,0,IN_id_App,0,"",0);
                if (ds.Tables.Count > 0)
                {
                    DataTable dt = ds.Tables[0];
                    foreach (DataRow dr in dt.Rows)
                        lista.Add(verOtroDoc(dr));
                }
            }
            catch (Exception ex)
            {
                var a = ex.Message;
            }
            finally
            {
                ds = null;
            }
            return lista;
        }



        private static OtroDocumento verOtroDoc(DataRow dr)
        {


            OtroDocumento obj = new OtroDocumento()
            {
                IN_Id_Documento = Convert.ToInt32(dr[0]),
                IN_Id_App = Convert.ToInt32(dr[1]),
                IN_Ramo = Convert.ToInt32(dr[2]),
                VAR_NombreDocumento = Convert.ToString(dr[3]),
                SN_Habilitar = Convert.ToInt32(dr[4]),

            };
            return obj;

        }


        //----------------------------------------------------------------------------------------------------------
     

        public static string ActualizarOtrosDocumentos(int Id_Documento, int IN_id_App,int IN_Ramo, int SN_Habilitar)
        {
            DataSet ds = new DataSet();
            string respuesta = string.Empty;
            try
            {
                ds = Procedimiento.CrearOtrosDocumentos(1, Id_Documento, IN_id_App, IN_Ramo,"", SN_Habilitar );
                string mensaje = string.Empty;
                DataTable dt = ds.Tables[0];

                foreach (DataRow dr in dt.Rows)
                {

                    respuesta = Convert.ToString(dr[0]);

                }

            }
            catch (Exception ex)
            {
                respuesta = ex.Message;
            }
            finally
            {
            }
            return respuesta;
        }


       

        public static string CrearOtrosDocumentos(int IN_id_App, int IN_Ramo, string VAR_NombreDocumento, int SN_Habilitar)
        {
            DataSet ds = new DataSet();
            string respuesta = string.Empty;
            try
            {
                ds = Procedimiento.CrearOtrosDocumentos(0,0, IN_id_App, IN_Ramo, VAR_NombreDocumento, SN_Habilitar);
               
                
                    DataTable dt = ds.Tables[0];
                    foreach (DataRow dr in dt.Rows ) {

                        respuesta = Convert.ToString(dr[0]);
                    }

                

            }
            catch (Exception ex)
            {
                respuesta = ex.Message;
            }
            finally
            {
            }
            return respuesta;
        }
    }
}
