import { networkType, myStxAddress, userSession } from "./auth";
import {
  callReadOnlyFunction,
  cvToJSON,
  standardPrincipalCV,
  uintCV,
  stringAsciiCV,
  bufferCV,
  responseErrorCV,
  responseOkCV,
  trueCV,
  falseCV,
} from "@stacks/transactions";

import { openContractCall } from "@stacks/connect";

let currentuser = "none";
const MyContractName = "BIT-MESSENGER";

export default async function appCallReadOnlyFunction(optionsProps) {
  if (!optionsProps)
    return new Promise((resolve, reject) => reject("no arguments provided"));

  const options = {
    ...optionsProps,
    network: networkType(),
    senderAddress: myStxAddress(),
  };

  return callReadOnlyFunction(options)
    .then((response) => {
      const responseJson = cvToJSON(response);

      return new Promise((resolve, reject) => resolve(responseJson));
    })
    .catch((e) => {
      return new Promise((resolve, reject) => reject(e));
    });
}

export async function CheckNewUser() {
  appCallReadOnlyFunction({
    contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
    contractName: MyContractName,
    functionName: "is-new-user",
    functionArgs: [
      // enter all your function arguments here but cast them to CV first
      standardPrincipalCV(myStxAddress()),
    ],
  })
    .then((value) => {
      const isNewUser = value.value;

      if (isNewUser) {
        window.location.assign("/profile");
      }
      if (!isNewUser) {
        window.location.assign("/landing");
      }
    })
    .catch((e) => {
      alert(e.message);
    });
}

export async function Signout() {
  userSession.signUserOut();
  window.location.assign("/index");
}

const StoreNewUser = (username) => {
  const functionArgs = [
    standardPrincipalCV(myStxAddress()),
    stringAsciiCV(username),
  ];

  const options = {
    contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
    contractName: MyContractName,
    functionName: "add-new-username",
    functionArgs,
    network: networkType(),
    appDetails: {
      name: "BitMessenger",
      icon: window.location.origin + "/img/Logo.svg",
    },
    onFinish: (data) => {
      alert("Adding Username, Please try again in a few minutes");
      window.location.assign("/index");
    },
  };

  openContractCall(options);
};

export function CheckNewUsername() {
  const username = document.getElementById("username").value;

  if (username == "") {
    alert("Please enter a username to continue");
    return;
  }

  appCallReadOnlyFunction({
    contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
    contractName: MyContractName,
    functionName: "check-username",
    functionArgs: [
      // enter all your function arguments here but cast them to CV first
      stringAsciiCV(username),
    ],
  })
    .then((value) => {
      const isNewUsername = value.value;

      if (isNewUsername) {
        StoreNewUser(username);
      } else {
        alert("Username Taken! Choose a different username");
      }
    })
    .catch((e) => {
      alert(e.message);
    });
}

const SendFriendRequest = (friendname) => {
  const functionArgs = [stringAsciiCV(currentuser), stringAsciiCV(friendname)];

  const options = {
    contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
    contractName: MyContractName,
    functionName: "send-friend-request",
    functionArgs,
    network: networkType(),
    appDetails: {
      name: "BitMessenger",
      icon: window.location.origin + "/img/Logo.svg",
    },
    onFinish: (data) => {
      const Success = data.value.value;

      if (Success) {
        alert("Friend Request Sent!");
      } else {
        alert("Error in Sending Friend Request!");
      }
    },
  };

  openContractCall(options);
};

export function CheckFriendUsername() {
  const friendname = document.getElementById("friendusername").value;

  if (friendname == "" || friendname == currentuser) {
    alert("Please enter a valid username to continue");
    return;
  }

  appCallReadOnlyFunction({
    contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
    contractName: MyContractName,
    functionName: "check-username",
    functionArgs: [
      // enter all your function arguments here but cast them to CV first
      stringAsciiCV(friendname),
    ],
  })
    .then((value) => {
      const isUser = value.value;

      if (!isUser) {
        SendFriendRequest(friendname);
      } else {
        alert("Username Not Found");
      }
    })
    .catch((e) => {
      alert(e.message);
    });
}

async function getsentmessages(you, friend, sentMessages) {
  appCallReadOnlyFunction({
    contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
    contractName: MyContractName,
    functionName: "get-messages",
    functionArgs: [
      // enter all your function arguments here but cast them to CV first
      stringAsciiCV(you),
      stringAsciiCV(friend),
    ],
  })
    .then((value) => {
      let ClarityObject = value.value;

      for (let i = 0; i < ClarityObject.length; i++) {
        let message = String(ClarityObject[i].value);

        if (message != "") {
          message = message + "s";
          sentMessages.push(message);
        }
      }
    })
    .catch((e) => {
      alert(e.message);
    });
}

