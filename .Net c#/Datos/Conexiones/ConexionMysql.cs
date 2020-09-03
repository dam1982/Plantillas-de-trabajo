using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System.Data;

namespace Data
{
    public class Data
    {
        public MySqlCommand com;
        public MySqlDataAdapter adap;
        public MySqlConnection Conn;
       public MySqlTransaction Tran;
        public DataSet ds;

        string ConnectionString_MySql;

        internal MySqlConnection conn
        {
            get { return Conn; }
            set { Conn = value; }

        }

        internal bool Connection_Activation()
        {
            try
            {
                ConnectionString_MySql = "server = LOCALHOST ; database=BD_IPS; UID=root;PWD=1234;Port=7976;";
                Conn = new MySqlConnection();
                Conn.ConnectionString = ConnectionString_MySql;
                return true;

            }
            catch(Exception ex)
            {
                return false;
            }
        }

        internal void Desconnetion()
        {
            if(Conn.State == System.Data.ConnectionState.Open)
            {
                Conn.Close();
            }
        }


        #region "LOGIN"

        internal bool Login(string Usuario, string Clave)
        {
            bool Result = false;
            try
            {
                if((Conn == null))
                {
                    this.Connection_Activation();
                }
                if(Conn.State == System.Data.ConnectionState.Closed)
                {
                    Conn.Open();
                }
                System.Data.DataSet ds = new System.Data.DataSet();
                this.com = new MySqlCommand("SELECT Usuario,Clave FROM USUARIOS_SISTEMA WHERE Usuario=?USU ",Conn);
                this.adap = new MySqlDataAdapter();
                this.com.Parameters.Add("?USU",Usuario);
                this.adap.SelectCommand = com;
                this.adap.Fill(ds,"LOGIN");
                if(ds.Tables["LOGIN"].Rows.Count > 0)
                {
                    Result = true;
                }
                Desconnetion();
                return Result;

            }
            catch(Exception ex)
            {
                Desconnetion();
                return Result;
            }


        }

        #endregion

    }
}
