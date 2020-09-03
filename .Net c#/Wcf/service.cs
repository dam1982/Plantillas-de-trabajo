using EnvioAutomaticoPoliza.Entidades;
using System.Collections.Generic;
using System.Data;
using System.ServiceModel;

namespace EnvioAutomaticoPoliza_ServicioWcf
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IService1" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IService1
    {

       // [OperationContract]
       // string InsertarDatosImpresion(int Codigo_Sucursal, int Codigo_Ramo, string Numero_Poliza, int Numero_Endoso, string Nombre_Usuario, string Nombre_Impresora,int Aplicacion);

       // [OperationContract]
       // DataSet VerPolizasPendientesXImprimir();

       // [OperationContract]
       // DataSet ConsultarDatosCliente(int Codigo_Sucursal, int Codigo_Ramo, string Numero_Poliza, int Numero_Endoso);

       // [OperationContract]
       // bool GenerarImpresionDePdf(int Codigo_Ramo, int Numero_Endoso, int Codigo_Sucursal, string NombreImpresora,
       // string Numero_Documento, string Numero_Poliza, short Codigo_tipo_documento, string Nombre_usuario, out string mensaje);

       //[OperationContract]
       // string ConfirmarImpresion(int Codigo_Sucursal, int Codigo_Ramo, string Numero_Poliza, int Numero_Endoso);

       // [OperationContract]
       // DataSet VerImpresionesConfirmadas();

       // [OperationContract]
       // List<Rutas> VerRutaImpresion(int Codigo_sucursal, int Codigo_ramo, string Numero_poliza, int Numero_endoso, string Nombre_usuario, int Codigo_Tipo_Documento, string Numero_Documento,int Aplicacion);

       // [OperationContract]
       // string ValidarRutaDeImpresion(string ruta);

       // [OperationContract]
       // string ConfirmarEstado(int Codigo_Sucursal, int Codigo_Ramo, string Numero_Poliza, int Numero_Endoso);

       // [OperationContract]
       // DataSet VerSoloEstadosConfirmados();
       // [OperationContract]
       // string EnviarCorreo(List<string> Adjuntos, string asunto, string para, string Mensaje, List<string> CC, List<string> CCO);

       // [OperationContract]
      
       // string ConfirmarCorreo(int Codigo_Sucursal, int Codigo_Ramo, string Nrumero_Poliza, int Numero_Endoso);


       // [OperationContract]
       // string GrabarRegistroLog(int Id_Proceso_De_Impresion, int Id_Tipo_Operacion, string Mensaje, string Usuario);


       // [OperationContract]
       
       // string Reimpresion(int Codigo_Sucursal, int Codigo_Ramo, string Numero_Poliza, int Numeroro_Endoso);

       // [OperationContract]
       // DataSet VerProcesosTerminados();

       // [OperationContract]
       // string InsertarParametros(int Codigo_Ramo, int Codigo_Tipo_Pol, int Codigo_Tipo_Documento, bool Sn_Habilitar);

       // [OperationContract]
       // DataSet VerDatosDeLaParametrizacion();

       // [OperationContract]
       // string ActualizarDatosParammetrizacion(int id, bool Sn_Habilitar);

       // [OperationContract]
       // DataSet Obtener_Intermediario(int Codigo_Sucursal, int Codigo_Ramo, string Nro_Poliza, int Nro_Endoso);

       // [OperationContract]
       // string Insertar_Datos_CopiaCorreo(int id_app, string cod_Usuario, string VC_correo, int sn_cc_hab, int sn_cco_hab);

       // [OperationContract]
       // List<CopiaCorreo> VerCopiasConfiguradas(int id_app, string cod_Usuario);

       // [OperationContract]
       // string EliminarCorreoCopia(int id_app, string cod_Usuario, string VC_correo);


       // [OperationContract]
       // string ActualizarCorreoCopia(int id_app, string cod_Usuario, string VC_correo, int sn_cc_hab, int sn_cco_hab);

       // [OperationContract]
       // List<CuerpoCorreo> Vercuerpodelcorreo(int app);

       // [OperationContract]
       // string ActualizarestructuraHtml(int id_app, int id_html, string htmlcabecera, string htmlcuerpo, string htmlopcional, string imagen1);

       // [OperationContract]
       // string CrearestructuraHtml(int id_app, string htmlcabecera, string htmlcuerpo, string htmlopcional, string imagen1);

    }






}
