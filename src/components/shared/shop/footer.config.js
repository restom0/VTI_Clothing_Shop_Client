// Social icon components from developer-icons
// Install: yarn add developer-icons
// Note: package exports GitHubDark/GitHubLight, not Github
import { Facebook, Twitter, GitHubDark as Github, Instagram } from "developer-icons";

export const FOOTER_MENU = [
  {
    titleKey: "footer.products",
    items: [
      { labelKey: "footer.home", link: "/" },
      { labelKey: "footer.products", link: "/product" },
      { labelKey: "nav.brands", link: "/brand" },
      { labelKey: "nav.categories", link: "/category" },
      { labelKey: "common.cart", link: "/cart" },
      { labelKey: "footer.checkout", link: "/checkout" },
    ],
  },
  {
    titleKey: "footer.company",
    items: [
      { labelKey: "nav.about_us", link: "/about-us" },
      { labelKey: "nav.contact", link: "/contact" },
      { labelKey: "footer.careers", link: "/careers" },
      { labelKey: "footer.terms", link: "/terms" },
      { labelKey: "footer.policy", link: "/policy" },
      { labelKey: "account.faqs", link: "/faqs" },
    ],
  },
  {
    titleKey: "footer.customer_care",
    items: [
      { labelKey: "nav.contact", link: "/contact" },
      { labelKey: "footer.order_guide", link: "/terms" },
      { labelKey: "footer.shipping_methods", link: "/policy" },
      { labelKey: "account.faqs", link: "/faqs" },
    ],
  },
];

// Social links now use developer-icons React components.
// `Icon` receives `size` and an optional `style` prop from developer-icons.
export const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    Icon: Facebook,
  },
  {
    label: "Twitter / X",
    href: "#",
    Icon: Twitter,
  },
  {
    label: "GitHub",
    href: "#",
    Icon: Github,
  },
  {
    label: "Instagram",
    href: "#",
    Icon: Instagram,
  },
];

export const getFooterCopyright = (year, owner, rightsText) =>
  `© ${year} ${owner}. ${rightsText}`;
