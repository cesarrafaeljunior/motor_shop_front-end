import {
  iAdvert,
  iAdvertListByUser,
  iAdvertisedRequest,
} from "@/interfaces/advert.interfaces";
import { iAdvertContext, iContextProps } from "@/interfaces/context.interfaces";
import { api, apiKenzieKars } from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";

const AdvertContext = createContext<iAdvertContext>({} as iAdvertContext);

export const AdvertProvider = ({ children }: iContextProps) => {
  const [modalVehicleImage, setModalVehicleImage] = useState<string>("");
  const [advertsList, setAdvertsList] = useState<iAdvert[]>([]);
  const [advertiseListByUser, setAdvertiseListByUser] =
    useState<iAdvertListByUser | null>(null);
  const [isLoading, setLoading] = useState(false);

  const getAdvertiseListByUserId = async (userId: string) => {
    await api
      .get<iAdvertListByUser>(`/advertised/users/${userId}`)
      .then(({ data }) => {
        setAdvertiseListByUser(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    async function loadAdverts() {
      const { data } = await api.get("/advertised");
      setAdvertsList(data);
    }
    loadAdverts();
  }, []);

  const [brandsList, setBrandsList] = useState<Array<string>>([]);
  const [brandSelect, setBrandSelect] = useState<string>("");
  const [modelList, setModelList] = useState<[]>([]);
  const cookies = parseCookies();
  const token = cookies["ms.token"];

  useEffect(() => {
    setLoading(true);
    apiKenzieKars
      .get("/cars")
      .then((response) => {
        const brands = Object.keys(response.data);
        setBrandsList(brands);
      })
      .catch((err) => {
        console.log(`userEffects error ${err}`);
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (brandSelect) {
      apiKenzieKars
        .get(`/cars?brand=${brandSelect}`)
        .then((response) => {
          setModelList(response.data);
        })
        .catch((err) => {
          console.log(`userEffects error ${err}`);
        });
    }
    setLoading(false);
  }, [brandSelect]);

  const createAdv = async (data: iAdvertisedRequest, onOpen: () => void) => {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    await api
      .post<iAdvertisedRequest>("/advertised", data)
      .then((resp) => {
        console.log(resp.status, resp.statusText);
        onOpen();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data.message);
      });
  };

  return (
    <AdvertContext.Provider
      value={{
        createAdv,
        advertsList,
        brandsList,
        brandSelect,
        setBrandSelect,
        modelList,
        setModelList,
        modalVehicleImage,
        setModalVehicleImage,
        getAdvertiseListByUserId,
        advertiseListByUser,
      }}
    >
      {children}
    </AdvertContext.Provider>
  );
};

export const useAdvertContext = () => useContext(AdvertContext);
