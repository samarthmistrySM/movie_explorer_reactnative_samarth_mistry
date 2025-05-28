import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {Movie} from '../Types';
import {addMovie,getMovies,removeMovie} from "../api/watchListApi"
import Toast from "react-native-simple-toast"

interface WatchListContextProps {
  watchlist: Movie[];
  addMovieToWatchList: (id: number) => Promise<boolean>;
  removeMovieFromWatchList: (id: number) => Promise<boolean>;
}

const defaultValue: WatchListContextProps = {
  watchlist: [],
  addMovieToWatchList: async(id: number) => false,
  removeMovieFromWatchList: async(id: number) => false,
};

const WatchListContext = createContext<WatchListContextProps>(defaultValue);

export const WatchListProvider = ({children}: {children: ReactNode}) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  const fetchWatchList = async() => {
    try {
      const res = await getMovies();    
      setWatchlist(res.data);
    } catch (error:any) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    fetchWatchList();
  }, [reload]);

  const update = () => {
    setReload(!reload);
  };

  const addMovieToWatchList = async(id: number) => {
    try {
      await addMovie(id);
      update();
      return true;
    } catch (error) {
      return false;
    }
  };

  const removeMovieFromWatchList = async(id: number) => {
    try {
      await removeMovie(id);
      update();
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <WatchListContext.Provider
      value={{watchlist, addMovieToWatchList, removeMovieFromWatchList}}>
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchList = () => useContext(WatchListContext);