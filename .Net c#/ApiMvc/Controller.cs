using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EnvioAutomaticoPoliza.Negocio;
using EnvioAutomaticoPoliza.Entidades;
using System.Data;
using EnvioAutomaticoPolizaApi.Models;
using System.Threading;
using System.IO;

namespace EnvioAutomaticoPolizaApi.Controllers
{
    public class EnvioPolizasController : ApiController
    {
        DataSet ds;
        // GET: api/EnvioPolizas


        //muestra las impresiones que no an iniciado procesos
        // GET: api/EnvioPolizas
        [HttpGet]
        public List<Poliza> ConsultarImpresionesXImprimirGET()
        {
            List<Poliza> lista = new List<Poliza>();
            PolizaModel PolizaFunciones = new PolizaModel();
            lista = PolizaFunciones.ConsultarImpresionesXImprimirDatos();
            return lista;
        }
       // consulta los datos de un asegurado --No documento--tipo_documento-apellido 1- apellido 2 nombre1-Nombre2 y txt Telefono
        [HttpGet]
        public List<Cliente> consultarDatosDeAseguradoGET(int cod_suc, int cod_ramo,string nro_pol,int nro_endo)
        {
            List<Cliente> lista = new List<Cliente>();
            PolizaModel PolizaFunciones = new PolizaModel();
            lista = PolizaFunciones.consultarDatoscliente(cod_suc, cod_ramo, nro_pol, nro_endo);
            return lista;
        }

        //Inserta los datos correspondientes a la tabla de impresion para emprezar proceso       
        [HttpPost]
        public string InsertarDatosImpresionPOST(int cod_suc, int cod_ramo, string nro_pol, int nro_endo, string usuario,int aplicacion)
        {
            string CorreoAsegOp = "NULL";
            string NombreAsegOp = "NULL";
            int AsegOp = 0;

            string nombreimpresora = "PDF";
            string respuesta = string.Empty;
            respuesta = ProcesoBLL.Generar_Impresion(cod_suc, cod_ramo, nro_pol, nro_endo, usuario, nombreimpresora, aplicacion, CorreoAsegOp, NombreAsegOp, AsegOp);
            return respuesta;
        }

        [HttpPost]
        public string InsertarDatosImpresionAseg(int cod_suc, int cod_ramo, string nro_pol, int nro_endo, string usuario, int aplicacion, string CorreoAsegOp, string NombreAsegOp)
        {
            int AsegOp = 1;
            string nombreimpresora = "PDF";
            string respuesta = string.Empty;
            respuesta = ProcesoBLL.Generar_Impresion(cod_suc, cod_ramo, nro_pol, nro_endo, usuario, nombreimpresora, aplicacion, CorreoAsegOp, NombreAsegOp, AsegOp);
            return respuesta;
        }




        //confirma que el primer proceso ya se a ejecutado
        [HttpPost]
        public string ConfirmaLaImpresionPOST(int cod_suc, int cod_ramo, string nro_pol, int nro_endo)
        {
            string mensaje = string.Empty;
            mensaje = ProcesoBLL.ConfirmaLaImpresion(cod_suc, cod_ramo, nro_pol, nro_endo);
            return mensaje;
        }
        //Muestra las impresiones que ya tienen el primer proceso ejecutado
        [Route("api/EnvioPolizas/VerImpresionesConfirmadasGet")]
        [HttpGet]
        public List<Poliza> VerImpresionesConfirmadasGet()
        {
            List<Poliza> lista = new List<Poliza>();
            PolizaModel PolizaFunciones = new PolizaModel();
            lista = PolizaFunciones.VerImpresionesConfirmadas();
            return lista;
        }
        //muestra y toma las rutas o direcciones donde se encuentra los adjuntos
        [HttpGet]
        public List<Rutas> VerRutaImpresionGET(int Codigo_sucursal, int Codigo_ramo, string Numero_poliza, int Numero_endoso, string Nombre_usuario, int Codigo_Tipo_Documento, string Numero_Documento,int Aplicacion)
        {
            List<Rutas> ruta = new List<Rutas>();
            ruta = ProcesoBLL.Mostrar_ListaRutas(Codigo_sucursal, Codigo_ramo, Numero_poliza, Numero_endoso, Nombre_usuario, Codigo_Tipo_Documento, Numero_Documento,Aplicacion);
            return ruta;
        }
        
