import { useEffect } from "react";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import Inquiries from "./pages/Inquiries/Inquiries";
import { Crisp } from "crisp-sdk-web";
import Shop from "./pages/Shop/Shop";
import AddProduct from "./pages/Products/Addproduct";
import Profile from "./pages/Profile/Profile";
import Card from "./pages/Card/Card";
import { RentalService } from "./pages/Rentals/RentalService";
import { CarsMain } from "./pages/Rentals/CarsMain";

import { NewVehicleForm } from "./pages/Rentals/NewVehicleForm";
import { VansMain } from "./pages/Rentals/VansMain";
import { JeepsMain } from "./pages/Rentals/JeepsMain";
import { CarsDetails } from "./pages/Rentals/CarsDetails";
import { VansDetails } from "./pages/Rentals/VansDetails";
import { JeepsDetails } from "./pages/Rentals/JeepsDetails";
import { AdminPanel } from "./pages/Admin/Admin";
import { AdminInquiry } from "./pages/Admin/Inquiries/AdminInquiry";
import { VehicleRentalReport } from "./pages/Rentals/JeepsDetails";
import UpdateInquiryForm from "./pages/Inquiries/UpdateInquiryForm";

function App() {
  useEffect(() => {
    Crisp.configure("472b8c52-0771-4647-8563-c4c3ead5b1ce");
    // const [count, setCount] = useState(0);
  });

  return (
    <Router>
      <>
        <Routes>
          <Route exact path="/" Component={Homepage} />
          <Route exact path="/signin" Component={Login} />
          <Route exact path="/signup" Component={Register} />
          <Route exact path="/inquiry" Component={Inquiries} />
          <Route exact path="/inquiry/update" Component={UpdateInquiryForm} />
          <Route exact path="/profile" Component={Profile} />
          <Route exact path="/profile/card" Component={Card} />
          <Route exact path="/profile/card/:cardId" Component={Card} />
          <Route exact path="/shop" Component={Shop} />
          {/* <Route exact path="/addproduct" Component={AddProduct} /> */}

          <Route exact path="/rentalservice" Component={RentalService} />
          <Route exact path="/rentalservice/carsmain" Component={CarsMain} />
          <Route exact path="/newvehicleform" Component={NewVehicleForm} />
          <Route exact path="/rentalservice/vansmain" Component={VansMain} />
          <Route exact path="/rentalservice/jeepsmain" Component={JeepsMain} />
          <Route exact path="/carsdetails" Component={CarsDetails} />
          <Route exact path="/vansdetails" Component={VansDetails} />
          <Route exact path="/jeepsdetails" Component={JeepsDetails} />
<<<<<<< HEAD
          <Route exact path="/vehicleChart" Component={VehicleTypeChart} />

          {/* Admin Panel Routes */}
          {/* <Route
            path="/admin"
            element={
              <>
                <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ECommerce />
              </>
            }
          /> */}
=======
>>>>>>> df20e0b9b978ca3ffba0cfb2f9bd14eaf35b9a59
        </Routes>
      </>
    </Router>
  );
}

export default App;
