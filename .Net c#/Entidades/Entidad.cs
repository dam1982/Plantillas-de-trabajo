using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnvioAutomaticoPoliza.Entidades
{
    public class Poliza
    {
        public int IN_Id_Proceso { get; set; }
        public int IN_Cod_Suc { get; set; }
        public int IN_Cod_Ramo { get; set; }
        public string VC_Nro_Pol { get; set; }
        public int IN_Nro_Endo { get; set; }
        public string VC_Cod_Usuario { get; set; }
        public string VC_Nom_Impresora { get; set; }
        public int Sn_Impresion { get; set; }
        public int Sn_Estado { get; set; }
        public int Sn_Correo { get; set; }
        public int Sn_Sms { get; set; }
        public DateTime DS_Fecha_Creacion { get; set; }
        public int IN_aplicacion { get; set; }
                                   
    }
}
