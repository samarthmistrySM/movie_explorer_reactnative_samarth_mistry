import {ParamListBase} from '@react-navigation/native';
import {Movie} from '../Types.ts';

export interface AuthStackPrams extends ParamListBase {
  Login: undefined;
  Register: undefined;
}

export interface MainStackParams extends ParamListBase {
  Main: undefined;
  Result: {
    filter: {
      query: string;
      type: 'genre' | 'title';
    };
  };
  MovieDetails: {movie: Movie};
}
