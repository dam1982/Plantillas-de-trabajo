drop TRIGGER tr_Insert_Impresion

go



CREATE TRIGGER tr_Insert_Impresion  ON [dbo].[pv_header]
FOR INSERT
AS

DECLARE @cod_suc INT
DECLARE @cod_ramo INT
DECLARE @nro_pol VARCHAR(12)
DECLARE @nro_endo INT
DECLARE @id_pv INT
DECLARE @cod_usuario VARCHAR(50)
DECLARE @cod_tipo_pol INT


SELECT @id_pv = id_pv, @cod_suc = cod_suc, @cod_ramo = cod_ramo, @nro_pol = nro_pol, @nro_endo = nro_endoso FROM inserted;

SELECT @cod_usuario = cod_usuario, @cod_tipo_pol = cod_tipo_poliza  FROM pv_varios WITH(NOLOCK) WHERE id_pv = @id_pv

IF  (@cod_ramo <> 98 )
BEGIN	
		IF exists(SELECT * FROM Tb_ImpresionRamoTipoPol WHERE cod_ramo = @cod_ramo and cod_tipo_pol = @cod_tipo_pol)
		BEGIN	

			INSERT INTO Tb_Impresion_Poliza 
			(IN_Cod_Suc,	IN_Cod_Ramo,	VC_Nro_Pol,	IN_Nro_Endo,	VC_Cod_Usuario,	VC_Nom_Impresora,	Sn_impresion,	Sn_Estado,	Sn_Correo,	Sn_SMS) 
			SELECT 
			@cod_suc,		@cod_ramo,		@nro_pol,	@nro_endo,		@cod_usuario,	'PDF',				0,				0,			0,			0 

		END
END


----------------------------------------------------------------------------------------


