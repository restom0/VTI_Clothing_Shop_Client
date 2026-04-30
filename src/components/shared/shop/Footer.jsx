import PropTypes from "prop-types";
import { useI18n } from "../../../i18n";
import { FOOTER_MENU, SOCIAL_LINKS } from "./footer.config";

const currentYear = new Date().getFullYear();

export const FooterView = ({ footerMenu, socialLinks, t, year }) => (
  <footer className="relative w-full pt-10 border-t" style={{ borderColor: "var(--color-border)" }}>
    <div className="page-container mt-5">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-10">
        <p className="text-xl font-bold" style={{ color: "var(--color-text-base)" }}>
          VTI Shop
        </p>
        <div className="footer-links-grid grid grid-cols-2 gap-4 sm:grid-cols-3">
          {footerMenu.map(({ titleKey, items }) => (
            <ul key={titleKey}>
              <li className="footer-nav-title">{t(titleKey)}</li>
              {items.map(({ labelKey, link }) => (
                <li key={labelKey}>
                  <a href={link} className="footer-nav-link">{t(labelKey)}</a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div
        className="flex-between flex-col md:flex-row border-t py-4 gap-4"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p className="text-sm text-center" style={{ color: "var(--color-text-muted)" }}>
          &copy; {year}{" "}
          <a href="/" className="hover:underline" style={{ color: "var(--color-primary)" }}>
            VTI Corporation
          </a>
          . {t("common.all_rights_reserved")}
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ label, href, path, fillRule, clipRule }) => (
            <a key={label} href={href} aria-label={label} className="footer-social-btn">
              <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule={fillRule} clipRule={clipRule} d={path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

FooterView.propTypes = {
  footerMenu: PropTypes.arrayOf(
    PropTypes.shape({
      titleKey: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          labelKey: PropTypes.string.isRequired,
          link: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      fillRule: PropTypes.string,
      clipRule: PropTypes.string,
    })
  ).isRequired,
  t: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
};

const Footer = () => {
  const { t } = useI18n();

  return (
    <FooterView
      footerMenu={FOOTER_MENU}
      socialLinks={SOCIAL_LINKS}
      t={t}
      year={currentYear}
    />
  );
};

export default Footer;
