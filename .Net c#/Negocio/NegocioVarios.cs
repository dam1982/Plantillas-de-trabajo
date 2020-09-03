using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EnvioAutomaticoPoliza.Datos;
using System.Data;
using System.Diagnostics;
using EnvioAutomaticoPoliza.Entidades;

namespace EnvioAutomaticoPoliza.Negocio
{
    public class ProcesoBLL
    {

        /// <summary>
        /// muestra los registros que no se han impreso
        /// </summary>
        /// <returns>dataset ds</returns>
        public static DataSet ConsultarImpresionesXImprimir() {
            DataSet ds = new DataSet();
            ProcesoDAL bd = new ProcesoDAL();
            ds = ProcesoDAL.ConsultarProcesosxImprimir();
            return ds;
        }
        /// <summary>
        /// consulta los datos del cliente
        /// </summary>
        /// <param name="cod_suc"></param>
        /// <param name="cod_ramo"></param>
        /// <param name="nro_pol"></param>
        /// <param name="nro_endo"></param>
        /// <returns>dataset ds</returns>
        public static DataSet consultarDatosXCliente(int cod_suc, int cod_ramo, string nro_pol, int nro_endo)
        {
            DataSet ds = new DataSet();
            ProcesoDAL bd = new ProcesoDAL();
            ds = ProcesoDAL.ConsultarDatosCliente(cod_suc, cod_ramo, nro_pol, nro_endo);
            return ds;
        }
        /// <summary>
        /// confirma que la impresion se ha hecho
        /// </summary>
        /// <param name="cod_suc"></param>
        /// <param name="cod_ramo"></param>
        /// <param name="nro_pol"></param>
        /// <param name="nro_endo"></param>
        /// <returns>dataset ds</returns>
        public static string ConfirmaLaImpresion(int cod_suc, int cod_ramo, string nro_pol, int nro_endo)
        {
            string respuesta = string.Empty;
            respuesta = ProcesoDAL.ConfirmarImpresion(cod_suc, cod_ramo, nro_pol, nro_endo);
            return respuesta;
        }
        /// <summary>
        /// confirma que el correo se a creado en la tabla de impresion
        /// </summary>
        /// <param name="cod_suc"></param>
        /// <param name="cod_ramo"></param>
        /// <param name="nro_pol"></param>
        /// <param name="nro_endo"></param>
        /// <returns>dataset ds</returns>
        public static string ConfirmarElEstado(int cod_suc, int cod_ramo, string nro_pol, int nro_endo)
        {
            string respuesta = string.Empty;
            respuesta = ProcesoDAL.ConfirmarEstado(cod_suc, cod_ramo, nro_pol, nro_endo);
            return respuesta;
        }
        /// <summary>
        /// confirma que el correo se a creado en la tabla de impresion
        /// </summary>
        /// <param name="cod_suc"></param>
        /// <param name="cod_ramo"></param>
        /// <param name="nro_pol"></param>
        /// <param name="nro_endo"></param>
        /// <returns>dataset ds</returns>
        public static string ConfirmarElCorreo(int cod_suc, int cod_ramo, string nro_pol, int nro_endo)
        {
            string respuesta = string.Empty;
            respuesta = ProcesoDAL.ConfirmarCorreo(cod_suc, cod_ramo, nro_pol, nro_endo);
            return respuesta;
        }
        /// <summary>
        /// muestra los registros que ya tienen la impresion hecha
        /// </summary>
        /// <returns>dataset ds</returns>
        public static DataSet ListadoDeImpresionesConfirmadas()
        {
            DataSet ds = new DataSet();
            ProcesoDAL bd = new ProcesoDAL();
            ds = ProcesoDAL.ObtenerListadodeConfirmacionImpresion();
            return ds;
        }
        /// <summary>
        /// muestra los registros que ya tienen el estado como confirmado
        /// </summary>
        /// <returns>dataset ds</returns>
        public static DataSet ListadoDeEstadosConfirmados()
        {
            DataSet ds = new DataSet();
            ProcesoDAL bd = new ProcesoDAL();
            ds = ProcesoDAL.ObtenerListadodeConfirmacionEstado();
            return ds;
        }
        /// <summary>
        /// muestra los registros que ya tienen todo el proceso echo
        /// </summary>
        /// <returns>dataset ds</returns>
        public static DataSet ListadoDePolizasProsesadas()
        {
            DataSet ds = new DataSet();
            ProcesoDAL bd = new ProcesoDAL();
            ds = ProcesoDAL.ObtenerListadoPolizasProcesadas();
            return ds;
        }
        /// <summary>
        /// resetea el proceso de impresion en registros terminados
        /// </summary>
        /// <param name="cod_suc"></param>
        /// <param name="cod_ramo"></param>
        /// <param name="nro_pol"></param>
        /// <param name="nro_endo"></param>
        /// <returns>dataset ds</returns>
        public static string ReiniciarOperacionImpresion(int cod_suc, int cod_ramo, string nro_pol, int nro_endo)
        {
            string respuesta = string.Empty;
            respuesta = ProcesoDAL.ReiniciarOperacion(cod_suc, cod_ramo, nro_pol, nro_endo);
            return respuesta;
        }
        /// <summary>
        /// Genera la ruta de impresion
        /// </summary>
        /// <param name="cod_suc"></param>
        /// <param name="cod_ramo"></param>
        /// <param name="nro_pol"></param>
        /// <param name="nro_endo"></param>
        /// <param name="usuario"></param>
        /// <param name="CodTipoDocumento"></param>
        /// <param name="NroDocumento"></param>
        /// <returns>dataset ds</returns>
        public static string SacarRutaDeImpresion(int cod_suc, int cod_ramo, string nro_pol, int nro_endo, string usuario, int CodTipoDocumento, string NroDocumento)
        {
            string respuesta = string.Empty;
            respuesta = ProcesoDAL.ObtenerRutaDeImpresion( cod_suc, cod_ramo,nro_pol,nro_endo,usuario,CodTipoDocumento,NroDocumento);
            return respuesta;
        }
        /// <summary>
        /// Genera la Impresion del pdf
        /// </summary>
        /// <param name="cod_suc"></param>
        /// <param name="cod_ramo"></param>
        /// <param name="nro_pol"></param>
        /// <param name="nro_endo"></param>
        /// <param name="usuario"></param>
        /// <param name="NombreImpresion"></param>
        /// <returns>dataset ds</returns>
        public static string Generar_Impresion(int cod_suc, int cod_ramo, string nro_pol, int nro_endo,string Usuario, string NombreImpresion,int aplicacion, string CorreoAsegOp, string NombreAsegOp, int AsegOp)
        {
            string respuesta = string.Empty;
            respuesta = ProcesoDAL.InsertarDatosImpresion(cod_suc, cod_ramo, nro_pol, nro_endo, Usuario, NombreImpresion, aplicacion, CorreoAsegOp, NombreAsegOp, AsegOp);
            return respuesta;
        }
        /// <summary>
        /// Muestra todas las rutas de impresion
        /// </summary>
        /// <param name="cod_suc"></param>
        /// <param name="cod_ramo"></param>
        /// <param name="nro_pol"></param>
        /// <param name="nro_endo"></param>
        /// <param name="usuario"></param>
        /// <param name="CodTipoDocumento"></param>
        /// <param name="NroDocumento"></param>
        /// <returns>dataset ds</returns>
        public static List<Rutas> Mostrar_ListaRutas(int cod_suc, int cod_ramo, string nro_pol, int nro_endo, string usuario, int CodTipoDocumento, string NroDocumento, int Aplicacion)
        {
            List<Rutas> lista = new List<Rutas>();
            lista = ProcesoDAL.ObtenerRutaLista(cod_suc,cod_ramo,nro_pol,nro_endo,usuario,CodTipoDocumento,NroDocumento, Aplicacion);
            return lista;
        }

