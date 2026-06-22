import { Link } from "@tanstack/react-router";
import { NewsletterForm } from "./newsletter-form";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24 bg-background">
      <div className="container-x py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow mb-3">Newsletter</p>
          <h3 className="font-display text-3xl mb-4 max-w-md">Seasonal releases, slowly, to your inbox.</h3>
          <NewsletterForm />
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow mb-4">Shop</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="link-underline">Coffee</Link></li>
            <li><Link to="/shop" className="link-underline">Brew gear</Link></li>
            <li><Link to="/subscribe" className="link-underline">Subscription</Link></li>
            <li><Link to="/wholesale" className="link-underline">Wholesale</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow mb-4">Visit</p>
          <ul className="space-y-2 text-sm">
            <li>Refshalevej 174</li>
            <li>1432 Copenhagen K</li>
            <li>Mon–Fri · 7–17</li>
            <li>Sat–Sun · 8–16</li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow mb-4">More</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/story" className="link-underline">Story</Link></li>
            <li><Link to="/journal" className="link-underline">Journal</Link></li>
            <li><Link to="/careers" className="link-underline">Careers</Link></li>
            <li><Link to="/contact" className="link-underline">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x py-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Northbound Coffee Roasters. Roasted in Copenhagen.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Instagram</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
