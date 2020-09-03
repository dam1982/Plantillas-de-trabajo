//--  eliminar columna --//
alter table usuario
drop column sueldo

//-- cambiar nombre de columna --//

EXEC sp_rename 'usuario.Nombre', 'Nom_Usuario';

//-- buscar un elemento --//
select Nom_Usuario from usuario

//-- buscar multiples elementos --//
select Nom_usuario from usuario go
select fk_Id_Usuario from Empleado go
select  fk_Id_Empleado from ventas


//-- buscar dos consultas join --//
select usuario.Nom_usuario, Empleado.Nombre , ventas.Valor_venta , ventas.id_Venta , Empleado.Id_empleado from usuario inner join Empleado on usuario.Id = Empleado.fk_Id_Usuario inner join ventas on Empleado.Id_empleado = ventas.fk_Id_Empleado 

//-- buscar 3 consultas join con suma de una columna
select Id , usuario.Nom_Usuario, Empleado.Ciudad, Empleado.Nombre, sum( ventas.Valor_venta) as total   from usuario inner join Empleado on usuario.Id = fk_Id_Usuario inner join ventas on Id_empleado = fk_Id_Empleado    group by usuario.Id , usuario.Nom_Usuario, Empleado.Ciudad , Empleado.Nombre 

//-- buscar por una letra o tambien cualquier tipo de busqueda pero sin %--/

select * from Customers
where CompanyName like 'B%'

// crear un orden por un parametro especifico//

select * from Customers
where CompanyName like 'B%' order by  ContactName asc

//-- agrupar una columna con un contador --//
select SupplierID , sum(SupplierID) as total from Products group by SupplierID order by total

//--   crear sub consultas y asi mas consultas dandole un nombre a cada una --//


select ProductID, ProductName, CategoryID,
(select CategoryID from Categories where CategoryID= Products.CategoryID) as categoria
from Products


//--  eliminar columna --//
alter table usuario
drop column sueldo

//-- cambiar nombre de columna --//

EXEC sp_rename 'usuario.Nombre', 'Nom_Usuario';

//-- buscar un elemento --//
select Nom_Usuario from usuario

//-- buscar multiples elementos --//
select Nom_usuario from usuario go
select fk_Id_Usuario from Empleado go
select  fk_Id_Empleado from ventas


//-- buscar dos consultas join --//
select usuario.Nom_usuario, Empleado.Nombre , ventas.Valor_venta , ventas.id_Venta , Empleado.Id_empleado from usuario inner join Empleado on usuario.Id = Empleado.fk_Id_Usuario inner join ventas on Empleado.Id_empleado = ventas.fk_Id_Empleado 

//-- buscar 3 consultas join con suma de una columna
select Id , usuario.Nom_Usuario, Empleado.Ciudad, Empleado.Nombre, sum( ventas.Valor_venta) as total   from usuario inner join Empleado on usuario.Id = fk_Id_Usuario inner join ventas on Id_empleado = fk_Id_Empleado    group by usuario.Id , usuario.Nom_Usuario, Empleado.Ciudad , Empleado.Nombre 

//-- buscar por una letra o tambien cualquier tipo de busqueda pero sin %--/

select * from Customers
where CompanyName like 'B%'

// crear un orden por un parametro especifico//

select * from Customers
where CompanyName like 'B%' order by  ContactName asc

//-- agrupar una columna con un contador --//
select SupplierID , sum(SupplierID) as total from Products group by SupplierID order by total

//--   crear sub consultas y asi mas consultas dandole un nombre a cada una --//


select ProductID, ProductName, CategoryID,
(select CategoryID from Categories where CategoryID= Products.CategoryID) as categoria
from Products




¿Cómo se puede encontrar todas las tablas que no tiene un índice agrupado en una base de datos especificado?
Antes de ejecutar las consultas siguientes, reemplace <database_name> por un nombre de base de datos válido.

Copiar
SELECT SCHEMA_NAME(t.schema_id) AS schema_name, t.name AS table_name  
FROM sys.tables AS t  
WHERE NOT EXISTS   
   (  
     SELECT * FROM sys.indexes AS i  
     WHERE i.object_id = t.object_id  
     AND i.type = 1  -- or type_desc = 'CLUSTERED'  
   )  
ORDER BY schema_name, table_name;  
GO  
  
También se puede utilizar la función OBJECTPROPERTY como se muestra en el siguiente ejemplo:

Copiar
USE <database_name>;  
GO  
SELECT SCHEMA_NAME(schema_id) AS schema_name, name AS table_name  
FROM sys.tables   
WHERE OBJECTPROPERTY(object_id,'TableHasClustIndex') = 0  
ORDER BY schema_id, name;  
GO  
  
TOP

