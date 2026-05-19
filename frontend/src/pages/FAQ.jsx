import React, { useState } from 'react';

const FAQ = () => {
  const faqs = [
    {
      q: 'How long does shipping take?',
      a: 'Orders are processed within 1-2 business days. Express shipping takes 2-4 business days, while standard shipping takes 5-7 business days depending on your location.'
    },
    {
      q: 'What is your return policy?',
      a: 'We offer a 30-day hassle-free return policy on all unworn apparel with original tags attached, and unopened supplement tubs. Return shipping is free.'
    },
    {
      q: 'Are your supplements third-party tested?',
      a: 'Yes, all HYPERFIT sports nutrition products are third-party lab tested for purity, heavy metals, and banned substances. We publish our lab certificates on our product pages.'
    },
    {
      q: 'Can I change or cancel my order?',
      a: 'Orders are processed instantly. Please contact us via email within 30 minutes of placing the order if you need to modify shipping addresses or cancel.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container-custom py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter mb-10 text-center">
          FAQ
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border">
              <button 
                onClick={() => toggle(index)}
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
              >
                <span className="font-bold text-lg">{faq.q}</span>
                <span className="text-xl font-medium">{openIndex === index ? '−' : '+'}</span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
