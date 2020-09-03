 
 //sesencriptar
 
 Byte[] Desencriptar = Convert.FromBase64String(GridView1.SelectedRow.Cells[5].Text);
            Txtpass.Text = System.Text.Encoding.Unicode.GetString(Desencriptar);

 // encriptar


  Byte[] encriptar = System.Text.Encoding.Unicode.GetBytes(Txtpass.Text);
                usuario.pass = Convert.ToBase64String(encriptar);           