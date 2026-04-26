import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { apiUrl, helmetAppender } from '../../reusable/constants'
import { Button, Modal, Tabs, Tab,} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnchor, faCheck, faCheckCircle, faClock, faQuestion, faRefresh, faTicket, faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from "react-router-dom";
import ReactLoading from 'react-loading';
import QRCode from "react-qr-code";
import { sha256 } from 'js-sha256';
import XMLParser from 'react-xml-parser';
import _ from "lodash";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CurrencyFormat from 'react-currency-format';

const Transaction = () => {
    const { invoice_id } = useParams();
    const [detail_invoice, setDetailInvoice] = useState({
        status: 0,
        qrValue: null
    });
    const [detail_keberangkatan, setKeberangkatan] = useState();
    const [detail_penumpang, setPenumpang] = useState([]);
    const [detail_payment, setDataDetailPayment] = useState();
    const [modal_loading, setModalLoading] = useState(false) 
    const [modalInfo, setModalInfo] = useState(false) 
    const [modalInfo2, setModalInfo2] = useState(false) 
    const [activePassengerIndex, setActivePassengerIndex] = useState(0)
    const [copy, setCopy] = useState(false)
    const [no_va, setNoVa] = useState(0);
    const [total, setTotal] = useState("0.00");
    const [status, setStatus] = useState("Pembayaran")

    useEffect(() => {
        fetchFirst()
    }, [])

    useEffect(() => {
        if(modalInfo){
            setActivePassengerIndex(0)
        }
    }, [modalInfo])

    const fetchFirst = async () => {
        setModalLoading(true)
        await axios.get(apiUrl + 'penumpang/get-invoice?id_invoice='+invoice_id)
        .then((jad)=> {
            setDetailInvoice(jad.data.invoice)
            let money = jad.data.invoice.grandtotal.split(".")[0]
            setTotal(money)
            setKeberangkatan(jad.data.keberangkatans[0])
            setPenumpang(jad.data.penumpangs)
            if(jad.data.invoice.qrValue !== null){
                let dataQr = {
                    merchantPan: jad.data.invoice.armada.merchantPan,
                    terminalUser: jad.data.invoice.armada.terminalUser,
                    qrValue: jad.data.invoice.qrValue,
                    hashcodeKey: sha256(jad.data.invoice.armada.merchantPan + jad.data.invoice.armada.terminalUser + jad.data.invoice.qrValue + jad.data.invoice.armada.passcode)
                }
                axios.post(apiUrl+'webservice/qris/get-transaction', dataQr)
                .then((res) => {
                    if(res.data.message !== undefined){
                        setDataDetailPayment(res.data)
                        setStatus(res.data.data.status)
                    }else{
                        if(jad.data.invoice.status === 0){
                            setDataDetailPayment(res.data)
                            if(res.data.status === 'Sudah Terbayar' && jad.data.invoice.status === 0){
                                let data = {
                                    id_invoice: invoice_id,
                                    status: 1,
                                    referenceNumber: res.data.referenceNumber,
                                    trxId: res.data.trxId
                                }
                                axios.post(apiUrl + 'penumpang/update-invoice', data)
                                .then(() => {
                                    setModalLoading(false)  
                                })
                            }
                        }else{
                            let fauxPembayaran = {
                                sts_bayar: jad.data.invoice.status,
                                expired: jad.data.invoice.expiredDate
                            }
                            setDataDetailPayment(fauxPembayaran)
                        }
                    }
                    setModalLoading(false)
                }).catch((err) => {
                    setModalLoading(false)
                })
            }
            else if(jad.data.invoice.no_va !== null){
                let xmls = {
                    invoice_id: jad.data.invoice.no_va
                }
                setNoVa(jad.data.invoice.no_va)
                axios.post(apiUrl+'webservice/va/inquiry-tagihan',xmls)
                .then((finality) => {
                    setDataDetailPayment(finality.data.data[0])
                    if(finality.data.data[0].sts_bayar == "1"  && jad.data.invoice.status === 0){
                        let data = {
                            id_invoice: invoice_id,
                            status: 1
                        }
                        axios.post(apiUrl + 'penumpang/update-status-invoice', data)
                        .then(() => {
                            setModalLoading(false)  
                        })
                    }
                    setModalLoading(false)
                })
            }
        })
    }

    const fetchManual = async () => {   
        if(detail_invoice.qrValue !== null){
            let dataQr = {
                merchantPan: detail_invoice.armada.merchantPan,
                terminalUser: detail_invoice.armada.terminalUser,
                qrValue: detail_invoice.qrValue,
                hashcodeKey: sha256(detail_invoice.armada.merchantPan + detail_invoice.armada.terminalUser + detail_invoice.qrValue + detail_invoice.armada.passcode)
            }
            await axios.post(apiUrl+'webservice/qris/get-transaction', dataQr)
            .then((res) => {
                console.log(res.data)
                console.log(detail_invoice)
                setDataDetailPayment(res.data)
                setModalLoading(false)
                if(res.data.status === 'Sudah Terbayar'){
                    console.log(detail_invoice)
                    let data = {
                        id_invoice: invoice_id,
                        status: 1,
                        referenceNumber: res.data.referenceNumber,
                        trxId: res.data.trxId
                    }
                    axios.post(apiUrl + 'penumpang/update-invoice', data)
                    .then((res) => {
                        console.log('sukses update')
                    })
                }
            }).catch((error) => {
                setModalLoading(false)
            })
        }else if(detail_invoice.no_va !== null){
            let xmls = {
                invoice_id: detail_invoice.no_va
            }
            setNoVa(detail_invoice.no_va)
                axios.post(apiUrl+'webservice/va/inquiry-tagihan',xmls)
                .then((finality) => {
                    setDataDetailPayment(finality.data.data[0])
                    if(finality.data.data[0].sts_bayar == "1"){
                        let data = {
                            id_invoice: invoice_id,
                            status: 1
                        }
                        axios.post(apiUrl + 'penumpang/update-invoice', data)
                        .then(() => {
                            setModalLoading(false)  
                        })
                    }
                    setModalLoading(false)
                })
        }else{
            setModalLoading(false)
        }
    }

    const fetchAuto = async () => {
        if(detail_invoice.status === 0){
            setModalLoading(true)
            await axios.get(apiUrl + 'penumpang/get-invoice?id_invoice='+invoice_id)
            .then((jad) => {
                setDetailInvoice(jad.data.invoice)
                setKeberangkatan(jad.data.keberangkatans)
                setPenumpang(jad.data.penumpangs)
                let fauxPembayaran = {
                    sts_bayar: jad.data.invoice.status,
                }
                setDataDetailPayment(fauxPembayaran)
                setModalLoading(false)
            })
        }
    }


    function getCard(datas){
        if(datas.status == 'Belum Terbayar' || datas.sts_bayar == '0'){
            return(
                <div className='card-inner-status'>
                    <span className='card__pending'>
                        <FontAwesomeIcon  icon={faClock} className="check-payment" />
                    </span>
                    <h1 className='card__msg'>Pembayaran <span style={{color:'#dd9052'}}>{datas.status}</span></h1>
                    <h3 className='card__submsg'>Mohon untuk menyelesaikan pembayaran, sebelum {datas.expired}</h3>
                    <br/>
                    <br/>
                    <div className="order__detail">
                        <div className="order-number-label">Order Number</div>
                        <div className="order-number">#{invoice_id}</div>
                    </div>
                    {/* <h3 className='card__submsg'>Terima kasih, Selamat sampai tujuan</h3> */}
                    {datas.qrValue ? <Button href={"https://tiket.siwalatri.klungkungkab.go.id/confirmation-payments/" + invoice_id + "/qris-bpd"} variant="secondary" className='button-submit-accent'>Bayar Sekarang</Button> : <Button onClick={() => {setModalInfo2(true)}} variant="secondary" className='button-submit-accent'>Lihat Cara Bayar</Button>}
                </div>
            )
        }else if(datas.status == 'Sudah Terbayar' || datas.sts_bayar == '1'){
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
        }else if(datas.status_reversal == '1'){
            return(
                <div className='card-inner-status'>
                    <span className='card__expired'>
                        <FontAwesomeIcon  icon={faTimes} className="check-payment" />
                    </span>
                    <h1 className='card__msg'>Pembayaran <span style={{color:'red'}}>Dibatalkan</span></h1>
                    <h3 className='card__submsg'>Pembayaran sudah kadaluarsa</h3>
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
        else if(datas.message !== undefined){
            return(
                <div className='card-inner-status'>
                    <span className='card_errmsg'>
                        <FontAwesomeIcon  icon={faExclamationTriangle} className="check-payment" />
                    </span>
                    <h1 className='card__msg'>{datas.message}. Mohon coba kembali.</h1>
                    <h3 className='card__submsg'>{datas.errorCode}</h3>
                    {/* <h3 className='card__submsg'>Terima kasih, Selamat sampai tujuan</h3> */}
                </div>
            )
        }else{
            return(
                <div className='card-inner-status'>
                    <span className='card_notfound'>
                        <FontAwesomeIcon  icon={faQuestion} className="check-payment" />
                    </span>
                    <h1 className='card__msg'>Status</h1>
                    <h3 className='card__submsg'>404</h3>
                    {/* <h3 className='card__submsg'>Terima kasih, Selamat sampai tujuan</h3> */}
                </div>
            )
        }
    }

    function get404(datas){
        if(datas === undefined){
            return(
                <div className='card-inner-status'>
                    <span className='card_notfound'>
                        <FontAwesomeIcon  icon={faQuestion} className="check-payment" />
                    </span>
                    <h1 className='card__msg'>Status</h1>
                    <h3 className='card__submsg'>404</h3>
                    {/* <h3 className='card__submsg'>Terima kasih, Selamat sampai tujuan</h3> */}
                </div>
            )
        }else{
            return(
                <div className='card-inner-status'>
                    <span className='card_errmsg'>
                        <FontAwesomeIcon  icon={faExclamationTriangle} className="check-payment" />
                    </span>
                    <h1 className='card__msg'>{datas.message}. Mohon coba kembali.</h1>
                    <h3 className='card__submsg'>{datas.errorCode}</h3>
                    {/* <h3 className='card__submsg'>Terima kasih, Selamat sampai tujuan</h3> */}
                </div>
            )
        }
    }

    const qrBaseUrls = {
        '62396bbb2bac8': 'https://api-angkal.siwalatri.klungkungkab.go.id/storage/img/qrcodes/',
        '60dff1192581b': 'https://api-gangga.siwalatri.klungkungkab.go.id/storage/img/qrcodes/',
        '6108da9e65c2c': 'https://api-sekarjaya.siwalatri.klungkungkab.go.id/storage/img/qrcodes/',
    }

    const qrBaseUrl = qrBaseUrls[detail_invoice?.id_armada] || ''
    const noInvoiceDigits = detail_invoice?.no_invoice ? detail_invoice.no_invoice.replace(/\D/g, '') : ''
    const passengerList = detail_penumpang.length > 0 ? detail_penumpang : [{nama_penumpang: ''}]
    const safePassengerIndex = Math.min(activePassengerIndex, passengerList.length - 1)
    const activePassenger = passengerList[safePassengerIndex] || {nama_penumpang: ''}

    const getQrImageUrl = (passengerIndex) => {
        if(!qrBaseUrl || !noInvoiceDigits){
            return ''
        }
        return `${qrBaseUrl}${noInvoiceDigits}${passengerIndex + 1}.png`
    }

    const ticketContentPadding = '16px 14px 22px'
    const qrBoxSize = 'min(190px, 62vw)'
    const infoLabelCellStyle = {
        paddingBottom: '6px',
        width: '38%',
        whiteSpace: 'normal',
        verticalAlign: 'top',
        lineHeight: '1.3'
    }
    const infoValueCellStyle = {
        paddingBottom: '6px',
        paddingLeft: '8px',
        verticalAlign: 'top',
        wordBreak: 'break-word',
        lineHeight: '1.3'
    }
    
    return(
          <main className="padd-components">
            {helmetAppender("Status Pembayaran")}
            <ToastContainer />
            <div className='center-container' style={{margin:'2rem 0'}}>
                    <div className='aboutus-components-core content-core-container'>
                        <div className="bg-status-tickets-print">
                            {detail_payment ? getCard(detail_payment) : get404(detail_payment)}
                        </div>
                        {detail_invoice?.status !== 1 && detail_invoice?.status !== '1' && (
                            <div className='button-components' style={{textAlign:'center'}}>
                                <Button size='sm' onClick={() => {fetchManual()}} style={{margin:'10px 15px', maxWidth:'150px', padding:'.375rem .75rem', fontFamily:'MontSemiBold'}} className='button-book'>
                                <FontAwesomeIcon icon={faRefresh} color="#fff"  style={{margin:'0 5px'}}/>Refresh
                                </Button>
                            </div>
                        )}
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
                    <Modal.Body style={{padding: 0, backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden'}}>
                        {/* Static ticket header image */}
                        <img src={require('../../assets/tiket-header.028eac63.png')} alt="ticket-header" style={{width: '100%', display: 'block', margin: '0 auto'}} />

                        <div style={{padding: ticketContentPadding}}>
                            {/* Passenger switcher */}
                            {passengerList.length > 1 && (
                                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '14px', gap: '8px'}}>
                                    {passengerList.map((penumpang, index) => (
                                        <Button
                                            key={index}
                                            variant={safePassengerIndex === index ? 'secondary' : 'outline-secondary'}
                                            size="sm"
                                            onClick={() => setActivePassengerIndex(index)}
                                            style={{flex: '1 1 140px', maxWidth: '100%', minWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
                                        >
                                            {penumpang?.nama_penumpang ? penumpang.nama_penumpang : `P${index + 1}`}
                                        </Button>
                                    ))}
                                </div>
                            )}

                            {/* QR Code */}
                            <div style={{display: 'flex', justifyContent: 'center', margin: '16px 0 20px 0'}}>
                                <div style={{border: '1px solid #ccc', width: qrBoxSize, height: qrBoxSize, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa'}}>
                                    <img
                                        src={getQrImageUrl(safePassengerIndex)}
                                        alt={`qrcode-${safePassengerIndex + 1}`}
                                        style={{width: '100%', height: '100%', objectFit: 'contain'}}
                                    />
                                </div>
                            </div>

                            {/* Booking ID */}
                            <div style={{textAlign: 'center', marginBottom: '8px'}}>
                                <p style={{fontWeight: 'bold', margin: 0, fontSize: '15px', color: '#000'}}>Booking ID</p>
                                <p style={{color: '#8B1A1A', fontWeight: 'bold', margin: 0, fontSize: '15px'}}>{detail_invoice?.no_invoice ? detail_invoice.no_invoice : ''}{safePassengerIndex + 1}</p>
                            </div>

                            {/* Booking Date */}
                            <div style={{textAlign: 'center', marginBottom: '16px'}}>
                                <p style={{fontWeight: 'bold', margin: 0, fontSize: '15px', color: '#000'}}>Booking Date</p>
                                <p style={{margin: 0, fontSize: '14px', color: '#3b3b3b'}}>{detail_keberangkatan?.tanggal ? detail_keberangkatan.tanggal : ''}</p>
                            </div>

                            {/* Detail rows */}
                            <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '14px', tableLayout: 'fixed'}}>
                                <tbody>
                                    <tr>
                                        <td style={infoLabelCellStyle}>Agent Name</td>
                                        <td style={infoValueCellStyle}>: {detail_invoice?.armada ? detail_invoice.armada.nama_armada : ''}</td>
                                    </tr>
                                    <tr>
                                        <td style={infoLabelCellStyle}>Passenger Name</td>
                                        <td style={infoValueCellStyle}>: {activePassenger?.nama_penumpang ? activePassenger.nama_penumpang : `P${safePassengerIndex + 1}`}</td>
                                    </tr>
                                    <tr>
                                        <td style={infoLabelCellStyle}>From</td>
                                        <td style={infoValueCellStyle}>: {detail_keberangkatan?.dermaga_awal ? detail_keberangkatan.dermaga_awal : ''}</td>
                                    </tr>
                                    <tr>
                                        <td style={infoLabelCellStyle}>To</td>
                                        <td style={infoValueCellStyle}>: {detail_keberangkatan?.dermaga_akhir ? detail_keberangkatan.dermaga_akhir : ''}</td>
                                    </tr>
                                    <tr>
                                        <td style={infoLabelCellStyle}>Date</td>
                                        <td style={infoValueCellStyle}>: {detail_keberangkatan?.tanggal ? detail_keberangkatan.tanggal : ''}{detail_keberangkatan?.jadwal ? ' ' + detail_keberangkatan.jadwal : ''}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>

                </Modal>

                <Modal
                            show={modalInfo2}
                            size="xl"
                            aria-labelledby="contained-modal-title-vcenter"
                            onHide={() => {setModalInfo2(false)}}
                            >
                            <Modal.Body>
                            <Tabs
                                defaultActiveKey={no_va !== 0 ? "internet_bpd" : "qris"}
                                transition={false}
                                id="noanim-tab-example"
                                className="mb-3"
                                style={{fontSize:'15px'}}
                            >
                            <Tab eventKey="internet_bpd" title="Mobile/Internet Banking Bank BPD Bali">
                                {no_va !== 0 ? <div className="info-text-title">
                                    <div>
                                        <h4 className='bold-text color-text-white'>Kode Billing</h4>
                                        <h5 className='color-text-white'>{no_va}</h5>
                                    </div>
                                    <CopyToClipboard text={no_va}
                                        onCopy={() => {setCopy(true); alert('Text berhasil disalin')}}>
                                        <button className='copy-btn'>Salin ke papan ketik</button>
                                    </CopyToClipboard>
                                </div> : ""}
                                <div className="info-text-content">
                                        <ul>
                                            <li>Masukkan username dan password / PIN pada aplikasi Mobile / Internet Banking.</li>
                                            <li>Pilih menu “Pembayaran”.</li>
                                            <li>Pilih “Tiket Wisata”</li>
                                            <li>Pilih Input Nomor ID lalu Pilih “e-Tiket Bali Santi”.</li>
                                            <li>Input Nomor ID/tagihan {no_va === 0 ? "(Contoh: 12345678 )" : no_va}.</li>
                                            <li>Input PIN untuk melanjutkan transaksi.</li>
                                            <li>Selesai.</li>
                                        </ul>
                                </div>
                            </Tab>
                            <Tab eventKey="atm_gpn" title="ATM GPN Bank Lain">
                                {no_va !== 0 ? <div className="info-text-title">
                                    <div>
                                        <h4 className='bold-text color-text-white'>Kode Billing</h4>
                                        <h5 className='color-text-white'>{"1295344" + no_va}</h5>
                                    </div>
                                    <CopyToClipboard text={"1295344" + no_va}
                                        onCopy={() => {setCopy(true); alert('Text berhasil disalin')}}>
                                        <button className='copy-btn'>Salin ke papan ketik</button>
                                    </CopyToClipboard>
                                </div>: ""}
                                <div className="info-text-content">
                                        <ul>
                                            <li>Pilih Bahasa</li>
                                            <li>Masukkan PIN</li>
                                            <li>Pilih “Transaksi Lainnya”</li>
                                            <li>Pilih “Transfer”</li>
                                            <li>Pilih “Ke Rekening Bank Lain”</li>
                                            <li>Masukkan nomor rekening tujuan {no_va === 0 ? "(Contoh: 1295344123 )" : "1295344" + no_va} lalu tekan “Benar/Lanjut”</li>
                                            <li>Input nominal yang ingin ditransfer sesuai tagihan yang ingin dibayar, lalu tekan "Benar/Lanjut".</li>
                                            <li>Silakan isi atau kosongkan nomor referensi transfer kemudian tekan “Benar”</li>
                                            <li>Muncul Layar Konfirmasi Transfer yang berisi nomor rekening tujuan bank beserta jumlah yang dibayar</li>
                                            <li>Jika sudah benar, Tekan “Benar”</li>
                                            <li>Selesai.</li>
                                        </ul>
                                </div>
                            </Tab>
                            <Tab eventKey="kliring_banklain" title="Kliring Bank Lain">
                                {no_va !== 0 ? <div className="info-text-title">
                                    <div>
                                        <h4 className='bold-text color-text-white'>Kode Billing</h4>
                                        <h5 className='color-text-white'>{"1295344" + no_va}</h5>
                                    </div>
                                    <CopyToClipboard text={"1295344" + no_va}
                                        onCopy={() => {setCopy(true); alert('Text berhasil disalin')}}>
                                        <button className='copy-btn'>Salin ke papan ketik</button>
                                    </CopyToClipboard>
                                </div>: ""}
                                <div className="info-text-content">
                                        <ul>
                                            <li>Pilih “Transfer ke Bank Lain”</li>
                                            <li>Pilih “Bank BPD Bali” sebagai bank tujuan.</li>
                                            <li>Masukkan nomor rekening tujuan {no_va === 0 ? "(Contoh: 129534412345678 )" : "1295344" + no_va} (No Virtual Account).</li>
                                            <li>Input nominal yang ingin ditransfer sesuai tagihan yang ingin dibayar. Mohon dipastikan nominal yang akan ditransfer sama dengan jumlah tagihan yang harus dibayar agar proses bisa berjalan sukses.</li>
                                            <li>Lanjutkan transaksi.</li>
                                            <li>Selesai.</li>
                                        </ul>
                                </div>
                            </Tab>
                            <Tab eventKey="internet_banklain" title="Mobile/Internet Banking Bank Lain">
                                {no_va !== 0 ? <div className="info-text-title">
                                    <div>
                                        <h4 className='bold-text color-text-white'>Kode Billing</h4>
                                        <h5 className='color-text-white'>{"5344" + no_va}</h5>
                                    </div>
                                    <CopyToClipboard text={"5344" + no_va}
                                        onCopy={() => {setCopy(true); alert('Text berhasil disalin')}}>
                                        <button className='copy-btn'>Salin ke papan ketik</button>
                                    </CopyToClipboard>
                                </div>: ""}
                                <div className="info-text-content">
                                        <ul>
                                            <li>Login pada aplikasi Mobile/Internet Banking Anda.</li>
                                            <li>Pilih menu “Transfer”.</li>
                                            <li>Pilih menu “Transfer Antar Bank”.</li>
                                            <li>Pilih bank tujuan “Bank BPD Bali”.</li>
                                            <li>Masukkan nomor rekening tujuan {no_va === 0 ? "(Contoh: 534412345678 )" : "5344" + no_va} (No Virtual Account).</li>
                                            <li>Input nominal yang ingin ditransfer sesuai tagihan yang ingin dibayar, lalu tekan "Benar".</li>
                                            <li>Muncul Layar Konfirmasi Transfer yang berisi nomor rekening tujuan bank beserta jumlah yang dibayar.</li>
                                            <li>Masukkan Password atau PIN.</li>
                                            <li>Selesai.</li>
                                        </ul>
                                </div>
                            </Tab>
                            {no_va === 0 ? <Tab eventKey="qris" title="QRIS">
                                <div className="info-text-content">
                                    <ul>
                                        <li>Scan QRCode yang tertera.</li>
                                        <li>Cek nominal sesuai dengan total biaya pembelian tiket.</li>
                                        <li>Input PIN Anda dan lanjutkan transaksi.</li>
                                        <li>Transaksi Sukses.</li>
                                        <li>Simpan Resi bukti pembayaran</li>
                                        <li>Email Konfirmasi Pembayaran dikirimkan secara otomatis setelah pembayaran diterima</li>
                                    </ul>
                                </div>
                            </Tab>: ""}
                            </Tabs>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type='button' className='btn-2-orng' onClick={() => {setModalInfo(false)}}>Tutup</Button>
                            </Modal.Footer>
                        </Modal>
        </main>

    )

}

export default Transaction 