using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using cliente;
using VersionAudio.Models;

namespace cliente
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
               if( this.openFileDialog1.ShowDialog() == DialogResult.OK)
                {
                    byte[] b = System.IO.File.ReadAllBytes(openFileDialog1.FileName);
                    ByteArrayContent byteContent = new ByteArrayContent(b);
                   


                    var base64 = Convert.ToBase64String(b, 0, b.Length);
                    var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://localhost:63601/api/AudioEntrada/GenerarAudioPOST");
                    httpWebRequest.Accept = "application/json";
                    httpWebRequest.ContentType = "application/json";
                    httpWebRequest.Method = "POST";
                    using (var stream = httpWebRequest.GetRequestStream())
                    {
                        Audio objTemp = new Audio()
                        {
                            AudioBit = b,
                            AudioFormato = base64
                        };
                        var bodyTemp = Encoding.ASCII.GetBytes(JsonConvert.SerializeObject(objTemp));
                        stream.Write(bodyTemp, 0, bodyTemp.Length);
                    }
               HttpWebResponse response = (HttpWebResponse)httpWebRequest.GetResponse();
               StreamReader sr = new StreamReader(response.GetResponseStream());
               string mensaje = sr.ReadToEnd();
               httpWebRequest.GetResponse().Close();
               }

            }
            catch (Exception ex)
            {
            throw;
            }
        }
    }
}
