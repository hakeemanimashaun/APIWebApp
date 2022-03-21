import React, { useEffect } from 'react'
import { useState, } from 'react';
import ButtonComponent from './buttonComponent/ButtonComponent';
import { FetchState } from '../Types';
import ResultsComponent from './ResultsComponent';
import { useDispatch, useSelector } from "react-redux"
import { useGetPosts } from '../library/api_hooks';
import { login } from '../store/actionCreator';
import { bindActionCreators } from 'redux';
import { State } from '../store';
import "./componentStyles.css"


  

function SearchComponent() {
  //controls the current page viewed when call is made
    const [currentPage, setCurrentPage] = useState(1);
    
    // instace of custom component useGetPosts
    const [posts, fetchState, getPosts] = useGetPosts({currentPage});

    // holds the login information to be fetched
    const [query, setQuery] = useState<string>("");

    //setup to dispatch actions and populate redux state
    const dispatch = useDispatch();
    const loginQuery  = bindActionCreators(login, dispatch)
    
    // This function is called when the input changes
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setQuery(enteredName);
    if(enteredName === "") {return} else {loginQuery(enteredName)}  
  };
  //show next page button handler
 const nextPage=()=>{
   setCurrentPage(currentPage + 1);
   getPosts()
 }


  return (
    <div className='container'>
    <h1 className='page-header'>Scolio TypeScript API Assesment  <hr/></h1>
      {fetchState === FetchState.DEFAULT && (
        <>
          <p>
            Hello there, input user login information and click the button below to get the list of user posts from
            the API.
          </p>
          <input
            value={query}
            onChange={inputHandler}
            placeholder="enter login search"
            className="input"
            />
            <br/>
          <ButtonComponent title="Get Posts" handleClick ={getPosts} />
        </>
      )}
      {fetchState === FetchState.LOADING && <p>Fetching posts...</p>}
      {fetchState === FetchState.ERROR && (
        <>
          <p>Oops! Something went wrong. Please try again.</p>

          <input
            value={query}
            onChange={inputHandler}
            placeholder="Search Login"
            className="input"
            />
          <button onClick={getPosts}>Get Posts</button>
        </>
      )}
       {fetchState === FetchState.SUCCESS && (
        <>
          <ResultsComponent
          items={posts}
          render={(item)=> <div>{item}</div>}
          />
          <br/>
      <button className='next-page-button' onClick={nextPage} >Next-Page</button>
        </>
      )}
      
  </div>
  )
}

export default SearchComponent