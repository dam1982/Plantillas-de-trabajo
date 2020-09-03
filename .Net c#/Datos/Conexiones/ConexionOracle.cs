Paquete de Nuget es : Oracle.ManagedDataAccess.Core y el espacio de nombres Oracle.ManagedDataAccess.Client.

Para poder crear esta cadena de conexión se uso el código

OracleConnectionStringBuilder builder = new OracleConnectionStringBuilder();
builder.DataSource = "192.168.100.147:1521/orcl";
builder.UserID = "user";
builder.PersistSecurityInfo = true;
builder.Password = "password";
builder.ConnectionTimeout = 250;
Console.WriteLine(builder.ConnectionString);
Para validar la cadena de conexión y verificar la version de una base de datos Oracle podemos ejecutar el siguiente código de C#.
using (OracleConnection connection = new OracleConnection(builder.ConnectionString))
{
    try
    {
        connection.Open();
        Console.WriteLine("Conexión válida");
        OracleCommand command = new OracleCommand("SELECT BANNER FROM v$version;", connection);
        OracleDataReader reader = command.ExecuteReader();
        if (reader.HasRows)
        {
            while (reader.Read())
            {
                Console.WriteLine(reader.GetString(0));
            }
        }
        else
        {
            Console.WriteLine("Sin resultados.");
        }
        reader.Close();
    }
    catch (Exception exception)
    {
        Console.WriteLine(exception.Message);
    }
}