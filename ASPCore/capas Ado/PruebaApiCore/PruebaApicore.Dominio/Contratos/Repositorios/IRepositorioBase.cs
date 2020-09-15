using PruebaApicore.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;

namespace PruebaApicore.Dominio.Contratos.Repositorios
{
    public interface IRepositorioBase<TEntity> : IDisposable where TEntity : class
    {

        IEnumerable<TEntity> Get();
        DataSet InsertarProducto(Producto p);
    }
    
    
}
