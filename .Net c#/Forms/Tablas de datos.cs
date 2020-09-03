 private void Form1_Load(object sender, EventArgs e)
        {
                        
               DataSet ds = new DataSet();
               ServicioImpresionPolizasWCF.Service1Client ws = new ServicioImpresionPolizasWCF.Service1Client();
               ds =  ws.VerPolizasPendientesXImprimir();
               Dgv_ProcAlma.DataSource = ds.Tables["Registro"];
               Dgv_ProcAlma.Show();

            

        }

        //------------------------------------------------------------------



             private void Ver_Datos_Cliente_Click(object sender, EventArgs e)
        {
            DataSet ds = new DataSet();
            ServicioImpresionPolizasWCF.Service1Client ws = new ServicioImpresionPolizasWCF.Service1Client();
            int CodSucursal = Convert.ToInt32(txtsuc_datosCliente.Text);
            int CodRamo = Convert.ToInt32(txtRamo_DatosCliente.Text);
            int NroEndoso = Convert.ToInt32(txtEndoso_DatosCliente.Text);
            ds = ws.ConsultarDatosCliente(CodSucursal, CodRamo, txtPolizaDatosCliente.Text, NroEndoso);
            dataGridVerDatosCliente.DataSource = ds.Tables["Registro"];
            dataGridVerDatosCliente.Show();
        }