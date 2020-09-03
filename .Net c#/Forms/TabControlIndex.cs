 private void tabControl1_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (tabControl1.SelectedIndex == 0)
            {
                DataSet ds = new DataSet();
                ServicioImpresionPolizasWCF.Service1Client ws = new ServicioImpresionPolizasWCF.Service1Client();
                ds = ws.VerPolizasPendientesXImprimir();
                Dgv_ProcAlma.DataSource = ds.Tables["Registro"];
                Dgv_ProcAlma.Show();

            }
            if (tabControl1.SelectedIndex == 3)
            {

                DataSet ds1 = new DataSet();
                ServicioImpresionPolizasWCF.Service1Client ws = new ServicioImpresionPolizasWCF.Service1Client();
                ds1 = ws.VerImpresionesConfirmadas();
                dataGridVer_Impresion.DataSource = ds1.Tables["Registro"];
                dataGridVer_Impresion.Show();

                DataSet ds2 = new DataSet();
                ds2 = ws.VerSoloEstadosConfirmados();
                dataGridVer_Estado.DataSource = ds2.Tables["Registro"];
                dataGridVer_Estado.Show();

                DataSet ds3 = new DataSet();
                ds3 = ws.VerProcesosTerminados();
                dataGridVerCorreo.DataSource = ds3.Tables["Registro"];
                dataGridVerCorreo.Show();

            }
            if (tabControl1.SelectedIndex == 5)
            {
                DataSet ds = new DataSet();
                ServicioImpresionPolizasWCF.Service1Client ws = new ServicioImpresionPolizasWCF.Service1Client();
                ds = ws.VerDatosDeLaParametrizacion();
                dataGridTabla_Param.DataSource = ds.Tables["Registro"];
                dataGridTabla_Param.Columns[4].Visible = false;
                dataGridTabla_Param.Columns[0].Visible = false;
                dataGridTabla_Param.Show();
               

            }

        }
