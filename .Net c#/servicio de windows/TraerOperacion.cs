using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EnvioAutomaticoPoliza_SW_Cliente
{
    public class Operaciones
    {
        public static void TraerOperaciones()
        {
            
            GenerarPoliza.GenerarImpresion();
            GenerarPoliza.Confirmar_Impresion();
            GenerarPoliza.EnviarCorreo();
        }



    }
}