¿Cómo se puede encontrar todos los propietarios de entidades que contiene un esquema especificado?
Antes de ejecutar la consulta siguiente, reemplace <database_name> y <schema_name> por nombres válidos.

Copiar
USE <database_name>;  
GO  
SELECT 'OBJECT' AS entity_type  
    ,USER_NAME(OBJECTPROPERTY(object_id, 'OwnerId')) AS owner_name  
    ,name   
FROM sys.objects WHERE SCHEMA_NAME(schema_id) = '<schema_name>'  
UNION   
SELECT 'TYPE' AS entity_type  
    ,USER_NAME(TYPEPROPERTY(SCHEMA_NAME(schema_id) + '.' + name, 'OwnerId')) AS owner_name  
    ,name   
FROM sys.types WHERE SCHEMA_NAME(schema_id) = '<schema_name>'   
UNION  
SELECT 'XML SCHEMA COLLECTION' AS entity_type   
    ,COALESCE(USER_NAME(xsc.principal_id),USER_NAME(s.principal_id)) AS owner_name  
    ,xsc.name   
FROM sys.xml_schema_collections AS xsc JOIN sys.schemas AS s  
    ON s.schema_id = xsc.schema_id  
WHERE s.name = '<schema_name>';  
GO  
  
TOP

¿Cómo se puede encontrar todas las tablas que no tienen una clave principal?
Antes de ejecutar las consultas siguientes, reemplace <database_name> por un nombre de base de datos válido.

Copiar
USE <database_name>;  
GO  
SELECT SCHEMA_NAME(t.schema_id) AS schema_name  
    ,t.name AS table_name  
FROM sys.tables t   
WHERE object_id NOT IN   
   (  
    SELECT parent_object_id   
    FROM sys.key_constraints   
    WHERE type_desc = 'PRIMARY_KEY_CONSTRAINT' -- or type = 'PK'  
    );  
GO  
  
También puede ejecutar la siguiente consulta.

Copiar
USE <database_name>;  
GO  
SELECT SCHEMA_NAME(schema_id) AS schema_name  
    ,name AS table_name   
FROM sys.tables   
WHERE OBJECTPROPERTY(object_id,'TableHasPrimaryKey') = 0  
ORDER BY schema_name, table_name;  
GO  
  
TOP

¿Cómo se puede encontrar todas las tablas que no tienen un índice?
Antes de ejecutar la consulta siguiente, reemplace <database_name> por un nombre de base de datos válido.

Copiar
USE <database_name>;  
GO  
SELECT SCHEMA_NAME(schema_id) AS schema_name  
    ,name AS table_name  
FROM sys.tables   
WHERE OBJECTPROPERTY(object_id,'IsIndexed') = 0  
ORDER BY schema_name, table_name;  
GO  
  
TOP

¿Cómo se puede encontrar todas las tablas que tienen una columna de identidad?
Antes de ejecutar la consulta siguiente, reemplace <database_name> por un nombre de base de datos válido.

Copiar
USE <database_name>;  
GO  
SELECT SCHEMA_NAME(schema_id) AS schema_name  
    , t.name AS table_name  
    , c.name AS column_name  
FROM sys.tables AS t  
JOIN sys.identity_columns c ON t.object_id = c.object_id  
ORDER BY schema_name, table_name;  
GO  
  
También puede ejecutar la siguiente consulta.
 Nota

Esta consulta no devuelve el nombre de las columnas.

Copiar
USE <database_name>;  
GO  
SELECT SCHEMA_NAME(schema_id) AS schema_name  
    ,name AS table_name   
FROM sys.tables   
WHERE OBJECTPROPERTY(object_id,'TableHasIdentity') = 1  
ORDER BY schema_name, table_name;  
GO  
  
TOP

¿Cómo se puede encontrar los tipos de datos de las columnas de una tabla determinada?
Antes de ejecutar la consulta siguiente, reemplace <database_name> y <schema_name.table_name> por nombres válidos.

Copiar
USE <database_name>;  
GO  
SELECT c.name AS column_name  
    ,c.column_id  
    ,SCHEMA_NAME(t.schema_id) AS type_schema  
    ,t.name AS type_name  
    ,t.is_user_defined  
    ,t.is_assembly_type  
    ,c.max_length  
    ,c.precision  
    ,c.scale  
FROM sys.columns AS c   
JOIN sys.types AS t ON c.user_type_id=t.user_type_id  
WHERE c.object_id = OBJECT_ID('<schema_name.table_name>')  
ORDER BY c.column_id;  
GO  
  
TOP

¿Cómo se puede encontrar las dependencias de una función determinada?
Antes de ejecutar la consulta siguiente, reemplace <database_name> y <schema_name.function_name> por nombres válidos.

Copiar
USE <database_name>;  
GO  
SELECT OBJECT_NAME(object_id) AS referencing_object_name  
    ,COALESCE(COL_NAME(object_id, column_id), '(n/a)') AS referencing_column_name  
    ,*  
