import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { apiUrl, helmetAppender } from '../../reusable/constants'
import { Button, Modal} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnchor, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from "react-router-dom";
import ReactLoading from 'react-loading';
import _ from "lodash";
import QRCode from "react-qr-code";
import logoQris from './../../assets/iconQris.png';
import bpdFull from './../../assets/bpdbalifull.png';
import logoGpn from './../../assets/gpn-logo.png';
import topleft from './../../assets/topleftqris.png';
import btmright from './../../assets/btmrightqris.png';
import logoBPD from './../../assets/bank-bpd-bali-logo-687C6FCAC4-seeklogo.com.png';
import {useHistory} from 'react-router-dom';
import { sha256 } from 'js-sha256';

const Confirmation = () => {
    const { invoice_id,payment_method } = useParams();
    const [qr_bpd, setQRBpd] = useState();
    const [billNumber, setBillNumber] = useState();
    const [kodeNNS, setKodeNNS] = useState();
    const [expiredDate, setExpired] = useState();
    const [total_pay, setTotalPay] = useState();
    const [nmid, setNMID] = useState();
    const [merchant_name, setMerchant] = useState('BALI SANTI');

    const [modalInfo, setModalInfo] = useState(false) 
    const [status_payment, setStatusPayment] = useState() 

    const [detail_invoice, setDetailInvoice] = useState({
        status: 0
    });
    const [detail_keberangkatan, setKeberangkatan] = useState();
    const [detail_penumpang, setPenumpang] = useState([]);
    const history = useHistory()
   
    useEffect(() => {
        fetchData()
        if(detail_invoice.status === 0){
            const interval = setInterval(() => {
                fetchData()
            }, 30000);
            return () => clearInterval(interval);
        }else{
            history.push('/transaction/' + invoice_id + 'status-payment')
        }
        // eslint-disable-next-line
    }, [])

    const fetchData = async () => {
        const jad = await axios.get(apiUrl + 'penumpang/get-invoice?id_invoice='+invoice_id)
        setDetailInvoice(jad.data.invoice)
        // console.log(jad.data.invoice)
        setKeberangkatan(jad.data.keberangkatans)
        setPenumpang(jad.data.penumpangs)

        setBillNumber(jad.data.invoice.bill_number)
        setTotalPay(jad.data.invoice.grandtotal)
        setMerchant(jad.data.invoice.armada.merchantName)
        
        if(payment_method == 'qris-bpd'){ // jika qris
           setQRBpd(jad.data.invoice.qrValue.replace(/['"]+/g, ''));
           setExpired(jad.data.invoice.expiredDate)
           setKodeNNS(jad.data.invoice.nns)
           setNMID(jad.data.invoice.nmid)
           let dataQr = {
                merchantPan: jad.data.invoice.armada.merchantPan,
                terminalUser: jad.data.invoice.armada.terminalUser,
                qrValue: jad.data.invoice.qrValue,
                hashcodeKey: sha256(jad.data.invoice.armada.merchantPan + jad.data.invoice.armada.terminalUser + jad.data.invoice.qrValue + jad.data.invoice.armada.passcode)
            }
            await axios.post(apiUrl+'webservice/qris/get-transaction', dataQr)
            .then((res) => {
                if(res.data.status == 'Sudah Terbayar'){
                    history.push('/transaction/' + invoice_id + '/status-payment')
                }
            })
        }else{ //jika va
            let xmls = {
                invoice_id: invoice_id
            }
            await axios.post(apiUrl+'webservice/va/inquiry-tagihan',xmls)
            .then((res) => {
                console.log(res)
                // setStatusPayment(res)
            })
        }
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


    return(
        <main className="padd-components">
            {helmetAppender("Konfirmasi Pembayaran")}
            <ToastContainer />
            <div className='center-container' style={{margin:'2rem 0'}}>
                    <div className='aboutus-components-core content-core-container'>
                          <div className='title-core'>
                                <span>Konfirmasi Pembayaran</span>
                          </div>
                          {(() => {
                            if(payment_method == 'qris-bpd'){
                                return(
                                        <div className='flex-all-center' style={{flexDirection:'column'}}>
                                            <div className='core-card-payment' style={{padding:'0px'}} >
                                                <div className='header-gpn-qris greenbg all-border' style={{padding:'1rem'}}>
                                                    <img className='img-responsive' style={{maxWidth: '360px'}} src={bpdFull}></img>
                                                </div>
                                                <div className='header-gpn-qris' style={{padding:'1rem', backgroundColor: '#f4f4f4'}}>
                                                </div>
                                                <div className='card-qris header-gpn-qris' style={{padding:'1rem'}}>
                                                    <div className='logo-side-cov side-left'>
                                                            <img className='img-responsive' src={logoQris}></img>
                                                    </div>
                                                    <div className='logo-side-cov side-right'>
                                                        <img className='img-responsive' src={logoGpn}></img>
                                                    </div>
                                                </div>
                                                <div className='card-qris-bottom bg-compontent-standartqris'>
                                                    <img src={topleft} className="topLeftqrissty"></img>
                                                    <p className='paysembig' style={{margin:'0'}}>
                                                        {merchant_name ? merchant_name : 'Bali Santi'}
                                                    </p>
                                                    <img src={btmright} className="btmrightqrissty" style={{marginBottom:'10px'}}></img>
                                                    <span style={{color:'#696969',fontSize:'14px', marginBottom:'20px', textAlign:'center'}}>NMID: {nmid}</span>
                                                    <div className='innner-content-cpmt flex-all-center flex-column'>
                                                            <div className='lvl-frst-comp'>
                                                                { qr_bpd ? <QRCode value={qr_bpd} /> : ''}
                                                            </div>
                                                            <div className='nns-comp'>
                                                                <span style={{color:'#696969'}}>Dicetak oleh: {kodeNNS}</span>
                                                            </div>
                                                            <div className='lvl-frst-detail-txt'>
                                                                <br />
                                                                <p className='paysembig' style={{marginBottom:'5px'}}>
                                                                    {"Rp. "+ (Number(total_pay)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                                                </p>
                                                                <div className='center-text'>
                                                                    <p className='fz-14' style={{color:'#41464b'}}>No. Transaksi</p>
                                                                    <p className='bold-text fz-18' style={{color:'#41464b'}}>{billNumber}</p>
                                                                    <p className='fz-14' style={{color:'#41464b'}}>Tanggal Kadaluarsa</p>
                                                                    <p className='bold-text fz-18' style={{color:'#41464b'}}>{expiredDate ? expiredDate : ''}</p>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='button-components'>
                                            <Link to={"/transaction/"+invoice_id+"/status-payment"}>
                                                <Button size='sm' style={{margin:'1rem 0', borderRadius:'15px'}} className='button-book'>
                                                        Check Status Pembayaran
                                                </Button>
                                            </Link>
                                            </div>
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div className='flex-all-center'>
                                            <div className='card core-card-payment'>
                                                <div className='innner-content-cpmt'>
                                                        <div className='lvl-frst-detail-txt'>
                                                            <div className=' center-text'>
                                                                <p className='nomargin color-text-semdark'>Nomor Pembayaran</p>
                                                                <p className='color-text-accent bold-text fz-18'>{billNumber}</p>
                                                            </div>
                                                            <p className='paysembig'>
                                                                {"Rp. "+ (Number(total_pay)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                                            </p>
                                                            <h1 className='card__msg text-center'>Pembayaran 
                                                                {status_payment == 1 ? <span className='card__msg' style={{color:'#1cad6a'}}>Sudah Tebayarkan</span> : <span style={{color:'#dd9052'}}>Belum Terbayarkan</span> }
                                                            </h1>
                                                            {status_payment == 1 ? <h3 className='text-center card__submsg'>Terima kasih sudah menyelesaikan pembayaran</h3> : <h3 className='text-center card__submsg'>Mohon untuk menyelesaikan pembayaran</h3> }
                                                        </div>
                                                        <div className='button-components' style={{textAlign:'center'}}>
                                                            <Button size='sm' onClick={() => {fetchData()}} style={{margin:'10px 15px', maxWidth:'150px', padding:'.375rem .75rem', fontFamily:'MontSemiBold'}} className='button-book'>
                                                            <FontAwesomeIcon icon={faRefresh} color="#fff"  style={{margin:'0 5px'}}/>Refresh
                                                            </Button>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })()}
                    </div>    
            </div>

                {/* <Modal
                    show={modalInfo}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    onHide={() => {setModalInfo(false)}}
                    centered
                    >
                    <Modal.Body>
                                <h4 className='titling'>Payment Progress</h4>
                                <div style={{padding:'10px 15px'}}>
                                    <p className='email-regist'>{status_payment}</p>
                                </div>
                                <div className="info-text-content">
                                        <ul>
                                            <li>Bill Number : {billNumber}</li>
                                            <li>Expired Date : {expiredDate}</li>
                                        </ul>
                                </div>
                                <div style={{padding:'10px 15px'}}>
                                    <p style={{fontFamily:'MontBold',textAlign:'center', margin:'15px 0', color:'#545454', fontSize:'1.3rem' }}>
                                    {"Rp. "+ (Number(total_pay)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                    </p>
                                </div>
                    </Modal.Body>

                </Modal> */}


        </main>
    )
}

export default Confirmation