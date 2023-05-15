import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Contact from './components/Contact/Contact';
import Home from './components/Home/Home';
import Header from './components/Header-Footer/header/Header'
import Footer from './components/Header-Footer/footer/Footer'
import Profil from './components/Profil/Profil';
import Login from './components/Auth/login/Login';
import Signin from './components/Auth/signin/Signin';
import ProductPage from './components/ProductPage/ProductPage';
import Products from './components/Products/Products';
import Type from './components/Products/Type';
import Recherche from './components/Recherche/Recherche';
import Panier from './components/Panier/Panier';
import Paiement from './components/Panier/Paiement/Paiement';
import Livraison from './components/Panier/Livraison/Livraison';
import ProfilAdmin from './components/Profil/ProfilAdmin';


function App() {


  
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signin" element = {<Signin/>}/>
        <Route path="contact" element={<Contact/>} /> 
        <Route path="profile" element={<Profil/>} />
        <Route path="profile/administation" element={<ProfilAdmin/>} /> 
        <Route path="products" element={<Products/>}/>
        <Route path="products/category/:type" element={<Type/>}/>
        <Route path="products/:productId" element={<ProductPage/>}/>
        <Route path="/products/search/:research" element={<Recherche/>} />
        <Route path="/panier" element={<Panier/>} />
        <Route path="/livraison" element={<Livraison/>} />
        <Route path="/paiement" element={<Paiement/>} />


      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
