using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace WindowsService1
{
    partial class Archivo : ServiceBase
    {
        public Archivo()
        {
            InitializeComponent();
        }
      public bool bandera = false;

        protected override void OnStart(string[] args)
        {
            stLapso.Start();
        }

        protected override void OnStop()
        {
            stLapso.Stop();
        }

        private void stLapso_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            if (bandera) return;
            try
            {
                bandera = true;
             //   EventLog.WriteEntry("se inicio proceso de copiado", EventLogEntryType.Information);
                string stRutaOrigen = ConfigurationSettings.AppSettings["stRutaOrigen"].ToString();
                string stRutaDestino = ConfigurationSettings.AppSettings["stRutaDestino"].ToString();
                DirectoryInfo di = new DirectoryInfo(stRutaOrigen);

                foreach (var archivo in di.GetFiles("*",SearchOption.AllDirectories))
                {
                    if(File.Exists(stRutaDestino + archivo.Name))
                    { 
                        File.SetAttributes(stRutaOrigen + archivo.Name,FileAttributes.Normal);

                        File.Delete(stRutaDestino + archivo.Name);
                    }

                    File.Copy(stRutaOrigen + archivo.Name,stRutaDestino + archivo.Name);
                    File.SetAttributes(stRutaOrigen + archivo.Name, FileAttributes.Normal);

                  //  if (File.Exists(stRutaDestino + archivo.Name))
                 //       EventLog.WriteEntry("se copio el archivo con exito", EventLogEntryType.Information);
                 //   else
                 //       EventLog.WriteEntry("no se copio el archivo con exito", EventLogEntryType.Information);

                }


            }
            catch (Exception ex)
            {

                EventLog.WriteEntry(ex.Message,EventLogEntryType.Error);
            }

            bandera = false;
        }
    }
}
