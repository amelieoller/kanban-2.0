import React from "react";
import { GoogleLogin } from "react-google-login";

const responseGoogle = (response, dispatch) => {
  localStorage.setItem("jwtToken", response.tokenId);

  dispatch({
    type: "UPDATE_USER",
    payload: {
      accessToken: response.Zi.access_token,
      expiryDate: response.Zi.expires_at,
      jwt: response.tokenId
    }
  });
};

const responseGoogleFailure = (response, dispatch) => {
  console.log("FAILED: ", response);
  //  dispatch(signUpUserFailure(response.payload));
};

const GoogleAuth = ({ dispatch }) => (
  <GoogleLogin
    clientId="806477119130-9huh8k42odea2eqnu8pmtklk0knvj4qr.apps.googleusercontent.com"
    buttonText="Sign in with Google"
    onSuccess={resp => responseGoogle(resp, dispatch)}
    onFailure={resp => responseGoogleFailure(resp, dispatch)}
    cookiePolicy="single_host_origin"
    scope="profile email https://www.googleapis.com/auth/calendar.readonly"
  />
);

export default GoogleAuth;
