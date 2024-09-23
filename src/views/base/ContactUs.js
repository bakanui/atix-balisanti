import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { apiUrl, helmetAppender } from '../../reusable/constants'
import "../../assets/css/style-new.css";
import "../../assets/css/style.css";
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import _ from "lodash";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faPaperPlane, faGlobe } from '@fortawesome/free-solid-svg-icons';

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
                    {/* <div className='title-core'>
                        <span>Bantuan</span>
                    </div> */}
                    {/* <section className="ftco-section"> */}
                        <Container>
                            <Row className="justify-content-center">
                            <Col lg={10} md={12}>
                                <div className="wrapper">
                                <Row noGutters>
                                    <Col md={7} className="d-flex align-items-stretch">
                                    <div className="contact-wrap w-100 p-md-5 p-4">
                                        <h3 className="mb-4">Butuh bantuan? Hubungi Kami!</h3>
                                        <div id="form-message-warning" className="mb-4"></div>
                                        <div id="form-message-success" className="mb-4">
                                        Keluhan anda sudah diterima, terima kasih!
                                        </div>
                                        <Form method="POST" id="contactForm" name="contactForm">
                                        <Row>
                                            <Col md={6}>
                                            <Form.Group>
                                                <Form.Control type="text" name="name" id="name" placeholder="Nama" />
                                            </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                            <Form.Group>
                                                <Form.Control type="email" name="email" id="email" placeholder="Email" />
                                            </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                            <Form.Select aria-label="Kendala">
                                                <option>Jenis Kendala</option>
                                                <option value="1">Refund Pembelian Tiket</option>
                                                <option value="2">Reschedule Tiket</option>
                                                <option value="3">Masalah Transaksi Pembayaran Tiket</option>
                                            </Form.Select>
                                            </Col>
                                            <Col md={12}>
                                            <Form.Group>
                                                <Form.Control type="text" name="subject" id="subject" placeholder="Subjek" />
                                            </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                            <Form.Group>
                                                <Form.Control as="textarea" name="message" id="message" rows={7} placeholder="Pesan" />
                                            </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                            <Form.Group>
                                                <Button type="submit" className="btn btn-primary">Kirim Keluhan</Button>
                                                <div className="submitting"></div>
                                            </Form.Group>
                                            </Col>
                                        </Row>
                                        </Form>
                                    </div>
                                    </Col>
                                    <Col md={5} className="d-flex align-items-stretch">
                                    <div className="info-wrap bg-primary w-100 p-lg-5 p-4">
                                        <h3 className="mb-4 mt-md-4">Kontak kami</h3>
                                        <div className="dbox w-100 d-flex align-items-start">
                                        <div className="icon d-flex align-items-center justify-content-center">
                                            <FontAwesomeIcon icon={faMapMarker} />
                                        </div>
                                        <div className="text pl-3">
                                            <p><span>Alamat:</span> <br />JL. Raya Tojan, Jl. Raya Watu Klotok Klungkung, Tojan, Kec. Klungkung, Kabupaten Klungkung, Bali 80716</p>
                                        </div>
                                        </div>
                                        {/* <div className="dbox w-100 d-flex align-items-center">
                                        <div className="icon d-flex align-items-center justify-content-center">
                                            <FontAwesomeIcon icon={faPhone} />
                                        </div>
                                        <div className="text pl-3">
                                            <p><span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
                                        </div>
                                        </div> */}
                                        <div className="dbox w-100 d-flex align-items-center">
                                        <div className="icon d-flex align-items-center justify-content-center">
                                            <FontAwesomeIcon icon={faPaperPlane} />
                                        </div>
                                        <div className="text pl-3">
                                            <p><span>Email:</span> <a href="mailto:balisanti.siwalatri@gmail.com">balisanti.siwalatri@gmail.com</a></p>
                                        </div>
                                        </div>
                                        <div className="dbox w-100 d-flex align-items-center">
                                        <div className="icon d-flex align-items-center justify-content-center">
                                            <FontAwesomeIcon icon={faGlobe} />
                                        </div>
                                        <div className="text pl-3">
                                            <p><span>Website:</span> <a href="https://dishub.klungkungkab.go.id/">dishub.klungkungkab.go.id</a></p>
                                        </div>
                                        </div>
                                    </div>
                                    </Col>
                                </Row>
                                </div>
                            </Col>
                            </Row>
                        </Container>
                    {/* </section> */}
                </div>    
            </div>
        </main>
        
    )
}

export default ContactUs