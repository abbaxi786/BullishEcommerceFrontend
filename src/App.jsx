import { Routes, Route } from 'react-router-dom'
import Nav from './components/nav'
import Home from './pages/home'
import Contact from './pages/contact'
import Footer from './components/footer'
import CategoryPage from './pages/categorypage'
import ViewProduct from './pages/product'
import CheckOutForm from './pages/checkoutform'
import SignIn from './pages/signIn'
import LogIn from './pages/logIn'
import Profile from './pages/profile'
import MainPanel from './admin/mainpanel'
import GlobalToast from './components/globalToast'
import OrderView from './admin/orderView'
import EditProduct from './admin/adminComponents/productEdit'
import Search from './pages/search'
import OrderPage from './components/orderPage'
import UserOrderPage from './admin/userOrderView'
import Setting from './pages/setting'
import ForgottenEmail from './pages/forgottenPassword/email'
import ResetPasswordPage from './pages/forgottenPassword/reset'
import FeaturedDeals from './pages/features'
import AboutUs from './pages/about'
import BlogPage from './pages/blog'
import { BlogContentPage } from './pages/blogcontent'
import RandomProductsPage from './pages/mencollection'


function App() {

  return (
    <>
        <Nav />
        <GlobalToast />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/category/:id' element={<CategoryPage />} />
          <Route path='/product/:id/:discount?' element={<ViewProduct />} />
          <Route path='/checkout' element={<CheckOutForm />} />
          <Route path='/signup' element={<SignIn />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/adminpanel' element={<MainPanel />} />
          <Route path='/vieworder' element={<OrderView />} />
          <Route path='/editproduct/:id' element={<EditProduct/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path='/orderpage' element={<OrderPage/>}/>
          <Route path='/viewuserorder/:userId' element={<UserOrderPage/>}/>
          <Route path='/setting' element={<Setting/>}/>
          <Route path='/forgotpassword' element={<ForgottenEmail/>}/>
          <Route path='/resetpassword/:token' element={<ResetPasswordPage/>}/>
          <Route path='/category/featured' element={<FeaturedDeals/>}/>
          <Route path='/about' element={<AboutUs/>}/>
          <Route path='/blog' element={<BlogPage/>}/>
          <Route path='/blogcontent' element={<BlogContentPage/>}/>          
          <Route path='/mencollection' element={<RandomProductsPage/>}/>          
        </Routes>
        <Footer />


    </>
  )
}

export default App
