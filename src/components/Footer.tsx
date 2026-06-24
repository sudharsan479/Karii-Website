import React from "react";
import { Phone, Mail, Instagram, MapPin, Sparkles } from "lucide-react";
import { GlobalSettings } from "../dbHelper";

interface FooterProps {
  settings: GlobalSettings;
  onNavigate: (path: string) => void;
  onOpenPrivacy: () => void;
  onOpenAffiliate: () => void;
}

export default function Footer({ settings, onNavigate, onOpenPrivacy, onOpenAffiliate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-950 border-t border-gold-500/10 pt-16 pb-32 md:pb-16 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-navy-800/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Card */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 cursor-pointer mb-5" onClick={() => onNavigate("/")}>
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/20">
                <Sparkles className="w-4.5 h-4.5 text-gold-400" />
              </div>
              <div>
                <span className="font-serif text-md font-bold tracking-widest text-gold-100">VIVID SPARK</span>
                <span className="text-[8px] font-sans tracking-[0.2em] text-gold-400 block uppercase">Be Bold. Be You.</span>
              </div>
            </div>
            <p className="text-navy-300 text-xs leading-relaxed max-w-sm">
              LAPT Certified professional bridal makeup artist Karshini, dedicated to crafting beautiful, high-definition and airbrush transformations that reflect your bold, unique personality.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold-200 tracking-wider mb-5 uppercase">Explore</h4>
            <ul className="space-y-3 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate("/")} 
                  className="text-navy-300 hover:text-gold-400 transition-colors duration-200 cursor-pointer"
                >
                  Home & Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate("/portfolio")} 
                  className="text-navy-300 hover:text-gold-400 transition-colors duration-200 cursor-pointer"
                >
                  Makeup Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate("/wiki")} 
                  className="text-navy-300 hover:text-gold-400 transition-colors duration-200 cursor-pointer"
                >
                  Beauty Wiki & Guides
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate("/shop")} 
                  className="text-navy-300 hover:text-gold-400 transition-colors duration-200 cursor-pointer"
                >
                  Affiliate Recommendations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate("/admin")} 
                  className="text-navy-400 hover:text-gold-400 font-mono text-[10px] uppercase transition-colors duration-200 cursor-pointer"
                >
                  CMS Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Service Area */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold-200 tracking-wider mb-5 uppercase">Service Area</h4>
            <div className="flex items-start space-x-3 text-xs text-navy-300">
              <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-navy-100">{settings.serviceArea}</p>
                <p className="mt-2 text-navy-400 leading-relaxed text-[11px]">
                  Specializing in mobile door-to-door high-end makeup services. We travel directly to your home, resort, or wedding venue.
                </p>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold-200 tracking-wider mb-5 uppercase">Get In Touch</h4>
            <ul className="space-y-3.5 text-xs text-navy-300">
              <li>
                <a 
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center space-x-3 hover:text-gold-400 transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>WhatsApp: {settings.whatsappNumber}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${settings.phoneNumber.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center space-x-3 hover:text-gold-400 transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>Call: {settings.phoneNumber}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`https://instagram.com/${settings.instagramHandle}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center space-x-3 hover:text-gold-400 transition-colors duration-200"
                >
                  <Instagram className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>@{settings.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${settings.emailAddress}`}
                  className="flex items-center space-x-3 hover:text-gold-400 transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>{settings.emailAddress}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer legal bar */}
        <div className="border-t border-gold-500/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-navy-400 space-y-4 md:space-y-0">
          <div>
            &copy; {currentYear} Vivid Spark by Karshini. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <button onClick={onOpenPrivacy} className="hover:text-gold-400 cursor-pointer transition-colors duration-200">
              Privacy Policy
            </button>
            <button onClick={onOpenAffiliate} className="hover:text-gold-400 cursor-pointer transition-colors duration-200">
              Affiliate Disclosure
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
