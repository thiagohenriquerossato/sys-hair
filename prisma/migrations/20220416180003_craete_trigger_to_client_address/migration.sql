-- This is an empty migration.

CREATE TRIGGER t_usuario_setar_data_atualizacao
  BEFORE UPDATE 
  ON "Client"
  FOR EACH ROW
EXECUTE PROCEDURE public.tf_utils_setar_data_atualizacao();

CREATE TRIGGER t_usuario_setar_data_atualizacao
  BEFORE UPDATE 
  ON "Address"
  FOR EACH ROW
EXECUTE PROCEDURE public.tf_utils_setar_data_atualizacao();