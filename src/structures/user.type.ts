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
export type UserIncreaseBalanceAttributeType = {
  userId: number;
  value: number;
};
export type UserIncreaseBalanceType = {
  data: {
    type: string;
    attributes: UserIncreaseBalanceAttributeType;
  };
};
