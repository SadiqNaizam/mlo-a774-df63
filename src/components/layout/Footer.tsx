import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const infoLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' },
  ];

  const legalLinks = [
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Cookie Policy', path: '/cookies' },
  ];

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', path: 'https://facebook.com' },
    { icon: Twitter, name: 'Twitter', path: 'https://twitter.com' },
    { icon: Instagram, name: 'Instagram', path: 'https://instagram.com' },
  ];

  return (
    <footer className="bg-muted text-muted-foreground border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-foreground">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">MealSwift</span>
            </Link>
            <p className="text-sm">Your favorite meals, delivered fast.</p>
          </div>

          {/* Info Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link.name}>
                  <Link to="#" className="text-sm hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link to="#" className="text-sm hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Links */}
          <div className="space-y-4">
             <h3 className="font-semibold text-foreground">Follow Us</h3>
             <div className="flex space-x-4">
                {socialLinks.map((social) => (
                    <a key={social.name} href={social.path} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <social.icon className="h-5 w-5" />
                        <span className="sr-only">{social.name}</span>
                    </a>
                ))}
             </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm">
          <p>&copy; {currentYear} MealSwift. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;