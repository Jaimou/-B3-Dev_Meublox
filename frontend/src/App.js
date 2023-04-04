import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Contact from './components/Contact/Contact';
import Home from './components/Home/Home';
import Header from './components/Header-Footer/header/Header'
import Footer from './components/Header-Footer/footer/Footer'
import Profil from './components/Profil/Profil';
import Login from './components/Auth/login/Login';


function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element = {<Login />}/>
        <Route path="contact" element={<Contact/>} /> 
        <Route path="profil" element={<Profil/>} /> 
        {/* <Route path="/{category/product}" element={<ProductPage/>} />  */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
