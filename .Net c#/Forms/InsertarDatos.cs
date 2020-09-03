  private void InsertarDatos_Impresion_Click(object sender, EventArgs e)
        {
            ServicioImpresionPolizasWCF.Service1Client ws = new ServicioImpresionPolizasWCF.Service1Client();
            int CodSucursal = Convert.ToInt32(Txt_Suc.Text);
            int CodRamo = Convert.ToInt32(Txt_Ramo.Text);
            int NroEndoso = Convert.ToInt32(Txt_Endoso.Text);
            ws.InsertarDatosImpresion(CodSucursal, CodRamo, Txt_Poliza.Text, NroEndoso, Txt_Usuario1.Text, Txt_NombreImpresora.Text);
            DataSet ds = new DataSet();
            ds = ws.VerPolizasPendientesXImprimir();
            Dgv_ProcAlma.DataSource = ds.Tables["Registro"];
            Dgv_ProcAlma.Show();
            MessageBox.Show("se inserto los datos del cliente");
        }