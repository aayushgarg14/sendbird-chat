import "./App.css";
import { useEffect, useRef, useState } from "react";
import {
  App as SendBirdApp,
  Channel,
  ChannelList,
  SendBirdProvider,
} from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import ContactsList from "./ContactsList";
import {
  collection,
  docs,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { firebaseDB } from "./services/FirebaseService";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import ChatScreen from "./Chat";

function App() {
  const countRef = useRef(0);
  const [channelUrl, setChannelUrl] = useState("");
  const [contactUsers, setContactUsers] = useState([]);
  const [contact, setContact] = useState(null);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const callApi = async () => {
      const firebaseRef = query(
        collection(
          firebaseDB,
          "usersContacts",
          "2gyQ7XUMuxZx3OCoqmivOdjLMFK2",
          "2gyQ7XUMuxZx3OCoqmivOdjLMFK2"
        ),
        where("status", "==", "CONFIRMED_VIA_SMS"),
        limit(50)
      );
      try {
        const docSnap = await getDocs(firebaseRef);
        const contactsList = docSnap.docs.map((doc) => {
          return {
            nickname: `${doc.data().firstName} ${doc.data().lastName}`,
            user_id: doc.data().mobileNumber,
            profile_url: doc.data().profilePictureUrl,
          };
        });
        setContactUsers(contactsList);
      } catch (error) {
        console.log("here error", error);
      }
    };

    callApi();
  }, []);

  // useEffect(() => {
  //   if (contactUsers.length) {
  //     const intervalVal = setInterval(() => {
  //       setContact(contactUsers[countRef.current]);
  //       if (countRef.current === contactUsers.length - 1) {
  //         return clearInterval(intervalVal);
  //       }
  //       countRef.current += 1;
  //     }, [1000]);
  //   }
  // }, [contactUsers]);

  console.log("contactUsersm", contactUsers);
  return (
    <Switch>
      <Route path="/" exact>
        <Login setUserIdHandler={setUserId} />
      </Route>
      <Route path="/chat" exact>
        <ChatScreen userId={userId} />
      </Route>
    </Switch>
  );
}

export default App;
