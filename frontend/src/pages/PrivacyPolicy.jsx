import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="container-custom py-6 sm:py-8 md:py-12 px-4 sm:px-6 min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 sm:mb-10 md:mb-12 border-b border-border pb-3 sm:pb-4 md:pb-6"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter mb-2 sm:mb-3">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            Last updated: January 2025
          </p>
        </motion.div>

        <motion.div
          className="space-y-4 sm:space-y-5 md:space-y-8 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.15,
              },
            },
          }}
        >
          {[
            {
              title: "1. Introduction",
              content: [
                'HyperFit ("we," "us," "our," or "Company") operates the HyperFit e-commerce platform (the "Service"). This Privacy Policy explains our data handling practices and your privacy rights.',
                "By accessing or using HyperFit, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.",
              ],
            },
            {
              title: "2. Information We Collect",
              subsections: [
                {
                  title: "2.1 Personal Information You Provide",
                  items: [
                    "Account information (name, email, phone number, password)",
                    "Shipping and billing address",
                    "Payment information (processed securely, never stored)",
                    "Product reviews and ratings with uploaded images",
                    "Customer service communications",
                  ],
                },
                {
                  title: "2.2 Automatically Collected Information",
                  items: [
                    "Device information (browser, operating system)",
                    "Usage data (pages visited, time spent, click behavior)",
                    "IP address and location data",
                    "Cookies and similar tracking technologies",
                  ],
                },
              ],
            },
            {
              title: "3. How We Use Your Information",
              items: [
                "Process and fulfill your orders",
                "Send order confirmations and shipping updates",
                "Provide customer support",
                "Improve our website and services",
                "Send promotional emails (with your consent)",
                "Detect and prevent fraud",
                "Comply with legal obligations",
              ],
            },
            {
              title: "4. Data Security",
              content: [
                "We implement industry-standard security measures including SSL encryption, secure authentication (JWT tokens), and secure server infrastructure. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.",
              ],
            },
            {
              title: "5. Cookies",
              content: [
                "We use cookies to enhance your browsing experience, store authentication tokens, and analyze website traffic. You can control cookies through your browser settings, though disabling them may affect functionality.",
              ],
            },
            {
              title: "6. Third-Party Services",
              content: [
                "We use third-party services for payment processing (Razorpay), image hosting (Cloudinary), and analytics and monitoring. These services have their own privacy policies, and we are not responsible for their practices.",
              ],
            },
            {
              title: "7. Your Rights",
              items: [
                "Access your personal data",
                "Request correction or deletion of your data",
                "Opt-out of marketing communications",
                "Request data portability",
                "Withdraw consent",
              ],
              footer:
                "To exercise these rights, please contact us at: support@hyperfit.com",
            },
            {
              title: "8. Data Retention",
              content: [
                "We retain personal data for as long as necessary to provide our services and comply with legal obligations. You can request deletion anytime by contacting us.",
              ],
            },
            {
              title: "9. Changes to This Policy",
              content: [
                "We may update this Privacy Policy periodically. We will notify you of significant changes via email or by posting a prominent notice on our website.",
              ],
            },
            { title: "10. Contact Us", isContact: true },
          ].map((section, idx) => (
            <motion.section
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
                {section.title}
              </h2>

              {section.isContact ? (
                <div className="mt-2 sm:mt-3 md:mt-4 p-3 sm:p-4 md:p-5 bg-muted rounded border border-border">
                  <p className="font-medium text-xs sm:text-sm md:text-base">
                    HyperFit Customer Support
                  </p>
                  <p className="text-xs sm:text-sm">
                    Email: support@hyperfit.com
                  </p>
                  <p className="text-xs sm:text-sm">Phone: +91 98765 43210</p>
                  <p className="text-xs sm:text-sm">
                    Address: Fitness Park, Mumbai, India
                  </p>
                </div>
              ) : (
                <>
                  {section.content &&
                    section.content.map((para, pidx) => (
                      <p key={pidx} className="mb-2 sm:mb-3">
                        {para}
                      </p>
                    ))}

                  {section.subsections &&
                    section.subsections.map((subsec, sidx) => (
                      <div key={sidx} className="mt-2 sm:mt-3">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1.5 sm:mb-2 md:mb-3">
                          {subsec.title}
                        </h3>
                        <ul className="list-disc pl-4 sm:pl-5 md:pl-6 space-y-1">
                          {subsec.items.map((item, iidx) => (
                            <li key={iidx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}

                  {section.items && (
                    <>
                      <ul className="list-disc pl-4 sm:pl-5 md:pl-6 space-y-1">
                        {section.items.map((item, iidx) => (
                          <li key={iidx}>{item}</li>
                        ))}
                      </ul>
                      {section.footer && (
                        <p className="mt-2 sm:mt-3 md:mt-4">{section.footer}</p>
                      )}
                    </>
                  )}
                </>
              )}
            </motion.section>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 sm:mt-10 md:mt-12 pt-4 sm:pt-6 md:pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-3 sm:gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-outline py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider"
          >
            <Link to="/" className="block">
              Back to Home
            </Link>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider"
          >
            <Link to="/terms" className="block">
              View Terms of Service
            </Link>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
