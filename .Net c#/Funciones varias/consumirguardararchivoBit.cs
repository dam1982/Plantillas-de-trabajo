using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Net.Http;
using System.Net;
using System.Net.Http;
using Newtonsoft.Json;




namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {


           
         //  string RutaInicial = "D:\\Usuarios\\ext.amarin\\Desktop\\Proyectos\\EnvioAutomaticoDePolizas\\ClausuladoAutos.pdf";
            string RutaInicial = "D:\\Usuarios\\ext.amarin\\Desktop\\Diego\\192.168.99.150Base de Datos.txt";

            string respuesta = string.Empty;
            Byte[] b = System.IO.File.ReadAllBytes(RutaInicial);
            int codigoAplicacion = 2;
            int CodigoRamo = 40;
            Byte[] ImagenBit = b;
            string NombreDocumento = "192.168.99.150Base de Datos.txt";
            ByteArrayContent byteContent = new ByteArrayContent(ImagenBit);
            MultipartFormDataContent multipartContent = new MultipartFormDataContent();
            multipartContent.Add(byteContent);
            bool bandera = false;
          
         //   var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://localhost/ApiEnvioPolizas/api/DocumentosAlternos/GenerarDocumentoAlternoPOST");
              var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://192.1.3.183:8084/WAPIEnvioAutomaticoPoliza/api/DocumentosAlternos/GenerarDocumentoAlternoPOST");
         //   var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://localhost:64413/api/DocumentosAlternos/GenerarDocumentoAlternoPOST");
            httpWebRequest.Accept = "application/json";
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";
            using (var stream = httpWebRequest.GetRequestStream())
            {
                var objTemp = new {
                    CodigoAplicacion = codigoAplicacion,
                    CodigoRamo = CodigoRamo,
                    ImagenBit = b,
                    NombreDocumento = NombreDocumento
                };
                var bodyTemp = Encoding.ASCII.GetBytes(JsonConvert.SerializeObject(objTemp));
                stream.Write(bodyTemp, 0, bodyTemp.Length);
            }

            HttpWebResponse response = (HttpWebResponse)httpWebRequest.GetResponse();
            StreamReader sr = new StreamReader(response.GetResponseStream());
            string mensaje = sr.ReadToEnd();

            httpWebRequest.GetResponse().Close();

        //http://192.1.3.183:8084/WAPIEnvioAutomaticoPoliza/
        //http://localhost:64413
        //http://localhost/ApiEnvioPolizas
        }
    }
}
