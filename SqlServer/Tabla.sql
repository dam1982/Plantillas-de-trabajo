
DROP TABLE Tb_LstAsegMasivo
GO
CREATE TABLE Tb_LstAsegMasivo(
IN_Id_PersonaMasivo Int identity primary key,
IN_Id_Proceso INT foreign key (IN_Id_Proceso) references tb_infoCargueMasivo(IN_Id_Proceso),
IN_id_registro INT,
IN_cod_ramo INT,
VC_id_asociador VARCHAR(10),
IN_tipo_documento INT,
VC_numero_de_documento VARCHAR(10),
VC_primer_apellido VARCHAR (50),
CH_txt_sexo CHAR,
IN_cod_estado_civil INT, 
DT_fec_nac DATETIME,
IN_cod_ciudad_lugar_nac INT,
IN_cod_tipo_direccion INT,
VC_direccion VARCHAR(100),
IN_cod_municipio INT,
IN_cod_tipo_de_telefono INT,
VC_telefono VARCHAR(15),
IN_cod_ocupacion INT,
VC_cod_condicion VARCHAR(10),
IN_sn_oneroso INT,
Sn_Error INT,
Sn_procesado INT,
Sn_Ws INT
);