FROM sys.sql_dependencies  
WHERE referenced_major_id = OBJECT_ID('<schema_name.function_name>')  
ORDER BY OBJECT_NAME(object_id), COL_NAME(object_id, column_id);  
GO  
  
TOP

¿Cómo se puede encontrar todos los procedimientos almacenados en una base de datos?
Antes de ejecutar la consulta siguiente, reemplace <database_name> por un nombre válido.

Copiar
  
USE <database_name>;  
GO  
SELECT name AS procedure_name   
    ,SCHEMA_NAME(schema_id) AS schema_name  
    ,type_desc  
    ,create_date  
    ,modify_date  
FROM sys.procedures;  
GO  
  
TOP

¿Cómo busco los parámetros de un procedimiento almacenado o función?
Antes de ejecutar la consulta siguiente, reemplace <database_name> y <schema_name.object_name> por nombres válidos.

Copiar
USE <database_name>;  
GO  
SELECT SCHEMA_NAME(schema_id) AS schema_name  
    ,o.name AS object_name  
    ,o.type_desc  
    ,p.parameter_id  
    ,p.name AS parameter_name  
    ,TYPE_NAME(p.user_type_id) AS parameter_type  
    ,p.max_length  
    ,p.precision  
    ,p.scale  
    ,p.is_output  
FROM sys.objects AS o  
INNER JOIN sys.parameters AS p ON o.object_id = p.object_id  
WHERE o.object_id = OBJECT_ID('<schema_name.object_name>')  
ORDER BY schema_name, object_name, p.parameter_id;  
GO  
  
TOP

¿Cómo se puede encontrar todas las funciones definidas por el usuario en una base de datos?
Antes de ejecutar la consulta siguiente, reemplace <database_name> por un nombre de base de datos válido.

Copiar
USE <database_name>;  
GO  
SELECT name AS function_name   
  ,SCHEMA_NAME(schema_id) AS schema_name  
  ,type_desc  
  ,create_date  
  ,modify_date  
FROM sys.objects  
WHERE type_desc LIKE '%FUNCTION%';  
GO  
  
TOP

¿Cómo se puede encontrar todas las vistas en una base de datos?
Antes de ejecutar la consulta siguiente, reemplace <database_name> por un nombre de base de datos válido.

Copiar
USE <database_name>;  
GO  
SELECT name AS view_name   
  ,SCHEMA_NAME(schema_id) AS schema_name  
  ,OBJECTPROPERTYEX(object_id,'IsIndexed') AS IsIndexed  
  ,OBJECTPROPERTYEX(object_id,'IsIndexable') AS IsIndexable  
  ,create_date  
  ,modify_date  
FROM sys.views;  
  
TOP

¿Cómo se puede encontrar todas las entidades que se han modificado en los últimos N días?
Antes de ejecutar la consulta siguiente, reemplace <database_name> y <n_days> por valores válidos.

Copiar
USE <database_name>;  
GO  
SELECT name AS object_name   
  ,SCHEMA_NAME(schema_id) AS schema_name  
  ,type_desc  
  ,create_date  
  ,modify_date  
FROM sys.objects  
WHERE modify_date > GETDATE() - <n_days>  
ORDER BY modify_date;  
GO  
  
TOP

¿Cómo se puede encontrar los tipos de datos LOB de una tabla determinada?
Antes de ejecutar la consulta siguiente, reemplace <database_name> y <schema_name.table_name> por nombres válidos.

Copiar
  
USE <database_name>;  
GO  
SELECT name AS column_name   
    ,column_id   
    ,TYPE_NAME(user_type_id) AS type_name  
    ,max_length  
    ,CASE   
       WHEN max_length = -1 AND TYPE_NAME(user_type_id) <> 'xml'  
            THEN 1  
            ELSE 0  
     END AS [(max)]  
FROM sys.columns  
WHERE object_id=OBJECT_ID('<schema_name.table_name>')   
    AND ( TYPE_NAME(user_type_id) IN ('xml','text', 'ntext','image')  
         OR (TYPE_NAME(user_type_id) IN ('varchar','nvarchar','varbinary')  
         AND max_length = -1)  
        );  
GO  
  
TOP

¿Cómo se puede ver la definición de un módulo?
Antes de ejecutar la consulta siguiente, reemplace <database_name> y <schema_name.object_name> por nombres válidos.

Copiar
USE <database_name>;  
GO  
SELECT definition  
FROM sys.sql_modules  
WHERE object_id = OBJECT_ID('<schema_name.object_name>');  
GO  
  
También se puede utilizar la función OBJECT_DEFINITION como se muestra en el siguiente ejemplo:

