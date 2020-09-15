using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PruebaApicore.Dominio.Entidades;
using PruebaApicore.Dominio.Servicios;

namespace PruebaApiCore.Presentacion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IProductoServicios _productoServicio;


        public ValuesController(IProductoServicios productoServicio)
        {
            this._productoServicio = productoServicio;
        }


        // GET api/values
        [HttpGet]
        public List<Producto> Get()
        {
            var data = _productoServicio.Listado();
            return data.ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public bool Post(Producto p)
        {

            var data = _productoServicio.InsertarProducto(p);


            return true;

        }
    

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
