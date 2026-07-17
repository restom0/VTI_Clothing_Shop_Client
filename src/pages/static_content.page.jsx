import PropTypes from "prop-types";
import {
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { useI18n } from "../i18n";

/** Handles page icon. */
const PageIcon = ({ icon: Icon }) => (
  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-muted text-primary">
    <Icon className="h-6 w-6" strokeWidth={2} />
  </span>
);

PageIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
};

/** Handles info card. */
const InfoCard = ({ description, icon, title }) => (
  <article className="rounded-lg border border-border bg-white p-5 shadow-card">
    <PageIcon icon={icon} />
    <h3 className="mt-4 text-base font-semibold text-text-base">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-text-muted">{description}</p>
  </article>
);

InfoCard.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
};

/** Handles faq row. */
const FaqRow = ({ answer, question }) => (
  <details className="group border-b border-border py-5">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-text-base">
      {question}
      <span className="text-primary transition-transform group-open:rotate-45">+</span>
    </summary>
    <p className="mt-3 max-w-3xl text-sm leading-6 text-text-muted">{answer}</p>
  </details>
);

FaqRow.propTypes = {
  answer: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
};

/** Handles static content page. */
const StaticContentPage = ({
  actions = [],
  eyebrow,
  faqs = [],
  heroImage,
  sections = [],
  stats = [],
  subtitle,
  title,
}) => (
  <main className="bg-surface">
    <section className="relative min-h-[360px] overflow-hidden border-b border-border">
      <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="page-container relative flex min-h-[360px] items-center py-14">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-white md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">{subtitle}</p>
          {actions.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {actions.map(({ href, label, variant }) => (
                <a
                  key={label}
                  href={href}
                  className={
                    variant === "primary"
                      ? "btn-primary w-auto px-5"
                      : "inline-flex items-center justify-center rounded-md border border-white/70 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  }
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>

    {stats.length > 0 && (
      <section className="page-container grid gap-4 py-8 md:grid-cols-3">
        {stats.map(({ label, value }) => (
          <div key={label} className="rounded-lg border border-border bg-white p-5">
            <p className="text-2xl font-bold text-text-base">{value}</p>
            <p className="mt-1 text-sm text-text-muted">{label}</p>
          </div>
        ))}
      </section>
    )}

    {sections.length > 0 && (
      <section className="page-container grid gap-5 py-10 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <InfoCard key={section.title} {...section} />
        ))}
      </section>
    )}

    {faqs.length > 0 && (
      <section className="page-container pb-14 pt-4">
        <div className="rounded-lg border border-border bg-white px-6 py-3 shadow-card">
          {faqs.map((faq) => (
            <FaqRow key={faq.question} {...faq} />
          ))}
        </div>
      </section>
    )}
  </main>
);

StaticContentPage.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      variant: PropTypes.string,
    })
  ),
  eyebrow: PropTypes.string.isRequired,
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      answer: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
    })
  ),
  heroImage: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

/** Handles translate static page. */
const translateStaticPage = (page, t) => ({
  eyebrow: t(page.eyebrowKey),
  title: t(page.titleKey),
  subtitle: t(page.subtitleKey),
  heroImage: page.heroImage,
  actions: (page.actions ?? []).map(({ labelKey, ...action }) => ({
    ...action,
    label: t(labelKey),
  })),
  stats: (page.stats ?? []).map(({ labelKey, valueKey, ...stat }) => ({
    ...stat,
    label: t(labelKey),
    value: valueKey ? t(valueKey) : stat.value,
  })),
  sections: (page.sections ?? []).map(({ descriptionKey, titleKey, ...section }) => ({
    ...section,
    description: t(descriptionKey),
    title: t(titleKey),
  })),
  faqs: (page.faqs ?? []).map(({ answerKey, questionKey }) => ({
    answer: t(answerKey),
    question: t(questionKey),
  })),
});

/** Handles localized static content page. */
const LocalizedStaticContentPage = ({ page }) => {
  const { t } = useI18n();
  return <StaticContentPage {...translateStaticPage(page, t)} />;
};

LocalizedStaticContentPage.propTypes = {
  page: PropTypes.object.isRequired,
};

const helpCenterFaqs = [
  {
    questionKey: "static.help.faq_order_q",
    answerKey: "static.help.faq_order_a",
  },
  {
    questionKey: "static.help.faq_address_q",
    answerKey: "static.help.faq_address_a",
  },
  {
    questionKey: "static.help.faq_voucher_q",
    answerKey: "static.help.faq_voucher_a",
  },
];

const helpCenterPage = {
  eyebrowKey: "static.help.eyebrow",
  titleKey: "static.help.title",
  subtitleKey: "static.help.subtitle",
  heroImage: "/dailynews.jpg",
  actions: [
    { href: "/contact", labelKey: "static.help.action_contact", variant: "primary" },
    { href: "/faqs", labelKey: "static.help.action_faqs" },
  ],
  sections: [
    {
      icon: TruckIcon,
      titleKey: "static.help.track_title",
      descriptionKey: "static.help.track_desc",
    },
    {
      icon: ShieldCheckIcon,
      titleKey: "static.help.returns_title",
      descriptionKey: "static.help.returns_desc",
    },
    {
      icon: QuestionMarkCircleIcon,
      titleKey: "static.help.faqs_title",
      descriptionKey: "static.help.faqs_desc",
    },
  ],
  faqs: helpCenterFaqs,
};