        //---------------------------------------------buscar intermediario------------------------------------------------

        public static DataSet ObtenerIntermediario(int cod_suc, int cod_ramo, string nro_pol, int nro_endo)
        {
            DataSet ds = new DataSet();
            ProcesoDAL bd = new ProcesoDAL();
            ds = ProcesoDAL.ObtenerIntermediario(cod_suc, cod_ramo, nro_pol, nro_endo);
            return ds;
        }
        //----------------------------------------------Insertar Ruta Parametrizacion---------------------------------------
        public static string InsertarRutasParam(int Id_Doc, int in_app, int hab) {
            string respuesta = string.Empty;
            ProcesoDAL bd = new ProcesoDAL();
            respuesta = ProcesoDAL.CrearRutasDeImpresion(Id_Doc, in_app, hab);
            return respuesta;
        }
        //------------------------------------------------Actualizar ruta parametrizada
        public static string ActualizarRutasParam(int Id_Doc, int in_app, int hab)
        {
            string respuesta = string.Empty;
            ProcesoDAL bd = new ProcesoDAL();
            respuesta = ProcesoDAL.ActualizarRutasDeImpresion(Id_Doc, in_app, hab);
            return respuesta;
        }
        //---------------------------------------------ver rutas configuradas---------
        public static List<RutaParam> verRutasParam(int in_app)
        {
            List<RutaParam> lista = new List<RutaParam>();
          
            ProcesoDAL bd = new ProcesoDAL();
            lista = ProcesoDAL.ObtenerConfiguracionImpresion(in_app);
            return lista;
        }

        //--------------------------------ver otros documentos-------------------------------

        public static List<OtroDocumento> verDocumentosConfigudados(int in_app)
        {
            List<OtroDocumento> lista = new List<OtroDocumento>();

            ProcesoDAL bd = new ProcesoDAL();
            lista = ProcesoDAL.ObtenerotrosDocumentos(in_app);
            return lista;
        }

        //------------------------------Actualizar otrosDocumentos--------------------------------


        public static string ActualizarOtrosDocumentos(int Id_Documento, int IN_id_App, int IN_Ramo, int SN_Habilitar)
        {
            string respuesta = string.Empty;
            ProcesoDAL bd = new ProcesoDAL();
            respuesta = ProcesoDAL.ActualizarOtrosDocumentos(Id_Documento, IN_id_App, IN_Ramo, SN_Habilitar);
            return respuesta;
        }



        //----------------------------------Generar otros Documentos--------------------------------


        public static string GenerarOtrosDocumentos(int IN_id_App, int IN_Ramo, string VAR_NombreDocumento, int SN_Habilitar)
        {
            string respuesta = string.Empty;
            ProcesoDAL bd = new ProcesoDAL();
            respuesta = ProcesoDAL.CrearOtrosDocumentos(IN_id_App, IN_Ramo, VAR_NombreDocumento, SN_Habilitar);
            return respuesta;
        }


    }
}
