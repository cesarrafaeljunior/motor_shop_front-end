import {
  iAddressRequest,
  iAddressUpdate,
} from "@/interfaces/address.interfaces";
import {
  iUserRequest,
  iUserUpdate,
  iUserRecoverEmail,
  iUserRecoverPassword,
} from "@/interfaces/user.interfaces";
import * as yup from "yup";
import { ObjectSchema } from "yup";

const ensureIfIsLegalAge = (birthdate: Date | undefined) => {
  if (!birthdate) {
    return true;
  }
  let date = new Date();
  date = new Date(date.getFullYear() - 18, date.getMonth(), date.getDate());
  birthdate = new Date(birthdate);
  // @ts-expect-error

  return date - birthdate > 18 ? true : false;
};

export const userUpdateSchema: ObjectSchema<iUserUpdate> = yup
  .object()
  .shape({
    name: yup
      .string()
      .max(100)
      .transform((value) => (value ? value : undefined)),
    email: yup
      .string()
      .email()
      .max(100)
      .transform((value) => (value ? value : undefined)),
    cpf: yup
      .string()
      .max(11)
      .transform((value) => (value ? value : undefined)),
    phone_number: yup
      .string()
      .max(11)
      .transform((value) => (value ? value : undefined)),
    birthdate: yup
      .date()

      .test("Legal age", "Come back when you're 18 years", ensureIfIsLegalAge)
      .transform((value) => (value ? value : undefined)),
    description: yup.string(),
    password: yup.string().transform((value) => (value ? value : undefined)),
  })
  .partial();

export const addressUpdateSchema: ObjectSchema<iAddressUpdate> = yup
  .object()
  .shape({
    cep: yup
      .string()
      .length(8, "O campo Cep, deve conter exatamete 8 caracteres"),
    state: yup
      .string()
      .length(2, "O campo Estado, deve conter exatamete 2 caracteres"),
    city: yup.string().max(50),
    street: yup.string().max(80),
    number: yup
      .string()
      .max(10, "O campo número deve conter no máximo 10 caracteres"),
    complement: yup.string(),
  });

export const userRequestSchema: ObjectSchema<iUserRequest> = yup
  .object()
  .shape({
    name: yup.string().max(100).required("O campo Nome é obrigatório"),
    email: yup.string().email().max(100).required("O campo Emai é obrigatório"),
    cpf: yup
      .string()
      .max(11, "O campo cpf deve conter exatamaente 11 caracteres")
      .required("O campo Cpf é obrigatório"),
    phone_number: yup
      .string()
      .max(11, "O campo cpf deve conter exatamaente 11 caracteres")
      .required("O campo Telefone é obrigatório"),
    birthdate: yup
      .date()
      .required("O campo Data de nascimento é obrigatório")
      .test(
        "Idade Legal",
        "Volte quando você tiver 18 anos",
        ensureIfIsLegalAge
      ),
    description: yup.string().required("O campo Descrição é obrigatório"),
    password: yup.string().required("O campo Senha é obrigatório"),
    is_seller: yup
      .boolean()
      .required("O campo Anunciante ou comprador é obrigatório"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")])
      .required("O campo Confirmar senha é obrigatório"),
    address: yup.object().shape({
      cep: yup
        .string()
        .length(8, "O campo Cep, deve conter exatamete 8 caracteres")
        .required("O campo cep é obrigatório"),
      state: yup
        .string()
        .length(2, "O campo Estado, deve conter exatamete 2 caracteres")
        .required("O campo Estado é obrigatório"),
      city: yup.string().max(50).required("O campo Cidade é obrigatório"),
      street: yup.string().max(80).required("O campo Logradouro é obrigatório"),
      number: yup
        .string()
        .max(10, "O campo número deve conter no máximo 10 caracteres")
        .required("O campo Número é obrigatório"),
      complement: yup.string().required("O campo Complemento é obrigatório"),
    }),
  });

export const userRecoverEmail: ObjectSchema<iUserRecoverEmail> = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("O email precisa ser válido")
      .required("É preciso enviar um email para recuperar a senha"),
  });

export const userRecoverPassword: ObjectSchema<iUserRecoverPassword> = yup
  .object()
  .shape({
    password: yup.string().required("O campo senha é obrigatório"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), "As senhas não são iguais"])
      .required("O campo confirmar senha é obrigatório"),
  });
