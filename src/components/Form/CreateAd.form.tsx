import { useAdvertContext } from "@/contexts/advert.context";
import { useUserContext } from "@/contexts/user.context";
import { iAdvertisedRequest } from "@/interfaces/advert.interfaces";
import { iOnOpenF } from "@/interfaces/components.interfaces";
import { advertisedRequestSchema } from "@/schemas/ad.schemas";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Field } from "../Field";
import { formatValues } from "@/utils/valuesFormat.util";

export const CreateAd = ({ onOpen }: iOnOpenF) => {
  const { brandsList, setBrandSelect, modelList, createAdv } =
    useAdvertContext();
  const { user } = useUserContext();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<iAdvertisedRequest>({
    resolver: yupResolver(advertisedRequestSchema),
  });
  const [modelSelect, setModelSelect] = useState("");
  const [fipeValue, setFipeValue] = useState("");
  const [refreshGalery, setRefreshGalery] = useState(0);
  const carColors = [
    "preto",
    "branco",
    "cinza",
    "prata",
    "vermelho",
    "azul",
    "verde",
    "amarelo",
    "laranja",
    "marrom",
    "bege",
    "roxo",
    "outros",
  ];

  const handleAddImage = () => {
    const galery = getValues("galery");

    galery
      ? setValue("galery", [...galery, { image: "" }])
      : setValue("galery", [{ image: "" }]);
    setRefreshGalery(refreshGalery + 1);
  };

  const handleRemoveImage = (index: number) => {
    const galery = getValues("galery");
    galery.splice(index, 1);
    setValue("galery", galery);
    setRefreshGalery(refreshGalery - 1);
  };

  const brandSelectOptions = brandsList.map((brand) => (
    <option key={brand} value={brand}>
      {brand}
    </option>
  ));
  const modelSelectOptions = modelList.map((model) => (
    <option key={model.id} value={model.id}>
      {model.name}
    </option>
  ));

  const fuelType = (fuel: number) => {
    if (fuel === 1) {
      return "Flex";
    } else if (fuel === 2) {
      return "Híbrido";
    } else if (fuel === 3) {
      return "Elétrico";
    }
    return "";
  };

  useEffect(() => {
    handleAddImage();
  }, []);

  useEffect(() => {
    const currentModel = modelList.find((model) => model.id === modelSelect);

    if (currentModel) {
      setFipeValue(formatValues(currentModel.value, "BRL"));
      setValue("model", currentModel.name);
      setValue("year", currentModel.year);
      setValue("fipe_price", currentModel.value);
      setValue("fuel", fuelType(currentModel.fuel));
      setValue("location", user!.address.cep);
    }
  }, [modelSelect, setValue]);

  const submit = async (data: iAdvertisedRequest) => {
    await createAdv(data, onOpen);
  };

  return (
    <Box
      as={"form"}
      maxWidth={"520px"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      gap={"14px"}
      borderRadius={"8px"}
      onSubmit={handleSubmit(submit)}
    >
      <Text>Informações de veículo</Text>

      <Text fontSize="sm" fontWeight={"semibold"}>
        Marca
      </Text>
      <Select
        isRequired
        fontSize={"md"}
        size="lg"
        name="brand"
        placeholder="Escolha uma marca"
        onChange={(e: any) => {
          setBrandSelect(e.target.value);
          setValue("brand", e.target.value);
        }}
      >
        {brandSelectOptions}
      </Select>

      <Text fontSize="sm" fontWeight={"semibold"}>
        Modelo
      </Text>
      <Select
        fontSize={"md"}
        size="lg"
        isRequired
        name="model"
        placeholder="Escolha um modelo"
        onChange={(e: any) => {
          setModelSelect(e.target.value);
        }}
      >
        {modelSelectOptions}
      </Select>

      <Flex>
        <Field.InputReadyOnlyField
          label="Ano"
          type="text"
          name="year"
          placeholder={"2023"}
          register={register("year")}
        />
        <Field.InputReadyOnlyField
          label="Combustível"
          type="text"
          name="fuel"
          placeholder={"Gasolina / Etanol"}
          register={register("fuel")}
        />
      </Flex>
      <Flex>
        <Field.InputField
          label="Quilometragem"
          type="text"
          name="mileage"
          placeholder="30000"
          errors={errors.mileage?.message}
          borderColor={errors.mileage ? "feedback.alert1" : "#E9ECEF"}
          register={register("mileage", {
            onBlur(e) {
              e.target.value = formatValues(e.target.value, "KM");
            },
          })}
        />

        <FormControl>
          <FormLabel
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            gap={"8px"}
          >
            <Flex>
              <Box>
                <Text
                  fontFamily="Inter, sans-serif"
                  fontSize="14px"
                  fontWeight="600"
                  color="#212529"
                >
                  Cores
                </Text>
              </Box>
            </Flex>
            <Flex flexDirection={"column"}>
              <Select
                name={"color"}
                isRequired
                placeholder="Selecione uma opção"
                fontFamily="Inter, sans-serif"
                fontSize={"md"}
                size="lg"
                onChange={(e: any) => {
                  setValue("color", e.target.value);
                }}
              >
                {carColors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </Select>
            </Flex>
          </FormLabel>
        </FormControl>
      </Flex>
      <Flex>
        <Field.InputReadyOnlyField
          isReadOnly
          label="Preço tabela FIPE"
          type="text"
          name="fipe_price"
          placeholder={fipeValue ? `${fipeValue}` : "R$ 50.000,00"}
        />
        <Field.InputField
          label="Preço"
          type="text"
          name="price"
          placeholder="R$ 50.000,00"
          errors={errors.price?.message}
          borderColor={errors.price ? "feedback.alert1" : "#E9ECEF"}
          register={register("price", {
            onBlur(e) {
              e.target.value = formatValues(e.target.value, "BRL");
            },
          })}
        />
      </Flex>
      <Field.TextAreaField
        label="Descrição"
        name="description"
        placeholder="Insira a descrição do produto..."
        errors={errors.description?.message}
        borderColor={errors.description ? "feedback.alert1" : "#E9ECEF"}
        register={register("description")}
      />
      <Field.InputField
        label="Imagem da capa"
        type="text"
        name="cover_image"
        placeholder="http://site.com/imagem.jpg"
        errors={errors.cover_image?.message}
        borderColor={errors.cover_image ? "feedback.alert1" : "#E9ECEF"}
        register={register("cover_image")}
      />

      {getValues("galery") &&
        getValues("galery").map((image, index) => (
          <Field.UrlImageField
            key={index}
            index={index}
            handleRemoveImage={handleRemoveImage}
            label={`${index + 1}ª imagem da galeria`}
            register={register(`galery.${index}.image`)}
            errors={errors.galery && errors.galery[index]?.image?.message}
          />
        ))}

      <Button
        onClick={handleAddImage}
        variant={"brandOpacity"}
        size={"sm"}
        maxWidth={"320px"}
      >
        Adicionar campo para imagem da galeria
      </Button>
      <Flex alignContent={"center"} justifyContent={"flex-end"} gap={"10px"}>
        <Button width={"126px"} variant={"negative"} onClick={onOpen}>
          Cancelar
        </Button>
        <Button type="submit" width={"193px"} variant={"brand1"}>
          Criar anúncio
        </Button>
      </Flex>
    </Box>
  );
};
