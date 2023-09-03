import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { apiUrl } from '../../reusable/constants'
import { Button, Modal} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnchor, faCheck, faCheckCircle, faClock, faQuestion, faRefresh, faTicket, faTimes } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from "react-router-dom";
import ReactLoading from 'react-loading';
import QRCode from "react-qr-code";
import { sha256 } from 'js-sha256';
import _ from "lodash";

const Transaction = () => {
    const { invoice_id } = useParams();
    const [detail_invoice, setDetailInvoice] = useState({
        status: 0,
        qrValue: ''
    });
    const [detail_keberangkatan, setKeberangkatan] = useState();
    const [detail_penumpang, setPenumpang] = useState([]);
    const [detail_payment, setDataDetailPayment] = useState();
    const [modal_loading, setModalLoading] = useState(false) 
    const [modalInfo, setModalInfo] = useState(false) 
    
    useEffect(() => {
        fetchFirst()
        if(detail_invoice.status === 0){
            let interval = setInterval(() => {
                fetchAuto()
            }, 30000);
            return () => clearInterval(interval);
        }
        // eslint-disable-next-line
    }, [])

    const fetchFirst = async () => {
        setModalLoading(true)
        await axios.get(apiUrl + 'penumpang/get-invoice?id_invoice='+invoice_id)
        .then((jad)=> {
            setDetailInvoice(jad.data.invoice)
            console.log(jad.data.invoice)
            setKeberangkatan(jad.data.keberangkatans)
            setPenumpang(jad.data.penumpangs)
            if(jad.data.invoice.qrValue !== ''){
                let dataQr = {
                    merchantPan: "9360012900000001756",
                    terminalUser: "A01",
                    qrValue: jad.data.invoice.qrValue,
                    hashcodeKey: sha256("9360012900000001756A01" + jad.data.invoice.qrValue + "XkKe2UXe")
                }
                axios.post('http://maiharta.ddns.net:3100/http://180.242.244.3:7070/merchant-admin/rest/openapi/getTrxBy\QrString', dataQr)
                .then((res) => {
                    console.log(res.data)
                    setDataDetailPayment(res.data)
                    setModalLoading(false)
                    if(res.data.data.status == 'Sudah Terbayar'){
                        let data = {
                            id_invoice: invoice_id,
                            status: 1
                        }
                        axios.post(apiUrl + 'penumpang/update-status-invoice', data)
                        .then((res) => {
                            console.log('sukses update')
                        })
                    }
                }).catch((error) => {
                    setModalLoading(false)
                })
            }else{
                setModalLoading(false)
            }
        })
    }

    const fetchManual = async () => {
        if(detail_invoice.qrValue !== ''){
            let dataQr = {
                merchantPan: "9360012900000001756",
                terminalUser: "A01",
                qrValue: detail_invoice.qrValue,
                hashcodeKey: sha256("9360012900000001756A01" + detail_invoice.qrValue + "XkKe2UXe")
            }
            await axios.post('http://maiharta.ddns.net:3100/http://180.242.244.3:7070/merchant-admin/rest/openapi/getTrxBy\QrString', dataQr)
            .then((res) => {
                console.log(res.data)
                setDataDetailPayment(res.data)
                setModalLoading(false)
                if(res.data.data.status == 'Sudah Terbayar'){
                    let data = {
                        id_invoice: invoice_id,
                        status: 1
                    }
                    axios.post(apiUrl + 'penumpang/update-status-invoice', data)
                    .then((res) => {
                        console.log('sukses update')
                    })
                }
            }).catch((error) => {
                setModalLoading(false)
            })
        }else{
            setModalLoading(false)
        }
    }

    const fetchAuto = async () => {
        setModalLoading(true)
        await axios.get(apiUrl + 'penumpang/get-invoice?id_invoice='+invoice_id)
        .then((jad) => {
            setDetailInvoice(jad.data.invoice)
            setKeberangkatan(jad.data.keberangkatans)
            setPenumpang(jad.data.penumpangs)
            setModalLoading(false)
        })
    }


    function getCard(datas){
        if(datas.status == 'Belum Terbayar'){
            return(
                <div className='card-inner-status'>
                    <span className='card__pending'>
                        <FontAwesomeIcon  icon={faClock} className="check-payment" />
                    </span>
                    <h1 className='card__msg'>Pembayaran <span style={{color:'#dd9052'}}>{datas.status}</span></h1>
                    <h3 className='card__submsg'>Mohon untuk menyelesaikan pembyaran, sebelum {datas.expired}</h3>
                    <br/>
                    <br/>
                    <div className="order__detail">
                        <div className="order-number-label">Order Number</div>
                        <div className="order-number">#{invoice_id}</div>
                    </div>
                    {/* <h3 className='card__submsg'>Terima kasih, Selamat sampai tujuan</h3> */}
                </div>
            )
        }else if(datas.status == 'Sudah Terbayar'){
            return(
                <div className='card-inner-status'>
                    <span className='card__success'>
                        <FontAwesomeIcon  icon={faCheck} className="check-payment" />
                    </span>
                    <h1 className='card__msg'>Pembayaran <span style={{color:'#1cad6a'}}>{datas.status}</span></h1>
                    <h3 className='card__submsg'>Terima kasih sudah menyelesaikan pembayaran</h3>
                    <br/>
                    <br/>
                    <div className="order__detail">
                        <div className="order-number-label">Order Number</div>
                        <div className="order-number">#{invoice_id}</div>
                    </div>
                    {/* <h3 className='card__submsg'>Terima kasih, Selamat sampai tujuan</h3> */}
                    <Button onClick={() => {setModalInfo(true)}} variant="secondary" className='button-submit-accent'><FontAwesomeIcon  icon={faTicket} color="#fff"  style={{margin:'0 5px'}}/> Lihat Tiket</Button>
                </div>
            )
        }else if(datas.status == 'Expired'){
            return(
                <div className='card-inner-status'>
                    <span className='card__expired'>
                        <FontAwesomeIcon  icon={faTimes} className="check-payment" />
                    </span>
                    <h1 className='card__msg'>Pembayaran <span style={{color:'red'}}>{datas.status}</span></h1>
                    <h3 className='card__submsg'>Pembayaran sudah kadaluarsa</h3>
                </div>
            )
        }
        else{
            return(
                <div className='card-inner-status'>
                    <span className='card_notfound'>
                        <FontAwesomeIcon  icon={faQuestion} className="check-payment" />
                    </span>
                    <h1 className='card__msg'>Status tidak diketahui</h1>
                    <h3 className='card__submsg'>404</h3>
                    {/* <h3 className='card__submsg'>Terima kasih, Selamat sampai tujuan</h3> */}
                </div>
            )
        }
    }

    function get404(){
        return(
            <div className='card-inner-status'>
                <span className='card_notfound'>
                    <FontAwesomeIcon  icon={faQuestion} className="check-payment" />
                </span>
                <h1 className='card__msg'>Status tidak diketahui</h1>
                <h3 className='card__submsg'>404</h3>
                {/* <h3 className='card__submsg'>Terima kasih, Selamat sampai tujuan</h3> */}
            </div>
        )
    }
    
    return(
          <main className="padd-components">
            <ToastContainer />
            <div className='center-container' style={{margin:'2rem 0'}}>
                    <div className='aboutus-components-core content-core-container'>
                        <div className="bg-status-tickets-print">
                            {detail_payment ? getCard(detail_payment) : get404()}
                        </div>
                        <div className='button-components' style={{textAlign:'center'}}>
                            <Button size='sm' onClick={() => {fetchManual()}} style={{margin:'10px 15px', maxWidth:'150px', padding:'.375rem .75rem', fontFamily:'MontSemiBold'}} className='button-book'>
                            <FontAwesomeIcon icon={faRefresh} color="#fff"  style={{margin:'0 5px'}}/>Refresh
                            </Button>
                        </div>
                    </div>
                    
           </div>

                <Modal
                    show={modal_loading}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    onHide={() => {setModalLoading(false)}}
                    centered
                    >
                    <Modal.Body>
                            <div className='flex-all-center'>
                                <div className=" sm-vertical-padd" style={{textAlign:'center'}}>
                                    <ReactLoading type={'spin'} color={'#11b1f7'} height={30} width={30} />
                                </div>
                            </div>
                            <p style={{color: '#545452', margin:'5px 0', textAlign:'center'}}>Memproses...</p>
                    </Modal.Body>
                </Modal>

                <Modal
                    show={modalInfo}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    onHide={() => {setModalInfo(false)}}
                    centered
                    className='modal-tiket-book'
                    >
                    <Modal.Body>
                                <h4 className='titling' style={{textAlign:'center', padding:'1rem 0', color:'white'}}>Tiket Anda</h4>
                                <div className='flex-all-center' style={{flexDirection:'column'}}>
                                    <div className='card core-card-payment'>
                                        <div className='innner-content-cpmt'>
                                                <div>
                                                        <ul style={{paddingLeft:'0'}}>
                                                            <li className='row'><span className='col-sm-4'><b>Email</b></span><span className='col-sm-8'>: {detail_invoice?.email ? detail_invoice.email : ''}</span></li>
                                                            <li className='row'><span className='col-sm-4'><b>Boat</b></span><span className='col-sm-8'>: {detail_keberangkatan?.nama_kapal ? detail_keberangkatan.nama_kapal : ''}</span></li>
                                                            <li className='row'><span className='col-sm-4'><b>Dari</b></span><span className='col-sm-8'>: {detail_keberangkatan?.dermaga_awal ? detail_keberangkatan.dermaga_awal : ''}</span></li>
                                                            <li className='row'><span className='col-sm-4'><b>Tujuan</b></span><span className='col-sm-8'>: {detail_keberangkatan?.dermaga_akhir ? detail_keberangkatan.dermaga_akhir : ''}</span></li>
                                                            <li className='row'><span className='col-sm-4'><b>Date</b></span><span className='col-sm-8'>: {detail_keberangkatan?.tanggal ? detail_keberangkatan.tanggal : ''}</span></li>
                                                            <li className='row'><span className='col-sm-4'><b>Jam</b></span><span className='col-sm-8'>: {detail_keberangkatan?.jadwal ? detail_keberangkatan.jadwal : ''}</span></li>
                                                            <li className='row'><span className='col-sm-4'><b>Jumlah Tiket</b></span><span className='col-sm-8'>: {detail_keberangkatan?.jumlah ? detail_keberangkatan.jumlah : '0'}</span></li>
                                                        </ul>
                                                </div>
                                                <div className='lvl-frst-comp' style={{padding:'10px 5px'}}>
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" style={{width:'1%'}}>No</th>
                                                                <th scope="col">Nama</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {detail_penumpang.map((data, index) => {
                                                                return(
                                                                    <tr key={index}>
                                                                        <td>{index+1}</td>
                                                                        <td>{data.nama_penumpang}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                           
                                                        </tbody>
                                                    </table>
                                                    {/* { qr_bpd ? <QRCode value={qr_bpd} /> : <></>} */}
                                                     {/* <QRCode value="00020101021226690017ID.CO.BPDBALI.WWW011893600129000000014402 15ID10220000012790303UMI51450015ID.OR.GPNQR.WWW0215ID12321212 345670303UMI52048931530336054061000055802ID5908DEV ATIX6008DENPASAR61058011162320111001112234420703A010806O151276 3049467" /> */}
                                                </div>
                                                <div className='lvl-frst-detail-txt'>
                                                    <hr></hr>
                                                    <div className=' center-text'>
                                                        <p className='nomargin color-text-semdark'>Nomor Tiket</p>
                                                        <p className='color-text-accent bold-text fz-18'>#{invoice_id}</p>
                                                    </div>
                                                    <div className=' center-text'>
                                                        <p className='nomargin color-text-semdark'>Total Pembayaran</p>
                                                        <p className='color-text-accent bold-text fz-18'>{detail_payment?.totalAmount ? detail_payment.totalAmount : 0}</p>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                    </Modal.Body>

                </Modal>
        </main>

    )

}

export default Transaction 