Copiar
USE <database_name>;  
GO  
SELECT OBJECT_DEFINITION (OBJECT_ID('<schema_name.object_name>')) AS ObjectDefinition;  
GO  
  
TOP

¿Cómo se puede ver la definición de un desencadenador de nivel de servidor?

Copiar
SELECT definition  
FROM sys.server_sql_modules;  
GO  
  
TOP

¿Cómo busco las columnas de una clave principal de una tabla determinada?
Antes de ejecutar la consulta siguiente, reemplace <database_name> y <schema_name.table_name> por nombres válidos.

Copiar
USE <database_name>;  
GO  
SELECT i.name AS index_name  
    ,ic.index_column_id  
    ,key_ordinal  
    ,c.name AS column_name  
    ,TYPE_NAME(c.user_type_id)AS column_type   
    ,is_identity  
FROM sys.indexes AS i  
INNER JOIN sys.index_columns AS ic   
    ON i.object_id = ic.object_id AND i.index_id = ic.index_id  
INNER JOIN sys.columns AS c   
    ON ic.object_id = c.object_id AND c.column_id = ic.column_id  
WHERE i.is_primary_key = 1   
    AND i.object_id = OBJECT_ID('<schema_name.table_name>');  
GO  
  
También se puede utilizar la función COL_NAME como se muestra en el siguiente ejemplo:

Copiar
USE <database_name>;  
GO  
SELECT i.name AS index_name  
    ,COL_NAME(ic.object_id,ic.column_id) AS column_name  
    ,ic.index_column_id  
    ,key_ordinal  
FROM sys.indexes AS i  
INNER JOIN sys.index_columns AS ic   
    ON i.object_id = ic.object_id AND i.index_id = ic.index_id  
WHERE i.is_primary_key = 1   
    AND i.object_id = OBJECT_ID('<schema_name.table_name>');  
GO  
  
TOP

¿Cómo busco las columnas de una clave externa de una tabla determinada?
Antes de ejecutar la consulta siguiente, reemplace <database_name> y <schema_name.table_name> por nombres válidos.

Copiar
USE <database_name>;  
GO  
SELECT   
    f.name AS foreign_key_name  
   ,OBJECT_NAME(f.parent_object_id) AS table_name  
   ,COL_NAME(fc.parent_object_id, fc.parent_column_id) AS constraint_column_name  
   ,OBJECT_NAME (f.referenced_object_id) AS referenced_object  
   ,COL_NAME(fc.referenced_object_id, fc.referenced_column_id) AS referenced_column_name  
   ,is_disabled  
   ,delete_referential_action_desc  
   ,update_referential_action_desc  
FROM sys.foreign_keys AS f  
INNER JOIN sys.foreign_key_columns AS fc   
   ON f.object_id = fc.constraint_object_id   
WHERE f.parent_object_id = OBJECT_ID('<schema_name.table_name>');  
  
TOP

¿Cómo se puede encontrar los permisos concedidos o denegados en una entidad de seguridad especificado?
En el ejemplo siguiente se crea una función para devolver el nombre de la entidad en la que se comprueban los permisos. La función se invoca en las consultas que siguen. La función se debe crear en cada base de datos en la que desee comprobar los permisos.

Copiar
-- Create a function to return the name of the entity on which the permissions are checked.  
IF OBJECT_ID (N'dbo.entity_instance_name', N'FN') IS NOT NULL  
    DROP FUNCTION dbo.entity_instance_name;  
