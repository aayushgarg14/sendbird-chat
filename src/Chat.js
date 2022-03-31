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
import { useHistory } from "react-router-dom";

const SENDBIRD_APP_ID = "SEND_BIRD_KEY";

function ChatScreen({ userId }) {
  const history = useHistory();
  const countRef = useRef(0);
  const [channelUrl, setChannelUrl] = useState("");
  const [contactUsers, setContactUsers] = useState([]);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    if (!userId) {
      history.push("/");
    }
  }, [userId, history]);

  useEffect(() => {
    const callApi = async () => {
      // Fetching the collection here. Applied the query as per the request.
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
        //   Getting snapshot and making it in readable format for the users
        const docSnap = await getDocs(firebaseRef);
        const contactsList = docSnap.docs.map((doc) => {
          return {
            nickname: `${doc.data().firstName} ${doc.data().lastName}`,
            user_id: doc.data().mobileNumber,
            profile_url: doc.data().profilePictureUrl,
          };
        });

        // adding it to the state
        setContactUsers(contactsList);
      } catch (error) {
        console.log("here error", error);
      }
    };

    callApi();
  }, []);

  /**
  * This function is used to send contacts to the sendbird dashboard. Since using UIKit, couldn't find any other way.
  Could have acheived with the sendbirk sdk but was not ready with that setup */
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

  return (
    <div className="App">
      {/* This component renders on every update and send contacts to the sendbird dashboard */}
      {/* {contact ? (
        <SendBirdApp
          appId={SENDBIRD_APP_ID}
          userId={contact.user_id}
          nickname={contact.nickname}
          profileUrl={contact.profile_url}
        />
      ) : null} */}
      {contactUsers.length ? (
        <SendBirdApp
          appId={SENDBIRD_APP_ID}
          userId={userId}
          // nickname={contact.nickname}
          // profileUrl={contact.profile_url}
        />
      ) : null}

      {/* <SendBirdProvider
        appId={SENDBIRD_APP_ID} // Specify your Sendbird application ID.
        userId={contactUsers[0].user_id} // Specify your user ID.
        userListQuery={ContactsList}
      >
        <ChannelList
          onChannelSelect={(channel) => {
            setChannelUrl(channel);
          }}
        />
        <Channel channelUrl={channelUrl} />
      </SendBirdProvider> */}
    </div>
  );
}

export default ChatScreen;
