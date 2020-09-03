public void SendEmailToPolicyHolder(TbRecuotificacionWEBHeaderEntity L_ob_tbRecuotificacionWEBHeaderEntity, string[] L_cl_st_emailConfiguration)
        {
            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(L_cl_st_emailConfiguration[1]);
                mailMessage.To.Add(L_ob_tbRecuotificacionWEBHeaderEntity.P_NV_txtCorreo);
                mailMessage.Subject = "Aseguradora Solidaria de Colombia de ta la Bienvenida";
                string L_st_content = ContentEmailToPolicyHolder(L_ob_tbRecuotificacionWEBHeaderEntity);
                AlternateView L_ob_alternateViewEmail = AlternateView.CreateAlternateViewFromString(L_st_content, Encoding.UTF8, MediaTypeNames.Text.Html);
                LinkedResource L_ob_imageHeader = new LinkedResource(System.IO.Directory.GetCurrentDirectory() + @"\resources\img\headerEmail.png", MediaTypeNames.Image.Jpeg);
                LinkedResource L_ob_imageSuperintendencia = new LinkedResource(System.IO.Directory.GetCurrentDirectory() + @"\resources\img\superintendencia.png", MediaTypeNames.Image.Jpeg);
                LinkedResource L_ob_imegeFooter = new LinkedResource(System.IO.Directory.GetCurrentDirectory() + @"\resources\img\footerEmail.png", MediaTypeNames.Image.Jpeg);
                L_ob_imageHeader.ContentId = "imageHeader";
                L_ob_imageSuperintendencia.ContentId = "imageSuperintendencia";
                L_ob_imegeFooter.ContentId = "imageFooter";
                L_ob_alternateViewEmail.LinkedResources.Add(L_ob_imageHeader);
                L_ob_alternateViewEmail.LinkedResources.Add(L_ob_imageSuperintendencia);
                L_ob_alternateViewEmail.LinkedResources.Add(L_ob_imegeFooter);
                mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
                mailMessage.SubjectEncoding = System.Text.Encoding.UTF8;
                mailMessage.IsBodyHtml = true;
                mailMessage.Priority = System.Net.Mail.MailPriority.High;
                SmtpClient smtpClient = new SmtpClient(L_cl_st_emailConfiguration[0], Convert.ToInt32(L_cl_st_emailConfiguration[3]));
                smtpClient.UseDefaultCredentials = false;
                smtpClient.EnableSsl = Convert.ToBoolean(L_cl_st_emailConfiguration[4]);
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.Credentials = new NetworkCredential(L_cl_st_emailConfiguration[1], L_cl_st_emailConfiguration[2], "solinet");
                mailMessage.AlternateViews.Add(L_ob_alternateViewEmail);
                smtpClient.Send(mailMessage);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw new Exception("Ocurrió un error en la aplicación: ", e);
            }
        }
        public string ContentEmailToPolicyHolder(TbRecuotificacionWEBHeaderEntity L_ob_tbRecuotificacionWEBHeaderEntity)
        {
            try
            {
                string L_st_content = "<div style=\"width:96%;max-width:960px;margin:0 auto;\">"+
                                          "<div style=\"width:96%;max-width:960px;margin:0 auto;\">"+
                                            "<img src='cid:imageHeader' style=\"width:100%;height:auto;\">" +
                                          "</div>" +
                                          "<div style=\"width:96%;font-size:17px;text-align:justify;padding-top:5%;max-width:960px;margin:0 auto;color:#004174;\">" +
                                            "<div style=\"font-size:14px;padding-left:7%;padding-right:7%;\">" +
                                                "<label style=\"display:block;\">Señor(a):</label>" +
                                                "<label style=\"display:block;\"><b>" +  + "</b></label>" +
                                                "<label style=\"display:block;\">" + + "</label>" +
                                                "<label style=\"display:block;\">" +  + "</label>" +
                                            "</div>" +
                                            "<div style=\"font-size:14px;padding-left:7%;padding-right:7%;padding-top:5%;\">" +
                                                "<label style=\"display:block;margin-bottom:2%;\">Apreciado(a) Cliente: </label>" +
                                                "<label style=\"display:block;\">En nombre de tu intermediario <b>" +  + "</b> te damos la bienvenida a nuestra compañía.</label>" +
                                            "</div>" +
                                            "<div style=\"font-size:14px;padding-left:7%;padding-right:7%;padding-top:5%;\">" +
                                                 +
                                            "</div>" +
                                            "<div style=\"font-size:14px;padding-left:7%;padding-right:7%;padding-top:8%;\">" +
                                                "<label style=\"display: block;\">Haz clic en el siguiente enlace y selecciona la mejor opción de pago:" +
                                                "</label>" +
                                                "<a style=\"color:#004174; text-decoration: none;\"" +
                                                "href=\"" +  + "\"><b>" +  + "</b></a>" +
                                            "</div>" +
                                            "<div style=\"font-size:14px;padding-left:7%;padding-right:7%;padding-top:5%;\">" +
                                                "<label>Ten presente que si no seleccionas una alternativa de pago el sistema lo hará" +
                                                " automáticamente.</label>" +
                                            "</div>" +
                                            "<div style=\"font-size:14px;padding-left:7%;padding-right:7%;padding-top:5%;\">" +
                                                "<label> Cordialmente.</label>" +
                                            "</div>" +
                                            "<div style=\"font-size:14px;padding-left:7%;padding-right:7%; padding-top:5%;font-weight:700;position:absolute;\">" +
                                                "<label style=\"display:block;\"> GERENCIA DE RECAUDO Y COBRANZA</label>" +
                                                "<label style=\"display:block;\"> Correo: miplandepago@solidaria.com.co</label>" +
                                                "<label style=\"display:block;\"> Teléfonos: #789 opción X / En Bogotá 291 6868 y a nivel nacional 01 8000 512021 </label>" +
                                            "</div>" +
                                        "</div>" +
                                        "<img src='cid:imageSuperintendencia' style=\"width:2%;height:auto;position:fixed;padding-left:2%\">" +
                                    "</div> " +
                                    "<div style=\"width:96%;max-width:960px;margin:0 auto;padding-top:0%;\">" +
                                        "<img src='cid:imageFooter' style=\"width:100%;height:auto;\">" +
                                    "</div>";
                return L_st_content;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw new Exception("Ocurrio un error en la aplicación: ", e);
            }
        }