import React from "react";
import Link from "next/link";
// components

import {
  Signout,
  AddFriend,
  CheckFriendUsername,
  GetFriendRequests,
} from "components/contractcallfunctions";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  if (typeof window !== "undefined") {
    var modal = document.getElementById("myModal");
    var modal2 = document.getElementById("myModal2");
    
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
      if (event.target == modal2) {
        modal2.style.display = "none";
      }
    };
  }

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase">
                BitMessenger
                <img alt="..." className="w-15 mr-1" src="/img/Logo.svg" />
              </a>
            </Link>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center px-1">
                <form>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => GetFriendRequests()}
                    >
                      VIEW REQUESTS
                    </button>
                  </div>
                </form>
              </li>

              <li className="flex items-center px-3">
                <form>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => AddFriend()}
                    >
                      ADD FRIEND
                    </button>
                  </div>
                </form>
              </li>

              <li className="flex items-center">
                <form>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => Signout()}
                    >
                      SIGNOUT
                    </button>
                  </div>
                </form>
              </li>
            </ul>

            <form>
              <div id="myModal" class="modal">
                <div class="modal-content">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Enter Username
                    </label>
                    <input
                      type="username"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      id="friendusername"
                      maxLength="20"
                      required
                    />
                  </div>

                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => CheckFriendUsername()}
                  >
                    SEND FRIEND REQUEST
                  </button>
                </div>
              </div>

              <div id="myModal2" class="modal2">
                <div class="modal-content2">
                  <div id="fb">
                    
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
