export type PorductAttributeType = {
  id?: number;
  name: string;
  slug: string;
  available: number;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  quantity?: number;
};
export type PorductType = {
  data: {
    type: string;
    attributes: PorductAttributeType;
  };
};
