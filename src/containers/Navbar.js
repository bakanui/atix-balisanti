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
              <Nav.Link  className="link link-theme link-arrow" href="#partner">Partner</Nav.Link>
              <Nav.Link  className="link link-theme link-arrow" href="/contact-us">Kontak Kami</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
}


export default NavbarComponent