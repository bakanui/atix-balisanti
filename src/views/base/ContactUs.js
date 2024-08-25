import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { apiUrl, helmetAppender } from '../../reusable/constants'
import { Button, Modal} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/style.css";
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

const ContactUs = () => {
    // const { invoice_id,payment_method } = useParams();
    // const [qr_bpd, setQRBpd] = useState();
    // const [billNumber, setBillNumber] = useState();
    // const [kodeNNS, setKodeNNS] = useState();
    // const [expiredDate, setExpired] = useState();
    // const [total_pay, setTotalPay] = useState();
    // const [nmid, setNMID] = useState();
    // const [merchant_name, setMerchant] = useState('BALI SANTI');

    // const [modalInfo, setModalInfo] = useState(false) 
    // const [status_payment, setStatusPayment] = useState() 

    // const [detail_invoice, setDetailInvoice] = useState({
    //     status: 0
    // });
    // const [detail_keberangkatan, setKeberangkatan] = useState();
    // const [detail_penumpang, setPenumpang] = useState([]);
    // const history = useHistory()
   
    // useEffect(() => {
    //     fetchData()
    //     if(detail_invoice.status === 0){
    //         const interval = setInterval(() => {
    //             fetchData()
    //         }, 30000);
    //         return () => clearInterval(interval);
    //     }else{
    //         history.push('/transaction/' + invoice_id + 'status-payment')
    //     }
    //     // eslint-disable-next-line
    // }, [])

    // const fetchData = async () => {
    //     const jad = await axios.get(apiUrl + 'penumpang/get-invoice?id_invoice='+invoice_id)
    //     setDetailInvoice(jad.data.invoice)
    //     // console.log(jad.data.invoice)
    //     setKeberangkatan(jad.data.keberangkatans)
    //     setPenumpang(jad.data.penumpangs)

    //     setBillNumber(jad.data.invoice.bill_number)
    //     setTotalPay(jad.data.invoice.grandtotal)
    //     setMerchant(jad.data.invoice.armada.merchantName)
        
    //     if(payment_method == 'qris-bpd'){ // jika qris
    //        setQRBpd(jad.data.invoice.qrValue.replace(/['"]+/g, ''));
    //        setExpired(jad.data.invoice.expiredDate)
    //        setKodeNNS(jad.data.invoice.nns)
    //        setNMID(jad.data.invoice.nmid)
    //        let dataQr = {
    //             merchantPan: jad.data.invoice.armada.merchantPan,
    //             terminalUser: jad.data.invoice.armada.terminalUser,
    //             qrValue: jad.data.invoice.qrValue,
    //             hashcodeKey: sha256(jad.data.invoice.armada.merchantPan + jad.data.invoice.armada.terminalUser + jad.data.invoice.qrValue + jad.data.invoice.armada.passcode)
    //         }
    //         await axios.post(apiUrl+'webservice/qris/get-transaction', dataQr)
    //         .then((res) => {
    //             if(res.data.status == 'Sudah Terbayar'){
    //                 history.push('/transaction/' + invoice_id + '/status-payment')
    //             }
    //         })
    //     }else{ //jika va
    //         let xmls = {
    //             invoice_id: invoice_id
    //         }
    //         await axios.post(apiUrl+'webservice/va/inquiry-tagihan',xmls)
    //         .then((res) => {
    //             console.log(res)
    //             // setStatusPayment(res)
    //         })
    //     }
    // }

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
            {helmetAppender("Kontak Kami")}
            <div className='center-container' style={{margin:'2rem 0'}}>
                <div className='aboutus-components-core content-core-container'>
                    <div className='title-core'>
                        <span>Bantuan</span>
                    </div>
                    <div className='flex-all-center'>
                        <div className='card core-card-payment'>
                            <div className='innner-content-cpmt'>
                                    <div className='lvl-frst-detail-txt'>
                                    <form method="POST" id="contactForm" name="contactForm">
										<div class="row">
											<div class="col-md-6">
												<div class="form-group">
													<input type="text" class="form-control" name="name" id="name" placeholder="Name" />
												</div>
											</div>
											<div class="col-md-6"> 
												<div class="form-group">
													<input type="email" class="form-control" name="email" id="email" placeholder="Email" />
												</div>
											</div>
											<div class="col-md-12">
												<div class="form-group">
													<input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" />
												</div>
											</div>
											<div class="col-md-12">
												<div class="form-group">
													<textarea name="message" class="form-control" id="message" cols="30" rows="7" placeholder="Message"></textarea>
												</div>
											</div>
											<div class="col-md-12">
												<div class="form-group">
													<input type="submit" value="Send Message" class="btn btn-primary" />
													<div class="submitting"></div>
												</div>
											</div>
										</div>
									</form>
                                    </div>
                                    {/* <div className='button-components' style={{textAlign:'center'}}>
                                        <Button size='sm' style={{margin:'10px 15px', maxWidth:'150px', padding:'.375rem .75rem', fontFamily:'MontSemiBold'}} className='button-book'>
                                        <FontAwesomeIcon icon={faRefresh} color="#fff"  style={{margin:'0 5px'}}/>Refresh
                                        </Button>
                                    </div> */}
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </main>
        
    )
}

export default ContactUs