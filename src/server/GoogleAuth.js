import React from "react";
import { GoogleLogin } from "react-google-login";

const responseGoogle = response => {
  console.log(response);
};

const GoogleAuth = () => (
  <GoogleLogin
    clientId="806477119130-9huh8k42odea2eqnu8pmtklk0knvj4qr.apps.googleusercontent.com"
    buttonText="Sign in with Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy="single_host_origin"
    scope="profile email https://www.googleapis.com/auth/calendar.readonly"
  />
);

export default GoogleAuth;
