import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("role")?.toLowerCase(); 
  
  console.log("ROLE FROM STORAGE:", userRole); // Debug
  console.log("ALLOWED ROLES:", allowedRoles);
  
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }
  
  // Add role validation
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />; // Or redirect to login
  }
  
  return <Outlet />;
};

export default ProtectedRoute;