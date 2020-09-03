DROP PROC usp_ValidarMasivoAseg 



GO
CREATE PROC usp_ValidarMasivoAseg 

AS BEGIN

SET NOCOUNT OFF
DECLARE @i AS INT, @j AS INT = 0;

DECLARE @IdProceso AS INT
SELECT @IdProceso = IN_Id_Proceso FROM tb_infoCargueMasivo WHERE IN_Sn_validado = 0 order by IN_Id_Proceso desc

DECLARE @error AS INT = 0, @cod_tipo_doc AS INT, @cod_municipio AS INT, @cod_est_civil AS INT, @cod_tipo_dir AS INT, @cod_tipo_telefono AS INT, @cod_ocupacion AS INT
DECLARE @res AS VARCHAR(200) ,  @num_doc AS INT,@fechaNac AS VARCHAR(11),@sexoReg AS VARCHAR(10),@codlugarNac AS INT,@cod_pais AS INT ,@cod_dpto AS INT,@txt_nac AS VARCHAR(50),@txt_respuestamws AS VARCHAR(100)

SELECT	@i = in_no_datos_validados 
FROM	tb_infoCargueMasivo WITH(NOLOCK)
WHERE	IN_Id_Proceso = @IdProceso


WHILE(@j <= @i)   
BEGIN

	SELECT	@cod_tipo_doc = IN_tipo_documento, @cod_municipio = IN_cod_municipio, @cod_est_civil = IN_cod_estado_civil, @cod_ocupacion = IN_cod_ocupacion, 
			@cod_tipo_telefono = IN_cod_tipo_de_telefono, @cod_tipo_dir = IN_cod_tipo_direccion, @num_doc  = VC_numero_de_documento ,@fechaNac = DT_fec_nac,
			@sexoReg = CH_txt_sexo,@codlugarNac = IN_cod_ciudad_lugar_nac
	FROM	Tb_LstAsegMasivo(nolock)
	WHERE	IN_id_Proceso = @IdProceso
	and		IN_id_registro = @j




	


	
--------------------------si es tipo documento 3 judirico convierte sexo en null------------------------------------------------------------------------------------------------------------------

IF( @cod_tipo_doc = 3 )
BEGIN
	update Tb_LstAsegMasivo set CH_txt_sexo = null where IN_Id_Proceso = @IdProceso and IN_id_registro = @j
END

--------------------------------tipo doc--------------------------------------------------------	
	IF @cod_tipo_doc > 0
	BEGIN
		EXEC @error = usp_validar_cod_tipo_doc @cod_tipo_doc
		IF @error <> 0
		BEGIN
			SELECT @res ='El registro   no posee un tipo de documento valido'
			INSERT INTO tb_ErrorLogcarguemasivo VALUES(@IdProceso,@j,@res,GETDATE());	
		END
		
	END
--------------------------------municipio--------------------------------------------------------	
	IF @cod_municipio > 0
	BEGIN
		EXEC @error = SP_Validar_cod_municipio   @cod_municipio
		IF @error <> 0
		BEGIN
			select @res ='El registro  no posee un codigo de municipio valido'
			insert into tb_ErrorLogcarguemasivo values(@IdProceso,@j,@res,GETDATE());
		END

		
	END
--------------------------------Tipo Direccion--------------------------------------------------------	

	IF @cod_tipo_dir > 0
	BEGIN
		EXEC @error = SP_Validar_cod_dir   @cod_tipo_dir
		IF @error <> 0
		BEGIN
			SELECT @res ='El registro  no posee un codigo de Direccion valido'
			INSERT INTO tb_ErrorLogcarguemasivo VALUES(@IdProceso,@j,@res,GETDATE());
		END

		
	END
--------------------------------------ocupacion-------------------------------------------------------------------------------

	IF @cod_ocupacion > 0
	BEGIN
		EXEC @error = SP_Validar_cod_ocupacion   @cod_ocupacion
		IF @error <> 0
		BEGIN
			SELECT @res ='El registro  no posee un codigo de ocupacion valido'
			INSERT into tb_ErrorLogcarguemasivo values(@IdProceso,@j,@res,GETDATE());
		END

		
	END
------------------------------------------telefono-------------------------------------------------------

	IF @cod_tipo_telefono > 0
	BEGIN
		EXEC @error = SP_Validar_cod_telefono   @cod_tipo_telefono
		IF @error <> 0
		begin
			SELECT @res ='El registro  no posee un codigo de Telefono valido'
			INSERT INTO tb_ErrorLogcarguemasivo values(@IdProceso,@j,@res,GETDATE());
		END

		
	END
