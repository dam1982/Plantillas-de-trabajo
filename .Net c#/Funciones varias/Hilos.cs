using System;
using System.ServiceProcess;
using System.Threading;


namespace EnvioAutomaticoPoliza_SW_Cliente
{
    public partial class Service1 : ServiceBase
    {

        Thread hilo;

        public Service1()
        {

            InitializeComponent();
            //  GenerarPoliza bd = new GenerarPoliza();
            //bd.Confirmar_Impresion();
            //bd.CrearCorreo();
            hilo = new System.Threading.Thread(new System.Threading.ThreadStart(Operacion));
            hilo.Start();

        }

        protected override void OnStart(string[] args)
        {

            hilo = new System.Threading.Thread(new System.Threading.ThreadStart(Operacion));
            hilo.Start();



            //   timer1.Start();
            //   GenerarPoliza bd = new GenerarPoliza();



        }

        protected override void OnStop()
        {
         //   timer1.Stop();

        }

        



        private void timer1_Tick(object sender, EventArgs e)
        {
          //  GenerarPoliza bd = new GenerarPoliza();
          //  bd.generarPolizaAutomatica();

            //bd.ConsultaImpresos();
            //bd.ConsultarEstados();
            //bd.ConsultarCorreos();
        }

        private void Operacion()
        {

            do
            {
                Operaciones.TraerOperaciones();
                Thread.Sleep(Convert.ToInt32(15));
            }
            while (hilo.IsAlive);
            

        }
    }
}


