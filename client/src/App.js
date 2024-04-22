import { useState, useEffect } from "react";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import Inquiries from "./pages/Inquiries/Inquiries";
import { Crisp } from "crisp-sdk-web";
import Product from "./pages/Products/product";
import Shop from "./pages/Shop/Shop";
import Profile from "./pages/Profile/Profile";

function App() {
  useEffect(() => {
    Crisp.configure("472b8c52-0771-4647-8563-c4c3ead5b1ce");
  }, []);
  const [count, setCount] = useState(0);

  return (
    <Router>
      <>
        <Routes>
          <Route exact path="/" Component={Homepage} />
          <Route exact path="/signin" Component={Login} />
          <Route exact path="/signup" Component={Register} />
          <Route exact path="/inquiry" Component={Inquiries} />
          <Route exact path="/product" Component={Product} />
          <Route exact path="/profile" Component={Profile} />
          <Route exact path="/shop" Component={Shop} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
