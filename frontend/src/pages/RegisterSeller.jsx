import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerSeller } from '../store/slices/authSlice';

const RegisterSeller = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    companyName: '',
    taxId: '',
    phone: '',
    address: '',
  });

  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.taxId || !formData.phone || !formData.address) {
      return;
    }
    const result = await dispatch(registerSeller(formData));
    if (!result.error) {
      setSuccessMsg('Application submitted successfully! Your account status is now pending admin approval.');
    }
  };

  if (user?.role === 'seller' && user?.sellerStatus === 'pending') {
    return (
      <div className="container-custom py-8 sm:py-12 md:py-24 text-center max-w-lg">
        <div className="bg-card border border-border p-4 sm:p-6 md:p-8 rounded-lg shadow-xl space-y-4 sm:space-y-6">
          <div className="mx-auto w-12 sm:w-16 h-12 sm:h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight">Application Pending</h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Your application for <strong>{user?.businessDetails?.companyName || 'your company'}</strong> is currently under review by our admin team. We will notify you once approved.
          </p>
          <Link to="/dashboard" className="btn btn-outline w-full py-3 block uppercase font-bold tracking-wider text-xs sm:text-sm">
            Go to Profile
          </Link>
        </div>
      </div>
    );
  }

  if (user?.role === 'seller' && user?.sellerStatus === 'approved') {
    return (
      <div className="container-custom py-8 sm:py-12 md:py-24 text-center max-w-lg">
        <div className="bg-card border border-border p-4 sm:p-6 md:p-8 rounded-lg shadow-xl space-y-4 sm:space-y-6">
          <div className="mx-auto w-12 sm:w-16 h-12 sm:h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight">Approved Seller</h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Your application is approved! You can now manage your store products and view sales.
          </p>
          <Link to="/admin" className="btn btn-primary w-full py-3 block uppercase font-bold tracking-wider text-xs sm:text-sm">
            Go to Seller Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 sm:py-10 md:py-12 max-w-xl">
      <div className="bg-card border border-border p-4 sm:p-6 md:p-8 rounded-lg shadow-xl space-y-5 sm:space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter">Become a Seller</h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Apply to sell healthcare and fitness products on HYPERFIT.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-sm p-4 rounded-md">
            {error}
          </div>
        )}

        {successMsg ? (
          <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-6 rounded-md space-y-4 text-center">
            <p className="font-semibold">{successMsg}</p>
            <Link to="/dashboard" className="btn btn-primary px-4 sm:px-6 py-2 uppercase font-bold inline-block text-xs sm:text-sm">
              Back to Dashboard
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="companyName" className="text-xs sm:text-sm font-bold uppercase tracking-wider">Company Name</label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. MuscleTech India"
                className="w-full bg-background border border-border px-3 sm:px-4 py-2.5 sm:py-3 rounded-md focus:border-primary focus:outline-none text-sm transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="taxId" className="text-xs sm:text-sm font-bold uppercase tracking-wider">Business ID / GSTIN / Tax ID</label>
              <input
                id="taxId"
                name="taxId"
                type="text"
                required
                value={formData.taxId}
                onChange={handleChange}
                placeholder="e.g. 27AAAAA1111A1Z1"
                className="w-full bg-background border border-border px-3 sm:px-4 py-2.5 sm:py-3 rounded-md focus:border-primary focus:outline-none text-sm transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-xs sm:text-sm font-bold uppercase tracking-wider">Business Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                className="w-full bg-background border border-border px-3 sm:px-4 py-2.5 sm:py-3 rounded-md focus:border-primary focus:outline-none text-sm transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="text-xs sm:text-sm font-bold uppercase tracking-wider">Corporate Address</label>
              <textarea
                id="address"
                name="address"
                required
                rows="3"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. 101, Fitness Tower, Mumbai, India"
                className="w-full bg-background border border-border px-3 sm:px-4 py-2.5 sm:py-3 rounded-md focus:border-primary focus:outline-none text-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-3 sm:py-4 uppercase font-bold tracking-widest text-center block mt-6 text-xs sm:text-sm"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterSeller;