        // verifica que la ruta de impresion si exista si no existe desecha la ruta
        [HttpGet]
        public string ValidarRutaDeImpresionGET(string ruta)
        {
            Thread.Sleep(1000);
            string respuesta = string.Empty;
            if (File.Exists(ruta))
                respuesta = "El Archivo si existe";
            else
                respuesta = "el Archivo no se encontro";
            return respuesta;
        }

        //confirma que el estado de validar rutas ya se a ejecutado
        [HttpPost]
        public string ConfirmarEstadoPOST(int Codigo_Sucursal, int Codigo_Ramo, string Numero_Poliza, int Numero_Endoso)
        {
            string mensaje = string.Empty;
            mensaje = ProcesoBLL.ConfirmarElEstado(Codigo_Sucursal, Codigo_Ramo, Numero_Poliza, Numero_Endoso);
            return mensaje;
        }

        //muestra los estados que ya estan confirmados pero que el tercer estado no se ha confirmado

        [Route("api/EnvioPolizas/VerSoloEstadosConfirmadosGET")]
        [HttpGet]
        public List<Poliza> VerSoloEstadosConfirmadosGET()
        {
            List<Poliza> lista = new List<Poliza>();
            PolizaModel PolizaFunciones = new PolizaModel();
            lista = PolizaFunciones.VerEstadosconfirmados();
            return lista;
        }
      
        // muestra las polizas que ya tienen los procesos terminados
        [Route("api/EnvioPolizas/ImpresionesProsesTerminadoGET")]
        [HttpGet]
        public List<Poliza> ImpresionesProsesTerminadoGET()
        {
            List<Poliza> lista = new List<Poliza>();
            PolizaModel PolizaFunciones = new PolizaModel();
            lista = PolizaFunciones.VerProcesosTerminados();
            return lista;
        }
        // graba lo que ha pasado en cada proceso

        [HttpPost]
        public string GrabarRegistroLogPOST(int Id_Proceso_De_Impresion, int Id_Tipo_Operacion, string Mensaje, string Usuario)
        {
            return LogBLL.Generar_Logs(Id_Proceso_De_Impresion, Id_Tipo_Operacion, Mensaje, Usuario);
        }
        
        // reinicia la impresion devolviendo los procesos en 0
        [HttpPost]
        public string ReimpresionPOST(int Codigo_Sucursal, int Codigo_Ramo, string Numero_Poliza, int Num_Endoso)
        {
            string mensaje = string.Empty;
            mensaje = ProcesoBLL.ReiniciarOperacionImpresion(Codigo_Sucursal, Codigo_Ramo, Numero_Poliza, Num_Endoso);
            return mensaje;
        }
       
        // obtiene los datos del intermediario nombre1-nombre2-apellido1-apellido2-codigo intermediario

        [Route("api/EnvioPolizas/Obtener_IntermediarioGet")]
        [HttpGet]
        public List<EnvioAutomaticoPoliza.Entidades.Intermediario> Obtener_IntermediarioGet(int Codigo_Sucursal, int Codigo_Ramo, string Nro_Poliza, int Nro_Endoso)
        {
            List<EnvioAutomaticoPoliza.Entidades.Intermediario> lista = new List<EnvioAutomaticoPoliza.Entidades.Intermediario>();
            Models.IntermediarioModel interfun = new Models.IntermediarioModel();
            lista = interfun.Obtener_Intermediario(Codigo_Sucursal, Codigo_Ramo, Nro_Poliza, Nro_Endoso);
            return lista;
          
        }

   
    }
}
