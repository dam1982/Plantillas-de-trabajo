//  arregos bidimencionales  


 int[,] i;
            i = new int[3,3];

            for (int fila = 0; fila <  3; fila++) {

                for (int col = 0; col < 3; col++) {

                    Console.WriteLine("dame un numero");
                    i[fila, col] = Convert.ToInt32(Console.ReadLine());

                }
                Console.Clear();

            }
            for (int fila = 0; fila < 3; fila++)
            {

                for (int col = 0; col < 3; col++)
                {

                    Console.Write("  "+ i[fila,col]);
                }
                Console.WriteLine();

            }



//---------------------   crear un archivo


 TextWriter archivo;
            archivo = new StreamWriter("Archivo.txt");
            string mensage;
            mensage = Console.ReadLine();
            archivo.WriteLine(mensage);
            archivo.Close();
            Console.Clear();

            Console.WriteLine("se ha creado el archivo");

            Console.ReadKey();


//---------------------------- leer un documento creado


 TextReader leer_Archivo;
            leer_Archivo = new
                StreamReader("Archivo.txt");
            Console.WriteLine(leer_Archivo.ReadToEnd());
            leer_Archivo.Close();
            Console.ReadKey();


//--------------------  escribir en un documento sin dañar lo que esta creadop

   StreamWriter leer_Archivo;
            leer_Archivo = File.AppendText("Archivo.txt");
            string mensaje;
            mensaje = Console.ReadLine();
            leer_Archivo.WriteLine(mensaje);
            leer_Archivo.Close();

          

            Console.ReadKey();