async function getrecievedmessages(friend, you, recievedMessages) {
  appCallReadOnlyFunction({
    contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
    contractName: MyContractName,
    functionName: "get-messages",
    functionArgs: [
      // enter all your function arguments here but cast them to CV first
      stringAsciiCV(friend),
      stringAsciiCV(you),
    ],
  })
    .then((value) => {
      let ClarityObject = value.value;

      for (let i = 0; i < ClarityObject.length; i++) {
        let message = String(ClarityObject[i].value);

        if (message != "") {
          message = message + "r";
          recievedMessages.push(message);
        }
      }
    })
    .catch((e) => {
      alert(e.message);
    });
}

async function getrequestslist(requestlist) {
  appCallReadOnlyFunction({
    contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
    contractName: MyContractName,
    functionName: "get-pending-friend-requests",
    functionArgs: [
      // enter all your function arguments here but cast them to CV first
      stringAsciiCV(currentuser),
    ],
  })
    .then((value) => {
      let ClarityObject = value.value;

      for (let i = 0; i < ClarityObject.length; i++) {
        let request = String(ClarityObject[i].value);

        if (request != "") {
          requestlist.push(request);
        }
      }
    })
    .catch((e) => {
      alert(e.message);
    });
}

const SendMessageCall = (friendname, Message) => {
  const functionArgs = [
    stringAsciiCV(currentuser),
    stringAsciiCV(friendname),
    stringAsciiCV(Message),
  ];

  const options = {
    contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
    contractName: MyContractName,
    functionName: "send-message",
    functionArgs,
    network: networkType(),
    appDetails: {
      name: "BitMessenger",
      icon: window.location.origin + "/img/Logo.svg",
    },
    onFinish: (data) => {
      const Success = data.value.value;

      if (Success) {
        let selectedfriend = document.getElementById("friendname");
        showconversation;
      } else {
        alert("Error in Sending Message!");
      }
    },
  };

  openContractCall(options);
};

const AcceptFriendRequestCall = (sender) => {
  const functionArgs = [stringAsciiCV(sender), stringAsciiCV(currentuser)];

  const options = {
    contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
    contractName: MyContractName,
    functionName: "accept-friend-request",
    functionArgs,
    network: networkType(),
    appDetails: {
      name: "BitMessenger",
      icon: window.location.origin + "/img/Logo.svg",
    },
    onFinish: (data) => {
      const Success = data.value;

      alert("Friend Request Accepted!");
      window.location.reload();
    },
  };

  openContractCall(options);
};

const RejectFriendRequestCall = (sender) => {
  const functionArgs = [stringAsciiCV(sender), stringAsciiCV(currentuser)];

  const options = {
    contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
    contractName: MyContractName,
    functionName: "reject-friend-request",
    functionArgs,
    network: networkType(),
    appDetails: {
      name: "BitMessenger",
      icon: window.location.origin + "/img/Logo.svg",
    },
    onFinish: (data) => {
      const Success = data.value;

      alert("Friend Request Rejected!");
      window.location.reload();
    },
  };

  openContractCall(options);
};

export function SendMessage() {
  let Message = document.getElementById("msg").value;
  document.getElementById("msg").value = "";
  let selectedfriend = document.getElementById("friendname");

  if (Message == "" || Message.length == 0) {
    alert("Please enter a valid Message to continue");
    return;
  }
  Message = Message + new Date().toISOString();
  SendMessageCall(selectedfriend.innerHTML, Message);
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function showconversation() {
  let selectedfriend = document.getElementById("friendname");

  let userchatlist = document.getElementById("chat");

  let removeOption = document.getElementById("rmvFrnd");

  let msgcontainer = document.getElementById("msg-container");

  msgcontainer.style.display = "block";

  removeOption.style.display = "block";

  while (userchatlist.childNodes.length > 0) {
    userchatlist.removeChild(userchatlist.childNodes[0]);
  }

  selectedfriend.innerHTML = this.id;

  let friendname = selectedfriend.innerHTML;

  let recievedMessages = [];

  let sentMessages = [];

  getrecievedmessages(friendname, currentuser, recievedMessages);

  getsentmessages(currentuser, friendname, sentMessages);

  await sleep(4000);

  let Messages = recievedMessages.concat(sentMessages);

  Messages.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return (
      new Date(b.substring(b.length - 25, b.length-1)) -
      new Date(a.substring(a.length - 25, a.length-1))
    );
  });

  for (let i = 0; i < Messages.length; i++) {
    let listitem = document.createElement("li");
    if (Messages[i][Messages[i].length - 1] == "r") {
      listitem.className = "you";
    } else {
      listitem.className = "me";
    }
    let div = document.createElement("div");
    div.className = "entete";
    let header = document.createElement("h2");
    if (Messages[i][Messages[i].length - 25] == "r") {
      header.innerText = friendname;
    } else {
      header.innerText = currentuser;
    }
    let div2 = document.createElement("div");
    div2.className = "message";
    div2.innerHTML = Messages[i].substring(0, Messages[i].length - 25);
    div.appendChild(header);
    listitem.appendChild(div);
    listitem.appendChild(div2);
    userchatlist.appendChild(listitem);
  }
}

