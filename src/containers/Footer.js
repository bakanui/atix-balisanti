import React, { useEffect, useState, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../src/assets/css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faTiktok, faFacebook, faLinkedin, faWhatsapp, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

import logoWhite from "./../assets/atixsiwalatri.png";
import axios from "axios";

const Footer = () => {

    return(
        <div>
            <div className="bg-footer-comp">
                    <div className="container max-auto">
                        {/* <div className="c-footer-content flex flex-wrap">
                                <div className="c-footer__logo w-full mb-14">
                                        <img src={logoWhite} className="footer-logo-white"/>
                                </div>
                        </div> */}
                        <div className="c-footer__top w-full xl:w-9/12 flex flex-wrap">
                                <div className="c-footer__company w-1/2 md:w-1/4">
                                        <img src={logoWhite} className="footer-logo-white"/>
                                </div>
                                <div className="c-footer__company w-1/2 md:w-1/4">
                                        {/* <p className="c-footer__title  md:mb-8 lg:mb-6">Partner</p>
                                        <ul>
                                            <li className="gtm-footer-email"><a href="/partners/driver" className="c-footer__link">Driver</a></li>
                                            <li className="gtm-footer-phone"><a href="/partners/merchant" className="c-footer__link">Mitra Usaha</a></li>
                                        </ul> */}
                                </div>
                                <div className="c-footer__company w-1/2 md:w-1/4">
                                        <p className="c-footer__title  md:mb-8 lg:mb-6">Butuh Bantuan?</p>
                                        <ul>
                                            <li className="gtm-footer-email gtm-footer"><a href="/contact-us" target="_blank"  className="c-footer__link">Kontak Kami</a></li>
                                        </ul>
                                        {/* <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                        <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                                        </div>
                                        </div> */}
                                </div>
                                <div className="c-footer__company w-1/2 md:w-1/4">
                                        <p className="c-footer__title md:mb-8 lg:mb-6">Tentang Kami</p>
                                        <p className="c-footer__info md:mb-8 lg:mb-6">Bali Santi menyediakan layanan pemesanan tiket penyebrangan domestik di Klungkung dengan berbagai fitur seperti pembayaran fleksibel, pengaturan pemesanan yang mudah, dan pengiriman tiket langsung melalui e-mail.</p>
                                </div>
                        </div>
                        <hr className="xl" />
                        <div className="row">
                            <div className="c-footer__info w-full  col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div className="c-footer__privpol gtm-footer-privpol"><a>2024 © Dinas Perhubungan Kabupaten Klungkung</a></div>
                                    {/* <div className="c-footer__tnc gtm-footer-tnc"><a href="/layanan" className="c-footer__link">Ketetuan Layanan</a></div> */}
                            </div>
                            <div className="c-footer__info_social w-full col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <div className="c-footer__privpol gtm-footer-privpol"><a href="https://dishub.klungkungkab.go.id" target="_blank"  className="btn c-footer__link"><FontAwesomeIcon icon={faGlobe} className="c-footer__icon" /></a></div>
                                <div className="c-footer__privpol gtm-footer-privpol"><a href="https://www.facebook.com/p/Dinas-Perhubungan-Kabupaten-Klungkung-100014923306880/" target="_blank"  className="btn c-footer__link"><FontAwesomeIcon icon={faFacebook} className="c-footer__icon"/></a></div>
                                <div className="c-footer__privpol gtm-footer-privpol"><a href="https://www.instagram.com/dishubklungkung/" target="_blank"  className="btn c-footer__link"><FontAwesomeIcon icon={faInstagram} className="c-footer__icon"/></a></div>
                                <div className="c-footer__privpol gtm-footer-privpol"><a href="mailto:balisanti.siwalatri@gmail.com" target="_blank"  className="btn c-footer__link"><FontAwesomeIcon icon={faEnvelope} className="c-footer__icon" /></a></div>
                            </div>
                        </div>
        </div>
      </div>
      {/* <div className="powerded-bg-comp">
        <div className="container max-auto">
          <div className="c-footer-content flex flex-wrap">
            <h5>Powered by : DisHub Klungkung x BPD Bali x MaiHarta</h5>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
