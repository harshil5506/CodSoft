import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TermsOfService = () => {
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
            Terms of Service
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
          <motion.section
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using HyperFit ("Service"), you accept and agree
              to be bound by the terms and provision of this agreement. If you
              do not agree to abide by the above, please do not use this
              service.
            </p>
          </motion.section>

          <motion.section
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
              2. Use License
            </h2>
            <p className="mb-2 sm:mb-3">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on HyperFit for personal,
              non-commercial transitory viewing only. This is the grant of a
              license, not a transfer of title, and under this license you may
              not:
            </p>
            <ul className="list-disc pl-4 sm:pl-5 md:pl-6 space-y-1">
              <li>Modifying or copying the materials</li>
              <li>
                Using the materials for any commercial purpose or for any public
                display
              </li>
              <li>
                Attempting to decompile or reverse engineer any software on
                HyperFit
              </li>
              <li>
                Removing any copyright or other proprietary notations from the
                materials
              </li>
              <li>
                Transferring the materials to another person or "mirroring" the
                materials on any other server
              </li>
            </ul>
          </motion.section>

          <motion.section
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
              3. Disclaimer
            </h2>
            <p>
              The materials on HyperFit are provided on an "as is" basis.
              HyperFit makes no warranties, expressed or implied, and hereby
              disclaims and negates all other warranties including, without
              limitation, implied warranties or conditions of merchantability,
              fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </motion.section>

          <motion.section
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
              4. User Accounts
            </h2>
            <p className="mb-2 sm:mb-3">
              When you create an account on HyperFit, you must provide accurate
              and complete information. You are responsible for maintaining the
              confidentiality of your password and account information. You
              agree to accept responsibility for all activities that occur under
              your account.
            </p>
            <p>
              HyperFit reserves the right to suspend or terminate accounts that
              violate these terms.
            </p>
          </motion.section>

          <motion.section
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
              5. Products and Pricing
            </h2>
            <div className="mt-2 sm:mt-3">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1.5 sm:mb-2 md:mb-3">
                5.1 Product Information
              </h3>
              <p>
                We strive to provide accurate product descriptions and pricing.
                However, we do not warrant that product descriptions, pricing,
                or other content is accurate, complete, or error-free.
              </p>
            </div>
            <div className="mt-2 sm:mt-3">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1.5 sm:mb-2 md:mb-3">
                5.2 Pricing
              </h3>
              <p>
                All prices are in Indian Rupees (₹) and subject to change
                without notice. We reserve the right to limit quantities and to
                refuse or cancel any order.
              </p>
            </div>
            <div className="mt-2 sm:mt-3">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1.5 sm:mb-2 md:mb-3">
                5.3 Availability
              </h3>
              <p>
                Products are available while supplies last. We will notify you
                if an ordered item is out of stock.
              </p>
            </div>
          </motion.section>

          <motion.section
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
              6. Orders and Payment
            </h2>
            <p className="mb-2 sm:mb-3">
              By placing an order, you represent that you are authorized to use
              the payment method provided. We process payments securely and
              reserve the right to refuse any order for any reason.
            </p>
            <p>
              Orders are confirmed upon payment. Cancellations must be requested
              within 24 hours of order placement.
            </p>
          </motion.section>

          <motion.section
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
              7. Shipping and Delivery
            </h2>
            <p className="mb-2 sm:mb-3">
              Standard shipping typically takes 3-5 business days within India.
              Delivery dates are estimates and not guaranteed. HyperFit is not
              responsible for delays caused by shipping carriers or
              circumstances beyond our control.
            </p>
            <p>
              Shipping costs are calculated at checkout based on your location
              and order total.
            </p>
          </motion.section>

          <motion.section
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
              8. Returns and Refunds
            </h2>
            <p className="mb-2 sm:mb-3">
              Most items can be returned within 30 days of delivery for a full
              refund. Items must be unused and in original condition with all
              packaging.
            </p>
            <p className="mb-2 sm:mb-3">
              Perishable items (supplements) cannot be returned if opened or
              partially used.
            </p>
            <p>
              To initiate a return, contact our customer support team at
              support@hyperfit.com
            </p>
          </motion.section>

          <motion.section
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
              9. User Reviews and Content
            </h2>
            <p className="mb-2 sm:mb-3">
              By submitting reviews, photos, or other content to HyperFit, you
              grant us a non-exclusive, worldwide, royalty-free license to use
              your content.
            </p>
            <p className="mb-2 sm:mb-3">
              You represent that you own or have the necessary rights to all
              content you submit, and that it doesn't infringe on any
              third-party rights or violate any laws.
            </p>
            <p>
              We reserve the right to remove any content that violates these
              terms.
            </p>
          </motion.section>

          <motion.section
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
              10. HyperCoins Loyalty Program
            </h2>
            <p className="mb-2 sm:mb-3">
              HyperCoins are earned at a rate of 1 coin per ₹100 spent. Coins
              can be applied to future purchases for a 1:1 Rupee discount.
              HyperCoins are non-transferable and have no cash value.
            </p>
            <p>
              HyperFit reserves the right to modify or terminate the HyperCoins
              program at any time.
            </p>
          </motion.section>

          <motion.section
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
              11. Limitation of Liability
            </h2>
            <p>
              In no event shall HyperFit, nor its directors, employees or
              agents, be liable for any indirect, incidental, special,
              consequential or punitive damages resulting from your use of or
              inability to use the materials on HyperFit.
            </p>
          </motion.section>

          <motion.section
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
              12. Prohibited Activities
            </h2>
            <p className="mb-2 sm:mb-3">You agree not to:</p>
            <ul className="list-disc pl-4 sm:pl-5 md:pl-6 space-y-1">
              <li>Engage in any form of fraud or illegal activity</li>
              <li>Harass or abuse other users</li>
              <li>Post offensive or inappropriate content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the normal operation of our service</li>
              <li>Create multiple accounts to circumvent restrictions</li>
            </ul>
          </motion.section>

          <motion.section
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
              13. Governing Law
            </h2>
            <p>
              These terms and conditions are governed by and construed in
              accordance with the laws of India, and you irrevocably submit to
              the exclusive jurisdiction of the courts in Mumbai.
            </p>
          </motion.section>

          <motion.section
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
              14. Changes to Terms
            </h2>
            <p>
              HyperFit reserves the right to revise these terms of service at
              any time. By using this website, you are agreeing to be bound by
              the then current version of these terms of service.
            </p>
          </motion.section>

          <motion.section
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 uppercase tracking-tight">
              15. Contact Information
            </h2>
            <p className="mb-2 sm:mb-3">
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <div className="mt-2 sm:mt-3 md:mt-4 p-3 sm:p-4 md:p-5 bg-muted rounded border border-border">
              <p className="font-medium text-xs sm:text-sm md:text-base">
                HyperFit Legal Team
              </p>
              <p className="text-xs sm:text-sm">Email: legal@hyperfit.com</p>
              <p className="text-xs sm:text-sm">
                Address: Fitness Park, Mumbai, India
              </p>
            </div>
          </motion.section>
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
            <Link to="/privacy" className="block">
              View Privacy Policy
            </Link>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsOfService;
