import React , { useEffect, useState,useRef } from 'react';
import { Navbar, Nav, Container,NavDropdown, FormSelect, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import logoSvg from './../assets/atixsiwalatri.png'
import '../../src/assets/css/style.css'
import axios from "axios";
import { Link } from "react-router-dom";
import _ from "lodash";

// import Select from "react-select";

const NavbarComponent = () => {

    const [datas, setData] = useState([])
    const [navBackground, setNavBackground] = useState(false)
    const [navShadow, setNavShadow] = useState(false)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false);
    const [hideorshow, setDisplay] = useState(false);


    const navRef = useRef()
    const ref = useRef()
    navRef.current = navBackground
    // useEffect(() => {
    //   const handleScroll = () => {
    //     const show = window.scrollY > 50
    //     if (navRef.current !== show) {
    //       setNavBackground(show)
    //       setNavShadow(show)
    //     }
    //   }
    //   document.addEventListener('scroll', handleScroll)
    //   return () => {
    //     document.removeEventListener('scroll', handleScroll)
    //     setNavShadow(false)
    //   }
    // }, [])

    // const fetchData = async (search) => {
    //   setLoading(true);
    //         let query = 'user-manuals?order=desc&limit=5&sort=id&type=customer'
    //         if(search !== undefined){
    //           query = query + '&search=' + search
    //         }
    //         const result = await axios.get(apiUrl + query )
    //         .then((res) => {
    //           setLoading(false);
    //           if(search){
    //             setDisplay(true)
    //           }else{
    //             setDisplay(false)
    //           }
              
    //           setData(res.data.data);
    //           console.log(res.data.data);
    //         })
    //         .catch(function (error) {
    //                 if(error.response.status === 401){
    //                 localStorage.removeItem('access_token')
    //                 // window.location.reload()
    //                 }
    //                 setLoading(false);
    //         });
    // };

    // useEffect(() => {
    //     const checkIfClickedOutside = e => {
    //       // If the menu is open and the clicked target is not within the menu,
    //       // then close the menu
    //       if (hideorshow && ref.current && !ref.current.contains(e.target)) {
    //         setDisplay(false)
    //       }
    //     }
    
    //     document.addEventListener("mousedown", checkIfClickedOutside)
    
    //     return () => {
    //       // Cleanup the event listener
    //       document.removeEventListener("mousedown", checkIfClickedOutside)
    //     }
    // }, [hideorshow]);


  return (
    <div>
              <Navbar expand="lg" fixed="top" className={navShadow ? 'nav-shadow' : 'nav'} style={{ transition: '1s ease',backgroundColor: navBackground ? '#FFFF' : '#FFFF', padding:'0 1rem'}}>
              <div className="container" style={{ padding: '0'}}>
                <Navbar.Brand href="/home"><img src={logoSvg} className="c-avatar-img" alt="logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                  <Nav className="menu" >
                    <Nav.Link  className="link link-theme link-arrow" href="/home">Beranda</Nav.Link>
                    <Nav.Link  className="link link-theme link-arrow" href="#jadwal">Jadwal Pelayaran</Nav.Link>
                    <Nav.Link  className="link link-theme link-arrow" href="#info">Info Pemesanan</Nav.Link>
                    <Nav.Link  className="link link-theme link-arrow" href="#wisata">Wisata</Nav.Link>
                    <Nav.Link  className="link link-theme link-arrow" href="#partner">Partner</Nav.Link>
                    {/* <NavDropdown className="link link-theme link-arrow  custom-color-dropdown dropdown-menus" title="Gabung Jadi Mitra" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/partners/driver">Driver</NavDropdown.Item>
                      <NavDropdown.Item href="/partners/merchant">Merchant</NavDropdown.Item>
                    </NavDropdown> */}
                    {/* <Nav.Link  className="link link-theme link-arrow" href="/information/article">Artikel</Nav.Link> */}
                  </Nav>
                </Navbar.Collapse>
              </div>
            </Navbar>
    </div>
  );
}


export default NavbarComponent