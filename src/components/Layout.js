import React from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

// import '../styles/global.css'
// import { graphql, useStaticQuery } from 'gatsby'

export default function Layout(props) {
  //components query 

  return (
    <div >
      <Navbar />
      <div>
        <div>
          {props.children}
        </div>
      </div>
      <footer>
      <div className='container'>
        <p> copyright </p>
      </div>
      </footer>
    </div>
  )
}