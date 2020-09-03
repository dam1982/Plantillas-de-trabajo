//------------crear data set en lista
//-------entidades---------

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnvioAutomaticoPoliza.Entidades
{
   public class Rutas
    {


        public string Ruta { get; set; }

       // public Rutas() { }
    }
}




//-------------------datos----------------------------------------


 public static List<Rutas> ObtenerRutaLista(int cod_suc, int cod_ramo, string nro_pol, int nro_endo, string usuario, int CodTipoDocumento, string NroDocumento)
        {
            
            DataSet ds = new DataSet();
            string Respuesta = string.Empty;
            List<Rutas> lista = new List<Rutas>();
            try
            {



                ds = Procedimiento.OperacionesProcesos(cod_suc, cod_ramo, nro_pol, nro_endo, usuario, "", CodTipoDocumento, NroDocumento, 7);
                if (ds.Tables.Count > 0)
                {
                    DataTable dt = ds.Tables[0];
                    foreach (DataRow dr in dt.Rows)
                        lista.Add(LlenarRegistro(dr));
                    //}
                }

            }
            catch (Exception ex)
            {

                Respuesta = ex.Message;
            }
            finally
            {
                //            ds = null;

            }
            return lista;
        }

        private static Rutas LlenarRegistro(DataRow dr)
        {

            Rutas obj = new Rutas()
            {
                Ruta = Convert.ToString(dr[0]),
               
            };
            return obj;
        }
    }
}


//--------------------------------negocio----------------------



 public static List<Rutas> Mostrar_ListaRutas(int cod_suc, int cod_ramo, string nro_pol, int nro_endo, string usuario, int CodTipoDocumento, string NroDocumento)
        {
            List<Rutas> lista = new List<Rutas>();

            lista = ProcesoDAL.ObtenerRutaLista(cod_suc,cod_ramo,nro_pol,nro_endo,usuario,CodTipoDocumento,NroDocumento);

            return lista;

        }


 //-------------------------servicio------------------------


  public List<Rutas> VerRutaImpresion(int cod_suc, int cod_ramo, string nro_pol, int nro_endo, string usuario, int CodTipoDocumento, string NroDocumento)
        {

            //  string ruta = string.Empty;
            List<Rutas> ruta = new List<Rutas>();

            ruta = ProcesoBLL.Mostrar_ListaRutas(cod_suc, cod_ramo, nro_pol, nro_endo, usuario, CodTipoDocumento, NroDocumento);

            //      ruta = ProcesoBLL.SacarRutaDeImpresion(cod_suc,cod_ramo,nro_pol,nro_endo,usuario,CodTipoDocumento,NroDocumento);




            return ruta;

        }       