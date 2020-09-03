using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;

namespace Institutos_Manager_Forms
{
    class sql
    {
        bool Bandera;
        DataSet ds;
        string connectionstring;
        private SqlCommand com;
        private SqlDataAdapter adApter;
        private SqlConnection conn;
        private SqlTransaction tran;


        internal bool ActivarConexionMY()
        {

            connectionstring = "Data Source=DESKTOP-TQ1T2EP\\YOSEFIN ;Initial Catalog= COLEGIO ;Integrated Security =true"; 
              
                conn = new SqlConnection();
                conn.ConnectionString = connectionstring;
                return true;
            


        }

        internal void Desconexion()
        {
            if (conn.State == ConnectionState.Open)
            {
                conn.Close();
            }
        }
    }
}