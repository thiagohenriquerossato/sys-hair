-- This is an empty migration.

CREATE TRIGGER t_usuario_setar_data_atualizacao
  BEFORE UPDATE 
  ON "Product"
  FOR EACH ROW
EXECUTE PROCEDURE public.tf_utils_setar_data_atualizacao();

CREATE TRIGGER t_usuario_setar_data_atualizacao
  BEFORE UPDATE 
  ON "Appointment"
  FOR EACH ROW
EXECUTE PROCEDURE public.tf_utils_setar_data_atualizacao();