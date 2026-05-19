import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl font-bold tracking-tighter mb-4">HYPERFIT.</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Premium fitness apparel and supplements for the modern athlete. Elevate your performance.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/shop?category=supplements" className="hover:text-foreground transition-colors">Supplements</a></li>
              <li><a href="/shop?category=apparel" className="hover:text-foreground transition-colors">Apparel</a></li>
              <li><a href="/shop?category=accessories" className="hover:text-foreground transition-colors">Accessories</a></li>
              <li><a href="/shop?sale=true" className="hover:text-foreground transition-colors">Sale</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/faq" className="hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-foreground transition-colors">Shipping & Returns</a></li>
              <li><a href="/contact" className="hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="/track-order" className="hover:text-foreground transition-colors">Track Order</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Join Us</h4>
            <p className="text-sm text-muted-foreground mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex gap-2">
              <input type="email" placeholder="Enter your email" className="bg-muted border border-border rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" />
              <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} HYPERFIT. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
