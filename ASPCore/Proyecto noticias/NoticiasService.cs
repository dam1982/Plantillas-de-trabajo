using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NoticiasApi;
using NoticiasApi.Models;

namespace NoticiasApi.Services
{
    public class NoticiasService
    {
        private readonly NotiasDbContex _notiasDbContex;
        public NoticiasService(NotiasDbContex notiasDbContex) {

            _notiasDbContex = notiasDbContex;

        }

        public List<Noticias> Obtener()
        {

            return _notiasDbContex.noticias.Include(x => x.Autor).ToList();
        }





            public bool AgregarNoticia(Noticias _Noticias) {


            try
            {
                _notiasDbContex.noticias.Add(_Noticias);
                _notiasDbContex.SaveChanges();
                return true;

            }
            catch (Exception error)
            {

                return false;
            }
            finally {

                
            }


        }


        public bool EditarNoticia(Noticias _Noticias)
        {


            try
            {
                var noticiasDatos = _notiasDbContex.noticias.Where(x => x.NoticiaID == _Noticias.NoticiaID).FirstOrDefault();
                noticiasDatos.Titulo = _Noticias.Titulo;
                noticiasDatos.Descripcion = _Noticias.Descripcion;
                noticiasDatos.Contenido = _Noticias.Contenido;
                noticiasDatos.Fecha = _Noticias.Fecha;
                noticiasDatos.AutorID = _Noticias.AutorID;

                _notiasDbContex.SaveChanges();

                return true;

            }
            catch (Exception error)
            {

                return false;
            }
            finally
            {


            }


        }



        public bool EliminarNoticia(int NoticiasID)
        {


            try
            {
                var noticiasDatos = _notiasDbContex.noticias.Where(x => x.NoticiaID == NoticiasID).FirstOrDefault();
                _notiasDbContex.Remove(noticiasDatos);
                _notiasDbContex.SaveChanges();

                return true;

            }
            catch (Exception error)
            {

                return false;
            }
            finally
            {


            }


        }


//---------------------------procedimientos almacenados
        public List<Noticias> vernoticias() {


            try
            {


                return _notiasDbContex.noticias.FromSql("Verdatos").ToList();

                

            }
            catch (Exception ex)
            {

                return new List<Noticias>();
            }

        }



        public bool InsertarAutor(string Nombre, string Apellido) {

            try
            {

            
            string query = "insertarAutor @Nombre='{0}' ,@Apellido='{1}'";
            query = string.Format(query, Nombre, Apellido);

             _notiasDbContex.Database.ExecuteSqlCommand(query);


            return true;
            }
            catch (Exception ex )
            {

                return false;
            }

        }

    }
}
