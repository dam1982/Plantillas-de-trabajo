using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.IO;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Base;


namespace mail
{
    public partial class descarga : System.Web.UI.Page
    {
        private WebClient cliente;
        private string direcciondescarga;
        private string rutaescritorio;




        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            List<veregistros_Result> v;
            string nombre;
            string pass;
            string tipousuario;
            List<string> datos = new List<string>();

            using (institucionEntities bd = new institucionEntities()) {

                v = bd.veregistros().ToList();
                
               
                foreach (var item in v)
                {
                   nombre = item.nombre.ToString();
                   pass = item.pass.ToString();
                   tipousuario = item.tipousuario.ToString();



                    Response.Write(nombre);
                    FileStream fs = new FileStream("C://Users/ADMIN/tabla.pdf", FileMode.Open);

                    Document document = new Document(iTextSharp.text.PageSize.LETTER, 0, 0, 0, 0);
                    PdfWriter pw = PdfWriter.GetInstance(document, fs);
                    document.Open();

                    document.Add(new Paragraph(nombre + pass + tipousuario));
                    document.Close();


                }



             

            }
            //https://freeditorial.com/es/books/nunca-confies-del-todo/downloadbookepub/pdf



        }
    }
}