import {createContext} from 'react';
import { Movie } from '../Types';

export interface MoviesContextType {
    movies : Movie[];
}

const defaultValue: MoviesContextType = {
    movies: [],
};

const MoviesContext = createContext<MoviesContextType>(defaultValue);

export default MoviesContext;
