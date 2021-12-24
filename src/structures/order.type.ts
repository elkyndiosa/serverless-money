import { PorductAttributeType } from './product.type';
import { UserAttributeType } from './user.type';

export type OrderAttributeType = {
  id: number;
  user: UserAttributeType;
  userId: number;
  products: PorductAttributeType[];
  total: number;
  createdAt: string;
  updatedAt: string;
};
export type OrderType = {
  data: {
    type: string;
    attributes: OrderAttributeType;
  };
};