export function AddFriend() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function acceptRequest() {
  let sender = this.id;

  AcceptFriendRequestCall(sender);
}

function rejectRequest() {
  let sender = this.id;

  RejectFriendRequestCall(sender);
}

export async function GetFriendRequests() {
 
  var modal = document.getElementById("myModal2");
  modal.style.display = "block";

  let top = document.getElementById("fb");

  while (top.childNodes.length > 0) {
    top.removeChild(top.childNodes[0]);
  }

  let requestlist = [];

  getrequestslist(requestlist);

  await sleep(3000);

  for (let i = 0; i < requestlist.length; i++) {
    let para = document.createElement("p");
    para.className = "info";
    let body = document.createElement("b");
    body.innerHTML = requestlist[i];

    para.appendChild(body);

    let buttonblock = document.createElement("div");
    buttonblock.className = "button-block";

    let confirm = document.createElement("button");
    confirm.className = "confirm";
    confirm.type = "button";
    confirm.innerHTML = "Confirm";
    confirm.id = requestlist[i];
    confirm.onclick = acceptRequest;

    let remove = document.createElement("button");
    remove.className = "delete";
    remove.type = "button";
    remove.innerHTML = "Delete Request";
    remove.id = requestlist[i];
    remove.onclick = rejectRequest;

    buttonblock.appendChild(confirm);
    buttonblock.appendChild(remove);

    top.appendChild(para);
    top.appendChild(buttonblock);
  }
}

const RemoveFriendCall = (friendname) => {
  const functionArgs = [stringAsciiCV(currentuser), stringAsciiCV(friendname)];

  const options = {
    contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
    contractName: MyContractName,
    functionName: "remove-friend",
    functionArgs,
    network: networkType(),
    appDetails: {
      name: "BitMessenger",
      icon: window.location.origin + "/img/Logo.svg",
    },
    onFinish: (data) => {
      const Success = data.value;
      alert("Friend Removed!");
    },
  };

  openContractCall(options);
};

export function RemoveFriend() {
  let selectedfriend = document.getElementById("friendname").innerHTML;
  RemoveFriendCall(selectedfriend);
}

export async function getusername() {
  appCallReadOnlyFunction({
    contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
    contractName: MyContractName,
    functionName: "get-username",
    functionArgs: [
      // enter all your function arguments here but cast them to CV first
      standardPrincipalCV(myStxAddress()),
    ],
  })
    .then((value) => {
      let username = value.value;
      currentuser = String(username.value);
    })
    .catch((e) => {
      alert(e.message);
      window.location.assign("/index");
    });
}

export async function getfriendslist() {
  
  getusername();

  while (currentuser == "none") {
    await sleep(100);
  }

  appCallReadOnlyFunction({
    contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
    contractName: MyContractName,
    functionName: "get-friends-list",
    functionArgs: [
      // enter all your function arguments here but cast them to CV first
      stringAsciiCV(currentuser),
    ],
  })
    .then((value) => {
      let ClarityObject = value.value;
      let friendslist = [];

      for (let i = 0; i < ClarityObject.length; i++) {
        
        let friendname = String(ClarityObject[i].value);
        if (friendname != "") {
          friendslist.push(friendname);
        }
      }

      // Bind Friends List
      let userlist = document.getElementById("friends-list");

      while (userlist.childNodes.length > 0) {
        userlist.removeChild(userlist.childNodes[0]);
      }

      for (let i = 0; i < friendslist.length; i++) {
        let listitem = document.createElement("li");
        let div = document.createElement("div");
        let header = document.createElement("h2");
        header.innerText = friendslist[i];
        listitem.id = friendslist[i];
        listitem.onclick = showconversation;
        div.appendChild(header);
        listitem.appendChild(div);
        userlist.appendChild(listitem);
      }
    })
    .catch((e) => {
      alert(e.message);
      window.location.assign("/index");
    });
}
