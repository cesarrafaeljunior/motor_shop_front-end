import { iAdvert, iAdvertListByUser } from "./advert.interfaces";
import { iUser } from "./user.interfaces";

export interface iProfileProps {
  user: iUser;
}

export interface iSellerProfileProps {
  seller: iAdvertListByUser;
}

export interface iDetailHomeProps {
  advert: iAdvert;
}
