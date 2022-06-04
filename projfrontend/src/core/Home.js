import React from 'react'
import "../styles.css";
import { API } from '../backend';
import Base from './Base';


const Home = () => {
  console.log("API IS", API);
  return (
    <Base title='Home Page'>
      <div>
        <h1>Hello</h1>
      </div>
    </Base>
  )
}

export default Home;