/** Checks whether logout menu item. */
export const isLogoutMenuItem = (item) => item?.labelKey === "common.logout";

/** Gets account menu items. */
export const getAccountMenuItems = (accountMenu, t) =>
  accountMenu.map((item, index) => ({
    ...item,
    href: isLogoutMenuItem(item) ? "#" : item.link,
    isDanger: index === accountMenu.length - 1,
    text: item.labelKey ? t(item.labelKey) : item.label,
  }));

/** Gets banner labels. */
export const getBannerLabels = (t) => ({
  freeShipping: t("banner.free_shipping"),
  login: t("common.login"),
  register: t("common.register"),
});
