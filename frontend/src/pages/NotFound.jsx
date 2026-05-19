import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container-custom py-32 text-center min-h-[70vh] flex flex-col items-center justify-center">
      <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">Error 404</span>
      <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tighter uppercase mb-6 leading-none">
        Lost.
      </h1>
      <p className="text-muted-foreground max-w-md mb-10">
        The page you are looking for does not exist, has been moved, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary px-8 py-4 uppercase font-bold tracking-widest">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
