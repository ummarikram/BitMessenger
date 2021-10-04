/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Link from "next/link";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

import {authenticate} from "components/auth";

export default function Index() {

  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-6 items-center flex h-screen">
        
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                
                
                
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-black-400 text-center mb-3 font-bold">
                <h1>Connect with Stacks Wallet</h1>
                </div>
                <form>             
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => authenticate()}
                    >
                      CONNECT
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/4">

              <Link href="https://chrome.google.com/webstore/detail/hiro-wallet/ldinpeekobnhjjdofggfgjlcehhmanlj">
                  <a href="https://chrome.google.com/webstore/detail/hiro-wallet/ldinpeekobnhjjdofggfgjlcehhmanlj" 
                  className="text-green-200 text-xl">
                    <small>Click here to grab the extension!</small>
                  </a>
                </Link>

              </div>
             
            </div>
          </div>
        </div>
      </div>
      
      </section>

      

      <Footer />
    </>
  );
}
