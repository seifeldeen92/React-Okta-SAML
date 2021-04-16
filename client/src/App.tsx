import React, { useEffect, useState } from "react";
import logging from "./config/logging";
import axios from "axios";
const App: React.FunctionComponent = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    logging.info("check authentication");

    axios
      .get("http://localhost:5000/me", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.user.nameID) {
          setEmail(res.data.user.nameID);
          setLoading(false);
        } else {
          redirectToLogin();
        }
      })
      .catch((err) => {
        logging.error(err, "saml");
        setLoading(false);
        redirectToLogin();
      });
  }, []);

  const redirectToLogin = () => {
    window.location.replace("http://localhost:5000/login");
  };

  if (loading) return <p>loading...</p>;

  return <p>Woho! you are authenticated via Okta. Your email is ${email}</p>;
};

export default App;
