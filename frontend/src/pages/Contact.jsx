import React, { useState } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container-custom py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground">
            Drop us a message below or email us at support@hyperfit.co. We'll get back to you within 24 hours.
          </p>
        </div>

        {submitted ? (
          <div className="bg-muted border border-border p-8 text-center rounded-lg">
            <h3 className="text-2xl font-display font-bold mb-2">Message Sent!</h3>
            <p className="text-muted-foreground mb-4">Thank you for reaching out. A support team representative will contact you shortly.</p>
            <button onClick={() => setSubmitted(false)} className="btn btn-primary">Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold mb-2">Name</label>
                <input required type="text" placeholder="Enter your name" className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold mb-2">Email</label>
                <input required type="email" placeholder="Enter your email" className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2">Subject</label>
              <input required type="text" placeholder="Query subject" className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2">Message</label>
              <textarea required rows="6" placeholder="Write your message here..." className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary resize-none"></textarea>
            </div>

            <button type="submit" className="w-full btn btn-primary py-4 uppercase font-bold tracking-widest">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
