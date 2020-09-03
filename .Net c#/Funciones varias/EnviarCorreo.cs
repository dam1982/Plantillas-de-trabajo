using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.IO;
using System.Configuration;
using System.Diagnostics;
using System.Windows.Forms;
using EnvioAutomaticoPoliza.Entidades;

namespace EnvioAutomaticoPoliza_SW_Cliente
{
   public class GenerarHtml2
    {
                              
            public System.Net.Mail.AlternateViewCollection AlternateViews { get; }
            public string SendEmailToPolicyHolder(List<Rutas> ruta,string Asunto,string correo,string mail, string[] CC, string[] CCO, string imagen1)
            {
               string error = string.Empty;
                try
                {
                if (correo == "") {
                    error = "Este asegurado no tiene correo";
                    return error;
                }
                string imagenCabecera = ConfigurationManager.AppSettings["imagenCabecera"].ToString();
                string pieDePagina = ConfigurationManager.AppSettings["imagenPie"].ToString();


                string imagenes = Application.StartupPath.ToString();
                imagenes = imagenes + @"\Recursos\";

                string cuentaCorreo = ConfigurationManager.AppSettings["CuentaCorreo"].ToString();
        
                string claveCorreo = ConfigurationManager.AppSettings["ClaveCorreo"].ToString();
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(cuentaCorreo);
                mailMessage.To.Add(correo);
                mailMessage.Subject = Asunto;
                string L_st_content = mail;
               AlternateView L_ob_alternateViewEmail = AlternateView.CreateAlternateViewFromString(L_st_content, Encoding.UTF8, MediaTypeNames.Text.Html);

   

                  LinkedResource L_ob_imageHeader = new LinkedResource(imagenes + imagenCabecera, MediaTypeNames.Image.Jpeg);
                LinkedResource L_ob_imageFooter = new LinkedResource(imagenes + pieDePagina, MediaTypeNames.Image.Jpeg);


                L_ob_imageHeader.ContentId = "imageHeader";
                L_ob_imageFooter.ContentId = "imageFooter";


                L_ob_alternateViewEmail.LinkedResources.Add(L_ob_imageHeader);
                L_ob_alternateViewEmail.LinkedResources.Add(L_ob_imageFooter);

                Attachment data;

                foreach (var item in ruta) {

                    string rutafinal =   item.Ruta;

                    if (File.Exists(rutafinal))
                    {
                        data = new Attachment(rutafinal, MediaTypeNames.Application.Octet);
                        mailMessage.Attachments.Add(data);
                    }
                    else {
                        return error = "uno de los archivos no existen .. verifique";

                    }

                }

                if(mailMessage.Attachments.Count() <= 0) {
                    return    error = "no hay rutas configuradas para generar el adjunto";

                }



               
                for (int i = 0; i < CC.Count(); i++) {
                    mailMessage.CC.Add(CC[i].ToString());
                }
                for (int i = 0; i < CCO.Count(); i++)
                {
                    mailMessage.Bcc.Add(CCO[i].ToString());                                                                              
                }

                mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
                mailMessage.SubjectEncoding = System.Text.Encoding.UTF8;
                mailMessage.IsBodyHtml = true;
                mailMessage.Priority = System.Net.Mail.MailPriority.High;
                    SmtpClient smtpClient = new SmtpClient("smtp.office365.com", 587);
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.EnableSsl = true;
                    smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtpClient.Credentials = new NetworkCredential(cuentaCorreo, claveCorreo,"solinet");
                    mailMessage.AlternateViews.Add(L_ob_alternateViewEmail);
                    smtpClient.Send(mailMessage);
                    error = "generacion de correo exitoso";
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                EventLog.WriteEntry("Error", "error en la generacion del correo html2 : " + ex.Message, EventLogEntryType.Error);
                return error = "problema en la generacion del html2";
                }
            return error;
            }



        
    }
}
