import {
  collection,
  docs,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { firebaseDB } from "./services/FirebaseService";
import axios from "axios";

class CustomUserPaginatedQuery {
  constructor() {
    // Required public property to determine if more data is available.
    this.hasNext = false;
  }

  // Required public property.
  next(callback) {
    // Make async call and get list of users
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
        console.log(
          "here",
          docSnap.docs.map((doc) => doc.data())
        );
        const contactsList = docSnap.docs.map((doc) => ({
          nickname: `${doc.data().firstName} ${doc.data().lastName}`,
          user_id: doc.data().mobile,
          profile_url: doc.data().profilePictureUrl,
        }));

        console.log("contactsList", contactsList);

        // Set this.hasNext
        this.hasNext = false;
        callback(contactsList, false);
      } catch (error) {
        console.log("here error", error);
      }
    };

    callApi();
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => new CustomUserPaginatedQuery();
