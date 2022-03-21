import axios from 'axios';
import { useState, useEffect } from 'react';
import { FetchState, PostData } from '../Types';
import { useSelector} from "react-redux"
import { State } from '../store';
import { get } from 'http';


export function useGetPosts({ currentPage }: { currentPage?: number }) {
  //saves call state
  const [fetchState, setFetchState] = useState(FetchState.DEFAULT);
  //saves call results
  const [posts, setPosts] = useState<Array<PostData>>([]);
  //retrieves redux state for making the
  const state =  useSelector((state: State) => state);


  const getPosts = async () => {
    try {
      setFetchState(FetchState.LOADING);

      const res = await axios.get(`https://api.github.com/search/users?q=${state}%20in:login&page=${currentPage}&per_page=9`);
      const resData = res.data.items as Array<PostData>;

      setPosts(resData);
      setFetchState(FetchState.SUCCESS);
    } catch (err) {
      setFetchState(FetchState.ERROR);
    }
  };

  return [posts, fetchState, getPosts] as const;
}