using System;
using System.Collections.Generic;
using System.Text;

namespace PruebaApicore.Dominio.Entidades
{
    public class Producto
    {
        public int id { get; set; }
        public string Nombre { get; set; }
        public decimal precio { get; set; }
        public int stok { get; set; }
    }
}
