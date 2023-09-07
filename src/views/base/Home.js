import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { apiUrl } from '../../reusable/constants'
import '../../css/error.scss';
import { FormSelect, Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin,faCalendarAlt, faMarker, faBullhorn } from '@fortawesome/free-solid-svg-icons'
import Slider from "react-slick";
import XMLParser from 'react-xml-parser';

import logoKlk from './../../assets/logo-kabupaten-klungkung-bali.png';
import logoDishub from './../../assets/logo-dinas-perhubungan-png-3.png';
import logoBPD from './../../assets/bank-bpd-bali-logo-687C6FCAC4-seeklogo.com.png';
import logoAvs from './../../assets/logo_avs.png';
import logoMai from './../../assets/logo_mai.png';
import alurpemesanan from './../../assets/alurpemesanan.jpg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from "react-router-dom";
import { 
  format 
} from 'date-fns'

const Home = () => {

  const today = new Date()
  const [id_zona_from, setIdZonaFrom] = useState(1);
  const [id_zona_to, setIdZonaTo] = useState(0);
  const [data_tujuan, setDataTujuan] = useState([]);
  const [url_book, setUrlBook] = useState();
  let tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  const [startDate, setStartDate] = useState(tomorrow)
  const [wisatas, setWisata] = useState([]);
  const [pengumumans, setPengumuman] = useState([]);
  
  const fetchDataTujuan = async (id_zona_from) => {
    const jadwal = axios.get(apiUrl + 'jadwal_keberangkatan/get-zona-akhir?zona_awal=' + id_zona_from)
    const wis = axios.get(apiUrl + 'wisata')
    const pen = axios.get(apiUrl + 'pengumuman')
    await axios.all([jadwal, wis, pen]).then(axios.spread(function(res, wisa, peng) {
      if(res.data.length !== 0){
        setIdZonaTo(res.data[0].id_zona)
        handleRemoveOp()
      }else{
        setIdZonaTo(0)
      }
      setDataTujuan(res.data)
      setWisata(wisa.data.data.wisatas)
      setPengumuman(peng.data.data.pengumumans)
    }));
  }

  useEffect(() => {
      fetchDataTujuan(id_zona_from)
  }, []);


  const settingsAnnounce = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 6000,
  };

  let optionZona = data_tujuan.map((item, i) => {
    return (
        <option key={i} value={item.id_zona}>{item.lokasi}</option>
    );
  });


  const checker = () => {
        if(id_zona_from == 0 || id_zona_to == 0){
          if(id_zona_to == 0){
            toast.error('Tujuan Belum Ditentukan!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            document.getElementById("to_id").classList.add("red-border");
          }else if(id_zona_from == 0){
            toast.error('Dari Keberangkatan Belum Ditentukan!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            document.getElementById("from_id").classList.add("red-border");
          }else{
            toast.error('Tujuan Belum Ditentukan!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            document.getElementById("from_id").classList.add("red-border");
            document.getElementById("to_id").classList.add("red-border");
          }
        }else{
          toast("Mencari Tiket Pelayaran");
          document.getElementById("from_id").classList.remove("red-border");
          document.getElementById("to_id").classList.remove("red-border");
          let date = format(startDate, 'yyyy-MM-dd')
          let name_from = ''
          let name_to = ''
          if(id_zona_from == 1){
            name_from = 'klungkung'
          }else if(id_zona_from == 2){
            name_from = 'nusa-penida'
          }else if(id_zona_from == 4){
            name_from = 'sanur'
          }

          if(id_zona_to == 1){
            name_to = 'klungkung'
          }else if(id_zona_to == 2){
            name_to = 'nusa-penida'
          }else if(id_zona_to == 4){
            name_to = 'sanur'
          }

          window.location.href = "/booking/"+name_from+"/"+name_to+"/"+date+""
        }
  }

  const handleRemoveOp = () => {
    const element = document.getElementById("pilihkosong");
    if(element){
        element.remove();
    }
  }


  return (
    <main className="padd-components">
          <div className='blue-zone-bg-conts r-16wqof' >
            <div className='cntr-text-blue'>
                <h4>Pesan Tiket Penyeberangan Resmi Online di sini</h4>
                <p>Reservasi tiket kapal online dengan harga spesial, jadwal lengkap, dan kerjasama dengan armada resmi di Bali.</p>
            </div>
          </div>

          <div className='r-axzv8h routes-container-md css-1dbjc4n'  style={{zIndex:4}}>
              <div className='css-1dbjc4n r-1jgb5lz r-uwe93p'>
                <div className='routes-card-component absolute-compo' style={{backgroundColor:'#fff'}}> 
                     <div className='r-1xfddsp r-xyw6el r-13awgt0 '>
                     <Form className="form">
                       <div className='row'>
                        <ToastContainer />
                          <div className='col-xs-12 col-sm-10 col-md-10 col-md-10'>
                                <div className='row'>
                                  <div className='col-xs-12 col-sm-4 col-md-4 col-md-4 form-item'>
                                    <span className='info-text'>Dari</span>
                                    <div style={{display:'flex', alignItems:'center'}}>
                                        <FontAwesomeIcon icon={faMapPin} color="orange"  style={{margin:'0 5px'}}/>
                                        <Form.Select id="from_id" size="md" aria-label="Default select example" onChange={(e) => { fetchDataTujuan(e.target.value); setIdZonaFrom(e.target.value); }} required>
                                          <option value={1}>Klungkung</option>
                                          <option value={2}>Nusa Penida</option>
                                          <option value={4}>Sanur</option>
                                        </Form.Select>
                                    </div>
                                        
                                  </div>
                                  <div className=' col-xs-12 col-sm-4 col-md-4 col-lg-4 form-item'>
                                      <span className='info-text'>Tujuan</span>
                                        <div style={{display:'flex', alignItems:'center'}}>
                                        <FontAwesomeIcon icon={faMapPin} color="blue"  style={{margin:'0 5px'}}/>
                                        <Form.Select id="to_id" size="md" aria-label="Default select example" onChange={(e) => { setIdZonaTo(e.target.value); handleRemoveOp() }}  required>
                                          <option id={"pilihkosong"} value={0}>-</option>
                                          {optionZona}
                                        </Form.Select>
                                    </div>
                                  </div>
                                  <div className=' col-xs-12 col-sm-4 col-md-4 col-lg-4 form-item' >
                                      <span className='info-text'>Tanggal</span>
                                      <div style={{display:'flex', alignItems:'center'}}>
                                        <FontAwesomeIcon icon={faCalendarAlt} color="#9f9f9f"  style={{margin:'0 5px'}}/>
                                        <DatePicker 
                                        id="date-book"
                                        className='form-control' 
                                        autoFocus={false}
                                        onChange={(e) => setStartDate(e)} 
                                        selected={startDate}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={tomorrow}
                                        required/>
                                      </div>
                                  </div>
                                </div>
                            </div>
                          <div className=' col-xs-12 col-sm-2 col-md-2 col-lg-2'>
                              <Button style={{width:'100%', height:'60px'}} variant="secondary" onClick={checker} className='button-submit-accent'>Cari!</Button>
                          </div>
                        </div>
                        </Form>
                      </div>
                </div>
              </div>
          </div>



          <div className='center-container' style={{marginTop:'1rem'}} id="tentang">
              <div className='aboutus-components-core content-core-container'>
                    <div className='title-core'>
                          <span>BALI SANTI</span>
                    </div>
                    <div className='items-text'>
                    Sejak berdiri pada tahun 2021 di bawah naungan Dinas Perhubungan Kabupaten Klungkung, Bali Santi terus berfokus dalam menjalankan platform daring yang menyediakan layanan pemesanan tiket penyebrangan dengan fokus perjalanan domestik di daerah Klungkung. <br/> <br/>
                    Sebagai pihak ketiga, kami telah bekerja sama dengan berbagai macam armada kapal di daerah Klungkung dengan tujuan untuk memenuhi kebutuhan Anda saat melakukan perjalanan ke tempat tujuan! <br/> <br/>
                    Kami juga menyediakan fitur pembayaran yang fleksibel dengan kurs lokal, bahasa lokal, fitur atur pemesanan hingga cara booking yang mudah untuk semua pelanggan kami, serta tiket yang sudah Anda pesan dapat langsung dikirimkan melalui e-mail.
                    </div>
              </div>              
          </div>

          <div className='center-container' style={{marginTop:'2rem'}} id="info">
                <div className='flow-white-bg-fll' style={{display:'flex', justifyContent:'center', padding:'2rem 0'}}>
                      <div className='aboutus-components-core content-core-container'>
                          <div className='title-core'>
                                <span>Info Cara Pemesanan</span>
                          </div>
                          <div className='image-lg-component'>
                                <img className='img-responsive' src={alurpemesanan}></img>
                          </div>
                    </div>    
                </div>
          </div>

          <div className='center-container' style={{marginTop:'2rem'}} id="partner">
              <div className='aboutus-components-core content-core-container'>
                    <div className='title-core'>
                          <span>Partner Kami</span>
                    </div>
                    <Row>
                          <Col xs="6" sm="6" md="3" lg="2" className='core-card-partner'>
                            <div className='card card-partner-company '>
                                <img className='img-responsive' src={logoKlk}></img>
                            </div>
                          </Col>
                          <Col xs="6" sm="6" md="3" lg="2" className='core-card-partner'>
                            <div className='card card-partner-company '>
                              <img className='img-responsive' src={logoDishub}></img>
                            </div>
                          </Col>
                          <Col xs="6" sm="6" md="3" lg="2"    className='core-card-partner'>
                              <div className='card card-partner-company '>
                                <img className='img-responsive' src={logoBPD}></img>
                              </div>
                          </Col>
                          <Col xs="6" sm="6" md="3" lg="2" className='core-card-partner'>
                            <div className='card card-partner-company '>
                                <img className='img-responsive' src={logoMai}></img>
                            </div>
                          </Col>
                    </Row>
              </div>              
          </div>
          
         
          <div className='center-container' style={{marginTop:'2rem'}} id="wisata">
                      <div className='aboutus-components-core content-core-container'>
                          <div className='title-core'>
                                <span>Wisata</span>
                          </div>
                          <Row>
                            {
                                  wisatas.map((data,index) => {
                                          return(
                                            <Col key={index} xs="12" sm="6" md="3" lg="3" className='core-card-partner'>
                                              <div className='card card-wisatas '>
                                                  <img className='img-responsive' src={data.path} alt={data.judul} title={data.judul}></img>
                                                  <div><p style={{fontFamily:'sans-serif',fontWeight:700, color:'#454545', margin:'5px 0', textAlign:'center'}}>{data.judul}</p></div>
                                              </div>
                                            </Col>
                                          )
                                  })
                              }
                          </Row>
                    </div>    
          </div>

          <div className='center-container' style={{marginTop:'2rem'}} id="pengumuman">
              <div className='aboutus-components-core content-core-container slick-for-announce'>
              <Slider {...settingsAnnounce}>
                  {
                    pengumumans.map((data,index) => {
                        return(
                          <div class="alert alert-primary" role="alert" style={{whiteSpace:'pre'}}>
                            <FontAwesomeIcon icon={faBullhorn}  style={{margin:'0 5px'}}/> {data.deskripsi+'...'}
                          </div>
                        )
                    })
                  }
                </Slider>
              </div>    
          </div>



    </main>
  )
}

export default Home
