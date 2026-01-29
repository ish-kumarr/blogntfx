import { Link } from 'react-router-dom';
import logoWide from '@/assets/logo-wide.png';
import { Phone, MapPin, FileText, Youtube, Send, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-dark border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Top Section - Logo and Description */}
        <div className="flex flex-col gap-4 md:gap-6 pb-8 md:pb-10 border-b border-border items-start">
          <Link to="/" className="flex-shrink-0">
            <img src={logoWide} alt="New TradeFx Services" className="h-7 md:h-9" />
          </Link>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            New Trade Fx Services was founded by a group of professional traders with a shared vision of improving the online trading environment. Frustrated with high costs, slow executions, and poor client service, we set out to deliver cutting-edge technology to traders worldwide.
          </p>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 py-8 md:py-10 border-b border-border">
          {/* Quick Links */}
          <div>
            <h6 className="font-semibold text-foreground mb-3 md:mb-4 text-xs md:text-sm">Quick Links</h6>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="https://tradefxservices.com" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="https://tradefxservices.com/about-us.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="https://tradefxservices.com/contact-us.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="https://support.tradefxservices.com" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Support Page
                </a>
              </li>
            </ul>
          </div>

          {/* Markets */}
          <div>
            <h6 className="font-semibold text-foreground mb-3 md:mb-4 text-xs md:text-sm">Markets</h6>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="https://tradefxservices.com/forex.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Forex
                </a>
              </li>
              <li>
                <a href="https://tradefxservices.com/cfds.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  CFDs
                </a>
              </li>
              <li>
                <a href="https://tradefxservices.com/indices.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Indices
                </a>
              </li>
              <li>
                <a href="https://tradefxservices.com/metal.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Metals
                </a>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h6 className="font-semibold text-foreground mb-3 md:mb-4 text-xs md:text-sm">Tools</h6>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="https://tradefxservices.com/introducing-broker.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Introducing Broker
                </a>
              </li>
              <li>
                <a href="https://tradefxservices.com/trading-platform.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Trading Platform
                </a>
              </li>
              <li>
                <a href="https://tradefxservices.com/economic-calendar.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Economic Calendar
                </a>
              </li>
              <li>
                <a href="https://tradefxservices.com/account-comparison.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Account Comparison
                </a>
              </li>
              <li>
                <a href="https://tradefxservices.com/deposit-withdrawal.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Deposit & Withdrawal
                </a>
              </li>
            </ul>
          </div>

          {/* Disclosure */}
          <div>
            <h6 className="font-semibold text-foreground mb-3 md:mb-4 text-xs md:text-sm">Disclosure</h6>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="https://tradefxservices.com/risk-warning.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Risk Warning
                </a>
              </li>
              <li>
                <a href="https://tradefxservices.com/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Policies & Procedures
                </a>
              </li>
              <li>
                <a href="https://tradefxservices.com/terms-condition.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="https://tradefxservices.com/aml-policy.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  AML Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h6 className="font-semibold text-foreground mb-3 md:mb-4 text-xs md:text-sm">Contact</h6>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <p className="text-[10px] md:text-xs text-muted-foreground mb-1">Registered Address:</p>
                <p className="text-xs md:text-sm text-foreground/80 leading-relaxed">
                  Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia
                </p>
              </li>
              <li>
                <p className="text-[10px] md:text-xs text-muted-foreground mb-1">Registration Number:</p>
                <p className="text-xs md:text-sm text-foreground/80">202500717</p>
              </li>
              <li>
                <p className="text-[10px] md:text-xs text-muted-foreground mb-1">Phone Number:</p>
                <a href="tel:+17584529850" className="text-xs md:text-sm text-foreground/80 hover:text-primary transition-colors">
                  +1 (758) 452-9850
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Social */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 md:pt-8">
          <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
            © 2025 New Trade Fx Services. All rights reserved.
          </p>
          <div className="flex items-center gap-2 md:gap-3">
            <a href="#" className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors">
              <Youtube size={16} className="md:w-[18px] md:h-[18px]" />
            </a>
            <a href="#" className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors">
              <Send size={16} className="md:w-[18px] md:h-[18px]" />
            </a>
            <a href="#" className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors">
              <Facebook size={16} className="md:w-[18px] md:h-[18px]" />
            </a>
            <a href="#" className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors">
              <MessageCircle size={16} className="md:w-[18px] md:h-[18px]" />
            </a>
          </div>
        </div>
      </div>

      {/* Risk Disclosure Section */}
      <div className="bg-navy-deep border-t border-border">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="space-y-4 md:space-y-6">
            <div>
              <h6 className="font-semibold text-foreground text-xs md:text-sm mb-2">Risk Disclosure:</h6>
              <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                Anyone wishing to invest in any of the products mentioned on this website should seek their own financial or professional advice. Trading of securities, forex, stock market, commodities, options and futures may not be suitable for everyone and involves the risk of losing part or all of your money. Trading in the financial markets has large potential rewards, but also large potential risk. You must be aware of the risks and be willing to accept them in order to invest in the markets. Don't invest and trade with money which you can't afford to lose. Forex trading is not allowed in some countries; before investing your money, make sure whether your country is allowing this or not. You are strongly advised to obtain independent financial, legal and tax advice before proceeding with any currency or spot metals trade. Nothing in this site should be read or construed as constituting advice on the part of New Trade Fx Services Ltd. or any of its affiliates, directors, officers or employees.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-foreground text-xs md:text-sm mb-2">Risk Warning:</h6>
              <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                New Trade Fx Services Ltd. does not provide services for citizens/residents of the United States, Cuba, Iraq, Myanmar, North Korea, Sudan. The services of New Trade Fx Services Ltd. are not intended for distribution to, or use by, any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation. Information on this site is not directed at residents in any country or jurisdiction where such distribution or use would be contrary to local law or regulation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
