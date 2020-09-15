using PruebaApicore.Dominio.Contratos.Repositorios;
using PruebaApicore.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;

namespace PruebaApicore.Dominio.Servicios
{
    public class Productoservicio : IProductoServicios
    {

        private readonly IProductoRepositorio ProductoRepositorio;


        public Productoservicio(IProductoRepositorio ProductoRepositorio)
        {
            this.ProductoRepositorio = ProductoRepositorio;
        }


      

        public IEnumerable<Producto> Listado()
        {
            return ProductoRepositorio.Get();
        }




        ///--------------------------------------------------------------------------------------------

        public  string  InsertarProducto(Producto p)
        {
            DataSet ds = new DataSet();
            string respuesta = string.Empty;
            try
            {
                ds = ProductoRepositorio.InsertarProducto(p);
                respuesta = "Se ha confirmado la impresion";
            }
            catch (Exception ex)
            {
                respuesta = ex.Message;
            }
            finally
            {
            }
            return respuesta;

          }

//------------------------------------------------------------------------------------------
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
