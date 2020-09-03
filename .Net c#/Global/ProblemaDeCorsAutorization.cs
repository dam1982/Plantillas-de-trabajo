
--------------


 // Configuración y servicios de API web
            config.EnableCors(new EnableCorsAttribute("http://localhost:4200", headers: "*", methods: "*"));

*----------------------



using System.Web.Http.Cors;