-----------------------------------------------test civil-------------------------------------------------------
	IF @cod_est_civil > 0
	BEGIN
		EXEC @error = SP_Validar_cod_est_civil   @cod_est_civil
		IF @error <> 0
		BEGIN
			SELECT @res ='El registro  no posee un codigo de estado civil valido'
			INSERT INTO tb_ErrorLogcarguemasivo VALUES(@IdProceso,@j,@res,GETDATE());
		END

		
	END

--------------------------------------------------validar fecha--------------------------------------------------


IF @fechaNac <> ''
	BEGIN
		SET DATEFORMAT mdy
		if ISDATE(@fechaNac) = 0
		BEGIN
			SELECT @res ='la fecha de nacimiento no concuerda'
			INSERT INTO tb_ErrorLogcarguemasivo VALUES(@IdProceso,@j,@res,GETDATE());
		END

		
	END

-------------------------------------------personas asociadas para personas judiricas-------------------------------------------------------



IF @IdProceso <> 0
	BEGIN
		EXEC @error = uspverificarmasivosAsociados  @j,@IdProceso,@cod_tipo_doc
		IF @error <> 0
		BEGIN
			SELECT @res ='el asociado no cumple con los requisitos minimos '
			INSERT INTO tb_ErrorLogcarguemasivo VALUES(@IdProceso,@j,@res,GETDATE());
		END

		
	END 


--------------------------------------------------Rango cedula----------------------------------------------------


			IF @num_doc > 0
			BEGIN
			EXEC @error = usp_Rangoccregistrosmasivos   @num_doc
			IF @error <> 0
			BEGIN
				SELECT @res ='El numero de documento no se encuentra dentro del rango'
				INSERT INTO tb_ErrorLogcarguemasivo VALUES(@IdProceso,@j,@res,GETDATE());
			END
			END

  
----------------------------------validar lista clinton------------------------------------------------------------


IF @cod_tipo_doc > 0
			BEGIN					
			EXEC @error = usp_validaregistromasivoListaclinton    @num_doc
			IF @error <> 0
			BEGIN
				IF(@error = 6 | 15)
				BEGIN
					SELECT @res ='por favor contacte la oficina más cercana'
					INSERT INTO tb_ErrorLogcarguemasivo values(@IdProceso,@j,@res,GETDATE());
				END
				ELSE
				BEGIN
					SELECT @res ='no se puede generar el registro por favor comunique con oficial de cumplimiento'
					INSERT INTO tb_ErrorLogcarguemasivo VALUES(@IdProceso,@j,@res,GETDATE());
	    		END
			END
		END

------------------------------------------verifica hoja 2-----------------------------------------------------------
		IF @IdProceso > 0
		BEGIN
		     EXEC usp_ValidarMasivoAsegAsoc @IdProceso,@j
		END
---------------------------------------------m persona -----------------------------------------------------------------
			
			IF @cod_tipo_doc > 0
			BEGIN					
			EXEC @error = usp_validarmpersonaregistromasivo    @num_doc,@cod_tipo_doc
			IF @error  <> 0
			BEGIN
				SELECT @res ='el documento ya se encuentra en m_persona'
				INSERT INTO tb_ErrorLogcarguemasivo VALUES(@IdProceso,@j,@res,GETDATE());
	    	END
			END 

			

 ------------------------------------------------------------mpersona_ws------------------------------------------------------------------------------------
	IF @cod_tipo_doc > 0
			BEGIN					
				EXEC  usp_validarpersona_ws    @num_doc,@cod_tipo_doc,@IdProceso,@j
			END  

-----------------------------------valida usp_validarwsdataCredito-----------------------------------------------------

	--	exec usp_validarwsdataCredito  @num_doc,@cod_tipo_doc,@IdProceso,@j

	
------------------------------------fin del bucle------------------------------------------

		set @j= @j + 1
------------------------------------elimina los registros con errores------------------------------------------
		
	END
	EXEC eliminarRegistrosMasivos @IdProceso

-------------------------------------actualiza la tabla de informacion en en 1---------------------------

	UPDATE tb_infocarguemasivo SET IN_Sn_Validado = 1 WHERE IN_Id_Proceso = @IdProceso
END
------------------------------------------------------------------------------------------------------------------------------------------





go


----------------------------------------------------------------------------------------------------------------------------------------








