using System;
using System.ComponentModel.DataAnnotations;


namespace HolaMundo.Models
{
     public class Usuario
    {
          [Required(ErrorMessage ="Digite Nombre") ]
        [MinLength(4,ErrorMessage ="Digite al menos 5 caracteres") ]
        [MaxLength(10,ErrorMessage ="Digite menos de 10 caracteres") ]
        public string Nombre { get; set; }
        [Required(ErrorMessage ="Digite Nombre") ]
        [MinLength(4,ErrorMessage ="Digite al menos 5 caracteres") ]
        [MaxLength(10,ErrorMessage ="Digite menos de 10 caracteres") ]
        public string Apellido { get; set; }
         [Required(ErrorMessage ="Digite Nombre") ]
         [EmailAddress(ErrorMessage ="Digite correo valido") ]
        public string Correo { get; set; }
         [Required(ErrorMessage ="escriba una edad") ]
         [Range(18, 120, ErrorMessage ="escriba una edad validad")]
        public int Edad { get; set; }

    }
}