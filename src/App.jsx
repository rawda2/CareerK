import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

// Layout Components
import Layout from './components/LayOuts/LayOut';
import CompanyL from './components/LayOuts/CompanyL'
// Common Components
import Splash from './components/Splash/Splash';
import LogInForm from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import SignUpForm from './components/SignUpForm/SignUpForm';
import Reset from './components/ResetPass/Reset';
import OTP from './components/OTP/OTP';
import New from './components/NewPass/New';
import ContinueAs from './components/ContinueAs/ContinueAs';
// User Components
import Home from './components/Home/Home';
import Courses from './components/Courses/Courses';
import CourseDetails from './components/CourseDetails/CourseDetails';
import RoadMaps from './components/RoadMaps/RoadMaps';
import CheckOut from './components/checkOut/CheckOut';
import Done from './components/checkOut/done';
import Comm from './components/community/Comm';
import Chat from './components/Chat/Chat';
import Certificate from './components/Certificate/Certificate';
import Done2 from './components/Certificate/Done2';
import ProfilePage from './components/ProfilePage/ProfilePage';
import Profile from './components/Profile/Profile';
import Cv from './components/Cv/Cv';
import Jops from './components/Jops/Jops';
import Application from './components/Application/Application';
import Data from './components/Jops/Data/Data';
 // Company Components
import Chome from './components/Copmany/Chome/Chome';
import CsignUp from './components/CsignUp/CsignUp';
import CProfile from './components/Copmany/CProfile/CProfile';
//Customer
import CustSign from './components/CusSign/CustSign';
import ProtectedRoute from './components/ProtectedRoute';
import Settings from './components/Copmany/Settings/Settings';
import PostJop from './components/Copmany/PostJop/PostJop';
import Done3 from './components/Copmany/PostJop/Done3';
import PostedJobs from './components/Copmany/PostedJobs/PostedJobs';
import Notifi from './components/Copmany/Notifi/Notifi';
import Bot from './components/ChatBot/ChatBot';
import CustomerL from './components/LayOuts/CustomerL';
import CustHome from './components/Customer/CusHome/CustHome';
import Task from './components/Customer/Task/Task';
import Details from './components/Customer/Details/Details';
import Applicant from './components/Customer/Applicant/Applicant';

//



const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element:<Layout/>,
    children: [
      { index: true, element: <Splash /> },
      { path: 'login', element: <LogInForm /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'signupForm', element: <SignUpForm /> },
      { path: 'reset', element: <Reset /> },
      { path: 'otp', element: <OTP /> },
      { path: 'new', element: <New /> },
      { path: 'continue', element: <ContinueAs /> },
      { path: 'csignUp', element: <CsignUp /> },
      { path: 'custsignUp', element: <CustSign /> },
    ],
  },

  // User Routes
  {
    element: <ProtectedRoute allowedRoles={[ 'developer']} />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: 'home', element: <Home /> },
          { path: 'courses', element: <Courses /> },
          { path: 'course/:id', element: <CourseDetails /> },
          { path: 'checkout/:id', element: <CheckOut /> },
          { path: 'done', element: <Done /> },
          { path: 'roadmaps', element: <RoadMaps /> },
          { path: 'comm', element: <Comm /> },
          { path: 'chat/:id', element: <Chat /> },
          { path: 'certificate', element: <Certificate /> },
          { path: 'done2', element: <Done2 /> },
          { path: 'profile', element: <Profile /> },
          { path: 'editProfile', element: <ProfilePage /> },
          { path: 'cv', element: <Cv /> },
          { path: 'jops', element: <Jops /> },
          { path: 'fill/:id', element: <Application /> },
          { path: 'data', element: <Data /> },
          { path: 'bot', element: <Bot /> },
          { path: 'notifi', element: <Notifi /> },



        ],
      },
    ],
  },

  // Company Routes
  {
    element: <ProtectedRoute allowedRoles={['company']} />, // Add this line
    children: [
      {
        element: <CompanyL />,
        children: [
          { path: 'Chome', element: <CProfile /> },
          { path: 'Cprofile', element: <CProfile /> },
          { path: 'Csettings', element: <Settings /> },
          { path: 'postJob', element: <PostJop /> },
          { path: 'done3', element: <Done3 /> },
          { path: 'postedJobs', element: <PostedJobs /> },
          { path: 'notifi', element: <Notifi /> },
          { path: 'bot', element: <Bot /> },
          { path: 'Cnotifi', element: <Notifi /> },

        ],
      },
    ],
  },
 {
    element: <ProtectedRoute allowedRoles={[ 'customer']} />,
    children: [
      {
        element: <CustomerL />,
        children: [
          { path: 'Cuhome', element: <CustHome /> },
          { path: 'createTask', element: <Task /> },
          { path: 'details/:id', element: <Details/> },
          { path: 'applicant', element: <Applicant/> },



        ],
      },
    ],
  },
]);


function App() {
  

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      
     

    </>
  )
}

export default App
