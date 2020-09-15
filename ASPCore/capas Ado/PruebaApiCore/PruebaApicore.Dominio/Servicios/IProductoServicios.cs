using PruebaApicore.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace PruebaApicore.Dominio.Servicios
{
    public interface IProductoServicios : IDisposable
    {
        IEnumerable<Producto> Listado();
        string InsertarProducto(Producto p);
    }
}
