CREATE DATABASE sysHair;

CREATE ROLE sysHairmaster;
ALTER ROLE sysHairmaster WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS ENCRYPTED PASSWORD 'dev123456';

-- Versão = PostgreSQL 10

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE public.status_agendamento AS ENUM (
    'ativo', 'cancelado', 'executado'
);
ALTER TYPE public.status_agendamento OWNER TO sysHairmaster;


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

ALTER FUNCTION public.tf_utils_setar_data_atualizacao() OWNER TO sysHairmaster;

GRANT EXECUTE ON FUNCTION public.tf_utils_setar_data_atualizacao() to sysHairmaster;

CREATE TABLE public.t_usuario (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE,
    nome TEXT NOT NULL CHECK(char_length(nome) BETWEEN 3 AND 128) UNIQUE,
    email TEXT NOT NULL CHECK(char_length(nome) BETWEEN 7 AND 128) UNIQUE,
    senha TEXT NOT NULL,
);

ALTER TABLE public.t_usuario OWNER TO sysHairmaster;

GRANT SELECT, INSERT, UPDATE ON public.t_usuario TO sysHairmaster;

REVOKE ALL ON TABLE public.t_usuario FROM public;


CREATE TRIGGER t_usuario_setar_data_atualizacao
  BEFORE UPDATE 
  ON public.t_usuario
  FOR EACH ROW
EXECUTE PROCEDURE public.tf_utils_setar_data_atualizacao();


CREATE TABLE public.t_estado (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL CHECK(char_length(nome) BETWEEN 3 AND 128) UNIQUE,
);

ALTER TABLE public.t_estado OWNER TO sysHairmaster;

GRANT SELECT, INSERT, UPDATE ON public.t_estado TO sysHairmaster;

REVOKE ALL ON TABLE public.t_estado FROM public;

CREATE TABLE public.t_cidade (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL CHECK(char_length(nome) BETWEEN 3 AND 128) UNIQUE,
);

ALTER TABLE public.t_cidade OWNER TO sysHairmaster;

GRANT SELECT, INSERT, UPDATE ON public.t_cidade TO sysHairmaster;

REVOKE ALL ON TABLE public.t_cidade FROM public;

CREATE TABLE public.t_endereco (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    data_criacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    data_atualizacao TIMESTAMP WITH TIME ZONE,
    logradouro TEXT NOT NULL CHECK(char_length(logradouro) BETWEEN 3 AND 128),
    bairro TEXT NOT NULL CHECK(char_length(bairro) BETWEEN 3 AND 128),
    numero SMALLINT NOT NULL,
    cep TEXT NOT NULL UNIQUE,
    cidade_id UUID NOT NULL REFERENCES public.t_cidade (id),
    estado_id UUID NOT NULL REFERENCES public.t_estado (id),
);

ALTER TABLE public.t_endereco OWNER TO sysHairmaster;

GRANT SELECT, INSERT, UPDATE ON public.t_endereco TO sysHairmaster;

REVOKE ALL ON TABLE public.t_endereco FROM public;

CREATE TRIGGER t_endereco_setar_data_atualizacao
  BEFORE UPDATE 
  ON public.t_endereco
  FOR EACH ROW
EXECUTE PROCEDURE public.tf_utils_setar_data_atualizacao();

CREATE TABLE public.t_cliente (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    data_criacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    data_atualizacao TIMESTAMP WITH TIME ZONE,
    nome TEXT NOT NULL CHECK(char_length(nome) BETWEEN 3 AND 128) UNIQUE,
    email TEXT NOT NULL CHECK(char_length(nome) BETWEEN 7 AND 128) UNIQUE,
    cpf TEXT NOT NULL CHECK(char_length(nome) = 11) UNIQUE,
    telefone TEXT NOT NULL,
    endereco_id UUID NOT NULL REFERENCES public.t_endereco (id) ON DELETE CASCADE,
);

ALTER TABLE public.t_cliente OWNER TO sysHairmaster;

GRANT SELECT, INSERT, UPDATE ON public.t_cliente TO sysHairmaster;

REVOKE ALL ON TABLE public.t_cliente FROM public;

CREATE TRIGGER t_cliente_setar_data_atualizacao
  BEFORE UPDATE 
  ON public.t_cliente
  FOR EACH ROW
EXECUTE PROCEDURE public.tf_utils_setar_data_atualizacao();

CREATE TABLE public.t_contrato (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    data_criacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    data_atualizacao TIMESTAMP WITH TIME ZONE,
    ponto_id UUID NOT NULL REFERENCES public.t_ponto (id) UNIQUE, 
    estado public.contrato_estado NOT NULL,
    data_remocao TIMESTAMP WITHOUT TIME ZONE
);

ALTER TABLE public.t_contrato OWNER TO sysHairmaster;

GRANT SELECT, INSERT, UPDATE ON public.t_contrato TO sysHairmaster;

REVOKE ALL ON TABLE public.t_contrato FROM public;

CREATE TRIGGER t_contrato_setar_data_atualizacao
  BEFORE UPDATE 
  ON public.t_contrato
  FOR EACH ROW
EXECUTE PROCEDURE public.tf_utils_setar_data_atualizacao();

CREATE TABLE public.t_contrato_evento (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    data_criacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    data_atualizacao TIMESTAMP WITH TIME ZONE,
    contrato_id UUID NOT NULL REFERENCES public.t_contrato(id), 
    estado_anterior public.contrato_estado NOT NULL,
    estado_posterior public.contrato_estado NOT NULL
);

ALTER TABLE public.t_contrato_evento OWNER TO sysHairmaster;

GRANT SELECT, INSERT, UPDATE ON public.t_contrato_evento TO sysHairmaster;

REVOKE ALL ON TABLE public.t_contrato_evento FROM public;

CREATE TRIGGER t_contrato_evento_setar_data_atualizacao
  BEFORE UPDATE 
  ON public.t_contrato_evento
  FOR EACH ROW
EXECUTE PROCEDURE public.tf_utils_setar_data_atualizacao();