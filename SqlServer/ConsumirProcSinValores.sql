IF @cod_municipio > 0
	BEGIN
		EXEC @error = SP_Validar_cod_municipio   @cod_municipio
		IF @error <> 0
		BEGIN
			select @res ='El registro  no posee un codigo de municipio valido'
			insert into tb_ErrorLogcarguemasivo values(@IdProceso,@j,@res,GETDATE());
		END

		
	END