using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CreacionMasivaDeAsegurados.Entidades;
using System.IO;


namespace CreacionMasivaDeAsegurados.Forms
{
    class VerificaDocumentacion
    {

        public void BuscarArchivos(string documento,string rutaCarpeta) {

            string FUCC = rutaCarpeta+ "\\" + documento + "_FUCC.txt";
            string CC = rutaCarpeta + "\\" + documento + "_CC.txt";
            string RUT = rutaCarpeta + "\\" + documento + "_RUT.txt";
            string CCIO = rutaCarpeta + "\\" + documento + "_CCIO.txt";
            string CCRL = rutaCarpeta + "\\" + documento + "_CCRL.txt";
            string CarpetaDeDestino = "D:\\Usuarios\\ext.amarin\\Desktop\\Proyectos\\CreacionMasivaDeAsegurados\\Id_Persona";

            if (File.Exists(FUCC)) {
                if (File.Exists(CarpetaDeDestino + "\\" + documento + "_FUCC.txt")){}
                else { 

                File.Copy(FUCC,CarpetaDeDestino+ "\\" + documento + "_FUCC.txt");
                }
            }
            if (File.Exists(CC))
            {
                if (File.Exists(CarpetaDeDestino + "\\" + documento + "_CC.txt")){}
                else { 
                File.Copy(CC, CarpetaDeDestino+"\\" + documento + "_CC.txt");
                }
            }
            if (File.Exists(RUT))
            {
                if (File.Exists(CarpetaDeDestino + "\\" + documento + "_RUT.txt")){}
                else
                {
                    File.Copy(RUT, CarpetaDeDestino + "\\" + documento + "_RUT.txt");
                }
            }
            if (File.Exists(CCIO))
            {
                if (File.Exists(CarpetaDeDestino + "\\" + documento + "_CCIO.txt")){}
                else { 
                File.Copy(CCIO, CarpetaDeDestino + "\\" + documento + "_CCIO.txt");
                }
            }
            if (File.Exists(CCRL))
            {
                if (File.Exists(CarpetaDeDestino + "\\" + documento + "_CCRL.txt")) { }
                else { 
                File.Copy(CCRL, CarpetaDeDestino + "\\" + documento + "_CCRL.txt");
                }
            }

        }

    }
}
