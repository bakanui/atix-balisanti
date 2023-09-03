import React from 'react'
import {
  TheContent,
  TheNavbar,
  TheFooter,
} from './index'
const TheLayout = () => {

  let link = window.location.href
  let triger_page = 0
  if(link.includes('status-payment')){
    triger_page = 1
  }

    if(triger_page == 1){
      return (
        <div className="c-app c-default-layout">
          <div className="c-wrapper">
            {/* <TheNavbar/> */}
            <div className="c-body">
              <TheContent/>
            </div>
            {/* <TheFooter/> */}
          </div>
        </div>
      )
    }else{
      return (
        <div className="c-app c-default-layout">
          <div className="c-wrapper">
            <TheNavbar/>
            <div className="c-body">
              <TheContent/>
            </div>
            <TheFooter/>
          </div>
        </div>
      )
    }

}

export default TheLayout
