-- This is an empty migration.

CREATE FUNCTION public.tf_utils_setar_data_atualizacao() RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE 
  tabela_raw TEXT; 
  tabela TEXT; 
  temp_mensagem TEXT;
BEGIN
  IF (TG_OP = 'UPDATE') THEN
    NEW.updated_at = now();
    RETURN NEW;
  ELSE 
  
    tabela_raw := replace(TG_TABLE_NAME, 't_', '');
    tabela := replace(tabela_raw, '_', ' ');
    temp_mensagem := 'Atributo updated_at, atualização NãO autorizada para gatilhos diferentes de UPDATE para ('||tabela||') !!'; 
    RAISE EXCEPTION feature_not_supported USING HINT = temp_mensagem;

  END IF;
END;

$$;