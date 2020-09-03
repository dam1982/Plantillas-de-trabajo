using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Xml;

namespace EnvioAutomaticoPoliza.Datos
{
    public class Conexion
    {

        private static Conexion con;
        public Conexion() { }

        public static Conexion getConexion() {

            if (con == null) {

                con = new Conexion();

            }
            return con;
        }

        private SqlConnection conn;

        private static string connectionString;


        public static string Cadena_Conexion(string StrCadenaConexion)
        {
            return Conectar(StrCadenaConexion);
        }



        private static string Conectar(string StrCadenaConexion) {

            //conn = new SqlConnection("Data Source=SOLIDOD;Initial Catalog=solidaria_desarrollo_pol;Integrated Security=True");
            //conn.Open();
            //return conn;
            //string a = @"C:\Users\EXT.AMARIN\source\repos\EnvioAutomaticoPoliza\EnvioAutomaticoPoliza_ServicioWcf";

            try
            {
                XmlDocument xdoc = new XmlDocument();
                string a = System.AppDomain.CurrentDomain.BaseDirectory;
                xdoc.Load(a + "../XMLFile.xml");
                XmlNodeList config = xdoc.GetElementsByTagName("config");
                XmlNodeList lista = ((XmlElement)config[0]).GetElementsByTagName("conexion");
                foreach (XmlElement nodo in lista)
                {
                    if (nodo.GetAttribute("app") == StrCadenaConexion)
                        connectionString = nodo.GetAttribute("cadena");
                }
            }
            catch (Exception ex)
            {
                connectionString = ex.Message;
            }

            return connectionString;




        }







    }
}
