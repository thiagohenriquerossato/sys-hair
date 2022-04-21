-- This is an empty migration.

CREATE TRIGGER t_usuario_setar_data_atualizacao
  BEFORE UPDATE 
  ON "Company"
  FOR EACH ROW
EXECUTE PROCEDURE public.tf_utils_setar_data_atualizacao();