GO  
CREATE FUNCTION dbo.entity_instance_name(@class_desc nvarchar(60), @major_id int)   
RETURNS sysname AS  
BEGIN  
    DECLARE @the_entity_name sysname  
    SELECT @the_entity_name = CASE  
        WHEN @class_desc = 'DATABASE' THEN DB_NAME()  
        WHEN @class_desc = 'SCHEMA' THEN SCHEMA_NAME(@major_id)  
        WHEN @class_desc = 'OBJECT_OR_COLUMN' THEN OBJECT_NAME(@major_id)  
        WHEN @class_desc = 'DATABASE_PRINCIPAL' THEN USER_NAME(@major_id)  
        WHEN @class_desc = 'ASSEMBLY' THEN   
            (SELECT name FROM sys.assemblies WHERE assembly_id=@major_id)  
        WHEN @class_desc = 'TYPE' THEN TYPE_NAME(@major_id)  
        WHEN @class_desc = 'XML_SCHEMA_COLLECTION' THEN   
            (SELECT name FROM sys.xml_schema_collections  
              WHERE xml_collection_id=@major_id)  
        WHEN @class_desc = 'MESSAGE_TYPE' THEN   
            (SELECT name FROM sys.service_message_types WHERE message_type_id=@major_id)  
        WHEN @class_desc = 'SERVICE_CONTRACT' THEN   
           (SELECT name FROM sys.service_contracts  
              WHERE service_contract_id=@major_id)  
        WHEN @class_desc = 'SERVICE' THEN  
          (SELECT name FROM sys.services WHERE service_id=@major_id)  
        WHEN @class_desc = 'REMOTE_SERVICE_BINDING' THEN  
          (SELECT name FROM sys.remote_service_bindings  
             WHERE remote_service_binding_id=@major_id)  
        WHEN @class_desc = 'ROUTE' THEN  
          (SELECT name FROM sys.routes WHERE route_id=@major_id)  
        WHEN @class_desc = 'FULLTEXT_CATALOG' THEN  
          (SELECT name FROM sys.fulltext_catalogs WHERE fulltext_catalog_id=@major_id)  
        WHEN @class_desc = 'SYMMETRIC_KEY' THEN  
          (SELECT name FROM sys.symmetric_keys WHERE symmetric_key_id=@major_id)  
        WHEN @class_desc = 'CERTIFICATE' THEN  
          (SELECT name FROM sys.certificates WHERE certificate_id=@major_id)  
        WHEN @class_desc = 'ASYMMETRIC_KEY' THEN  
          (SELECT name FROM sys.asymmetric_keys WHERE asymmetric_key_id=@major_id)  
        WHEN @class_desc = 'SERVER' THEN   
             (SELECT name FROM sys.servers WHERE server_id=@major_id)  
        WHEN @class_desc = 'SERVER_PRINCIPAL' THEN SUSER_NAME(@major_id)  
        WHEN @class_desc = 'ENDPOINT' THEN   
             (SELECT name FROM sys.endpoints WHERE endpoint_id=@major_id)        
        ELSE '?'  
    END  
    RETURN @the_entity_name  
END;  
GO  
-- Return server-level permissions for the user.  
SELECT class  
    ,class_desc  
    ,dbo.entity_instance_name(class_desc, major_id) AS entity_name   
    ,minor_id  
    ,SUSER_NAME(grantee_principal_id) AS grantee  
    ,SUSER_NAME(grantor_principal_id) AS grantor  
    ,type  
    ,permission_name  
    ,state_desc   
FROM sys.server_permissions   
WHERE grantee_principal_id = SUSER_ID('public');  
GO  
-- Return database-level permissions for the user.  
SELECT class  
    ,class_desc  
    ,dbo.entity_instance_name(class_desc , major_id) AS entity_name   
    ,minor_id  
    ,USER_NAME(grantee_principal_id) AS grantee  
    ,USER_NAME(grantor_principal_id) AS grantor  
    ,type  
    ,permission_name  
    ,state_desc     
FROM  sys.database_permissions   
WHERE grantee_principal_id = DATABASE_PRINCIPAL_ID('public');  
GO  
TOP

¿Cómo se puede determinar si una columna se utiliza en una expresión de columna calculada?
Antes de ejecutar la consulta siguiente, reemplace <database_name>, <schema_name.table_name>, y <column_name> con los nombres válidos.

Copiar
USE <database_name>;  
GO  
SELECT OBJECT_NAME(object_id) AS object_name  
    ,COL_NAME(object_id, column_id) AS computed_column   
    ,class_desc  
    ,is_selected  
    ,is_updated  
    ,is_select_all  
FROM sys.sql_dependencies  
WHERE referenced_major_id = OBJECT_ID('<schema_name.table_name>')  
    AND referenced_minor_id = COLUMNPROPERTY(referenced_major_id, '<column_name>', 'ColumnId')  
    AND class = 1;  
GO  
  
TOP

¿Cómo busco todas las columnas que se usan en una expresión de columna calculada?
Antes de ejecutar la consulta siguiente, reemplace <database_name> por un nombre válido.

Copiar
USE <database_name>;  
GO  
SELECT OBJECT_NAME(d.referenced_major_id) AS object_name  
    ,COL_NAME(d.referenced_major_id, d.referenced_minor_id) AS column_name  
    ,OBJECT_NAME(referenced_major_id) AS dependent_object_name   
    ,COL_NAME(d.object_id, d.column_id) AS dependent_computed_column  
    ,cc.definition AS computed_column_definition  
FROM sys.sql_dependencies AS d  
JOIN sys.computed_columns AS cc   
    ON cc.object_id = d.object_id AND cc.column_id = d.column_id AND d.object_id=d.referenced_major_id       
WHERE d.class = 1  
ORDER BY object_name, column_name;  
GO  
  
TOP

¿Cómo busco las columnas que dependen de un tipo definido por el usuario CLR o el tipo de alias?
Antes de ejecutar la consulta siguiente, reemplace <database_name> con un nombre válido y <schema_name.data_type_name> con un esquema o válido definido por el usuario tipo CLR o nombre de tipo de alias completo del esquema. La consulta siguiente requiere la pertenencia a la db_owner rol o los permisos para ver todas las columnas dependientes y la columna calculada metadatos en la base de datos.

