using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoticiasApi.Models
{
    public class Autor
    {
       public int AutorID { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
    


    public class mapeo
    {
        public mapeo(EntityTypeBuilder<Autor> mapeoAutor)
        {
            mapeoAutor.HasKey(x => x.AutorID);
            mapeoAutor.ToTable("Autor");
            //  mapeoAutor.HasOne(x => x.AutorID);


        }
    }


    }
}
