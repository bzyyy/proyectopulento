import React from 'react'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Button from '../navbar/button';

import Project from './Project';
import Home from './Home';
import About from './About';
import Contact from './contact';
import Registrer from './Registrer';

const Navbar = () => {
    let Links =[
      {name:"HOME",link:"/Home"},
      {name:"PROJECT",link:"/Project"},
      {name:"ABOUT",link:"/About"},
      {name:"CONTACT",link:"/Contact"},
    ];

    return (
        <Router>
            <div className='shadow-md w-full fixed top-0 left-0'>
                <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
                    <div className='font-bold text-4xl cursor-pointer flex items-center font-[Poppins] 
                    text-gray-800'>
                        <span className='text-4xl text-indigo-600 mr-1 pt-2'>
                            <ion-icon name="basketball"></ion-icon>
                        </span>
                        NBeT
                    </div>
                    
                    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
                        {
                        Links.map((link)=>(
                            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                                <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
                            </li>
                        ))
                        }
                        <Link to="/Registrer">
                            <Button>
                                Registrate
                            </Button>
                        </Link>
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/project" element={<Project/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/contact" element={<Contact/>} />
            </Routes>
        </Router>
    )
}

export default Navbar