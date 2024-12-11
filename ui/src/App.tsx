import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Splash from "./splash";
import PropBets from "./propbets/main";
import ShoeBoxBets from "./shoeboxbets/main"
import { GoogleOAuthProvider } from "@react-oauth/google";
import Footer from "./footer";
import WithUserContext from "./gooogle-auth-login/user-context";
import WithProfileContext from "./gooogle-auth-login/profile-context";

const App = () => {

  return (
    <WithUserContext>
        <WithProfileContext>
    <GoogleOAuthProvider clientId="484680450142-kcatfskg0bfr84cvgkjg3933v4pu96qn.apps.googleusercontent.com">

          <Router>
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/propbets" element={<PropBets />} />
              <Route path="/shoeboxbets" element={<ShoeBoxBets />} />
            </Routes>
          </Router>
          <Footer/>
    </GoogleOAuthProvider>

    </WithProfileContext>
      </WithUserContext>
  );
};

export default App;