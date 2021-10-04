
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { Storage } from '@stacks/storage';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import {CheckNewUser} from "components/contractcallfunctions";

const appConfig = new AppConfig(['store_write', 'publish_data']);

// Set this to true if you want to use Mainnet
const boolNetworkType = false; 

export const userSession = new UserSession({ appConfig });
export const storage = new Storage({ userSession });

export function networkType() {
  if(boolNetworkType)
    return new StacksMainnet();
  else 
    return new StacksTestnet();
}

export function myStxAddress() {
  if(boolNetworkType)
    return getUserData().profile.stxAddress.mainnet;
  else 
    return getUserData().profile.stxAddress.testnet;
}

export function authenticate() {
  showConnect({
    appDetails: {
      name: 'BitMessenger',
      icon: window.location.origin + '/img/Logo.svg',
    },
    redirectTo: '/',
    onFinish: () => {
      // Get Access rights from smart contract

      // Reload Window
        CheckNewUser();
      
    },
    userSession: userSession,
  });
}

export function getUserData() {
  return userSession.loadUserData();
}