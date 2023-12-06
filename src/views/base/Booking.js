import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { apiUrl } from '../../reusable/constants'
import '../../css/error.scss';
import { FormSelect, Form, Button, Col, Row, ToggleButton } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnchor, faArrowAltCircleRight, faArrowRightLong, faChevronRight, faSearch, faShip, faUserFriends, faUserGroup } from '@fortawesome/free-solid-svg-icons'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from "react-router-dom";

import img404 from './../../assets/noresults.png'
import ReactLoading from 'react-loading';
import _ from "lodash";

const Booking = () => {
    const { id_from, id_to, date_book } = useParams();
    const [datas, setDatas] = useState([]);
    const [tot, setLength] = useState(0);
    const [loading, setLoad] = useState(false)
    const [show, setShow] = useState(true)
    const [operator_group, setOperatorGroup] = useState();
    const [filter, setFilter] = useState(false)
    const [id_armada_fill, setArmadaFill] = useState(0);
    const [from_id, setFromId] = useState(0);
    const [to_id, setToId] = useState(0);
    const [isActiveId, setActiveId] = useState();

    useEffect(() => {
        let from = 0
        let to = 0
          if(id_from == 'klungkung'){
            from = 1
          }else if(id_from == 'nusa-penida'){
            from = 2
          }else if(id_from == 'sanur'){
            from = 4
          }

          if(id_to == 'klungkung'){
            to = 1
          }else if(id_to == 'nusa-penida'){
            to = 2
          }else if(id_to == 'sanur'){
            to = 4
          }
          setFromId(from);
          setToId(to);
          fetchData(from, to, date_book, filter, id_armada_fill)
    }, []);

    const fetchData = async (id, id2, date, filter, id_armada_fill) => {
        setLoad(true)
        let query = 'jadwal_keberangkatan/get-list-jadwalrute?awal='+id+'&akhir='+id2+'&tanggal='+date;
        // if(filter){
        //     if(id_armada_fill !== 0){
        //         query = query + '&id_armada='+id_armada_fill
        //     }
        // }
        await axios.get(apiUrl + query)
        .then((res) => {
            setLoad(false)
            setLength(res.data.length)
            setDatas(res.data)
            if(res.data.length !== 0){
                let groups = _.groupBy(res.data, 'nama_armada');
                setOperatorGroup(groups);
            }
            setShow(true)
        })
      }

    function getNotFound(){
        return(
            <div className='not-founds-components flex-all-center'>
                <div className=" sm-vertical-padd" style={{textAlign:'center'}}>
                    <img className='img-responsive' style={{maxWidth:'150px'}} src={img404}></img>
                    <p style={{margin:'1rem 0', color:'#b3b3b3'}}>Maaf, tidak tersedia tiket di keberangkatan ini</p>
                </div>
            </div>
        )
    }
    function Loadings(){
        return(
            <div className='not-founds-components flex-all-center'>
                <div className=" sm-vertical-padd" style={{textAlign:'center'}}>
                    <ReactLoading type={'spin'} color={'#11b1f7'} height={30} width={30} />
                </div>
            </div>
        )
    }

    function activeBut(index){
        if(isActiveId == index){
            setActiveId()
        }else{
            setActiveId(index)
        }
    }
    
    return(
        <main className="padd-components">
             <div className='blue-zone-bg-flat'>
                <div className='center-container' >
                    <div className='aboutus-components-core content-core-container '>
                        <div className='card card-customs shadows'>
                            <Row>
                                <Col xs="12" sm="6" md="6" lg="5" className='rows-destinations-space'>
                                    <div className='title-v2 bold-text'>
                                        <h4>{id_from}</h4>
                                        <span>Bali</span>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className='hidden-xs'  icon={faArrowRightLong} color="rgb(36, 36, 36)"  style={{ height:'1.2rem'}}/>
                                    </div>
                                    <div className='title-v2 bold-text'>
                                        <h4>{id_to}</h4>
                                        <span>Bali</span>
                                    </div>
                                </Col>
                                <Col xs="12" sm="2"  md="4" lg="4" className="justify-end-postion-lg md-horizontal-padd">
                                        <p className='p-margin-blackgrey'>{date_book}</p>
                                </Col>
                                <Col xs="12" sm="4"  md="3" lg="3" className="flex-all-center sm-vertical-padd">
                                       <a href="/"><Button variant="secondary" className='button-submit-accent'><FontAwesomeIcon  icon={faSearch} color="#fff"  style={{margin:'0 5px'}}/> Ganti Pencarian</Button></a>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
            <div className='center-container min-height-comp' style={{marginTop:'1rem'}}>
                <div className='aboutus-components-core content-core-container'>
                           
                    {(() => {
                        if(datas.length !== 0){
                            
                            return(
                                <div className='rows-destinations-space'>
                                    <div className='left-text-align r-mbgqwd'>Filter</div>
                                    <div className='r-13awgt1'>
                                        {operator_group ? Object.entries(operator_group).map((data, index) => {
                                            return(
                                                <Button key={index} onClick={() => { setFilter(true); activeBut(index); fetchData(from_id, to_id, date_book, true, data[1][0].id_armada)}} className={isActiveId == index ? 'active_but css-1dbjc4n fit-width xs-vertical-margin clean-class-button': 'css-1dbjc4n fit-width xs-vertical-margin clean-class-button'}>
                                                        <div className='bg-white-filter-card full-radius padd-16-ver xs-vertical-padd  shadows'>
                                                            <div className='color-text-accent semibold-text'>
                                                                    {data[0]}
                                                            </div>
                                                        </div>
                                                </Button>
                                            )
                                        }): null}
                                         {operator_group ? 
                                                <Button onClick={() => { setFilter(false); setActiveId(); fetchData(from_id, to_id, date_book, false, null)}} className='css-1dbjc4n fit-width xs-vertical-margin clean-class-button'>
                                                        <div className='bg-reset-filter-card full-radius padd-16-ver xs-vertical-padd  shadows'>
                                                            <div className='white semibold-text'>
                                                                    Reset
                                                            </div>
                                                        </div>
                                                </Button>
                                        : null}
                                    </div>
                                    <div className='infolength'>
                                        <div className='circle-quantity'>
                                            {tot} 
                                        </div>
                                    </div>
                                </div>
                                )
                            }
                            
                    })()}
                    {loading ? Loadings()
                    :show && !loading && datas.length !== 0 ?
                         datas.map((data,index) => {
                            return(
                                <div key={index}  className="card card-schedule-public shadows"> 
                                  <div className="row">
                                      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2" style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
                                          <h4 style={{fontFamily:'sans-serif',fontWeight:700, color:'#454545'}}>{data.jadwal}</h4>
                                      </div>
                                      <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                                              <div className="row-custome-tiket" style={{justifyContent:'center'}}>
                                                  <section className="boardingPass-departur col-xs">
                                                      <span className="boardingPass-departur-IATA">Pelabuhan {data.dermaga_awal}</span>
                                                      <span className="section-label-child">{data.lok_dermaga_awal}</span>
                                                  </section>
                                                  <section className="boardingPass-transport boardingPass-icon col-xs" style={{display:'flex',alignItems:'center', justifyContent:'center',flexDirection:'column'}}>
                                                      <FontAwesomeIcon color='rgb(255 178 101)' icon={faShip} />
                                                      <span className="section-label-child">Menuju</span>
                                                  </section>
                                                  <section className="boardingPass-arrival col-xs ">
                                                      <span className="boardingPass-arrival-IATA">Pelabuhan {data.dermaga_akhir}</span>	
                                                      <span className="section-label-child">{data.lok_dermaga_akhir}</span>
                                                  </section>
                                              </div>
                                              <div className="dashed-tiket"></div>
                                              <div className="row-custome-tiket">
                                                      <section className="boardingPass-departur boardingPass-icon col-xs">
                                                          <FontAwesomeIcon color='rgb(255 178 101)' icon={faAnchor} />
                                                          <span style={{color:'#555'}}> {data.nama_armada}</span>	
                                                      </section>
                                                      <section className="boardingPass-departur boardingPass-icon col-xs">
                                                          <FontAwesomeIcon color='rgb(255 178 101)' icon={faAnchor} />
                                                          <span style={{color:'#555'}}> {data.nama_kapal}</span>	
                                                      </section>
                                                      <section className="boardingPass-transport boardingPass-icon col-xs" style={{display:'flex',alignItems:'center', justifyContent:'center',flexDirection:'row'}}>
                                                          <FontAwesomeIcon color='rgb(255 178 101)' icon={faUserGroup} style={{marginRight:'2px'}} />
                                                          <span style={{color:'#555'}}> Kapasitas : {data.kapasitas_penumpang}</span>	
                                                      </section>
                                              </div>
                                      </div>
                                      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 sm-vertical-padd" style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
                                        <Link style={{width:'80%'}} to={"/order/"+data.id_jadwal+"/"+data.kapasitas_penumpang+"/"+date_book}><Button style={{width:'100%', height:'60px'}} variant="secondary" className='button-submit-accent'>Pilih</Button></Link>
                                      </div>
                                  </div>
                              </div>
                                )
                        }) 
                    : show && !loading && datas.length == 0 ? getNotFound()
                    : null}
                </div>
            </div>

        </main>
    )

}

export default Booking