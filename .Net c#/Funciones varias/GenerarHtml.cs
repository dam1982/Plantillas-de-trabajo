using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace EnvioAutomaticoPoliza_SW_Cliente
{
    public class GenerarHtml
    {

        public string CrearHtml(string Poliza, int Id_Proceso, string Usuario, string NombreCliente, string nombre_completo,int codigo_agente,string cuerpohtml,string htmlcabecera,string htmlopcional,string imagen1)
        {

          //  string UrlImagen = ConfigurationManager.AppSettings["ImagenUrl"].ToString();
          //  string AnchoImagen = ConfigurationManager.AppSettings["AnchoImagen"].ToString();
          //  string AltoImagen = ConfigurationManager.AppSettings["AltoImagen"].ToString();


            string parteHtml = string.Empty;


            if (codigo_agente == 9999)
            {
                var NombreClienteR = htmlopcional.Replace("[[[NombreCliente]]]", NombreCliente);


                //  parteHtml = " Hola,<strong>" + NombreClienteR + "</strong> te damos la bienvenida a nuestra compañía.";


                parteHtml = NombreClienteR;
            }
            else {

                string htmlR = string.Empty;

                string htmfinal =  htmlcabecera.Replace("[[[NombreCliente]]]", NombreCliente).Replace("[[[nombre_completo]]]", nombre_completo);
               

                parteHtml = htmfinal;
                
            }
            
            string HTML = string.Empty;
            try
            {
                HTML =
                                               
               "</style><table cellpadding='0' cellspacing='0' border='0' width='700' align='center' style='width:100%;' width='100%'><tr><td valign='top' align='center'><table id='Table-css' style='width: 865px; max-width: 865px; margin: 0 auto;font-size: 14px; font-family: Arial; color: rgb(0,65,115); text-align: justify;' cellpading='20'><tr><td style='width: 100px; max-width: 100px; margin: 0 auto;'><img src=\'cid:imageHeader' style='width: 20 %; '></td></tr><tr><td style='padding-left: 4%; padding-right: 7%; padding-top: 5%;'><label>" + parteHtml + "</label></td></tr><tr><td style='padding-left: 4%; padding-right: 7%; padding-top: 1%;'><label>"+cuerpohtml+ "</label></td></tr><tr><td style='padding-left: 7%; padding-right: 7%; padding-top: 8%;'><label style='display: inline-block;'></label></td></tr><tr><br/></tr><tr><td> </td></tr><tr><td style='width: 100px; max-width: 100px; margin: 0 auto;'><img src=\'cid:imageFooter' style='width: 20 %; '></td></tr></table></td></tr></table>";
                        
               return HTML;
            }
            catch (Exception ex)
            {
                EventLog.WriteEntry("Error", "No se genero html : " + ex.Message, EventLogEntryType.Error);
                ServicioImpresionPolizasWCF.Service1Client bd = new ServicioImpresionPolizasWCF.Service1Client();
                bd.GrabarRegistroLog(2, Id_Proceso, ex.Message, Usuario);
                string respuesta = ex.Message;
                return ex.Message;
            }
        }


    }
}
