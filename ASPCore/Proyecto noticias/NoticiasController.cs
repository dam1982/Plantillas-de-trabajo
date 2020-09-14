using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoticiasApi.Services;
using NoticiasApi.Models;

namespace NoticiasApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticiasController : ControllerBase
    {

        private readonly NoticiasService _noticiasService;
        public NoticiasController(NoticiasService Notinoticiacervice) {
            _noticiasService = Notinoticiacervice;
        }




        // GET: api/Noticias
        [HttpGet]

        public List<Noticias> Get()
        {

            return _noticiasService.Obtener();
        }

        // GET: api/Noticias/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Noticias
        [HttpPost]
        public IActionResult Post([FromBody] Noticias _noticia)
        {

            var resultado = _noticiasService.AgregarNoticia(_noticia);

            if (resultado)
            {

                return Ok();
            }
            else {

                return BadRequest();
            }


        }

        // PUT: api/Noticias/5
        [HttpPut]
        [Route("Editar")]
        public IActionResult Put([FromBody] Noticias _noticia)
        {

            var resultado = _noticiasService.EditarNoticia(_noticia);

            if (resultado)
            {

                return Ok();
            }
            else
            {

                return BadRequest();
            }
        }

        // DELETE: api/ApiWithActions/5
        [Route("Eliminar/{NoticiaID}")]
        public IActionResult Delete(int NoticiaID)
        {

            var resultado = _noticiasService.EliminarNoticia(NoticiaID);

            if (resultado)
            {

                return Ok();
            }
            else
            {

                return BadRequest();
            }
        }

//----------------------------prodedimientos almacenados----------------------------
        [HttpGet]
        [Route("vernoticiaslist")]
        public List<Noticias> vernoticiaslist(){

            return _noticiasService.vernoticias();

        }



        [Route("MeterNoticia/{Nombre}/{Apellido}")]
        [HttpGet]

        public ContentResult MeterNoticia(string Nombre, string Apellido)
        {

            try
            {
            _noticiasService.InsertarAutor(Nombre,Apellido);
            return Content("<h1>" + "se inserto correctamente" + "</h1>");
            }
            catch (Exception)
            {

                return Content("<h1>" + "no se pudo insertar" + "</h1>");
            }


        }

    }
}