Copiar
USE <database_name>;  
GO  
SELECT OBJECT_NAME(object_id) AS object_name   
    ,c.name AS column_name   
    ,SCHEMA_NAME(t.schema_id) AS schema_name  
    ,TYPE_NAME(c.user_type_id) AS user_type_name  
    ,c.max_length  
    ,c.precision  
    ,c.scale  
    ,c.is_nullable  
    ,c.is_computed  
FROM sys.columns AS c  
INNER JOIN sys.types AS t ON c.user_type_id = t.user_type_id  
WHERE c.user_type_id = TYPE_ID('<schema_name.data_type_name>');   
GO  
  
La siguiente consulta devuelve una vista restringida y estrecha de las columnas dependientes de un tipo definido por el usuario CLR o de alias, pero el conjunto de resultados es visible para el pública rol. Puede utilizar esta consulta si ha concedido permisos REFERENCE a otros en su tipo definido por el usuario y no tiene permiso para ver los metadatos de los objetos que utilizan el tipo y que otros han creado.

Copiar
USE <database_name>;  
GO  
SELECT OBJECT_NAME(object_id) AS object_name   
    ,COL_NAME(object_id, column_id) AS column_name  
    ,TYPE_NAME(user_type_id) AS user_type  
FROM sys.column_type_usages  
WHERE user_type_id = TYPE_ID('<schema_name.data_type_name>');  
GO  
  
TOP

¿Cómo busco las columnas calculadas que dependen de un tipo definido por el usuario CLR o el tipo de alias?
Antes de ejecutar la consulta siguiente, reemplace <database_name> por un nombre válido y <schema_name.data_type_name> por un nombre del tipo CLR definido por el usuario del esquema o del nombre de tipo alias válido.

Copiar
USE <database_name>;  
GO  
SELECT OBJECT_NAME(object_id) AS object_name  
    ,COL_NAME(object_id, column_id) AS column_name  
FROM sys.sql_dependencies  
WHERE referenced_major_id = TYPE_ID('<schema_name.data_type_name>')  
    AND class = 2 -- schema-bound references to type  
    AND OBJECTPROPERTY(object_id, 'IsTable') = 1;   -- exclude non-table dependencies  
  
TOP

¿Cómo busco los parámetros que dependen de un tipo definido por el usuario CLR o el tipo de alias?
Antes de ejecutar la consulta siguiente, reemplace <database_name> por un nombre válido y <schema_name.data_type_name> por un nombre del tipo CLR definido por el usuario del esquema o del nombre de tipo alias válido. La consulta siguiente requiere la pertenencia a la db_owner rol o los permisos para ver todas las columnas dependientes y la columna calculada metadatos en la base de datos.

Copiar
USE <database_name>;  
GO  
SELECT OBJECT_NAME(object_id) AS object_name  
    ,NULL AS procedure_number  
    ,name AS param_name  
    ,parameter_id AS param_num  
    ,TYPE_NAME(p.user_TYPE_ID) AS type_name  
FROM sys.parameters AS p  
WHERE p.user_TYPE_ID = TYPE_ID('<schema_name.data_type_name>')  
UNION   
SELECT OBJECT_NAME(object_id) AS object_name  
    ,procedure_number  
    ,name AS param_name  
    ,parameter_id AS param_num  
    ,TYPE_NAME(p.user_TYPE_ID) AS type_name  
FROM sys.numbered_procedure_parameters AS p  
WHERE p.user_TYPE_ID = TYPE_ID('<schema_name.data_type_name>')  
ORDER BY object_name, procedure_number, param_num;  
GO  
  
La siguiente consulta devuelve una vista restringida y estrecha de parámetros que dependen de un tipo CLR definido por el usuario o el alias, pero el conjunto de resultados es visible para el pública rol. Puede utilizar esta consulta si ha concedido permisos REFERENCE a otros en su tipo definido por el usuario y no tiene permiso para ver los metadatos de los objetos que utilizan el tipo y que otros han creado.

Copiar
USE <database_name>;  
GO  
SELECT OBJECT_NAME(object_id) AS object_name  
    ,parameter_id  
    ,TYPE_NAME(user_type_id) AS type_name  
FROM sys.parameter_type_usages   
WHERE user_type_id = TYPE_ID('<schema_name.data_type_name>');  
GO  
  
TOP

¿Cómo busco las restricciones CHECK que dependen de un tipo definido por el usuario CLR especificado?
Antes de ejecutar la consulta siguiente, reemplace <database_name> con un nombre válido y <schema_name.data_type_name> con un nombre de tipo definido por el usuario CLR válido y completo del esquema.

