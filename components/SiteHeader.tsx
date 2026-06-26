"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { CTA } from "@/components/CTA";
import { ProductHuntBadge } from "@/components/ProductHuntBadge";

/** Sitewide header: brand + pillar nav + persistent CTA. */
export function SiteHeader({ page }: { page: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          onClick={closeMenu}
        >
          <Image
            src="/logo.png"
            alt={`${siteConfig.name} logo`}
            width={96}
            height={52}
            priority
            className="brand-logo"
          />
          <span>{siteConfig.name}</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="header-nav-panel"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
        </button>

        <div
          id="header-nav-panel"
          className={`header-nav-panel${menuOpen ? " is-open" : ""}`}
        >
          <nav className="main-nav" aria-label="Main">
            <Link href="/resume-templates" onClick={closeMenu}>
              Templates
            </Link>
            <Link href="/resume-examples" onClick={closeMenu}>
              Examples
            </Link>
            <Link href="/guides" onClick={closeMenu}>
              Guides
            </Link>
            <Link href="/pricing" onClick={closeMenu}>
              Pricing
            </Link>
          </nav>
          <div className="header-actions">
            <ProductHuntBadge className="header-badge" />
            <CTA page={page} label="Start free" />
          </div>
        </div>
      </div>
    </header>
  );
}
