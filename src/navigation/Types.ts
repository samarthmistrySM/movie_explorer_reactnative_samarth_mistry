import {ParamListBase} from '@react-navigation/native';

export interface AuthStackPrams extends ParamListBase {
  Login: undefined;
  Register: undefined;
}

export interface SearchStackParams extends ParamListBase {
  Search: undefined;
  Result: {filter: string};
}
