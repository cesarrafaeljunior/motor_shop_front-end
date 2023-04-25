import { iAdvertisedRequest } from "@/interfaces/advert.interfaces";
import * as yup from "yup";
import { ObjectSchema } from "yup";

export const advertisedRequestSchema: ObjectSchema<iAdvertisedRequest> = yup
  .object()
  .shape({
    title: yup
      .string()
      .max(100, "O campo título deve conter menos de 100 caracteres")
      .required("O campo Título é obrigatório"),
    brand: yup
      .string()
      .max(50, "O campo marca deve conter menos de 50 caracteres")
      .required("O campo Marca é obrigatório"),
    model: yup
      .string()
      .max(50, "O campo modelo deve conter menos de  500 caracteres")
      .required("O campo Modelo é obrigatório"),
    fuel: yup
      .string()
      .max(20, "O campo combustível deve conter menos de 20 caracteres")
      .required("O campo Combustível é obrigatório"),
    color: yup
      .string()
      .max(20, "O campo cor deve conter menos de 20 caracteres")
      .required("O campo Cor é obrigatório"),
    year: yup
      .string()
      .length(4, "O campo ano deve conter 4 caracteres")
      .required("O campo Ano é obrigatório"),
    mileage: yup
      .number()
      .typeError("o valor da quilometragem é obrigatoriamente um número")
      .positive("A quilometragem não pode ser negativa")
      .required("O campo Quilometragem é obrigatório"),
    fipe_price: yup
      .number()
      .positive("O preço FIPE não pode ser negativo")
      .required("O campo Preço FIPE é obrigatório"),
    price: yup
      .number()
      .typeError("o preço é obrigatoriamente um número")
      .positive("O preço não pode ser negativo")
      .required("O campo Preço é obrigatório"),
    description: yup.string().required("O campo Descrição é obrigatório"),
    cover_image: yup
      .string()
      .max(300, "O campo imagem deve conter menos de 300")
      .required("O campo Imagem é obrigatório"),
    location: yup.string().length(8).required("O campo Location é obrigatório"),
    is_avaliable: yup.boolean().required().default(true),
  });
