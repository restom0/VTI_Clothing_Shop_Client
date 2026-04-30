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

const PageIcon = ({ icon: Icon }) => (
  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-muted text-primary">
    <Icon className="h-6 w-6" strokeWidth={2} />
  </span>
);

PageIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
};

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
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="page-container relative flex min-h-[360px] items-center py-14">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-white md:text-5xl">
            {title}
          </h1>
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

const helpCenterPage = {
  eyebrow: "Help center",
  title: "Trung tâm hỗ trợ VTI Shop",
  subtitle:
    "Tìm nhanh câu trả lời về đơn hàng, thanh toán, vận chuyển, đổi trả và tài khoản. Nếu cần hỗ trợ thêm, đội chăm sóc khách hàng luôn sẵn sàng tiếp nhận.",
  heroImage: "/dailynews.jpg",
  actions: [
    { href: "/contact", label: "Liên hệ hỗ trợ", variant: "primary" },
    { href: "/faqs", label: "Xem FAQs" },
  ],
  sections: [
    {
      icon: TruckIcon,
      title: "Theo dõi đơn hàng",
      description:
        "Kiểm tra trạng thái xử lý, vận chuyển và thời gian giao dự kiến ngay trong trang tài khoản.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Đổi trả minh bạch",
      description:
        "Sản phẩm còn nguyên tem, chưa qua sử dụng có thể gửi yêu cầu đổi trả theo chính sách cửa hàng.",
    },
    {
      icon: QuestionMarkCircleIcon,
      title: "Câu hỏi thường gặp",
      description:
        "Tổng hợp những vấn đề phổ biến về size, voucher, thanh toán và cập nhật thông tin cá nhân.",
    },
  ],
  faqs: [
    {
      question: "Làm sao để kiểm tra đơn hàng?",
      answer:
        "Đăng nhập tài khoản, mở trang Hồ sơ và chọn mục Đơn hàng để xem trạng thái mới nhất.",
    },
    {
      question: "Tôi nhập sai địa chỉ giao hàng thì xử lý thế nào?",
      answer:
        "Hãy liên hệ bộ phận hỗ trợ càng sớm càng tốt. Nếu đơn chưa bàn giao cho đơn vị vận chuyển, thông tin có thể được cập nhật.",
    },
    {
      question: "Voucher có áp dụng cùng khuyến mãi không?",
      answer:
        "Một số voucher có điều kiện riêng. Thông tin áp dụng sẽ hiển thị ở bước thanh toán trước khi xác nhận đơn.",
    },
  ],
};

const careerPage = {
  eyebrow: "Careers",
  title: "Cùng xây trải nghiệm mua sắm thời trang tốt hơn",
  subtitle:
    "VTI Shop tìm kiếm những người thích sản phẩm đẹp, dữ liệu rõ ràng và dịch vụ khách hàng tử tế. Mỗi vai trò đều góp phần làm hành trình mua sắm mượt hơn.",
  heroImage: "/dailynews.jpg",
  actions: [
    { href: "/contact", label: "Gửi hồ sơ", variant: "primary" },
    { href: "/about-us", label: "Về VTI Shop" },
  ],
  stats: [
    { value: "3", label: "Nhóm sản phẩm chính" },
    { value: "24h", label: "Ưu tiên phản hồi ứng viên" },
    { value: "Hybrid", label: "Mô hình làm việc linh hoạt" },
  ],
  sections: [
    {
      icon: BriefcaseIcon,
      title: "Retail operations",
      description:
        "Tối ưu tồn kho, đơn hàng, khuyến mãi và quy trình vận hành hằng ngày của cửa hàng.",
    },
    {
      icon: SparklesIcon,
      title: "Brand & content",
      description:
        "Kể câu chuyện sản phẩm qua hình ảnh, nội dung, bộ sưu tập và chiến dịch theo mùa.",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Customer success",
      description:
        "Lắng nghe phản hồi, giải quyết vấn đề và biến mỗi lần hỗ trợ thành trải nghiệm dễ chịu.",
    },
  ],
};

