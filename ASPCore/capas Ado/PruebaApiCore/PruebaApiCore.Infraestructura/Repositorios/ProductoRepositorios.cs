using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using Microsoft.Extensions.Configuration;
using PruebaApicore.Dominio.Contratos.Repositorios;
using PruebaApicore.Dominio.Entidades;
using System.Diagnostics;
using System.Diagnostics.Tracing;

namespace PruebaApiCore.Infraestructura.Repositorios
{
   public class ProductoRepositorios : IProductoRepositorio
    {

        private readonly IConfiguration configuration;
      //  private readonly IHubContext<TablaHub> tablaHub;

        public ProductoRepositorios(IConfiguration configuration)
        {
            this.configuration = configuration;
           // tablaHub = TablaHub;
        }

        public IEnumerable<Producto> Get()
        {
            List<Producto> listProducto = null;
            Producto oProducto = null;
         //   SqlDependency dependency = null;

            using (SqlConnection Cn = new SqlConnection(configuration.GetConnectionString("dbconnection")))
            {

                try
                {
                    Cn.Open();
                    SqlCommand cmd = new SqlCommand("GetProductos", Cn);
                    cmd.CommandType = CommandType.StoredProcedure;

                    #region Debendency
                    cmd.Notification = null;
             //       dependency = new SqlDependency(cmd);
             //       dependency.OnChange += detectarCambios;
                    SqlDependency.Start(configuration.GetConnectionString("dbconnection"));




                    #endregion



                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {

                        listProducto = new List<Producto>();
                        while (dr.Read())
                        {

                            oProducto = new Producto()
                            {

                                id = dr.IsDBNull(dr.GetOrdinal("id")) ? -1 : dr.GetInt32(dr.GetOrdinal("id")),
                                Nombre = dr.IsDBNull(dr.GetOrdinal("Nombre")) ? "Nodata" : dr.GetString(dr.GetOrdinal("Nombre")),
                                precio = dr.IsDBNull(dr.GetOrdinal("precio")) ? Convert.ToDecimal(0) : dr.GetDecimal(dr.GetOrdinal("precio")),
                                stok = dr.IsDBNull(dr.GetOrdinal("stok")) ? -1 : dr.GetInt32(dr.GetOrdinal("stok"))

                            };
                            listProducto.Add(oProducto);

                        }

                        return listProducto;
                    }


                    return listProducto;
                }
                catch (Exception)
                {

                    throw;
                }

            }
        }

        public  DataSet InsertarProducto(Producto p)
        {
            using (SqlConnection Cn = new SqlConnection(configuration.GetConnectionString("dbconnection")))
            {
                SqlDataAdapter ad = new SqlDataAdapter();
                SqlCommand cmd = new SqlCommand();
                SqlCommand comm = null;
                DataSet ds;
                try
                {
                    comm = new SqlCommand("InsertProducts", Cn);
                    comm.CommandType = CommandType.StoredProcedure;
                    //comm.CommandText = "Usp_ImpPol_FuncionesParamRamo";
                    comm.Parameters.Add("@Nombre", SqlDbType.VarChar).Value = p.Nombre;
                    comm.Parameters.Add("@precio", SqlDbType.Decimal).Value = p.precio;
                    comm.Parameters.Add("@stok", SqlDbType.Int).Value = p.stok;

                    ds = new DataSet();
                    ad = new SqlDataAdapter();
                    ad.SelectCommand = comm;
                    ad.Fill(ds, "Registro");
                    Cn.Close();
                }
                catch (SqlException exSql)
                {
                  //  EventSource .WriteEntry("Hay algun problema con la operacion de Parametrizacion", "Error: " + exSql.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                catch (Exception ex)
                {
                 //   EventLog.WriteEntry("Error", "Error : " + ex.Message, EventLogEntryType.Error);
                    ds = new DataSet();
                }
                finally
                {
                    if (Cn.State == ConnectionState.Open)
                    {
                        Cn.Close();
                        Cn.Dispose();
                        SqlConnection.ClearPool(Cn);
                    }
                    if (comm != null)
                        comm.Dispose();
                }
                return ds;
            }
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}

