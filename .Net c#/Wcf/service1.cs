using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using EnvioAutomaticoPoliza.Negocio;
using System.Data;
using System.Diagnostics;
using EnvioAutomaticoPoliza.Entidades;
using System.IO;
using System.Configuration;
using System.Threading;

namespace EnvioAutomaticoPoliza_ServicioWcf
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "Service1" en el código, en svc y en el archivo de configuración.
    // NOTE: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione Service1.svc o Service1.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class Service1 : IService1
    {
//        /// <summary>
//        /// Inserta datos manualmente en la tabla de impresion
//        /// </summary>
//        /// <param name="Cod_Sucursal"></param>
//        /// <param name="Cod_Ramo"></param>
//        /// <param name="Nro_Poliza"></param>
//        /// <param name="Nro_Endoso"></param>
//        /// <param name="Usuario"></param>
//        /// <param name="NombreImpresora"></param>
//        /// <returns>string mensaje</returns>
//        public string InsertarDatosImpresion(int Codigo_Sucursal, int Codigo_Ramo, string Nro_Poliza, int Nro_Endoso, string Nombre_Usuario, string Nombre_Impresora, int Aplicacion,)
//        {
//            string mensaje = string.Empty;
//            mensaje = ProcesoBLL.Generar_Impresion(Codigo_Sucursal, Codigo_Ramo, Nro_Poliza, Nro_Endoso, Nombre_Usuario, Nombre_Impresora, Aplicacion);
//            return mensaje;
//        }
//        /// <summary>
//        //selecciona todos los campos que no se han impreso
//        /// </summary>
//        /// <returns>dataset ds</returns>
//        public DataSet VerPolizasPendientesXImprimir()
//        {
//            DataSet ds = new DataSet();
//            ds = ProcesoBLL.ConsultarImpresionesXImprimir();
//           return ds;
//        }
//        /// <summary>
//        ///muestra los datos del cliente por No_Doc ,TipoDoc,apellido1,mapellido2,Nombre,telefono
//        /// </summary>
//        /// <param name="Cod_Sucursal"></param>
//        /// <param name="Cod_Ramo"></param>
//        /// <param name="Nro_Poliza"></param>
//        /// <param name="Nro_Endoso"></param>
//        /// <returns>dataset ds</returns>
//        public DataSet ConsultarDatosCliente(int Codigo_Sucursal, int Codigo_Ramo, string Nro_Poliza, int Nro_Endoso)
//        {
//            DataSet ds = new DataSet();
//            ds = ProcesoBLL.consultarDatosXCliente(Codigo_Sucursal, Codigo_Ramo, Nro_Poliza,Nro_Endoso);
//            return ds;
//        }
//        /// <summary>
//        /// Genera el archivo de pdf
//        /// </summary>
//        /// <param name="Cod_Sucursal"></param>
//        /// <param name="Cod_Ramo"></param>
//        /// <param name="Nro_Poliza"></param>
//        /// <param name="Nro_Endoso"></param>
//        /// <param name="NombreImpresora"></param>
//        /// <param name="nro_doc"></param>
//        /// <param name="Nro_Endoso"></param>
//        /// /// <param name="Nro_Poliza"></param>
//        /// <param name="tipo_doc"></param>
//        /// <param name="usuario"></param>
//        /// <param name="mensaje"></param>
//        /// <returns> bool res</returns>
//        public bool GenerarImpresionDePdf(int Codigo_Ramo, int Numero_Endoso, int Codigo_Sucursal, string NombreImpresora, 
//        string Numero_Documento, string Numero_Poliza, short Codigo_tipo_documento, string Nombre_usuario, out string mensaje)
//        {
//            GenerarCorreo generarCorreo = new GenerarCorreo();
//          return   generarCorreo.ImpresionPdf(Codigo_Ramo, Numero_Endoso, Codigo_Sucursal, NombreImpresora, Numero_Documento, Numero_Poliza,
//             Codigo_tipo_documento, Nombre_usuario, out mensaje);
//        }
//        /// <summary>
//        ///actualiza y confirma que ya se genero la impresion
//        /// </summary>
//        /// <param name="Cod_Sucursal"></param>
//        /// <param name="Cod_Ramo"></param>
//        /// <param name="Nro_Poliza"></param>
//        /// <param name="Nro_Endoso"></param>
//        /// <returns>string mensaje</returns>
//        public string ConfirmarImpresion(int Codigo_Sucursal, int Codigo_Ramo, string Numero_Poliza, int Numero_Endoso)
//        {
//           string mensaje = string.Empty;
//           mensaje = ProcesoBLL.ConfirmaLaImpresion(Codigo_Sucursal, Codigo_Ramo, Numero_Poliza, Numero_Endoso);
//           return mensaje;
//        }
//        /// <summary>
//        ///Muestra los registros donde ya se ha confirmado la impresion
//        /// </summary>
//        /// <returns>dataset ds</returns>
//        public DataSet VerImpresionesConfirmadas()
//        {
//           DataSet ds = new DataSet();
//           ds = ProcesoBLL.ListadoDeImpresionesConfirmadas();
//           return ds;
//        }
//        /// <summary>
//        ///Muestra las rutas de impresion 
//        /// </summary>
//        /// <param name="Cod_Sucursal"></param>
//        /// <param name="Cod_Ramo"></param>
//        /// <param name="Nro_Poliza"></param>
//        /// <param name="Nro_Endoso"></param>
//        /// <param name="usuario"></param>
//        /// <param name="CodTipoDocumento"></param>
//        /// <param name="NroDocumento"></param>
//        /// <returns>list<string> ruta</returns>
//        public List<Rutas> VerRutaImpresion(int Codigo_sucursal, int Codigo_ramo, string Numero_poliza, int Numero_endoso, string Nombre_usuario, int Codigo_Tipo_Documento, string Numero_Documento, int Aplicacion)
//        {
//            List<Rutas> ruta = new List<Rutas>();
//            ruta = ProcesoBLL.Mostrar_ListaRutas(Codigo_sucursal, Codigo_ramo, Numero_poliza, Numero_endoso, Nombre_usuario, Codigo_Tipo_Documento, Numero_Documento, Aplicacion);
//            return ruta;
//        }
//        /// <summary>
//        ///Valida que la ruta de impresion si existe 
//        /// </summary>
//        /// <param name="Cod_Sucursal"></param>
//        /// <param name="Cod_Ramo"></param>
//        /// <param name="Nro_Poliza"></param>
//        /// <param name="Nro_Endoso"></param>
//        /// <returns>string respuesta</returns>
//        public string ValidarRutaDeImpresion(string ruta)
//        {
//            Thread.Sleep(1000);
//            string respuesta = string.Empty;
//            if (File.Exists(ruta))
//                respuesta = "El Archivo si existe";
//            else 
//                respuesta = "el Archivo no se encontro";
//            return respuesta;
//        }
//        /// <summary>
//        ///actualiza y confirma el Estado de la impresion
//        /// </summary>
//        /// <param name="Cod_Sucursal"></param>
//        /// <param name="Cod_Ramo"></param>
//        /// <param name="Nro_Poliza"></param>
//        /// <param name="Nro_Endoso"></param>
//        /// <returns>string mensaje</returns>
//        public string ConfirmarEstado(int Codigo_Sucursal, int Codigo_Ramo, string Numero_Poliza, int Numero_Endoso)
//        {
//            string mensaje = string.Empty;
//            mensaje = ProcesoBLL.ConfirmarElEstado(Codigo_Sucursal, Codigo_Ramo, Numero_Poliza, Numero_Endoso);
//            return mensaje;
//        }
//        /// <summary>
//        ///Muestra los registros donde se ha confirmado que la ruta si existe
//        /// </summary>
//        /// <returns>dataset ds</returns>
//        public DataSet VerSoloEstadosConfirmados()
//        {
//            DataSet ds = new DataSet();
//            ds = ProcesoBLL.ListadoDeEstadosConfirmados();
//            return ds; 
//        }
//        /// <summary>
//        ///recoje los datos que se necesitan para ejecutar el servicio de correos y manda el correo
//        /// </summary>
//        /// <param name="lista"></param>
//        /// <param name="asunto"></param>
//        /// <param name="para"></param>
//        /// <param name="textoCorreo"></param>
//        /// <returns>string respuesta</returns>
//        public string EnviarCorreo(List<string> Adjuntos, string asunto, string para, string Mensaje, List<string> CC, List<string> CCO)
//        {

//            GenerarCorreo generarCorreo = new GenerarCorreo();
//            return  generarCorreo.ParametrosEnvioCorreo(Adjuntos, asunto, para, Mensaje,CC, CCO);
//        }

//        /// <summary>
//        ///confirma que si se mando el correo
//        /// </summary>
//        /// <param name="Cod_Sucursal"></param>
//        /// <param name="Cod_Ramo"></param>
//        /// <param name="Nro_Poliza"></param>
//        /// <param name="Nro_Endoso"></param>
//        /// <returns>string mensaje</returns>
//        public string ConfirmarCorreo(int Codigo_Sucursal, int Codigo_Ramo, string Nrumero_Poliza, int Numero_Endoso)
//        {
//            string mensaje = string.Empty;
//            mensaje = ProcesoBLL.ConfirmarElCorreo(Codigo_Sucursal, Codigo_Ramo, Nrumero_Poliza, Numero_Endoso);
//            return mensaje;
//        }
//        /// <summary>
//        ///Muestra todos los registros que ya tienen el proceso completo
//        /// </summary>
//        /// <returns>dataset ds</returns>
//        public DataSet VerProcesosTerminados()
//        {
//            DataSet ds = new DataSet();
//            ds = ProcesoBLL.ListadoDePolizasProsesadas();
//            return ds;
//        }
//        /// <summary>
//        ///Genera un registro en la tabla de la tabla de log dependiendo del tipo de proceso que lo haya llamado
//        /// </summary>
//        /// <param name="IdProceso"></param>
//        /// <param name="Id_Operacion"></param>
//        /// <param name="Mensaje"></param>
//        /// <param name="Usuario"></param>
//        /// <returns>dataset ds</returns>
//        public string GrabarRegistroLog(int Id_Proceso_De_Impresion, int Id_Tipo_Operacion, string Mensaje, string Usuario)
//        {
//            return LogBLL.Generar_Logs(Id_Proceso_De_Impresion, Id_Tipo_Operacion, Mensaje, Usuario);
//        }
//        /// <summary>
//        ///borra todos los procesos que ha tenido un registro para volver a empezar el proceso de imprecion
//        /// </summary>
//        /// <param name="Cod_Sucursal"></param>
//        /// <param name="Cod_Ramo"></param>
//        /// <param name="Nro_Poliza"></param>
//        /// <param name="Nro_Endoso"></param>
//        /// <returns>string mensaje</returns>
//        public string Reimpresion(int Codigo_Sucursal, int Codigo_Ramo, string Numero_Poliza, int Numeroro_Endoso)
//        {
//            string mensaje = string.Empty;
//            mensaje = ProcesoBLL.ReiniciarOperacionImpresion(Codigo_Sucursal, Codigo_Ramo, Numero_Poliza, Numeroro_Endoso);
//            return mensaje;
//        }
//        /// <summary>
//        ///Inserta datos a la tabla de parametrizacion
//        /// </summary>
//        /// <param name="Cod_Ramo"></param>
//        /// <param name="Cod_Tipo_Pol"></param>
//        /// <param name="Cod_Tipo_Pol"></param>
//        /// <param name="Cod_Tipo_Doc"></param>
//        /// <param name="Sn_Hab"></param>
//        /// <returns>string mensaje</returns>
//        public string InsertarParametros(int Codigo_Ramo, int Codigo_Tipo_Pol, int Codigo_Tipo_Documento, bool Sn_Habilitar)
//        {
//            string mensaje = string.Empty;           
//            ParametrizacionBLL ParametrizacionBLL = new ParametrizacionBLL();
//            mensaje = ParametrizacionBLL.InsertarDatosParametrizacion(Codigo_Ramo, Codigo_Tipo_Pol, Codigo_Tipo_Documento,Sn_Habilitar);
//            return mensaje;
//        }
//        /// <summary>
//        ///Muestra todos los datos que se encuentran en la tabla de parametrizacion
//        /// </summary>
//        public DataSet VerDatosDeLaParametrizacion() {
//            DataSet ds = new DataSet();
//            ParametrizacionBLL ParametrizacionBLL = new ParametrizacionBLL();
//            ds = ParametrizacionBLL.MostrarDatosDeParametrizacion();
//            return ds;
//        }
//        /// <summary>
//        ///Actualiza el check de habilitar impresion
//        /// </summary>
//        public string ActualizarDatosParammetrizacion(int id,bool Sn_Habilitar)
//        {
//            string mensaje = string.Empty;
//            ParametrizacionBLL ParametrizacionBLL = new ParametrizacionBLL();
//            mensaje = ParametrizacionBLL.ActualizarDatosDeParametrizacion(id, Sn_Habilitar);
//            return mensaje;
//        }

//        //--------------------------------------------------------------------------------------------------------------------

//        /// <summary>
//        ///muestra los datos del cliente por No_Doc ,TipoDoc,apellido1,mapellido2,Nombre,telefono
//        /// </summary>
//        /// <param name="Cod_Sucursal"></param>
//        /// <param name="Cod_Ramo"></param>
//        /// <param name="Nro_Poliza"></param>
//        /// <param name="Nro_Endoso"></param>
//        /// <returns>dataset ds</returns>
//        public DataSet Obtener_Intermediario(int Codigo_Sucursal, int Codigo_Ramo, string Nro_Poliza, int Nro_Endoso)
//        {
//            DataSet ds = new DataSet();
//            ds = ProcesoBLL.ObtenerIntermediario(Codigo_Sucursal, Codigo_Ramo, Nro_Poliza, Nro_Endoso);
//            return ds;
//        }

//        //---------------------------------------------------------------------------------------------


//        public string Insertar_Datos_CopiaCorreo(int id_app, string cod_Usuario, string VC_correo, int sn_cc_hab, int sn_cco_hab)
//        {
//            string respuesta = string.Empty;
//            DataSet ds = new DataSet();
//            respuesta = CopiaCorreoBLL.Insertar_Datos_CopiaCorreo (id_app, cod_Usuario, VC_correo, sn_cc_hab, sn_cco_hab);
//            return respuesta;
//        }



//        public List<CopiaCorreo> VerCopiasConfiguradas(int id_app, string cod_Usuario)
//        {
//            List<CopiaCorreo> lista = new List<CopiaCorreo>();
//            lista = CopiaCorreoBLL.VerCopiasConfiguradas(id_app, cod_Usuario);
//            return lista;
//        }

////--

//        public string EliminarCorreoCopia(int id_app, string cod_Usuario, string VC_correo)
//        {
//            string respuesta = string.Empty;
//            DataSet ds = new DataSet();
//            respuesta = CopiaCorreoBLL.Eliminar_CopiaCorreo(id_app, cod_Usuario, VC_correo);
//            return respuesta;
//        }
////-----------------------------------------------------------------------------------------------------------------------------------------
//        public string ActualizarCorreoCopia(int id_app, string cod_Usuario, string VC_correo, int sn_cc_hab, int sn_cco_hab)
//        {
//            string respuesta = string.Empty;
//            DataSet ds = new DataSet();
//            respuesta = CopiaCorreoBLL.Actualizar_CopiaCorreo(id_app, cod_Usuario, VC_correo, sn_cc_hab, sn_cco_hab);
//            return respuesta;
//        }
////---------------------------------------------------------------------------------------------------------------------------------------------
//        public List<CuerpoCorreo> Vercuerpodelcorreo(int app)
//        {
//            List<CuerpoCorreo> lista = new List<CuerpoCorreo>();
//            lista = CopiaCorreoBLL.VerCorreosConfigurados(app);
//            return lista;
//        }
////-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//        public string ActualizarestructuraHtml(int id_app, int id_html, string htmlcabecera, string htmlcuerpo, string htmlopcional, string imagen1)
//        {
//            string respuesta = string.Empty;
//            DataSet ds = new DataSet();
//            respuesta = CopiaCorreoBLL.actualizarCuerpoHtml(id_app, id_html, htmlcabecera, htmlcuerpo, htmlopcional, imagen1);
//            return respuesta;
//        }
//        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//        public string CrearestructuraHtml(int id_app,string htmlcabecera, string htmlcuerpo, string htmlopcional, string imagen1)
//        {

//            string respuesta = string.Empty;
//            DataSet ds = new DataSet();
//            respuesta = CopiaCorreoBLL.InsertarCuerpoHtml(id_app,htmlcabecera, htmlcuerpo, htmlopcional, imagen1);
//            return respuesta;

//        }

    }
}