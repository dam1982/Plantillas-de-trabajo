using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoticiasApi.Models
{
    public class Noticias
    {

 
        public int NoticiaID  { get; set; }
        public string Titulo  { get; set; }
        public string Descripcion  { get; set; }
        public string Contenido  { get; set; }
        public DateTime Fecha  { get; set; }
        public int AutorID  { get; set; }
        public Autor Autor { get; set; }


        public class mapeo {
            public mapeo(EntityTypeBuilder<Noticias> mapeoNoticias) {
                mapeoNoticias.HasKey(x => x.NoticiaID);  //ID clave 
                mapeoNoticias.HasOne(x => x.Autor); // cuando tiene relacion a otra tabla
                mapeoNoticias.ToTable("Noticia"); // si el nombre de la tabla es diferente
                mapeoNoticias.Property(x => x.Titulo).HasColumnName("Titulo");  //   poner el nombre de la columna si tengo nombre diferente al que se encuentra alli

            }
        }

    }
}
