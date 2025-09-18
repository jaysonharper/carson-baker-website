import { LitElement, html, css } from "lit";

/**
 * A professional navigation bar component for Law Offices
 * Features GitHub-inspired dark theme with smooth animations
 */
export class FlowNavbar extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      /* background: var(--nav-bg); */
      background: linear-gradient(
        0deg,
        var(--nav-bg-gradient-start) 0%,
        var(--nav-bg-gradient-end) 90%
      );
      border-bottom: 1px solid #30363d;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      /* Ensure Poppins is used inside Shadow DOM when available */
      font-family: "Poppins", ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        "Noto Sans", sans-serif;
    }

    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
    }

    /* Menu Toggle - Always visible */
    .menu-toggle {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.375rem;
      transition: background-color 0.2s ease;
      transform: scale(1.5);
    }

    .menu-toggle:hover {
      background-color: #21262d;
    }

    .menu-toggle span {
      width: 1.5rem;
      height: 2px;
      background-color: #f0f6fc;
      margin: 2px 0;
      transition: all 0.3s ease;
      border-radius: 1px;
    }

    .menu-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }

    .menu-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }

    /* Logo Container */
    .logo-container {
      display: flex;
      flex-direction: column;
      align-items: center; /* Centers the text horizontally */
      text-align: center; /* fallback for older browsers */
      font-family: inherit;
      color: #333; /* A dark, professional gray */
    }

    .logo-container:hover {
      transform: translateY(-1px);
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .logo-text {
      font-size: 1.25em;
      font-weight: 600; /* Bold weight */
      color: var(--nav-logo-text);
      letter-spacing: 0.05em; /* Tighter spacing for the main text */
      transition: color 0.3s ease-in-out;
      text-transform: uppercase; /* All caps for a professional feel */
      -webkit-text-stroke: 1px #696949; /* 2px black border */
    }

    .logo-container:hover .logo-text {
      text-shadow: 0 0 40px rgba(124, 58, 237, 0.5);
    }

    /* Static Scales of Justice Icon */
    .justice-icon {
      /* Mobile: smaller */
      width: 48px;
      height: 48px;
      margin-left: 0.5rem;
      flex-shrink: 0;
      display: inline-block;
      vertical-align: middle;
      fill: #fff;
    }

    .justice-icon path {
      stroke: #696949;
      stroke-width: 20;
    }

    /* Navigation Menu */
    .nav-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
      border-bottom: 1px solid #30363d;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .nav-menu.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .nav-links {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      gap: 0.5rem;
    }

    .nav-links .nav-link {
      width: 100%;
      text-align: center;
      padding: 0.75rem 1rem;
      border: 1px solid #30363d;
      color: #f0f6fc;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.925rem;
      border-radius: 0.375rem;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }

    .nav-link::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(124, 58, 237, 0.1),
        transparent
      );
      transition: left 0.5s ease;
    }

    .nav-link:hover {
      color: #7c3aed;
      background-color: #21262d;
      transform: translateY(-1px);
    }

    .nav-link:hover::before {
      left: 100%;
    }

    /* Responsive Design - Scale icons and text */
    @media (min-width: 768px) {
      .menu-toggle {
        padding: 0.6rem;
        transform: scale(2);
      }

      .menu-toggle span {
        width: 1.65rem;
        height: 2.2px;
      }

      .logo-text {
        font-size: 1.5rem;
      }

      .justice-icon {
        /* Tablet: medium */
        width: 72px;
        height: 72px;
      }
    }

    @media (min-width: 1024px) {
      .navbar {
        padding: 1rem 2rem;
      }

      .menu-toggle {
        padding: 0.7rem;
        transform: scale(2);
      }

      .menu-toggle span {
        width: 1.8rem;
        height: 2.5px;
      }

      .logo-text {
        font-size: 2.5rem;
      }
    }
  `;

  static properties = {
    mobileMenuOpen: { type: Boolean },
  };

  constructor() {
    super();
    this.mobileMenuOpen = false;
  }

  render() {
    return html`
      <nav class="navbar">
        <!-- Menu Toggle - Always visible -->
        <div
          class="menu-toggle ${this.mobileMenuOpen ? "active" : ""}"
          @click="${this._toggleMobileMenu}"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <!-- Company Name -->
        <div
          class="logo-container"
          @click="${this._scrollToTop}"
          role="button"
          tabindex="0"
          aria-label="Law Offices of Carson & Baker - Home"
          @keydown="${this._handleCompanyNameKeydown}"
        >
          <span class="logo-text">Carson & Baker</span>
        </div>

        <!-- Scales of Justice Icon (static, bright white) -->
        <svg
          class="justice-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
          <path
            d="M384 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L398.4 160C393.2 185.8 375.5 207.1 352 217.3L352 512L512 512C529.7 512 544 526.3 544 544C544 561.7 529.7 576 512 576L128 576C110.3 576 96 561.7 96 544C96 526.3 110.3 512 128 512L288 512L288 217.3C264.5 207 246.8 185.7 241.6 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L256 96C270.6 76.6 293.8 64 320 64C346.2 64 369.4 76.6 384 96zM439.6 384L584.4 384L512 259.8L439.6 384zM512 480C449.1 480 396.8 446 386 401.1C383.4 390.1 387 378.8 392.7 369L487.9 205.8C492.9 197.2 502.1 192 512 192C521.9 192 531.1 197.3 536.1 205.8L631.3 369C637 378.8 640.6 390.1 638 401.1C627.2 445.9 574.9 480 512 480zM126.8 259.8L54.4 384L199.3 384L126.8 259.8zM.9 401.1C-1.7 390.1 1.9 378.8 7.6 369L102.8 205.8C107.8 197.2 117 192 126.9 192C136.8 192 146 197.3 151 205.8L246.2 369C251.9 378.8 255.5 390.1 252.9 401.1C242.1 445.9 189.8 480 126.9 480C64 480 11.7 446 .9 401.1z"
          />
        </svg>

        <!-- Navigation Menu -->
        <div class="nav-menu ${this.mobileMenuOpen ? "active" : ""}">
          <div class="nav-links">
            <a
              href="#services"
              class="nav-link"
              @click="${this._handleNavClick}"
              >Services</a
            >
            <a
              href="#attorneys"
              class="nav-link"
              @click="${this._handleNavClick}"
              >Attorneys</a
            >
            <a
              href="#testimonials"
              class="nav-link"
              @click="${this._handleNavClick}"
              >Testimonials</a
            >
            <a href="#find-us" class="nav-link" @click="${this._handleNavClick}"
              >Find Us</a
            >
          </div>
        </div>
      </nav>
    `;
  }

  _toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  _handleNavClick(e) {
    this.mobileMenuOpen = false; // Close menu when link is clicked
    this._smoothScroll(e.target.getAttribute("href"));
  }

  _smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

  _scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  _handleCompanyNameKeydown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._scrollToTop();
    }
  }
}

customElements.define("flow-navbar", FlowNavbar);
