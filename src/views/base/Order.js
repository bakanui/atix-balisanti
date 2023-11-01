import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { apiUrl } from '../../reusable/constants'
import '../../css/error.scss';
import { FormSelect, Form, Button, Col, Row, FormGroup, FormLabel, Modal, Tabs, Tab,  } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnchor, faArrowAltCircleRight, faArrowRightLong, faCalendar, faCalendarAlt, faChevronRight, faCircle, faInfoCircle, faMapPin, faPlusCircle, faShip, faTimes, faUserFriends, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect, useParams } from "react-router-dom";
import ReactLoading from 'react-loading';
import gangga from './../../assets/gangga.png';
import _ from "lodash";
import logoBPD from './../../assets/bank-bpd-bali-logo-687C6FCAC4-seeklogo.com.png';
import logoQris from './../../assets/qris.png';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { sha256 } from 'js-sha256';
import XMLParser from 'react-xml-parser';
const Order = () => {
    
    const { id_jadwal, kapasitas, date_book } = useParams();
    const [datas, setDatas] = useState([]);
    const [jenisTujuan, setJenisTujuan] = useState([]);
    const [tiketJadwal, setTikets] = useState([]);
    const [jenisPenumpang, setJenisPenumpang] = useState([]);
    const [butSumbit, setButSubmit] = useState(true)
    const [payment_id, setPayment] = useState(0)
    const [modal, setModal] = useState(false) 
    const [modalInfo, setModalInfo] = useState(false)
    const [invoiceId, setInvoiceId] = useState(0)
    const [statusVA, setStatusVA] = useState("03")

    const [modal_loading, setModalLoading] = useState(false) 


    //form
    const [email, setEmail] = useState('');
    const [tiket_data, setTiketData] = useState();
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [jenis_kelamin, setJenisKelamin] = useState(0);
    const [id_jenis_penum, setIdJenisPenum] = useState(0);
    const [id_tujuan, setIdTujuan] = useState(0);
    const [id_tiket, setIdTiket] = useState(0);
    const [no_identitas, setNoIdentitas] = useState('');
    const [catatan, setCatatan] = useState('');

    const [view_total, setTotalView] = useState(0);
    const [groupTiket, setGroupTiket] = useState();
    const [totForm, setTotForm] = useState(0);

    const [ultimate_post, setUltimatePost] = useState()
    const [total_pay, setTotalPay] = useState(0)
    const [copy, setCopy] = useState(false)

    const [no_va, setNoVA] = useState(0);
    
    const postJadwal = 
          {
            "id_jadwal": "",
            "jadwal": "",
            "status": "",
            "harga": 0,
            "id_armada": "",
            "id_nahkoda": "",
            "id_kapal": "",
            "id_rute": "",
            "ekstra": 0,
            "id_loket": 88,
            "created_at": "2021-09-08T01:40:21.000000Z",
            "updated_at": "2022-01-12T02:43:38.000000Z",
            "deleted_at": null,
            "jadwal_to_armada": {
                "id_armada": "60dff1192581b",
                "id_user": "49",
                "nama_armada": "Gangga Express",
                "kontak": "089663617345",
                "alamat": "Dusun Pande Mas, Desa Kamasan",
                "description": "Kami melayani setulus hati",
                "created_at": "2021-07-03T05:09:45.000000Z",
                "updated_at": "2021-07-03T05:09:45.000000Z",
                "deleted_at": null
            },
            "jadwal_to_nahkoda": {
                "id_nahkoda": 100,
                "nama_nahkoda": "Gungde Maiharta",
                "no_hp": "0812991829111",
                "id_armada": "60dff1192581b",
                "id_kecakapan": 4,
                "created_at": "2021-12-20T13:26:35.000000Z",
                "updated_at": "2021-12-20T13:26:35.000000Z",
                "deleted_at": null
            },
            "jadwal_to_kapal": {
                "id_kapal": "60dff46f200dc",
                "nama_kapal": "Gangga Express 5",
                "mesin": "SUZUKI 5 x 250 PK",
                "panjang": "17.5",
                "lebar": "3.2",
                "dimension": "1.2",
                "grt": 0,
                "dwt": 0,
                "kapasitas_penumpang": 86,
                "kapasitas_crew": 6,
                "kilometer": 0,
                "id_armada": "60dff1192581b",
                "id_jenis": 4,
                "id_status": 1,
                "created_at": "2021-07-03T05:23:59.000000Z",
                "updated_at": "2021-10-12T03:54:18.000000Z",
                "deleted_at": null
            },
            "jadwal_to_rute": {
                "id_rute": 0,
                "tujuan_awal": 0,
                "tujuan_akhir": 0,
                "jarak": 0,
                "created_at": "2021-03-11T12:45:26.000000Z",
                "updated_at": "2021-06-09T06:18:03.000000Z",
                "deleted_at": null,
                "tujuan_awals": {
                    "id_dermaga": 1,
                    "nama_dermaga": "",
                    "lokasi": "",
                    "id_syahbandar": 41,
                    "created_at": "2021-01-15T10:31:08.000000Z",
                    "updated_at": "2021-06-02T07:16:40.000000Z",
                    "deleted_at": null
                },
                "tujuan_akhirs": {
                    "id_dermaga": 2,
                    "nama_dermaga": "",
                    "lokasi": "",
                    "id_syahbandar": 0,
                    "created_at": "2021-01-15T10:31:46.000000Z",
                    "updated_at": "2021-06-27T13:36:53.000000Z",
                    "deleted_at": null
                }
            }
        }
    const [detail_jadwal, setDetailJadwal] = useState(postJadwal);


    const fetchData = async () => {
        const jadwal = axios.get(apiUrl + 'jadwal_keberangkatan/view/'+ id_jadwal)
        const tiket = axios.get(apiUrl + 'jadwal_keberangkatan/view/tiket/'+ id_jadwal)
        const jenis = axios.get(apiUrl + 'jenis_penumpang')
        const tujuan = axios.get(apiUrl + 'jenis_tujuan')
        await axios.all([jadwal, tiket, jenis, tujuan]).then(axios.spread(function(jad, tik, jen, tuj) {
            setDetailJadwal(jad.data)
            setTikets(tik.data)
            setJenisPenumpang(jen.data)
            setJenisTujuan(tuj.data)
            let xmls = `
            <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:echoTest">
                <soapenv:Header/>
                <soapenv:Body>
                <urn:ws_echo_test soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                    <username xsi:type="xsd:string">BALI_SANTI</username>
                    <password xsi:type="xsd:string">hbd3q2p9b4l1s4nt1bpd8ovr</password>
                </urn:ws_echo_test>
                </soapenv:Body>
            </soapenv:Envelope>
            `;
            axios.post('https://maiharta.ddns.net:3100/http://180.242.244.3:7070/ws_bpd_payment/interkoneksi/v1/ws_interkoneksi.php',xmls, {headers: {'Content-Type': 'text/xml',},})
            .then((r) => {
                var xml = new XMLParser().parseFromString(r.data); 
                let val = xml.children[0].children[0].children[0].value
                let barval = val.replace(/&quot;/g, "\"")
                let finality = JSON.parse(barval)
                let super_finality = {
                    code: finality.code,
                    data: JSON.stringify(finality.data),
                    message: finality.message,
                    status: finality.status
                }
                setStatusVA(finality.status)
                console.log(finality)
                axios.post(apiUrl+'logs/va-bpd', super_finality, header)
            })
        })).catch(function (error) {
            toast.error('Terjadi kesalahan pada jaringan. Silahkan coba kembali.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])


    const [inputList, setInputList] = useState([
        {nama:'', jenis_kelamin:0, tiket_data:[], no_identitas:0, harga_tiket:0, free_pass:0, catatan:''}
      ])
  
      const handleAddFields = () => {
        const values = [...inputList];
        values.push({nama:'', jenis_kelamin:0, tiket_data:[], no_identitas:0, harga_tiket:0, catatan:''})
        setInputList(values);
      };
  
      const handleRemoveFields = (index) => {
        const list = [...inputList];
        // console.log(list[index]['tiket_data'])
        if(list[index]['tiket_data'].length !== 0){
          let data_tiket = list[index]['tiket_data'].split('|')
          let total_view = view_total;
          total_view = total_view - parseInt(data_tiket[2])
          setTotalView(total_view);
          
        }
        list.splice(index, 1); 
        const groups = _.groupBy(list, 'tiket_data');
        setGroupTiket(groups)
        setInputList(list);
   
      };

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        var tot = parseInt(view_total);
        if(name == 'tiket_data'){ //mencari total dari semua tiket yang masuk
            let tots = 0
            list.map((data, index) => {
                if(data['tiket_data'].length !== 0){
                    let data_tik = data['tiket_data'].split('|')
                    tots = tots + parseInt(data_tik[2])
                }
            })
          setTotalView(tots);
        }
        const groups = _.groupBy(list, 'tiket_data');
        setGroupTiket(groups)
        setButSubmit(false, true)
        setInputList(list);
      };

      const handleRemoveOp = (index) => {
        const element = document.getElementById("pilihkosong"+index);
        if(element){
            element.remove();
        }
      }

    const submitHandler = (e) => {
        const form = new FormData(e.target);
        e.preventDefault();
        if(payment_id !== 0){
        let datas = []
        let totals = 0

        inputList.map((res) => {
            let data_tiket = res.tiket_data.split('|')
            let harga = data_tiket[2]
            let keterangan = ''

            if(res.free_pass == 1){
              harga = res.free_pass_harga
              keterangan = res.ket_free_pass
            }
            let pos = {
                tanggal: date_book,
                email: form.get('email'),
                nama_penumpang: res.nama,
                no_identitas: res.no_identitas,
                id_jns_penum: data_tiket[0],
                id_tujuan: form.get('id_tujuan'),
                id_tiket: data_tiket[1],
                id_jadwal: id_jadwal,
                jenis_kelamin: res.jenis_kelamin,
                alamat: form.get('alamat'),
                status_verif:0,
                harga_tiket: harga,
                catatan: res.catatan,
                freepass: 0,
                payment_method: 'transfer'
            }
            datas.push(pos)
            totals = totals + parseInt(harga)
        })
        let ultimate = {
          data: datas
        }

        setUltimatePost(ultimate)
        setTotalPay(totals)
        setModal(true)
        }else{
            toast.error('Mohon Pilih Metode Pembayaran!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const header = {
        headers: {
          'Accept': "application/json" 
        },
      }
    
    function kepentinganPenumpangText(id_tujuan){
        let id = parseInt(id_tujuan)
        switch (id){
            case 1:
                return "Pulang"
            case 2:
                return "Tirtayatra"
            case 3:
                return "Liburan"
            case 5:
                return "Expedisi"
            case 6:
                return "Kedinasan"    
        }
    }
    
    const pushToPayment = () => {
        setModal(false)
        console.log(ultimate_post)
        // console.log(total_pay)
        let invoice_id = ''
            setModalLoading(true)
            axios.post(apiUrl + 'penumpang-group', ultimate_post)
            .then((res) => {
                let loginer = {
                    email: "masadi@gmail.com",
                    password: "cobatebak"
                }
                axios.post('https://maiharta.ddns.net:3100/http://maiharta.ddns.net:3333/api/login', loginer)
                .then((log => {
                    let penumpangs = []
                    ultimate_post.data.map((u) => {
                        penumpangs.push({
                            id_jenis_tiket: parseInt(u.id_tiket),
                            nama_penumpang: u.nama_penumpang,
                            no_identitas: String(u.no_identitas),
                            jenis_kelamin: String(u.jenis_kelamin),
                            email: u.email
                        })
                    })
                    let penumpang = {
                        tanggal: date_book,
                        id_agen: 58,
                        collect: total_pay,
                        penumpangs: penumpangs
                    }
                    axios.post('https://maiharta.ddns.net:3100/http://maiharta.ddns.net:3333/api/penjualan', penumpang, {
                        headers: {
                            'Authorization': 'bearer ' + log.data.authorisation.token
                        }, })
                    .then((pen)=>{
                        let last = res.data.length
                        if (res.data[last - 1].ditlala){
                            last = last - 1
                            console.log(last)
                        }
                        if(res.data[last - 1]){ //JIKA INVOICE BERHASIL DIGENERATE
                            invoice_id = res.data[last - 1].invoice.id
                            if(payment_id == 2){ // PAYMENT QRIS BPD
                                let data_generate = {
                                    merchantPan: res.data[last - 1].invoice.merchantPan,
                                    terminalUser: res.data[last - 1].invoice.terminalUser,
                                    merchantName : res.data[last - 1].invoice.nama_armada,
                                    amount : res.data[last - 1].invoice.grandtotal,
                                    billNumber : res.data[last - 1].invoice.id,
                                    hashcodeKey: sha256(res.data[last - 1].invoice.merchantPan + res.data[last - 1].invoice.terminalUser + res.data[last - 1].invoice.id + res.data[last - 1].invoice.passcode),
                                    email : res.data[last - 1].invoice.email,
                                    customerName : res.data[0].penumpang.nama_penumpang,
                                    operatorName : res.data[last - 1].invoice.nama_armada,
                                }
                                // let data_generate = {
                                //     merchantPan: "9360012900000001756",
                                //     terminalUser: "A01",
                                //     merchantName : res.data[last - 1].invoice.nama_armada,
                                //     amount : res.data[last - 1].invoice.grandtotal,
                                //     billNumber : "628",
                                //     hashcodeKey: sha256("9360012900000001756A01" + "628" + "XkKe2UXe"),
                                //     email : res.data[last - 1].invoice.email,
                                //     customerName : res.data[0].penumpang.nama_penumpang,
                                //     operatorName : res.data[last - 1].invoice.nama_armada,
                                // }
                                axios.post('https://maiharta.ddns.net:3100/http://180.242.244.3:7070/merchant-admin/rest/openapi/generateQrisPost',data_generate)
                                .then((rest) => {
                                        if(!rest.data.errorCode){
                                            console.log(rest)
                                            localStorage.setItem('qrValue', JSON.stringify(rest.data.qrValue))
                                            localStorage.setItem('billNumber', JSON.stringify(rest.data.billNumber))
                                            localStorage.setItem('invoice_id', JSON.stringify(res.data[last - 1].invoice.id))
                                            localStorage.setItem('total', JSON.stringify(rest.data.totalAmount))
                                            localStorage.setItem('expiredDate', JSON.stringify(rest.data.expiredDate))
                                            localStorage.setItem('kodeNNS', JSON.stringify(rest.data.nns))
                                            localStorage.setItem('merchant_name', JSON.stringify(res.data[last - 1].invoice.nama_armada))
                                            let data_update = {
                                                id_invoice : res.data[last - 1].invoice.id,
                                                bill_number : rest.data.billNumber,
                                                qrvalue : rest.data.qrValue,
                                                expiredDate : rest.data.expiredDate,
                                                nmid : rest.data.nmid,
                                                nns: '93600129',
                                                trxId: rest.data.trxId,
                                                referenceNumber: rest.data.referenceNumber,
                                                status: 0
                                            }
                                            axios.post(apiUrl+'penumpang/update-invoice', data_update, header)
                                            .then(() => {
                                                window.location.href = "/confirmation-payments/"+res.data[last - 1].invoice.id+"/qris-bpd"
                                                setModalLoading(false)
                                            }).catch((error) => {
                                                    toast.error('Terjadi kesalahan pada internal sistem, Mohon coba beberapa saat lagi!', {
                                                        position: "top-right",
                                                        autoClose: 5000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                    });
                                                })
                                            setModalLoading(false)
                                        }else{
                                                toast.error(rest.data.message + ' Mohon coba beberapa saat lagi!', {
                                                    position: "top-right",
                                                    autoClose: 5000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                })
                                                setModalLoading(false)
                                        }
                                }).catch((error) => {
                                        toast.error('Terjadi kesalahan pada internal sistem, Mohon coba beberapa saat lagi!', {
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        });
                                        setModalLoading(false)
                                    })
                            }else{ // PAYMENT VA BPD
                                let billNumber = pen.data[0].kode_booking
                                let tujuan = ''
                                if (res.data[0].rute[0].tujuan_akhirs.zona.lokasi === "Nusa Penida"){
                                    tujuan = "NP - Pelabuhan " + res.data[0].rute[0].tujuan_akhirs.nama_dermaga
                                }else if (res.data[0].rute[0].tujuan_akhirs.zona.lokasi === "Klungkung") {
                                    tujuan = "KLK - Pelabuhan " + res.data[0].rute[0].tujuan_akhirs.nama_dermaga
                                }
                                let xmls = `
                                <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:tagihanInsert">
                                    <soapenv:Header/>
                                    <soapenv:Body>
                                    <urn:ws_tagihan_insert soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                                        <username xsi:type="xsd:string">BALI_SANTI</username>
                                        <password xsi:type="xsd:string">hbd3q2p9b4l1s4nt1bpd8ovr</password>
                                        <noid xsi:type="xsd:string">${billNumber}</noid>
                                        <nama xsi:type="xsd:string">${res.data[0].penumpang.nama_penumpang}</nama>
                                        <tagihan xsi:type="xsd:double">${parseInt(res.data[last - 1].invoice.grandtotal)}</tagihan>
                                        <instansi xsi:type="xsd:string">ETIKET_BALI_SANTI</instansi>
                                        <ket_1_val xsi:type="xsd:string">${res.data[last - 1].invoice.nama_armada}</ket_1_val>
                                        <ket_2_val xsi:type="xsd:string">${date_book}</ket_2_val>
                                        <ket_3_val xsi:type="xsd:string">${tujuan}</ket_3_val>
                                        <ket_4_val xsi:type="xsd:string">${res.data[last - 1].invoice.created_at}</ket_4_val>
                                        <ket_5_val xsi:type="xsd:string">VA - BPD Payment</ket_5_val>
                                        <ket_6_val xsi:type="xsd:string">${inputList.length}</ket_6_val>
                                        <ket_7_val xsi:type="xsd:string">${kepentinganPenumpangText(res.data[0].penumpang.id_tujuan)}</ket_7_val>
                                        <ket_8_val xsi:type="xsd:string">${res.data[0].penumpang.updated_at}</ket_8_val>
                                        <ket_9_val xsi:type="xsd:string"></ket_9_val>
                                        <ket_10_val xsi:type="xsd:string"></ket_10_val>
                                        <ket_11_val xsi:type="xsd:string"></ket_11_val>
                                        <ket_12_val xsi:type="xsd:string"></ket_12_val>
                                        <ket_13_val xsi:type="xsd:string"></ket_13_val>
                                        <ket_14_val xsi:type="xsd:string"></ket_14_val>
                                        <ket_15_val xsi:type="xsd:string"></ket_15_val>
                                        <ket_16_val xsi:type="xsd:string"></ket_16_val>
                                        <ket_17_val xsi:type="xsd:string"></ket_17_val>
                                        <ket_18_val xsi:type="xsd:string"></ket_18_val>
                                        <ket_19_val xsi:type="xsd:string"></ket_19_val>
                                        <ket_20_val xsi:type="xsd:string"></ket_20_val>
                                        <ket_21_val xsi:type="xsd:string"></ket_21_val>
                                        <ket_22_val xsi:type="xsd:string"></ket_22_val>
                                        <ket_23_val xsi:type="xsd:string"></ket_23_val>
                                        <ket_24_val xsi:type="xsd:string"></ket_24_val>
                                        <ket_25_val xsi:type="xsd:string"></ket_25_val>
                                    </urn:ws_tagihan_insert>
                                    </soapenv:Body>
                                </soapenv:Envelope>
                                `;
                                axios.post('https://maiharta.ddns.net:3100/http://180.242.244.3:7070/ws_bpd_payment/interkoneksi/v1/ws_interkoneksi.php',xmls,
        {headers: {'Content-Type': 'text/xml',},})
                                .then((rest) => {
                                    var xml = new XMLParser().parseFromString(rest.data)
                                    let val = xml.children[0].children[0].children[0].value
                                    let barval = val.replace(/&quot;/g, "\"")
                                    let finality = JSON.parse(barval)
                                    let super_finality = {
                                        code: finality.code,
                                        data: JSON.stringify(finality.data),
                                        message: finality.message,
                                        status: finality.status,
                                        invoice_id: invoice_id
                                    }
                                    let data_update = {
                                        id_invoice : invoice_id,
                                        bill_number : finality.data[0].recordId,
                                        no_va : billNumber.toString(),
                                        status: 0
                                    }
                                    if(finality.code === "00"){
                                        axios.post(apiUrl+'penumpang/update-invoice', data_update , header)
                                        .then(() => {
                                            axios.post(apiUrl+'logs/va-bpd', super_finality, header)
                                            .then(() => {
                                                setInvoiceId(invoice_id)
                                                setNoVA(finality.data[0]["No Tagihan"])
                                                setModalLoading(false)
                                                setModalInfo(true)
                                            }).catch((error) => {
                                                    toast.error('Terjadi kesalahan, Mohon coba beberapa saat lagi!', {
                                                        position: "top-right",
                                                        autoClose: 5000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                    });
                                                    setModalLoading(false)
                                                })
                                        }).catch(() => {
                                            toast.error('Terjadi kesalahan, Mohon coba beberapa saat lagi!', {
                                                position: "top-right",
                                                autoClose: 5000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            });
                                            setModalLoading(false)
                                        })
                                    }else{
                                        axios.post(apiUrl+'logs/va-bpd', super_finality, header)
                                        .then(() => {
                                            toast.error(finality.message + ', Mohon coba beberapa saat lagi!', {
                                                position: "top-right",
                                                autoClose: 5000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            });
                                            setModalLoading(false)
                                        }).catch((error) => {
                                            console.log(error)
                                                toast.error('Terjadi kesalahan, Mohon coba beberapa saat lagi!', {
                                                    position: "top-right",
                                                    autoClose: 5000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                });
                                                setModalLoading(false)
                                            })
                                    }
                                })
                                .catch(() => {
                                    let message = "Terjadi kesalahan, Mohon coba beberapa saat lagi!"
                                    let super_finality = {
                                        code: "20",
                                        data: "[]",
                                        message: message,
                                        status: 0
                                    }
                                    toast.error(message + ', Mohon coba beberapa saat lagi!', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    })
                                    axios.post(apiUrl+'logs/va-bpd', super_finality, header)
                                        .then(() => {
                                            setModalLoading(false)
                                        }).catch((error) => {
                                            console.log(error)
                                                toast.error('Terjadi kesalahan, Mohon coba beberapa saat lagi!', {
                                                    position: "top-right",
                                                    autoClose: 5000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                });
                                                setModalLoading(false)
                                            })
                                    setModalLoading(false)
                                })
                            }        
                        }else{
                            setModalLoading(false)
                            toast.error('Terjadi kesalahan pada sistem, Mohon coba beberapa saat lagi!', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            setModalLoading(false)
                        }
                    })
                }))
               

            }).catch((error) => {
                toast.error('Terjadi Kesalahan, Mohon coba beberapa saat lagi!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setModalLoading(false)
            })

    }


    return(
            <main className="padd-components">
                <ToastContainer />
                <div className='blue-zone-bg-flat'>
                    <div className='center-container' >
                        <div className='aboutus-components-core content-core-container '>
                            <div className='card card-customs shadows' style={{padding:'1.5rem 2rem'}}>
                                <Row>
                                    <Col xs="12" sm="8" md="8" lg="8" className='cols-destinations-space'>
                                        <div className='head-info-text title-v2 semibold-text'>
                                            <h5 className=''>Pelayaran dari Klungkung menuju Nusa Penida</h5>
                                        </div>
                                        <div className='seconds-level-info-text'>
                                            <p className='text-sm' style={{color:'#8b8b8b', margin:0, display:'flex', alignItems:'baseline'}}>
                                                 <FontAwesomeIcon icon={faMapPin} color="orange"  style={{margin:'0 5px'}}/>
                                                 <span>Pelabuhan {detail_jadwal.jadwal_to_rute.tujuan_awals.nama_dermaga} ({detail_jadwal.jadwal_to_rute.tujuan_awals.lokasi})</span>
                                            </p>
                                            <div style={{margin:'0 15px'}}>
                                                <FontAwesomeIcon className='hidden-xs'  icon={faArrowRightLong} color="#969696"  style={{ height:'1.2rem'}}/>
                                            </div>
                                            <p className='text-sm' style={{color:'#8b8b8b', margin:0, display:'flex', alignItems:'baseline'}}> 
                                                <FontAwesomeIcon icon={faMapPin} color="blue"  style={{margin:'0 5px'}}/> 
                                                <span>Pelabuhan {detail_jadwal.jadwal_to_rute.tujuan_akhirs.nama_dermaga} ({detail_jadwal.jadwal_to_rute.tujuan_akhirs.lokasi})</span>
                                            </p>
                                        </div>
                                        <div className='seconds-level-info-text'>
                                            <p className='text-sm' >
                                                 <div style={{marginRight:'10px'}}>
                                                    <FontAwesomeIcon icon={faAnchor} color="#8b8b8b"  style={{margin:'0 5px'}}/>
                                                    <span>{detail_jadwal.jadwal_to_armada.nama_armada}</span>
                                                 </div>
                                                 <div style={{marginRight:'10px'}}>
                                                    <FontAwesomeIcon icon={faShip} color="#8b8b8b"  style={{margin:'0 5px'}}/>
                                                    <span>{detail_jadwal.jadwal_to_kapal.nama_kapal}</span>
                                                 </div>
                                                 <div style={{marginRight:'10px'}}>
                                                    <FontAwesomeIcon icon={faUserGroup} color="#8b8b8b"  style={{margin:'0 5px'}}/>
                                                    <span>{detail_jadwal.jadwal_to_kapal.kapasitas_penumpang} Kapasitas</span>
                                                 </div>
                                                 <div style={{marginRight:'10px'}}>
                                                    <FontAwesomeIcon icon={faCalendarAlt} color="#8b8b8b"  style={{margin:'0 5px'}}/>
                                                    <span>{date_book}</span>
                                                 </div>

                                            </p>
                                        </div>
                                    </Col>
                                    <Col xs="12" sm="4"  md="4" lg="4" className="justify-end-postion-lg md-horizontal-padd">
                                        <div style={{width:'100px', hight:'auto'}}>
                                            <img src={detail_jadwal.jadwal_to_armada.image} className="img-responsive"></img>
                                        </div>
                                    </Col>
                                   
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='center-container' style={{margin:'2rem 0'}} id="tentang">
                    <div className='aboutus-components-core content-core-container'>
                        <Form onSubmit={submitHandler}>
                          <Row>
                              <Col xs="12" sm="8" md="8" lg="9" className='pos-contain-form-tikets'>
                                    <div className='card core-card-partner'>
                                            <h6 className='nomargin bold-text'>Informasi Penumpang</h6>
                                            <hr/>
                                            <Row> 
                                                <Col md="3">
                                                    <label htmlFor="statusLabel">Email</label>
                                                    <input className="form-control" id={"nameInput"} placeholder="Email"
                                                        onChange={e => setEmail(e.target.value)}
                                                        name="email" value={email} required/>
                                                </Col>
                                                <Col xs="12" md="4">
                                                        <label htmlFor="nameLabel">Alamat</label>
                                                        <textarea className="form-control" required rows="2" value={alamat} placeholder="...." name="alamat" onChange={(e) => { setAlamat(e.target.value); }} >
                                                        </textarea>
                                                    </Col>
                                                    <Col md="4">
                                                        <label htmlFor="statusLabel">Kepentingan Penumpang</label>
                                                        <Form.Select custom name="id_tujuan" id={"statusLabel"} value={id_tujuan} onChange={(e) => { setIdTujuan(e.target.value); }}>
                                                            {
                                                                jenisTujuan.map((data,index) => {
                                                                        return(
                                                                            <option key={index} value={data.id_tujuan}>{data.nama_tujuan}</option>
                                                                        )
                                                                })
                                                            }
                                                        </Form.Select>
                                                    </Col>
                                            </Row>
                                    </div>
                                    {inputList.map((data, index) => {
                                    return (
                                        <div key={index} className='card' style={{padding:'10px 15px', margin:'1rem 0'}} >
                                            <FormGroup>
                                                <Row>
                                                    <Col md="4">
                                                            <FormLabel htmlFor="statusLabel">Jenis Penumpang</FormLabel>
                                                            <Form.Select custom name="tiket_data" id={"statusLabel"} onChange={e => {handleInputChange(e, index); handleRemoveOp(index) }} required>
                                                                <option id={"pilihkosong"+index} value="">-</option>
                                                                {
                                                                    tiketJadwal.map((data,index) => {
                                                                            return(
                                                                                <option key={index} value={data.id_jns_penum+'|'+data.id+'|'+data.harga+'|'+data.nama_jns_penum +'-'+ data.nama_tiket}>{data.nama_jns_penum} - {data.nama_tiket} | {data.harga}</option>
                                                                            )
                                                                    })
                                                                }
                                                            </Form.Select>
                                                    </Col>
                                                    <Col xs="12" md="4">
                                                        <FormLabel htmlFor="nameLabel">Nama  Penumpang</FormLabel>
                                                        <input className="form-control" id={"nameInput"} placeholder="Nama  Penumpang"
                                                        onChange={e => handleInputChange(e, index)}
                                                        name="nama" value={data.nama} required/>
                                                    </Col>
                                                    <Col xs="12" md="4">
                                                            <FormLabel htmlFor="statusLabel">Jenis Kelamin</FormLabel>
                                                            <Form.Select custom name="jenis_kelamin" value={data.jenis_kelamin}  id={"statusLabel"} onChange={e => handleInputChange(e, index)} required>
                                                                <option value="0">Laki Laki</option>
                                                                <option value="1">Wanita</option>
                                                            </Form.Select>
                                                    </Col>
                                                  </Row>
                                                  <Row style={{ marginTop:'1rem'}} >
                                                    <Col xs="12" md="6">
                                                            <FormLabel htmlFor="nameLabel">No Identitas (No KTP/No Paspor)</FormLabel>
                                                            <input className="form-control" id={"nameInput"} placeholder="No Identitas"
                                                            onChange={e => {handleInputChange(e, index); }}
                                                            name="no_identitas" value={data.no_identitas} required/>
                                                        </Col>
                                                        <Col xs="12" md="6">
                                                            <FormLabel htmlFor="nameLabel">Catatan</FormLabel>
                                                            <input className="form-control" id={"nameInput"} placeholder="...."
                                                            onChange={e => {handleInputChange(e, index);  }}
                                                            name="catatan" value={data.catatan}/>
                                                        </Col>
                                                  </Row>
                                            </FormGroup>
                                            {(() => {
                                                if(index !== 0){
                                                    return(
                                                    <div style={{textAlign:'end', margin:'10px 0', textDecoration:'none'}}>
                                                        <Button style={{width:'fit-content',fontWeight:'700'}} className="button-remove"  onClick={() => {handleRemoveFields(index)}}><FontAwesomeIcon icon={faTimes} /> Hapus</Button>
                                                    </div>
                                                    )
                                                }
                                            })()}
                                        </div>
                                     )}
                                     )
                                     }

                                    <Row>
                                        <Col className='pt-3 d-flex justify-content-between'>
                                            <Button className="button-add"  onClick={handleAddFields}><FontAwesomeIcon icon={faPlusCircle} color="#fff"  style={{margin:'0 5px'}}/>Tambah Tiket</Button>
                                        </Col>
                                    </Row>
                              </Col>
                              <Col xs="12" sm="4" md="4" lg="3" className='pos-contain-totals sticky-component'>
                                    <div className='card core-card-partner'>
                                        <h6 className='nomargin bold-text'>Informasi Pembayaran </h6>
                                        <hr/>
                                        {groupTiket ? Object.entries(groupTiket).map((data, index) => {
                                            let nama = data[0].split("|")
                                            if(nama[0] !== ''){
                                                return(
                                                    <div key={index} >
                                                        <p style={{color:'rgb(59, 59, 59)', fontSize:'14px', display:'flex', justifyContent:'space-between'}}>
                                                            <span><b className="p-margin-blackgrey">{data[1].length}x</b> {nama[3]}</span>
                                                            <span >{"Rp. "+ (Number(nama[2])).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                                        </p>
                                                    </div>
                                                )
                                            }
                                        }) : null}
                                        <hr/>
                                        <div className='pull-right' style={{float:'right',textAlign:'end'}}>
                                            <h4 style={{color:'rgb(59, 59, 59)'}}><b>{"Rp. "+ (Number(view_total)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</b></h4>
                                        </div>
                                    </div>

                                    <hr style={{borderColor:'black', margin:'20px 0'}}></hr>
                                        <div className="plans" >
                                            <div className='nomargin bold-text'>Pilih Pembayaran <FontAwesomeIcon icon={faInfoCircle} className="icon-info" onClick={()=>{
                                                setNoVA(0)
                                                setModalInfo(true)
                                            }}  style={{margin:'0 5px'}}/></div>
                                            {statusVA !== "03" ? <label className="plan basic-plan" htmlFor="bpd">
                                                <input type="radio" name="payment" onChange={e => {setPayment(e.target.value)}} value={1} id="bpd"/>
                                                <div className="plan-content">
                                                    <img loading="lazy" src={logoBPD} alt="BPD Virtual Account" />
                                                    <div className="plan-details">
                                                    <span>Vitual Account BPD Bali</span>
                                                    {/* <p>Virtual Account BPD Bali, ........</p> */}
                                                    </div>
                                                </div>
                                            </label> : <label className="plan basic-plan" htmlFor="bpd" style={{backgroundColor: 'lightgray'}}>
                                                <input disabled type="radio" name="payment" onChange={e => {setPayment(e.target.value)}} value={1} id="bpd"/>
                                                <div className="plan-content">
                                                    <img loading="lazy" src={logoBPD} alt="BPD Virtual Account" style={{filter: 'grayscale(100%)'}}/>
                                                    <div className="plan-details">
                                                    <span style={{color: 'gray'}}>Vitual Account BPD Bali</span>
                                                    {/* <p>Virtual Account BPD Bali, ........</p> */}
                                                    </div>
                                                </div>
                                            </label>}

                                            <label className="plan complete-plan" htmlFor="qris">
                                                <input type="radio" id="qris" onChange={e => {setPayment(e.target.value)}} value={2} name="payment" />
                                                <div className="plan-content">
                                                    <img loading="lazy" src={logoQris} alt="QRIS" />
                                                    <div className="plan-details">
                                                    <span>QRIS</span>
                                                    {/* <p>QRIS </p> */}
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    <div className='pull-right' style={{width:'100%'}}>
                                        <Button  disabled={butSumbit} 
                                         type="submit" size='md' className='button-book'>
                                                Bayar Sekarang
                                        </Button>
                                    </div>
                              </Col>
                          </Row>
                        
                          <Modal
                            show={modal}
                            size="md"
                            aria-labelledby="contained-modal-title-vcenter"
                            onHide={() => {setModal(false)}}
                            >
                            <Modal.Body>
                                <h4 className='titling'>Pastikan alamat email anda sudah benar?!</h4>
                                <div style={{padding:'10px 15px'}}>
                                    <p className='email-regist'>{email}</p>
                                    <p style={{color: '#545452', margin:'5px 0'}}>Selanjutnya, data pembayaran akan dikirim melalui email yang sudah diregistrasi.</p>
                                    <p className='paybig'>
                                    {"Rp. "+ (Number(total_pay)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                    </p>
                                </div>
                                
                            </Modal.Body>
                            <Modal.Footer style={{display:'flex', justifyContent:'space-between'}}>
                                <Button type='button' className='btn-2-orng' onClick={() => {setModal(false)}}>Batal</Button>
                                <Button type='button' className='btn-1-blue' onClick={pushToPayment}>Lanjutkan</Button>
                            </Modal.Footer>
                        </Modal>


                        <Modal
                            show={modalInfo}
                            size="xl"
                            aria-labelledby="contained-modal-title-vcenter"
                            onHide={() => {setModalInfo(false)}}
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
                                {no_va !== 0 ? <Button type='button' className='btn-2-orng' href={"/transaction/"+invoiceId+"/status-payment"} onClick={() => {setModalInfo(false)}}>Cek Status Pembayaran</Button> : ''}
                                <Button type='button' className='btn-2-orng' onClick={() => {setModalInfo(false)}}>Tutup</Button>
                            </Modal.Footer>
                        </Modal>
                          </Form>
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

                


            </main>
    )
}

export default Order