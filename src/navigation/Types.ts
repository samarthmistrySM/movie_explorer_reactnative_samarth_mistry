import {ParamListBase} from '@react-navigation/native';
import {Movie} from '../Types.ts';

export interface AuthStackPrams extends ParamListBase {
  Login: undefined;
  Register: undefined;
}

export interface SearchStackParams extends ParamListBase {
  Search: undefined;
  Result: {filter: string};
  MovieDetails: {movie: Movie};
}

export interface HomeStackParams extends ParamListBase {
  Home: undefined;
  MovieDetails: {movie: Movie};
}
