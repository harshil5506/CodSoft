import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container-custom py-24 flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md border border-border p-8 bg-card">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold uppercase tracking-tighter mb-2">
            Reset Password
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your email address and we'll send you a recovery link.
          </p>
        </div>

        {submitted ? (
          <div className="bg-muted border border-border p-6 text-center rounded-md">
            <h3 className="text-xl font-display font-bold mb-2">Check Your Inbox</h3>
            <p className="text-muted-foreground text-sm mb-4">
              An email containing a reset link has been dispatched to {email}.
            </p>
            <Link to="/login" className="btn btn-primary">Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2">Email Address</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary py-4 uppercase font-bold tracking-widest"
            >
              Send Recovery Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
