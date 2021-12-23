export type UserAttributeType = {
  id?: number;
  name: string;
  email: string;
};
export type UserType = {
  data: {
    type: string;
    attributes: UserAttributeType;
  };
};