Copiar
USE <database_name>;  
GO  
SELECT SCHEMA_NAME(o.schema_id) AS schema_name  
    ,OBJECT_NAME(o.parent_object_id) AS table_name  
    ,OBJECT_NAME(o.object_id) AS constraint_name  
FROM sys.sql_dependencies AS d  
JOIN sys.objects AS o ON o.object_id = d.object_id  
WHERE referenced_major_id = TYPE_ID('<schema_name.data_type_name>')  
    AND class = 2 -- schema-bound references to type  
    AND OBJECTPROPERTY(o.object_id, 'IsCheckCnst') = 1; -- exclude non-CHECK dependencies  
GO  
  
TOP

¿Cómo se puede encontrar las vistas, funciones de Transact-SQL y procedimientos almacenados de Transact-SQL que dependen de un tipo definido por el usuario CLR o el tipo de alias?
Antes de ejecutar la consulta siguiente, reemplace <database_name> por un nombre válido y <schema_name.data_type_name> por un nombre del tipo CLR definido por el usuario del esquema o del nombre de tipo alias válido.
Los parámetros definidos en una función o procedimiento están enlazados a esquemas de forma implícita. Por lo tanto, los parámetros que dependen de un tipo definido por el usuario CLR o alias pueden verse mediante el uso de la sys.sql_dependencies vista de catálogo. Los procedimientos y los desencadenadores no están enlazados a ningún esquema. Esto significa que las dependencias entre cualquier expresión definida en el cuerpo del procedimiento o del desencadenador y los tipos CLR definidos por el usuario o alias no se mantienen. Las vistas y funciones definidas por el usuario que tengan expresiones que dependen de un tipo CLR definido por el usuario enlazadas a esquemas o tipo de alias se mantienen en el sys.sql_dependencies vista de catálogo. Las dependencias entre los tipos y las funciones y procedimientos CLR no se mantienen.
La consulta siguiente devuelve todas las dependencias enlazadas a esquemas en vistas, funciones Transact-SQL y procedimientos almacenados Transact-SQL de un tipo CLR definido por el usuario determinado o de un tipo de alias.

Copiar
USE <database_name>;  
GO  
SELECT SCHEMA_NAME(o.schema_id) AS dependent_object_schema  
  ,OBJECT_NAME(o.object_id) AS dependent_object_name  
  ,o.type_desc AS dependent_object_type  
  ,d.class_desc AS kind_of_dependency  
  ,TYPE_NAME (d.referenced_major_id) AS type_name  
FROM sys.sql_dependencies AS d   
JOIN sys.objects AS o  
  ON d.object_id = o.object_id  
  AND o.type IN ('FN','IF','TF', 'V', 'P')  
WHERE d.class = 2 -- dependencies on types  
  AND d.referenced_major_id = TYPE_ID('<schema_name.data_type_name>')  
ORDER BY dependent_object_schema, dependent_object_name;  
GO  
  
TOP

¿Cómo busco todas las restricciones de una tabla determinada?
Antes de ejecutar la consulta siguiente, reemplace <database_name> y <schema_name.table_name> por nombres válidos.

Copiar
USE <database_name>;  
GO  
SELECT OBJECT_NAME(object_id) as constraint_name  
    ,SCHEMA_NAME(schema_id) AS schema_name  
    ,OBJECT_NAME(parent_object_id) AS table_name  
    ,type_desc  
    ,create_date  
    ,modify_date  
    ,is_ms_shipped  
    ,is_published  
    ,is_schema_published  
FROM sys.objects  
WHERE type_desc LIKE '%CONSTRAINT'   
    AND parent_object_id = OBJECT_ID('<schema_name.table_name>');  
GO  
  
TOP

¿Cómo se puede encontrar todos los índices de una tabla determinada?
Antes de ejecutar la consulta siguiente, reemplace <database_name> y <schema_name.table_name> por nombres válidos.

Copiar
USE <database_name>;  
GO  
SELECT i.name AS index_name  
    ,i.type_desc  
    ,is_unique  
    ,ds.type_desc AS filegroup_or_partition_scheme  
    ,ds.name AS filegroup_or_partition_scheme_name  
    ,ignore_dup_key  
    ,is_primary_key  
    ,is_unique_constraint  
    ,fill_factor  
    ,is_padded  
    ,is_disabled  
    ,allow_row_locks  
    ,allow_page_locks  
FROM sys.indexes AS i  
INNER JOIN sys.data_spaces AS ds ON i.data_space_id = ds.data_space_id  
WHERE is_hypothetical = 0 AND i.index_id <> 0   
AND i.object_id = OBJECT_ID('<schema_name.table_name>');  
GO  
  
TOP

¿Cómo se puede encontrar todos los objetos que tienen un nombre de columna especificado?
Antes de ejecutar la consulta siguiente, reemplace <database_name> y <column_name> por nombres válidos.

