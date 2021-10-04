import React from "react";
import Link from "next/link";

// components

import AuthNavbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import {getusername, getfriendslist, SendMessage, RemoveFriend} from "components/contractcallfunctions";

export default function Landing() {
  
	getfriendslist();
	
	return (
    <>
       <AuthNavbar fixed 
          
        />

<div id="container">
	<aside>
	<header>
		<b>MY FRIENDS</b>
	</header>
		<ul id='friends-list'>
			
		</ul>
	</aside>
	<main>
	<form>
					
                    <button
						id="rmvFrnd"
                      className="float-right bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-4 mt-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => RemoveFriend()}
                    >
                      REMOVE FRIEND
                    </button>
                 
                </form>
		<header>
			<div>
				<h2 id='friendname'></h2>
			</div>
			
		</header>

		
		<ul id="chat">
		</ul>
		<footer id="msg-container">
			<form>
			<textarea id="msg" placeholder="Type your message" maxLength="75"></textarea>
			
			<button type="button"  onClick={() => SendMessage()}
                      
			>Send</button>
			</form>
		</footer>
	</main>
</div>





                 
                  

            
  

      <Footer />
    </>
  );
}
