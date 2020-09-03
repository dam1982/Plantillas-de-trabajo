  private void DGV_Parametrizacion_CellBeginEdit(object sender, DataGridViewCellCancelEventArgs e)
        {
            if (DGV_Parametrizacion.Rows.Count > 1)
            {
                if (DGV_Parametrizacion.Rows[DGV_Parametrizacion.CurrentRow.Index].Cells[7].Value.ToString() !="")
                {
                    bool valor = !bool.Parse(DGV_Parametrizacion.Rows[DGV_Parametrizacion.CurrentRow.Index].Cells[7].Value.ToString());
                    int id = int.Parse(DGV_Parametrizacion.Rows[DGV_Parametrizacion.CurrentRow.Index].Cells[0].Value.ToString());
                    ramo = Convert.ToInt32(DGV_Parametrizacion.CurrentRow.Cells[1].Value);
                    tipo_pol = Convert.ToInt32(DGV_Parametrizacion.CurrentRow.Cells[3].Value);
                    tipo_doc = Convert.ToInt32(DGV_Parametrizacion.CurrentRow.Cells[5].Value);
                    // EnvioAutomaticoPolizas.Service1Client ws = new EnvioAutomaticoPolizas.Service1Client();
                    //  var a = ws.ActualizarDatosParammetrizacion(id, valor);
                    MetodosApi api = new MetodosApi();
                    var a = api.ActualizarDatosParammetrizacion(id, valor);
                    
                    if (a != string.Empty)
                        if (valor == true)
                        {
                            MessageBox.Show("Se ha Habilitado La Impresion");
                        }
                        else
                        {
                            MessageBox.Show("Se ha Desabilitado La Impresion");
                        }
                    DGV_Parametrizacion.Rows[DGV_Parametrizacion.CurrentRow.Index].Cells[7].Value = valor;
                    ramo = 0;
                    tipo_pol = 0;
                    tipo_doc = 0;
                }
                else
                {
                    MessageBox.Show("Porfavor seleccione una fila valida");
                }
            }
           
        }

      