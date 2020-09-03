using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using EnvioAutomaticoPoliza.Entidades;
using System.Net.Http;
using System.Net;
using System.IO;

namespace FormsDeParametrizacion
{
    class MetodosApi
    {
     //   string servidor = "http://webservicespd:8084/WAPIEnvioAutomaticoPoliza/api/";
        string servidor = "http://localhost:63098/";
        //    string servidor = "http://webservicespd:8084/WAPIEnvioAutomaticoPoliza/api/";

        public string GetHttp(string url)
        {
            WebRequest oRequest = WebRequest.Create(url);
            oRequest.ContentType = "application/json";
            WebProxy myProxy = new WebProxy();
            oRequest.Proxy = myProxy;
            oRequest.Method = "GET";
            WebResponse oResponse = oRequest.GetResponse();
            StreamReader sr = new StreamReader(oResponse.GetResponseStream());
            return sr.ReadToEnd();
        }
        
        public string PostHttp(string url)
        {
            bool bandera = false;
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
            httpWebRequest.ContentType = "application/json; charset=utf-8";
            WebProxy myProxy = new WebProxy();
            httpWebRequest.Proxy = myProxy;
            httpWebRequest.Method = "POST";
            httpWebRequest.Accept = "application/json; charset=utf-8";
            httpWebRequest.GetRequestStream();
            httpWebRequest.GetResponse();
            bandera = httpWebRequest.HaveResponse;
            HttpWebResponse response = (HttpWebResponse)httpWebRequest.GetResponse();
            StreamReader sr = new StreamReader(response.GetResponseStream());
            string mensaje = sr.ReadToEnd();
            return mensaje;
        }
        
        public string PutHttp(string url)
        {
            bool bandera = false;
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
            httpWebRequest.ContentType = "application/json; charset=utf-8";
            WebProxy myProxy = new WebProxy();
            httpWebRequest.Proxy = myProxy;
            httpWebRequest.Method = "PUT";
            httpWebRequest.Accept = "application/json; charset=utf-8";
            httpWebRequest.GetRequestStream();
            httpWebRequest.GetResponse();
            bandera = httpWebRequest.HaveResponse;
            HttpWebResponse response = (HttpWebResponse)httpWebRequest.GetResponse();
            StreamReader sr = new StreamReader(response.GetResponseStream());
            string mensaje = sr.ReadToEnd();
            return mensaje;
        }
        
        public List<Parametrizacion> verParametrizaciones() {
            List<Parametrizacion> lista = new List<Parametrizacion>();
            string respuesta = GetHttp(servidor + "Parametrizacion/VerParametrizacionesGET");
            lista = JsonConvert.DeserializeObject<List<Parametrizacion>>(respuesta);
            return lista;
        }
        
        public string InsertarParametros(int ramo, int tipo_pol, int tipo_doc, bool snHabilitar)
        {
            string respuesta = PostHttp(servidor + "Parametrizacion/InsertarParametrosPOST?Codigo_Ramo="+ ramo +"&Codigo_Tipo_Pol="+ tipo_pol + "&Codigo_Tipo_Documento="+ tipo_doc + "&Sn_Habilitar="+ snHabilitar + "");
          //  lista = JsonConvert.DeserializeObject<List<Parametrizacion>>(respuesta);
            return respuesta;
        }
        
        public string ActualizarDatosParammetrizacion(int id, bool valor) {
            string respuesta = PutHttp(servidor + "Parametrizacion/ActualizarDatosParammetrizacionPUT?id="+ id + "&Sn_Habilitar="+ valor + "");
            return respuesta; 
        }
        
    }
}
