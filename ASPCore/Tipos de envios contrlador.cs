using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using HolaMundo.Models;

namespace Usuario.Controllers
{
    public class UsuarioController : Controller
    {



//*-------------------------carge de archivos-------------
        private  IHostingEnvironment _env; 

        public UsuarioController(IHostingEnvironment env){
            _env  =  env;
        }

        public FileStreamResult PDF(){

            string Filepath = Path.Combine(_env.WebRootPath,"C:/Users/ADMIN/Downloads/Comprobante de pago en MercadoLibre con Pse.pdf");

            FileStream fs = new FileStream(Filepath, FileMode.Open);
            return File(fs,"application/pdf");
        }
//-------------------------------------------------------

//con view data quiere decir coje de una clase o modelo

 public IActionResult Index(){
            ViewBag.Nombre = "Jose Antonio";
            ViewData["Apellido"] ="Moreno";
            TempData["Usuario"] ="josito";

            List<string> frutas = new List<string>(){
                "melocoton","manzana","fresa","coco"
            };
 //-----------------------------------------------------

  ViewBag.Usuarios  = new List<HolaMundo.Models.Usuario>(){
                new HolaMundo.Models.Usuario(){
                    Nombre ="Diego",
                    Apellido ="Marin",
                    Correo = "Toxidomass@hotmailo",
                    Edad =5
                },
                new HolaMundo.Models.Usuario(){
                    Nombre ="Maria",
                    Apellido ="sarten",
                    Correo = "Lilo@hotmailo",
                    Edad =5
                }

            };

                ViewData["frutas"] = frutas;
            return View();
        }

      //  

      
    //    [BindProperty]
    //    public Usuario _Usuario{get;set;}  
        public ContentResult Registro(string Nombre){
            
            return Content("<h1>" + Nombre + "</h1>");

        }           
    }
}