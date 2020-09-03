using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Diagnostics;
using System.Threading;
using Ionic.Zip;
using System.IO;
using System.Configuration;
using EnvioAutomaticoPoliza.Entidades;
using Newtonsoft.Json;

namespace EnvioAutomaticoPoliza_SW_Cliente
{
    public class GenerarPoliza
    {
        /// <summary>
        ///Genera el archivo pdf en una ruta predeterminada
        /// </summary>
        /// <returns></returns>
        public static void GenerarImpresion()
        {
            try
            {

                Cliente Cliente;
                Poliza Poliza;
                bool rta = true;
                string res = string.Empty;
                MetodosApi servicioapp = new MetodosApi();
               
                string mensaje = string.Empty;
                Poliza = TraerDatosPoliza(1);
                if (Poliza != null)
                {
                    Cliente = servicioapp.TraerDatosCliente(Poliza.IN_Cod_Suc, Poliza.IN_Cod_Ramo, Poliza.VC_Nro_Pol, Poliza.IN_Nro_Endo);
                    if (Cliente != null)
                    {
                        mensaje = servicioapp.GenerarImpresionDePdf(Poliza.IN_Cod_Ramo, Poliza.IN_Nro_Endo, Poliza.IN_Cod_Suc, Poliza.VC_Nom_Impresora, Cliente.nro_doc, Poliza.VC_Nro_Pol, Cliente.cod_tipo_doc, Poliza.VC_Cod_Usuario);

                        if (mensaje == "\"Registro Procesado!\"")
                            mensaje = "se genero el archivo -> " + mensaje;
                    }
                    else
                    {
                        mensaje = "No se pudo generar la impresion debido que no encontro informacion para el cliente.";
                    }
                    servicioapp.GrabarRegistroLog(1,Poliza.IN_Id_Proceso,  mensaje, Poliza.VC_Cod_Usuario);
                    servicioapp.ConfirmarImpresion(Poliza.IN_Cod_Suc, Poliza.IN_Cod_Ramo, Poliza.VC_Nro_Pol, Poliza.IN_Nro_Endo);
                }
            }
            catch (Exception ex)
            {
                EventLog.WriteEntry("Error", "Error al generar impresion : " + ex.Message, EventLogEntryType.Error);

            }
        }
        /// <summary>
        ///busca la ruta donde se creo el archivo y lo confirma si existe
        /// </summary>
        /// <returns></returns>
        public static void Confirmar_Impresion()
        {
            try
            {

                MetodosApi servicioapp = new MetodosApi();
                Cliente Cliente;
                Poliza Poliza;
                
                string mensaje = string.Empty;
                Poliza = TraerDatosPoliza(2);
                if (Poliza != null)
                {

                    Cliente = servicioapp.TraerDatosCliente(Poliza.IN_Cod_Suc, Poliza.IN_Cod_Ramo, Poliza.VC_Nro_Pol, Poliza.IN_Nro_Endo);
                    if (Cliente != null)
                    {

                        var ruta = servicioapp.VerRutaImpresion(Poliza.IN_Cod_Suc, Poliza.IN_Cod_Ramo, Poliza.VC_Nro_Pol, Poliza.IN_Nro_Endo, Poliza.VC_Cod_Usuario, Cliente.cod_tipo_doc, Cliente.nro_doc, Poliza.IN_aplicacion);

                        foreach (var item in ruta) {
                            string rutaf = item.Ruta;

                            if (rutaf != "")
                            {


                                WCFSolidariaUtilidades.WCFSolidariaUtilidadesClient Utilidades = new WCFSolidariaUtilidades.WCFSolidariaUtilidadesClient();
                                WCFSolidariaUtilidades.pwdPDF p = new WCFSolidariaUtilidades.pwdPDF();
                                p.ClavePDF = Cliente.nro_doc;
                                p.RutaPDF = Convert.ToString(rutaf);
                                Utilidades.AgregaClavePDF(p);
                                mensaje = servicioapp.ValidarRutaDeImpresion(rutaf);

                            }
                            else {

                                mensaje = "no se encuentran rutas configuradas configurelas porfavor";
                            }
                                     
                        }
                        servicioapp.ConfirmarEstado(Poliza.IN_Cod_Suc, Poliza.IN_Cod_Ramo, Poliza.VC_Nro_Pol, Poliza.IN_Nro_Endo);

                    }
                    else
                    {
                        mensaje = "No se pudo dar confirmacion a la impresion no encontro informacion para el cliente.";
                    }
                    servicioapp.GrabarRegistroLog(2, Poliza.IN_Id_Proceso,  mensaje, Poliza.VC_Cod_Usuario);
                    servicioapp.ConfirmarEstado(Poliza.IN_Cod_Suc, Poliza.IN_Cod_Ramo, Poliza.VC_Nro_Pol, Poliza.IN_Nro_Endo);
                }
            }
            catch (Exception ex)
            {
                EventLog.WriteEntry("Error", "Error al confirmar impresion : " + ex.Message, EventLogEntryType.Error);
            }
        }
        /// <summary>
        ///manda el correo y lo confirma
        /// </summary>
        /// <returns></returns>
        public static void EnviarCorreo()
        {
            try
            {

                MetodosApi servicioapp = new MetodosApi();
                Cliente Cliente;
                Poliza Poliza;
               
                string mensaje = string.Empty;
                Poliza = TraerDatosPoliza(3);
                if (Poliza != null)
                {
                    string mensajeCorreo = string.Empty;
                    Cliente = servicioapp.TraerDatosCliente(Poliza.IN_Cod_Suc, Poliza.IN_Cod_Ramo, Poliza.VC_Nro_Pol, Poliza.IN_Nro_Endo);
                    if (Cliente != null)
                    {

                        //--------------------------------------Correo con Andes-----------------------------------------

                        //GenerarHtml html = new GenerarHtml();
                        //string HTML = html.CrearHtml(Poliza.NroPoliza, Poliza.IdProceso, Poliza.Usuario);
                        //ServicioEnvioSeguro.Service1Client ObjWcfEnvioMailCertificado = new ServicioEnvioSeguro.Service1Client();
                        //ServicioEnvioSeguro.ClsDatosEnvioEmail ObjClsDatosEnvioEmail = new ServicioEnvioSeguro.ClsDatosEnvioEmail();
                        //string Nombre = Cliente.PrimerNombre + " " + Cliente.SegundoNombre + " " + Cliente.PrimerApellido + " " + Cliente.SegundoApellido;
                        //string correoE = Cliente.Correo; // cambiar al correo en el momento de mandar a produccion
                        //ObjClsDatosEnvioEmail.StrCorreoDestinatario1 = "ext.amarin@solidaria.com.co";
                        //ObjClsDatosEnvioEmail.StrNombreDestinatario1 = Nombre;
                        //ObjClsDatosEnvioEmail.StrAsunto1 = "Adjunto poliza No:  " + Poliza.NroPoliza;
                        //ObjClsDatosEnvioEmail.StrMensaje1 = HTML;
                        //ObjClsDatosEnvioEmail.BlSnAdjunto1 = true;
                        //var ruta = ws.VerRutaImpresion(Poliza.CodSucursal, Poliza.CodRamo, Poliza.NroPoliza, Poliza.NroEndoso, Poliza.Usuario, Cliente.CodTipoDocumento, Cliente.NroDocumento);
                        //List<string> lista_copia = new List<string>();
                        //foreach (string url in ruta)
                        //{
                        //    if (File.Exists(url))
                        //    {
                        //        lista_copia.Add(url);
                        //    }
                        //    else
                        //    {
                        //        lista_copia.Remove(url);
                        //    }
                        //}
                        //using (ZipFile zip = new ZipFile())
                        //{
                        //    zip.AddFiles(lista_copia, false, "");
                        //    zip.Comment = "Archivo comprimido el " + System.DateTime.Now.ToString("G");
                        //    zip.Save("Poliza.zip");
                        //}
                        //string StrRutaZip = System.IO.Path.GetFullPath("Poliza.zip");
                        //if (File.Exists("\\\\FILESERVERIBM\\impresiones\\Poliza.zip"))
                        //{
                        //    File.Delete("\\\\FILESERVERIBM\\impresiones\\Poliza.zip");
                        //}
                        //File.Copy(StrRutaZip, "\\\\FILESERVERIBM\\impresiones\\Poliza.zip");
                        //ObjClsDatosEnvioEmail.SrtNombreAdjunto1 = "_adjuntos_sealmail_";
                        //ObjClsDatosEnvioEmail.StrRutaAdjunto1 = "\\\\FILESERVERIBM\\impresiones\\Poliza.zip";
                        ////ObjClsDatosEnvioEmail.StrAdjunto1 = " "; 
                        //ObjClsDatosEnvioEmail.BlSnAlertas1 = false;
                        //ServicioEnvioSeguro.ClsRespuestaDatosEnvioEmail ObjClsRespuestaDatosEnvioEmail = ObjWcfEnvioMailCertificado.RegistrarEmailEnvioSeg(ObjClsDatosEnvioEmail);
                        //string StrMensajeControl = string.Empty;
                        //if (ObjClsRespuestaDatosEnvioEmail.InRegistro1 > 0)
                        //{
                        //    StrMensajeControl = ObjClsRespuestaDatosEnvioEmail.StrRespuestaHash1;
                        //    ObjClsRespuestaDatosEnvioEmail = null;
                        //    ws.GrabarRegistroLog(3, Poliza.IdProceso, StrMensajeControl, Poliza.Usuario);
                        //    ws.ConfirmarCorreo(Poliza.CodSucursal, Poliza.CodRamo, Poliza.NroPoliza, Poliza.NroEndoso);
                        //}
                        //else
                        //{
                        //    StrMensajeControl = ObjClsRespuestaDatosEnvioEmail.StrMensajeError1;
                        //    ObjClsRespuestaDatosEnvioEmail = null;
                        //    ws.GrabarRegistroLog(3, Poliza.IdProceso, StrMensajeControl, Poliza.Usuario);
                        //    ws.ConfirmarCorreo(Poliza.CodSucursal, Poliza.CodRamo, Poliza.NroPoliza, Poliza.NroEndoso);
                        //}
                        //---------------------------------------------CORREO NORMAL SIN ANDES---------------------------------------------------------------------
                        string Asunto = "Adjunto poliza No:  " + Poliza.VC_Nro_Pol;
                        var ruta = servicioapp.VerRutaImpresion(Poliza.IN_Cod_Suc, Poliza.IN_Cod_Ramo, Poliza.VC_Nro_Pol, Poliza.IN_Nro_Endo, Poliza.VC_Cod_Usuario, Cliente.cod_tipo_doc, Cliente.nro_doc,Poliza.IN_aplicacion);

                        GenerarHtml html = new GenerarHtml();
                        //  string correo = "danielcamilovargas97@gmail.com";
                        string correo = Cliente.txt_telefono;

                        var nombre_intermediario = servicioapp.Obtener_IntermediarioGet(Poliza.IN_Cod_Suc, Poliza.IN_Cod_Ramo, Poliza.VC_Nro_Pol, Poliza.IN_Nro_Endo);


                        string primer_Nombre = nombre_intermediario.Nombre;
                        string apellido = nombre_intermediario.Apellido;
                        int codigo_agente = Convert.ToInt32(nombre_intermediario.Cod_Agente);

                        string nombre_completo = primer_Nombre + " " + apellido;






                        string NombreCliente = Cliente.txt_nombre + " " + Cliente.txt_nombre2 + " " + Cliente.txt_apellido + " " + Cliente.txt_apellido2;
                   //     string CopiaCorreo = ConfigurationManager.AppSettings["CopiaCorreo"].ToString();

                       



                        CuerpoCorreo cuerpoCorreo = new CuerpoCorreo();



                        cuerpoCorreo = servicioapp.Vercuerpodelcorreo(Poliza.IN_aplicacion);

                        if (cuerpoCorreo == null)
                        {
                            mensajeCorreo = "la poliza no tiene un nombre aplicacion que exista para generar el correo";
                        }
                        else { 
                        
                       
                        string cuerpocorreohtml = cuerpoCorreo.htmlcuerpo;
                        string cabeceracorreo = cuerpoCorreo.htmlcabecera;
                        string cuerpoopcional = cuerpoCorreo.htmlopcional;
                        string imagen1 = cuerpoCorreo.imagen1;








                        string HTML = html.CrearHtml(Poliza.VC_Nro_Pol, Poliza.IN_Id_Proceso, Poliza.VC_Cod_Usuario, NombreCliente, nombre_completo, codigo_agente, cuerpocorreohtml, cabeceracorreo, cuerpoopcional,imagen1);




                        var listaCorreos = servicioapp.VerCopiasConfiguradas(cuerpoCorreo.app, Poliza.VC_Cod_Usuario);
                        List<string> cco = new List<string>();
                        List<string> cc = new List<string>();
                        foreach (var item in listaCorreos)
                        {

                            if (item.IN_sn_cc_hab == 1)
                            {
                                cc.Add(item.VC_correo);
                            }
                            if (item.IN_sn_cco_hab == 1)
                            {
                                cco.Add(item.VC_correo);
                            }

                        }

                        
                        GenerarHtml2 GenerarHtml2 = new GenerarHtml2();
                        mensajeCorreo = GenerarHtml2.SendEmailToPolicyHolder(ruta, Asunto, correo, HTML, cc.ToArray(), cco.ToArray(), imagen1);

                        if (mensajeCorreo == "")
                        {
                            mensajeCorreo = "no encontro el adjunto";
                        }

                        }

                        servicioapp.ConfirmarCorreo(Poliza.IN_Cod_Suc, Poliza.IN_Cod_Ramo, Poliza.VC_Nro_Pol, Poliza.IN_Nro_Endo);
                       
                        servicioapp.GrabarRegistroLog(3, Poliza.IN_Id_Proceso, mensajeCorreo, Poliza.VC_Cod_Usuario);
                       
                        //-------------------------------------------------------------------------------------------------------------------------------
                    }
                    else
                    {
                        mensaje = "No se pudo generar el correo no encontro Datos de el cliente.";
                        servicioapp.GrabarRegistroLog(3, Poliza.IN_Id_Proceso, mensajeCorreo, Poliza.VC_Cod_Usuario);
                        servicioapp.ConfirmarCorreo(Poliza.IN_Cod_Suc, Poliza.IN_Cod_Ramo, Poliza.VC_Nro_Pol, Poliza.IN_Nro_Endo);
                    }
                }
            }
            catch (Exception ex)
            {

                EventLog.WriteEntry("Error", "Error al generar correo : " + ex.Message, EventLogEntryType.Error);
            }
        }
        /// <summary>
        /// genera la busqueda de las polizas que se encuentran sin procesar y las retorna
        /// </summary>
        /// <param name="operacion"></param>
        /// <returns>DatosPoliza obj</returns>
        private static Poliza TraerDatosPoliza(int operacion)
        {
            Poliza obj = new Poliza();
            try
            {
                
                MetodosApi serviceapi = new MetodosApi();
                DataSet ds = new DataSet();
                if (operacion == 1)
                    obj = serviceapi.VerImpresionesPorImprimir();

                if (operacion == 2)
                    obj = serviceapi.VerImpresionesConfirmadasGet();

                if (operacion == 3)
                    obj = serviceapi.VerSoloEstadosConfirmadosGET();

            }
            catch (Exception ex)
            {

                EventLog.WriteEntry("Error", "Error al traer datos poliza : " + ex.Message, EventLogEntryType.Error);
            }
            return obj;
        }
        /// <summary>
        /// busca los datos del cliente por sucursal,ramo,poliza y endoso y los retorna
        /// </summary>
        /// <param name="cod_suc"></param>
        /// <param name="cod_ramo"></param>
        /// <param name="nro_pol"></param>
        /// <param name="nro_endo"></param>
        /// <returns>DatosCliente obj</returns>
        private static DatosCliente TraerDatosCliente(int cod_suc, int cod_ramo, string nro_pol, int nro_endo)
        {
            DatosCliente obj = new DatosCliente();
            try
            {


                ServicioImpresionPolizasWCF.Service1Client ws = new ServicioImpresionPolizasWCF.Service1Client();
                DataSet ds = new DataSet();

                ds = ws.ConsultarDatosCliente(cod_suc, cod_ramo, nro_pol, nro_endo);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        obj = new DatosCliente()
                        {

                            NroDocumento = ds.Tables["Registro"].Rows[0]["nro_doc"].ToString(),
                            CodTipoDocumento = short.Parse(ds.Tables["Registro"].Rows[0]["cod_tipo_doc"].ToString()),
                            Correo = ds.Tables["Registro"].Rows[0]["txt_telefono"].ToString(),
                            PrimerNombre = ds.Tables["Registro"].Rows[0]["txt_nombre"].ToString(),
                            SegundoNombre = ds.Tables["Registro"].Rows[0]["txt_nombre2"].ToString(),
                            PrimerApellido = ds.Tables["Registro"].Rows[0]["txt_apellido1"].ToString(),
                            SegundoApellido = ds.Tables["Registro"].Rows[0]["txt_apellido2"].ToString(),

                        };
                        obj.NombreCompleto = obj.PrimerNombre + " " + obj.SegundoNombre + " " + obj.PrimerApellido + " " + obj.SegundoApellido;
                    }
                    else
                        obj = null;
                }
                ws.Close();
                ds = null;
                return obj;
            }
            catch (Exception ex)
            {
                EventLog.WriteEntry("Error", "Error al traer datos del cliente : " + ex.Message, EventLogEntryType.Error);
            }
            return obj;
        }

    }
}