const careerPage = {
  eyebrowKey: "static.careers.eyebrow",
  titleKey: "static.careers.title",
  subtitleKey: "static.careers.subtitle",
  heroImage: "/dailynews.jpg",
  actions: [
    { href: "/contact", labelKey: "static.careers.action_apply", variant: "primary" },
    { href: "/about-us", labelKey: "static.careers.action_about" },
  ],
  stats: [
    { value: "3", labelKey: "static.careers.stat_products" },
    { value: "24h", labelKey: "static.careers.stat_response" },
    { value: "Hybrid", labelKey: "static.careers.stat_work" },
  ],
  sections: [
    {
      icon: BriefcaseIcon,
      titleKey: "static.careers.ops_title",
      descriptionKey: "static.careers.ops_desc",
    },
    {
      icon: SparklesIcon,
      titleKey: "static.careers.content_title",
      descriptionKey: "static.careers.content_desc",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      titleKey: "static.careers.success_title",
      descriptionKey: "static.careers.success_desc",
    },
  ],
};

const aboutPage = {
  eyebrowKey: "static.about.eyebrow",
  titleKey: "static.about.title",
  subtitleKey: "static.about.subtitle",
  heroImage: "/dailynews.jpg",
  stats: [
    { value: "6", labelKey: "static.about.stat_categories" },
    { value: "100%", labelKey: "static.about.stat_transparent" },
    { valueKey: "static.about.stat_returns_value", labelKey: "static.about.stat_returns" },
  ],
  sections: [
    {
      icon: CheckCircleIcon,
      titleKey: "static.about.practical_title",
      descriptionKey: "static.about.practical_desc",
    },
    {
      icon: ShieldCheckIcon,
      titleKey: "static.about.clear_title",
      descriptionKey: "static.about.clear_desc",
    },
    {
      icon: TruckIcon,
      titleKey: "static.about.seamless_title",
      descriptionKey: "static.about.seamless_desc",
    },
  ],
};

const contactPage = {
  eyebrowKey: "static.contact.eyebrow",
  titleKey: "static.contact.title",
  subtitleKey: "static.contact.subtitle",
  heroImage: "/dailynews.jpg",
  sections: [
    {
      icon: EnvelopeIcon,
      titleKey: "static.contact.email_title",
      descriptionKey: "static.contact.email_desc",
    },
    {
      icon: PhoneIcon,
      titleKey: "static.contact.hotline_title",
      descriptionKey: "static.contact.hotline_desc",
    },
    {
      icon: MapPinIcon,
      titleKey: "static.contact.office_title",
      descriptionKey: "static.contact.office_desc",
    },
  ],
};

const termsPage = {
  eyebrowKey: "static.terms.eyebrow",
  titleKey: "static.terms.title",
  subtitleKey: "static.terms.subtitle",
  heroImage: "/dailynews.jpg",
  sections: [
    {
      icon: ClipboardDocumentCheckIcon,
      titleKey: "static.terms.account_title",
      descriptionKey: "static.terms.account_desc",
    },
    {
      icon: CheckCircleIcon,
      titleKey: "static.terms.order_title",
      descriptionKey: "static.terms.order_desc",
    },
    {
      icon: ShieldCheckIcon,
      titleKey: "static.terms.content_title",
      descriptionKey: "static.terms.content_desc",
    },
  ],
};

const policyPage = {
  eyebrowKey: "static.policy.eyebrow",
  titleKey: "static.policy.title",
  subtitleKey: "static.policy.subtitle",
  heroImage: "/dailynews.jpg",
  sections: [
    {
      icon: TruckIcon,
      titleKey: "static.policy.shipping_title",
      descriptionKey: "static.policy.shipping_desc",
    },
    {
      icon: ShieldCheckIcon,
      titleKey: "static.policy.returns_title",
      descriptionKey: "static.policy.returns_desc",
    },
    {
      icon: ClipboardDocumentCheckIcon,
      titleKey: "static.policy.data_title",
      descriptionKey: "static.policy.data_desc",
    },
  ],
};

const faqPage = {
  eyebrowKey: "static.faq.eyebrow",
  titleKey: "static.faq.title",
  subtitleKey: "static.faq.subtitle",
  heroImage: "/dailynews.jpg",
  faqs: helpCenterFaqs,
};

/** Handles help center page. */
export const HelpCenterPage = () => <LocalizedStaticContentPage page={helpCenterPage} />;
/** Handles career page. */
export const CareerPage = () => <LocalizedStaticContentPage page={careerPage} />;
/** Handles about us page. */
export const AboutUsPage = () => <LocalizedStaticContentPage page={aboutPage} />;
/** Handles contact page. */
export const ContactPage = () => <LocalizedStaticContentPage page={contactPage} />;
/** Handles terms page. */
export const TermsPage = () => <LocalizedStaticContentPage page={termsPage} />;
/** Handles policy page. */
export const PolicyPage = () => <LocalizedStaticContentPage page={policyPage} />;
/** Handles faq page. */
export const FaqPage = () => <LocalizedStaticContentPage page={faqPage} />;

export default StaticContentPage;
