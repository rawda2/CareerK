import { Link } from 'react-router-dom';
import logo from './../../assets/logo (2).png'

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
           <DotLottieReact
      src="https://lottie.host/dd648d67-1479-45b4-a4de-f80a83bc85d7/tiGOcAbmCq.lottie"
      loop
      autoplay
    />
          <h1 className="text-6xl font-bold text-text-primary mb-2 i">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary i mb-4">Page Not Found</h2>
        </div>
        
       
      </div>
    </div>
  );
}

export default NotFound;