
        public static List<OtroDocumento> ObtenerotrosDocumentos(int IN_id_App)
        {

            DataSet ds = new DataSet();
            List<OtroDocumento> lista = new List<OtroDocumento>();
            try
            {
                ds = Procedimiento.CrearOtrosDocumentos(2,0,IN_id_App,0,"",0);
                if (ds.Tables.Count > 0)
                {
                    DataTable dt = ds.Tables[0];
                    foreach (DataRow dr in dt.Rows)
                        lista.Add(verOtroDoc(dr));
                }
            }
            catch (Exception ex)
            {
                var a = ex.Message;
            }
            finally
            {
                ds = null;
            }
            return lista;
        }



        private static OtroDocumento verOtroDoc(DataRow dr)
        {


            OtroDocumento obj = new OtroDocumento()
            {
                IN_Id_Documento = Convert.ToInt32(dr[0]),
                IN_Id_App = Convert.ToInt32(dr[1]),
                IN_Ramo = Convert.ToInt32(dr[2]),
                VAR_NombreDocumento = Convert.ToString(dr[3]),
                SN_Habilitar = Convert.ToInt32(dr[4]),

            };
            return obj;

        }

        //-------------------------------------------------------


  public static List<Log> ConsultarRegistrosLog(int id_proceso)
        {
            string resul = string.Empty;
            DataSet ds;
            List<Log> lista = new List<Log>();
            try
            {
                ds = Procedimiento.OperacionesLog(0,id_proceso, "","", 1);
            if (ds.Tables.Count > 0)
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    DataTable dt = ds.Tables[0];
                    foreach (DataRow dr in dt.Rows)
                        lista.Add(LlenarRegistro(dr));
                }
            }

            }
            catch (Exception ex)
            {
                EventLog.WriteEntry("Error", "Error : " + ex.Message, EventLogEntryType.Error);
            }
            finally
            {
            }
            return lista;
        }

        private static Log LlenarRegistro(DataRow dr)
        {
            Log obj = new Log()
            {
                id_opera = Convert.ToInt32(dr[0]),
                IdProceso = Convert.ToInt32(dr[1]),
                Mensaje = Convert.ToString(dr[2]),
                Usuario = Convert.ToString(dr[3]),
            };
            return obj;
        }

    }