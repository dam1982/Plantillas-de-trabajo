using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PruebaApicore.Dominio.Contratos.Repositorios;
using PruebaApicore.Dominio.Servicios;
using PruebaApiCore.Infraestructura.Repositorios;

namespace PruebaApiCore.Presentacion
{
    public class Startup
    {
        private readonly IHostingEnvironment _Enviroment;
        private readonly IConfiguration _configuration;


        public Startup(IHostingEnvironment Enviroment)
        {

            this._Enviroment = Enviroment;

            var builder = new ConfigurationBuilder()
                .SetBasePath(_Enviroment.ContentRootPath)
                .AddJsonFile("appsettings.json").
                AddEnvironmentVariables();
            _configuration = builder.Build();


        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddSingleton(_configuration);
            services.AddScoped<IProductoRepositorio, ProductoRepositorios>();

            services.AddScoped<IProductoServicios, Productoservicio>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
        }
    }
}
