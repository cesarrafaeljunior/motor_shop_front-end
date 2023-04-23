import { Dispatch, ReactNode, SetStateAction } from "react";
import { iUser, iUserRequest } from "./user.interfaces";
import { iAdvert, iAdvertListByUser } from "./advert.interfaces";

export interface iContextProps {
  children: ReactNode;
}

export interface iAdvertContext {
  modalVehicleImage: string;
  setModalVehicleImage: Dispatch<SetStateAction<string>>;
  getAdvertiseListByUserId: (userId: string) => Promise<void>;
  advertiseListByUser: iAdvertListByUser | null;
}

export interface iUserContext {
  user: iUser | null;
  setUser: Dispatch<SetStateAction<iUser | null>>;
  getUserProfile: () => Promise<void>;
  createUser: (data: iUserRequest, onOpen: () => void) => Promise<void>;
}
