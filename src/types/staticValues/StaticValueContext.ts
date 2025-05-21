import { StaticValue } from "./StaticValueTypes";

export type StaticValueState = {
  staticValues: StaticValue;
};

export type StaticValueContextType = StaticValueState & {
  getStaticValues: (onSuccess?: () => void) => void;
};


export type StaticValuesAction =
  | {
    type: "GET_STATIC_VALUE";
    payload: {
      staticValues: StaticValue;
    };
  }

