using System;
using System.ServiceProcess;
using System.Threading;
using System.Configuration;


namespace EnvioAutomaticoPoliza_SW_Cliente
{
    public partial class Service1 : ServiceBase
    {

        Thread hilo;

        public Service1()
        {
            InitializeComponent();
            hilo = new Thread(new ThreadStart(Operacion));
            hilo.Start();
        }

        //protected override void OnStart(string[] args)
        //{
        //    hilo = new System.Threading.Thread(new System.Threading.ThreadStart(Operacion));
        //    hilo.Start();
        //}

        //protected override void OnStop()
        //{
        //    hilo = new System.Threading.Thread(new System.Threading.ThreadStart(Operacion));
        //    hilo.Join();
        //}

        //private void timer1_Tick(object sender, EventArgs e)
        //{
          
        //}

        private void Operacion()
        {
            do
            {
                Operaciones.TraerOperaciones();
                Thread.Sleep(Convert.ToInt32(ConfigurationManager.AppSettings["Hilo"]));
            }
            while (hilo.IsAlive);
        }
    }
}
