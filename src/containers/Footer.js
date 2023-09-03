import React, { useEffect, useState, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../src/assets/css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGooglePlay, faTiktok } from '@fortawesome/free-brands-svg-icons';
import logoWhite from "./../assets/atixsiwalatri.png";
import axios from "axios";

const Footer = () => {

//     const [datas, setData] = useState([])

//     const fetchData = async () => {
//             let query = 'settings/customer_service_phone'
//             await axios.get(apiUrl + query )
//             .then((res) => {
//               setData(res.data.value);
//             })
//             .catch(function (error) {
//                 if(error.response.status === 401){
//                 localStorage.removeItem('access_token')
//                 // window.location.reload()
//                 }
//             });
//     };

//     useEffect(() => {
//       fetchData();
//     }, []);


    return(
        <div>
            <div className="bg-footer-comp">
                    <div className="container max-auto">
                        <div className="c-footer-content flex flex-wrap">
                                <div className="c-footer__logo w-full mb-14">
                                        <img src={logoWhite} className="footer-logo-white"/>
                                </div>
                        </div>
                        {/* <div className="c-footer__top w-full xl:w-9/12 flex flex-wrap">
                                <div className="c-footer__company w-1/2 md:w-1/4">
                                        <p className="c-footer__title  md:mb-8 lg:mb-6">Kontak Kami</p>
                                        <ul className="space-y-4 md:space-y-6 lg:space-y-4">
                                            <li className="gtm-footer-email gtm-footer"><a className="c-footer__link"  href="mailto:cs@bago.co.id" target="_blank"  ><EnvelopeFill/><span> cs@bago.co.id</span></a></li>
                                            <li className="gtm-footer-phone gtm-footer"><a className="c-footer__link"  href={"http://wa.me/"+datas.customer} target="_blank"><Whatsapp /><span> +{datas.customer}</span></a></li>
                                            <li className="gtm-footer-address gtm-footer"><a className="c-footer__link" href="https://goo.gl/maps/eAoH9vf5Pmeyfojn8" target="_blank" ><GeoAltFill /><span> Jl. Raya Buduk, No. 9x, Mengwi,<br/> Badung, Bali</span></a></li>
                                        </ul>
                                </div>
                                <div className="c-footer__company w-1/2 md:w-1/4">
                                        <p className="c-footer__title  md:mb-8 lg:mb-6">Tentang Kami</p>
                                        <ul className="space-y-4 md:space-y-6 lg:space-y-4">
                                            <li className="gtm-footer-email"><a href="/profile-company" className="c-footer__link">Yuk Kenali Kami</a></li>
                                            
                                        </ul>
                                </div>
                                <div className="c-footer__company w-1/2 md:w-1/4">
                                        <p className="c-footer__title  md:mb-8 lg:mb-6">Partner</p>
                                        <ul className="space-y-4 md:space-y-6 lg:space-y-4">
                                            <li className="gtm-footer-email"><a href="/partners/driver" className="c-footer__link">Driver</a></li>
                                            <li className="gtm-footer-phone"><a href="/partners/merchant" className="c-footer__link">Mitra Usaha</a></li>
                                        </ul>
                                </div>
                                <div className="c-footer__company w-1/2 md:w-1/4">
                                        <p className="c-footer__title  md:mb-8 lg:mb-6">Unduh Aplikasi</p>
                                        <ul className="space-y-4 md:space-y-6 lg:space-y-4">
                                            <li className="gtm-footer-email gtm-footer"><a href="https://play.google.com/store/apps/details?id=com.bagocustomer" target="_blank"  className="c-footer__link"><FontAwesomeIcon icon={faGooglePlay} />  Google Play</a></li>
                                            <li className="gtm-footer-phone gtm-footer"><a href="https://apps.apple.com/id/app/bago/id1598782885" target="_blank"  className="c-footer__link"><FontAwesomeIcon icon={faApple} /> Apps Store</a> </li>
                                        </ul>
                                </div>
                        </div> */}
                        {/* <hr className="xl" />
                        <div className="row">
                            <div className="c-footer__info w-full  col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div className="c-footer__privpol gtm-footer-privpol"><a href="/privacy" className="c-footer__link">Kebijakan Privasi</a></div>
                                    <div className="c-footer__tnc gtm-footer-tnc"><a href="/layanan" className="c-footer__link">Ketetuan Layanan</a></div>
                            </div>
                            <div className="c-footer__info_social w-full col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div className="c-footer__privpol gtm-footer-privpol"><a href="https://vt.tiktok.com/ZGJUjkeKh/" target="_blank"  className="btn c-footer__link"><FontAwesomeIcon icon={faTiktok} className="c-footer__icon" /></a></div>
                                    <div className="c-footer__privpol gtm-footer-privpol"><a href="https://www.linkedin.com/in/bago-bali-2a4101208" target="_blank"  className="btn c-footer__link"><Linkedin className="c-footer__icon" /></a></div>
                                    <div className="c-footer__privpol gtm-footer-privpol"><a href="https://www.facebook.com/bago.bali.1" target="_blank"  className="btn c-footer__link"><Facebook className="c-footer__icon"/></a></div>
                                    <div className="c-footer__privpol gtm-footer-privpol"><a href={"http://wa.me/"+datas.customer} target="_blank"  className="btn c-footer__link"><Whatsapp className="c-footer__icon"/></a></div>
                                    <div className="c-footer__privpol gtm-footer-privpol"><a href="https://www.instagram.com/bago_bali?r=nametag" target="_blank"  className="btn c-footer__link"><Instagram className="c-footer__icon"/></a></div>
                                    <div className="c-footer__privpol gtm-footer-privpol"><a href="https://www.youtube.com/channel/UCjzMdfQUhHTGHtE-OQ3y2dw" target="_blank"  className="btn c-footer__link"><Youtube className="c-footer__icon" /></a></div>

                            </div>
                        </div> */}
        </div>
      </div>
      <div className="powerded-bg-comp">
        <div className="container max-auto">
          <div className="c-footer-content flex flex-wrap">
            <h5>Powered by : DisHub Klungkung x BPD Bali x MaiHarta</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
