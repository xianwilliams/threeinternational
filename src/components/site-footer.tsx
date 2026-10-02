import Link from 'next/link';
import { Camera } from 'lucide-react';
import { disclaimer } from '@/lib/products';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="THREE home">
            <img src="/images/logo-lg-wide-white.png" alt="THREE" width={230} height={43} />
          </Link>
          <p>
            Good science.
            <br />
            Everyday possibilities.
          </p>
          <a
            href="https://www.instagram.com/three_international"
            aria-label="THREE on Instagram"
            target="_blank"
            rel="noreferrer"
          >
            <Camera size={19} />
          </a>
        </div>
        <div className="footer-links">
          <div>
            <h3>Find your THREE</h3>
            <Link href="/shop">Shop all products</Link>
            <Link href="/products/glp-three">GLP THREE</Link>
            <Link prefetch={false} href="/shop?category=Daily%20wellness">
              Daily wellness
            </Link>
            <Link prefetch={false} href="/shop?category=Skin%20%26%20beauty">
              Skin & beauty
            </Link>
          </div>
          <div>
            <h3>A closer look</h3>
            <Link href="/science">The science</Link>
            <Link href="/our-story">Our story</Link>
            <Link href="/our-team">Our Team</Link>
            <Link href="/scientific-advisory-board">Scientific Advisory Board</Link>
            <Link href="/three-farm">THREE Farm</Link>
            <Link href="/love-three">Love THREE</Link>
            <Link href="/journal">The Journal</Link>
            <Link href="/opportunity">Become An Ambassador</Link>
          </div>
          <div>
            <h3>Here to help</h3>
            <a href="mailto:support@iii.earth">Contact us</a>
            <a href="https://www.threeinternational.com/en/account/login">My account</a>
            <a href="https://threemedia.earth/wp-content/uploads/2026/04/ReturnRefundPolicy_LTR_2604_V3.1_EN.pdf">
              Returns & refunds
            </a>
            <a href="tel:+13853333388">1-385-333-3388</a>
          </div>
        </div>
      </div>
      <div className="footer-disclaimer">
        <p>
          {disclaimer} Always check with your healthcare professional before starting a new
          supplement program. Individual results vary.
        </p>
        <p>
          US catalog. Prices shown in USD. Availability and final pricing are confirmed on THREE’s
          official store.
        </p>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} THREE International</span>
        <div>
          <span>United States · EN</span>
          <a href="https://threemedia.earth/wp-content/uploads/2025/06/PrivacyPolicy_V3_FNL.pdf">
            Privacy
          </a>
          <a href="https://www.threeinternational.com/Content/pdf/en/TermsOfUse.pdf">Terms</a>
        </div>
      </div>
    </footer>
  );
}
