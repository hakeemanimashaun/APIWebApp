import React from 'react'
import "./buttonStyles.css"

type  Props = {
   title: string;
    handleClick : ()=> Promise<void>;
}

export default function ButtonComponent(props: Props) {

  
    return (
    <button className='get-button' onClick ={props.handleClick} >{props.title}</button>
  )
}
