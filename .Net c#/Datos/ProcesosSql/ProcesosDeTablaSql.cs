 public static DataSet Insertar_Registro_Excel2(DataTable table1, DataTable table2,DataTable table3,int Id_Excel)
        {


            using (var con = new SqlConnection(Conexion.Cadena_Conexion("SISE")))
            {
                SqlDataAdapter ad = new SqlDataAdapter();
                SqlCommand cmd = new SqlCommand();
                SqlCommand comm = null;
                DataSet ds;
                try
                {
                    comm = new SqlCommand("usp_llenartablasmasivos", con);
                    comm.CommandType = CommandType.StoredProcedure;
                    comm.Parameters.Add("@ID_CARGUE", SqlDbType.Int).Value = Id_Excel;
                    comm.Parameters.Add("@ListaPersonas", SqlDbType.Structured).Value = table1;
                    comm.Parameters.Add("@ListaAsociados", SqlDbType.Structured).Value = table2;
                    comm.Parameters.Add("@ListaPersonasMarcas", SqlDbType.Structured).Value = table3;
                    ds = new DataSet();
                    ad = new SqlDataAdapter();
                    ad.SelectCommand = comm;
                    ad.Fill(ds, "Registro");
                    con.Close();
                }
                catch (SqlException exSql)
                {
                    EventLog.WriteEntry("Hay algun problema con la operacion de procesos", "Error: " + exSql.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                catch (Exception ex)
                {
                    EventLog.WriteEntry("hubo un error en Insertar_Registro_Excel de la clase procedimiento", "Error : " + ex.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                finally
                {
                    if (con.State == ConnectionState.Open)
                    {
                        con.Close();
                        con.Dispose();
                        SqlConnection.ClearPool(con);
                    }
                    if (comm != null)
                        comm.Dispose();
                }
                return ds;
            }

        }