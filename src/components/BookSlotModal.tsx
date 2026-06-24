import React from "react";
import { X, MessageSquare, Phone, Instagram, Mail, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GlobalSettings } from "../dbHelper";

interface BookSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GlobalSettings;
  serviceName?: string | null;
}

export default function BookSlotModal({ isOpen, onClose, settings, serviceName }: BookSlotModalProps) {
  const cleanPhone = settings.phoneNumber.replace(/[^0-9+]/g, "");
  const cleanWhatsapp = settings.whatsappNumber.replace(/[^0-9]/g, "");

  const options = [
    {
      name: "WhatsApp Business",
      description: "Fastest response, ideal for checking dates",
      icon: MessageSquare,
      color: "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      actionIconColor: "text-emerald-400",
      link: `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
        `Hi Karshini, I am looking to book a slot ${
          serviceName ? `for "${serviceName}"` : "for professional makeup"
        }. Are you available on my date?`
      )}`,
    },
    {
      name: "Direct Call",
      description: "Direct response for urgent bookings & pricing",
      icon: Phone,
      color: "bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 border-gold-500/30",
      actionIconColor: "text-gold-400",
      link: `tel:${cleanPhone}`,
    },
    {
      name: "Instagram DM",
      description: "Consult styles and send reference photos",
      icon: Instagram,
      color: "bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border-pink-500/30",
      actionIconColor: "text-pink-400",
      link: `https://instagram.com/${settings.instagramHandle}`,
    },
    {
      name: "Professional Email",
      description: "Best for custom event packages",
      icon: Mail,
      color: "bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border-sky-500/30",
      actionIconColor: "text-sky-400",
      link: `mailto:${settings.emailAddress}?subject=${encodeURIComponent(
        `Vivid Spark Booking Inquiry${serviceName ? `: ${serviceName}` : ""}`
      )}&body=${encodeURIComponent(
        `Dear Karshini,\n\nI would love to inquire about booking your services for an upcoming event.\n\nService requested: ${
          serviceName || "Makeup Artistry"
        }\nEvent Date:\nEvent Location:\nNumber of people needing styling:\n\nThank you!`
      )}`,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg glass-panel-heavy p-6 sm:p-8 rounded-3xl shadow-2xl z-10 border border-gold-500/20"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-navy-300 hover:text-gold-400 rounded-full hover:bg-navy-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title Section */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 mb-3">
                <Calendar className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-wide text-gold-100">
                Book a Slot
              </h3>
              <p className="text-navy-300 text-xs mt-1.5 max-w-md mx-auto">
                {serviceName ? (
                  <>
                    Interested in <span className="text-gold-300 font-semibold">{serviceName}</span>? Choose a contact channel below to finalize details with Karshini.
                  </>
                ) : (
                  "Ready to be your most vivid self? Connect directly with LAPT certified artist Karshini."
                )}
              </p>
            </div>

            {/* Action Channels */}
            <div className="space-y-3.5">
              {options.map((opt) => {
                const Icon = opt.icon;
                return (
                  <a
                    key={opt.name}
                    href={opt.link}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    onClick={onClose}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${opt.color} group hover:scale-[1.015]`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 rounded-xl bg-navy-950/60 border border-gold-500/10 group-hover:border-gold-500/20 transition-all duration-300">
                        <Icon className="w-5.5 h-5.5" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-sans font-bold text-sm tracking-wide text-navy-50 group-hover:text-gold-300 transition-colors duration-200">
                          {opt.name}
                        </h4>
                        <p className="text-navy-300 text-[11px] mt-0.5 leading-tight">
                          {opt.description}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-mono tracking-wider uppercase font-semibold ${opt.actionIconColor} opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200`}>
                      Connect &rarr;
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <p className="text-[10px] font-mono tracking-wide text-gold-400/60">
                VIVID SPARK • COIMBATORE • POLLACHI
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
