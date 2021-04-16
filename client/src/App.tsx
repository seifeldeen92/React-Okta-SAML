import React, { useEffect, useState } from "react";
import logging from "./config/logging";
import axios from "axios";

const App: React.FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    logging.info("checking authentication by calling /me");

    axios
      .get("http://localhost:5000/me", {
        withCredentials: true,
      })
      .then((res) => {
        logging.info(res.data.user, "/me");

        /**
         * if user has no nameID it means that he is not authenticated yet!
         * redirect to login for Okta auth
         */
        if (res.data.user.nameID) {
          setEmail(res.data.user.nameID);
          setLoading(false);
        } else {
          redirectToLogin();
        }
      })
      .catch((err) => {
        logging.error(err, "/me");
        redirectToLogin();
      });
  }, []);

  // Redirect to login
  const redirectToLogin = () => {
    window.location.replace("http://localhost:5000/login");
  };

  if (loading) return <p>loading...</p>;
  return <p>Woho! {email} is now authenticated via Okta.</p>;
};

export default App;
