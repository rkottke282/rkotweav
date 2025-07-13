import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Splash from "./splash";
import PropBets from "./propbets/main";
import ShoeBoxBets from "./shoeboxbets/main"
import Shareable from "./shareable/main";
import List from "./shareable/list";
import Note from "./shareable/note";
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
              <Route path="/shareables" element={<Shareable />} />
              <Route path="/shareables/list/:suffix" element={<List />} />
              <Route path="/shareables/note/:suffix" element={<Note />} />
            </Routes>
          </Router>
          <Footer/>
    </GoogleOAuthProvider>

    </WithProfileContext>
      </WithUserContext>
  );
};

export default App;