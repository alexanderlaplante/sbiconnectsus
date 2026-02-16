import { Link } from "react-router-dom";
import SbiLogo from "@/components/SbiLogo";
import { Shield, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/30">
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="mb-4">
            <SbiLogo className="h-10" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Veteran-owned (SDVOSB) low-voltage and telecommunications infrastructure specialists.
          </p>
          <div className="flex items-center gap-2 text-xs text-primary">
            <Shield className="h-4 w-4" />
            <span className="font-medium">Service-Disabled Veteran-Owned Small Business</span>
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
            <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            <li><Link to="/sitemap" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sitemap</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: 'Space Grotesk' }}>Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span>2120 N Ronald Reagan Blvd, Unit 1104<br />Longwood, FL 32750</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <a href="tel:+14075093004" className="hover:text-primary transition-colors">(407) 509-3004</a>
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <a href="mailto:info@sbiconnects.us" className="hover:text-primary transition-colors">info@sbiconnects.us</a>
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
