using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NoticiasApi.Models;

namespace NoticiasApi
{
    public class NotiasDbContex : DbContext
    {
        public NotiasDbContex(DbContextOptions opciones) : base(opciones) {


        }

        public DbSet<Noticias> noticias { get; set; }
        public DbSet<Autor> autor { get; set; }

        protected override void OnModelCreating(ModelBuilder ModeloCreador) {

            new Noticias.mapeo(ModeloCreador.Entity<Noticias>());
            new Autor.mapeo (ModeloCreador.Entity<Autor>());



            
        }




    }
}