Copiar
USE <database_name>;  
GO  
SELECT OBJECT_NAME(object_id)  
FROM sys.columns  
WHERE name = '<column_name>';  
GO  
  
o bien

Copiar
USE <database_name>;  
GO  
SELECT SCHEMA_NAME(o.schema_id) AS schema_name   
    ,o.name AS object_name  
    ,type_desc  
FROM sys.objects AS o  
INNER JOIN sys.columns AS c ON o.object_id = c.object_id  
WHERE c.name = '<column_name>';  
GO  
  
TOP

¿Cómo busco todas las tablas definidas por el usuario en una base de datos especificado?
Antes de ejecutar la consulta siguiente, reemplace <database_name> por un nombre válido.

Copiar
USE <database_name>;  
GO  
SELECT *   
FROM sys.tables;  
GO  
  
TOP

¿Cómo se puede encontrar todas las tablas e índices que tienen particiones?
Antes de ejecutar la consulta siguiente, reemplace <database_name> por un nombre válido.

Copiar
USE <database_name>;  
GO  
SELECT SCHEMA_NAME(o.schema_id) AS schema_name  
    ,OBJECT_NAME(p.object_id) AS table_name  
    ,i.name AS index_name  
    ,p.partition_number  
    ,rows   
FROM sys.partitions AS p  
INNER JOIN sys.indexes AS i ON p.object_id = i.object_id AND p.index_id = i.index_id  
INNER JOIN sys.partition_schemes ps ON i.data_space_id=ps.data_space_id  
INNER JOIN sys.objects AS o ON o.object_id = i.object_id  
ORDER BY index_name, partition_number;  
GO  
  
TOP

¿Cómo se puede encontrar todas las estadísticas de un objeto especificado?
Antes de ejecutar la consulta siguiente, reemplace <database_name> por un nombre válido y <schema_name.object_name> por un nombre válido de tabla, vista indizada o función con valores de tabla.

Copiar
USE <database_name>;  
GO  
SELECT name AS statistics_name  
    ,stats_id  
    ,auto_created  
    ,user_created  
    ,no_recompute  
FROM sys.stats  
WHERE object_id = OBJECT_ID('<schema_name.object_name>');  
GO  
  
TOP

¿Cómo busco todas las estadísticas y columnas de estadísticas de un objeto determinado?
Antes de ejecutar la consulta siguiente, reemplace <database_name> por un nombre válido y <schema_name.object_name> por un nombre válido de tabla, vista indizada o función con valores de tabla.

Copiar
USE <database_name>;  
GO  
SELECT s.name AS statistics_name  
    ,c.name AS column_name  
    ,sc.stats_column_id  
FROM sys.stats AS s  
INNER JOIN sys.stats_columns AS sc   
    ON s.object_id = sc.object_id AND s.stats_id = sc.stats_id  
INNER JOIN sys.columns AS c   
    ON sc.object_id = c.object_id AND c.column_id = sc.column_id  
WHERE s.object_id = OBJECT_ID('<schema_name.object_name>');  
GO  
  
TOP

¿Cómo se puede encontrar la definición de una vista?
Antes de ejecutar la consulta siguiente, reemplace <database_name> y <schema_name.object_name> por nombres válidos.

Copiar
USE <database_name>;  
GO  
SELECT definition  
FROM sys.sql_modules  
WHERE object_id = OBJECT_ID('<schema_name.object_name>');  
GO  
  
También se puede utilizar la función OBJECT_DEFINITION como se muestra en el siguiente ejemplo:

Copiar
USE <database_name>;  
GO  
SELECT OBJECT_DEFINITION (OBJECT_ID('<schema_name.object_name>')) AS ObjectDefinition;  
GO  



///////////////////////////////////

select  txt_ruta
	FROM	tusuario tu WITH(NOLOCK)INNER JOIN trutas_impresion tr WITH(NOLOCK)
	ON		tu.cod_ruta_impresion = tr.cod_ruta_impresion
	WHERE	cod_usuario = 'GICORTES'

	set @nom_ruta  = CAST(@VAR_IN_CodigoSucursal AS VARCHAR) + '-' + CAST(@VAR_IN_CodigoRamo AS VARCHAR) + '-' + CAST(@VAR_VC_NumeroPoliza AS VARCHAR) + '-' + CAST(@VAR_IN_NumeroEndoso AS VARCHAR) + '-' + CAST(@VAR_IN_TipoDocumento AS VARCHAR) + '-' + CAST(@VAR_VC_NroDocumento AS VARCHAR) + '.pdf'

	SELECT	@txt_ruta + '\'+ @nom_ruta
	UNION
	SELECT	@txt_ruta + '\CP-' + @nom_ruta
	UNION
	SELECT	@txt_ruta + '\ClausuladoAutos.pdf'
