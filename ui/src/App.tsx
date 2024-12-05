import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Splash from "./splash";
import PropBets from "./propbets/main";
import ShoeBoxBets from "./shoeboxbets/main"
import { GoogleOAuthProvider, TokenResponse } from "@react-oauth/google";
import Footer from "./footer";
import { useState } from "react";

declare type GoogleUserInfo = {
  picture: any,
  name: string,
  email: string
}  

const App = () => {
  const [ user, setUser ] = useState<TokenResponse | null>();
  const [ profile, setProfile ] = useState<GoogleUserInfo | null>();

  return (
    <GoogleOAuthProvider clientId="484680450142-kcatfskg0bfr84cvgkjg3933v4pu96qn.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/propbets" element={<PropBets />} />
          <Route path="/shoeboxbets" element={<ShoeBoxBets />} />
        </Routes>
      </Router>
      <Footer
        user={user}
        setUser={setUser}
        profile={profile}
        setProfile={setProfile} />
    </GoogleOAuthProvider>
  );
};

export default App;