   
   
   ///consultar
   
   public DataSet Consulta_Todos_Los_Picking()
        {
            try
            {
                //    Desconexion();
                this.ActivarConexionMY();

                if (conn == null)
                {
                    this.ActivarConexionMY();
                }
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                this.ds = new DataSet();
                this.com = new SqlCommand("SELECT * FROM DIS_Registros_Picking", conn);
                this.adApter = new SqlDataAdapter();
                this.adApter.SelectCommand = com;
                //   com.Parameters.AddWithValue("@Es", Estado);
                this.adApter.Fill(ds, "REGISTROS");
                int count = ds.Tables["REGISTROS"].Rows.Count;
                if (count > 0)
                {

                }
                Desconexion();
                return ds;

            }
            catch (Exception ex)
            {
                Desconexion();
                MessageBox.Show(ex.Message);
                return ds;
            }

        }

        //Insertar
        
          internal bool Ingresar_Registros_Transporte(string No_Guia, string Usuario, DateTime Fecha, string Estado, DateTime Fecha_Entrega_Clientes, string Observacion, string Transportador, string Tiempo_Entrega)
        {
            if (conn == null)
            {
                this.ActivarConexionMY();
            }
            SqlTransaction tran;

            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            tran = conn.BeginTransaction();

            try
            {
                this.com = new SqlCommand("INSERT INTO DIS_Registros_Transportador (No_Guia,Usuario,Fecha,Estado, Fecha_Entrega_Cliente,Observacion,Transportador,Tiempo_Entrega) VALUES(@NG,@U,@F,@Es,@FEC,@Ob,@Tra,@TE)");
                this.com.Connection = conn;
                com.Parameters.AddWithValue("@NG", No_Guia);
                com.Parameters.AddWithValue("@U", Usuario);
                com.Parameters.AddWithValue("@F", Fecha);
                com.Parameters.AddWithValue("@Es", Estado);
                com.Parameters.AddWithValue("@FEC", Fecha_Entrega_Clientes);
                com.Parameters.AddWithValue("@Ob", Observacion);
                com.Parameters.AddWithValue("@Tra", Transportador);
                com.Parameters.AddWithValue("@TE", Tiempo_Entrega);

                com.Transaction = tran;
                com.ExecuteNonQuery();
                tran.Commit();
                Desconexion();
                return true;
            }
            catch (Exception ex)
            {
                Desconexion();
                MessageBox.Show(ex.Message);
                return false;
            }
        }


        //Actualizar

           internal bool Modificar_Registro_Transportador(string No_Guia, string Usuario, DateTime Fecha, string Estado, DateTime Fecha_Entrega_Clientes, string Observacion, string Transportador, string Tiempo_Entrega, int Consecutivo)
        {
            if (conn == null)
            {
                this.ActivarConexionMY();
            }
            SqlTransaction tran;

            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            tran = conn.BeginTransaction();

            try
            {
                this.com = new SqlCommand("UPDATE  DIS_Registros_Transportador SET No_Guia = @NG,Usuario =@U ,Fecha = @F,Estado = @Es, Fecha_Entrega_Cliente  = @FEC ,Observacion = @Ob,Transportador = @Tra ,Tiempo_Entrega = @TE WHERE Consecutivo = @CO ");
                this.com.Connection = conn;
                com.Parameters.AddWithValue("@NG", No_Guia);
                com.Parameters.AddWithValue("@U", Usuario);
                com.Parameters.AddWithValue("@F", Fecha);
                com.Parameters.AddWithValue("@Es", Estado);
                com.Parameters.AddWithValue("@FEC", Fecha_Entrega_Clientes);
                com.Parameters.AddWithValue("@Ob", Observacion);
                com.Parameters.AddWithValue("@Tra", Transportador);
                com.Parameters.AddWithValue("@TE", Tiempo_Entrega);
                com.Parameters.AddWithValue("@CO", Consecutivo);

                com.Transaction = tran;
                com.ExecuteNonQuery();
                tran.Commit();
                Desconexion();
                return true;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro 2650..." + ex.Message);
                Desconexion();
                return false;
            }
        }

        //Borrar

           internal bool Borrar_Registros_Auditoria(int Consecutivo)
        {
            if (conn == null)
            {
                this.ActivarConexionMY();
            }
            SqlTransaction tran;
            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            tran = conn.BeginTransaction();
            try
            {
                this.ds = new DataSet();
                this.com = new SqlCommand("DELETE DIS_Registros_Auditoria WHERE Consecutivo = @Consecutivo");
                com.Parameters.AddWithValue("@Consecutivo", Consecutivo);
                this.com.Connection = conn;
                this.adApter = new SqlDataAdapter();
                this.adApter.SelectCommand = com;
                com.Transaction = tran;
                com.ExecuteNonQuery();
                tran.Commit();
                Desconexion();
                return true;
            }

            catch (Exception ex)
            {
                Desconexion();
                MessageBox.Show(ex.Message);
                return true;
            }
        }