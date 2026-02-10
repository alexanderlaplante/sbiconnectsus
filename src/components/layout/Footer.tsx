import { Link } from "react-router-dom";
import { Shield, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/30">
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground text-sm" style={{ fontFamily: 'Space Grotesk' }}>
              SBI
            </div>
            <span className="font-semibold text-foreground" style={{ fontFamily: 'Space Grotesk' }}>SBI Connects</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Veteran-owned (DVOSB) low-voltage and telecommunications infrastructure specialists.
          </p>
          <div className="flex items-center gap-2 text-xs text-primary">
            <Shield className="h-4 w-4" />
            <span className="font-medium">Service-Disabled Veteran Owned</span>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: 'Space Grotesk' }}>Services</h4>
          <ul className="space-y-2.5">
            {[
              { label: "Network Infrastructure", href: "/services/network-infrastructure" },
              { label: "Wireless & Mobility", href: "/services/wireless-mobility" },
              { label: "Security & Life-Safety", href: "/services/security-access" },
              { label: "Audio-Visual Systems", href: "/services/audio-visual" },
            ].map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: 'Space Grotesk' }}>Company</h4>
          <ul className="space-y-2.5">
            <li><Link to="/#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: 'Space Grotesk' }}>Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span>Serving clients nationwide</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <span>(555) 123-4567</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span>info@sbiconnects.us</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} SBI Connects. All rights reserved.</p>
        <p className="text-xs text-muted-foreground">Built with precision. Engineered for performance.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
