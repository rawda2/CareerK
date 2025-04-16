import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'


import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import LayOut from './components/LayOut/LayOut'
import SignUp from './components/SignUp/SignUp'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm';
import LogInForm from './components/Login/Login'
import Reset from './components/ResetPass/Reset'
import OTP from './components/OTP/OTP'
import New from './components/NewPass/New';
import Home from './components/Home/Home'
import Splash from './components/Splash/Splash'
import UserList from './components/Users/Users'
import Jops from './components/Jops/Jops'
import Application from './components/Application/Application'
import Courses from './components/Courses/Courses'
import Data from './components/Jops/Data/Data'
import CourseDetails from './components/CourseDetails/CourseDetails'
import RoadMaps from './components/RoadMaps/RoadMaps'
import CheckOut from './components/checkOut/CheckOut'
import Done from './components/checkOut/done'
import Comm from './components/community/Comm'
import Chat from './components/Chat/Chat'
import Certificate from './components/Certificate/Certificate'
import Done2 from './components/Certificate/Done2';
import ContinueAs from './components/ContinueAs/ContinueAs'
import ProfilePage from './components/ProfilePage/ProfilePage'
import Profile from './components/Profile/Profile'
import Cv from './components/Cv/Cv'



let routers=createBrowserRouter([
  {path:'',element:<LayOut/>,children:[
    {index:true,element:<Splash/>},
    {index:'splash',element:<Splash/>},
    {path:'login',element:<LogInForm/>},
    {path:'home',element:<Home/>},
    {path:'navbar',element:<NavBar/>},
    {path:'signup',element:<SignUp/>},
    {path:'signupForm',element:<SignUpForm/>},
    {path:'reset',element:<Reset/>},
    {path:'otp',element:<OTP/>},
    {path:"new",element:<New/>},
    {path:"users",element:<UserList/>},
    {path:"jops",element:<Jops/>},
    {path:"fill",element:<Application/>},
    {path:"courses",element:<Courses/>},
    {path:"data",element:<Data/>},
    {path:"course/:id", element: <CourseDetails /> },
    {path:"checkout/:id", element: <CheckOut /> },
    {path:"done",element:<Done/>},
    {path:"roadmaps",element:<RoadMaps/>},
    {path:"comm",element:<Comm/>},
    {path:"chat",element:<Chat/>},
    {path:"certificate",element:<Certificate/>},
    {path:"done",element:<Done/>},
    {path:"done2",element:<Done2/>},
    {path:"new",element:<New/>},
    {path:"continue",element:<ContinueAs/>},
    {path:"editProfile",element:<ProfilePage/>},
    {path:"profile",element:<Profile/>},
    {path:"Cv",element:<Cv/>},

  ]}
])

function App() {
  

  return (
    <>
      <RouterProvider router={routers}></RouterProvider>

     

    </>
  )
}

export default App