const aboutPage = {
  eyebrow: "About us",
  title: "VTI Shop là cửa hàng thời trang dành cho nhịp sống hiện đại",
  subtitle:
    "Chúng tôi chọn lọc sản phẩm dễ mặc, dễ phối và bền trong sử dụng hằng ngày. Trải nghiệm mua sắm được thiết kế rõ ràng từ tìm kiếm, chọn size đến thanh toán.",
  heroImage: "/dailynews.jpg",
  stats: [
    { value: "6", label: "Nhóm danh mục đang phát triển" },
    { value: "100%", label: "Sản phẩm có thông tin minh bạch" },
    { value: "7 ngày", label: "Khung hỗ trợ đổi trả tiêu chuẩn" },
  ],
  sections: [
    {
      icon: CheckCircleIcon,
      title: "Chọn lọc thực tế",
      description:
        "Danh mục tập trung vào những sản phẩm có tính ứng dụng cao, phù hợp nhiều bối cảnh mặc.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Thông tin rõ ràng",
      description:
        "Giá, khuyến mãi, hình ảnh và mô tả sản phẩm được trình bày để khách hàng dễ so sánh.",
    },
    {
      icon: TruckIcon,
      title: "Mua sắm liền mạch",
      description:
        "Từ giỏ hàng đến checkout, chúng tôi ưu tiên thao tác nhanh và trạng thái đơn hàng dễ theo dõi.",
    },
  ],
};

const contactPage = {
  eyebrow: "Contact",
  title: "Liên hệ VTI Shop",
  subtitle:
    "Cần tư vấn size, kiểm tra đơn hàng, hợp tác thương hiệu hoặc hỗ trợ tài khoản? Gửi thông tin cho chúng tôi qua các kênh bên dưới.",
  heroImage: "/dailynews.jpg",
  sections: [
    {
      icon: EnvelopeIcon,
      title: "Email",
      description: "support@vtishop.example - phản hồi trong giờ làm việc.",
    },
    {
      icon: PhoneIcon,
      title: "Hotline",
      description: "1900 0000 - hỗ trợ đơn hàng, thanh toán và đổi trả.",
    },
    {
      icon: MapPinIcon,
      title: "Văn phòng",
      description: "Tòa nhà VTI, Hà Nội - tiếp nhận lịch hẹn đối tác.",
    },
  ],
};

const termsPage = {
  eyebrow: "Terms",
  title: "Điều khoản sử dụng",
  subtitle:
    "Các điều khoản này giúp việc mua sắm tại VTI Shop minh bạch hơn: tài khoản, đơn hàng, thanh toán, vận chuyển và trách nhiệm của mỗi bên.",
  heroImage: "/dailynews.jpg",
  sections: [
    {
      icon: ClipboardDocumentCheckIcon,
      title: "Tài khoản",
      description:
        "Khách hàng chịu trách nhiệm bảo mật thông tin đăng nhập và tính chính xác của dữ liệu đặt hàng.",
    },
    {
      icon: CheckCircleIcon,
      title: "Đơn hàng",
      description:
        "Đơn hàng chỉ được xác nhận sau khi hệ thống ghi nhận đầy đủ thông tin sản phẩm, địa chỉ và phương thức thanh toán.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Nội dung",
      description:
        "Hình ảnh, mô tả và dữ liệu sản phẩm thuộc hệ thống VTI Shop và không được sử dụng sai mục đích.",
    },
  ],
};

const policyPage = {
  eyebrow: "Policy",
  title: "Chính sách mua hàng",
  subtitle:
    "Chính sách tổng hợp các nguyên tắc về vận chuyển, đổi trả, hoàn tiền và bảo vệ thông tin khách hàng khi mua sắm tại VTI Shop.",
  heroImage: "/dailynews.jpg",
  sections: [
    {
      icon: TruckIcon,
      title: "Vận chuyển",
      description:
        "Thời gian giao hàng phụ thuộc địa chỉ nhận và tình trạng sản phẩm tại kho.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Đổi trả",
      description:
        "Yêu cầu đổi trả được tiếp nhận khi sản phẩm đáp ứng điều kiện tem mác, tình trạng và thời hạn chính sách.",
    },
    {
      icon: ClipboardDocumentCheckIcon,
      title: "Dữ liệu cá nhân",
      description:
        "Thông tin khách hàng chỉ được dùng cho vận hành đơn hàng, chăm sóc khách hàng và thông báo liên quan.",
    },
  ],
};

const faqPage = {
  eyebrow: "FAQs",
  title: "Câu hỏi thường gặp",
  subtitle:
    "Những câu trả lời ngắn gọn cho các tình huống khách hàng hay gặp khi mua sắm tại VTI Shop.",
  heroImage: "/dailynews.jpg",
  faqs: helpCenterPage.faqs,
};

export const HelpCenterPage = () => <StaticContentPage {...helpCenterPage} />;
export const CareerPage = () => <StaticContentPage {...careerPage} />;
export const AboutUsPage = () => <StaticContentPage {...aboutPage} />;
export const ContactPage = () => <StaticContentPage {...contactPage} />;
export const TermsPage = () => <StaticContentPage {...termsPage} />;
export const PolicyPage = () => <StaticContentPage {...policyPage} />;
export const FaqPage = () => <StaticContentPage {...faqPage} />;

export default StaticContentPage;
