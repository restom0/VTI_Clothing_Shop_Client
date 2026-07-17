/** Gets product id. */
export const getProductId = (product) => product?.product_id?.product_id?.id;

/** Gets unique products. */
export const getUniqueProducts = (productsResponse) => {
  const products = Array.isArray(productsResponse?.object) ? productsResponse.object : [];
  const seenIds = new Set();

  return products.filter((product) => {
    const productId = getProductId(product);

    if (productId === null || productId === undefined) {
      return true;
    }

    if (seenIds.has(productId)) {
      return false;
    }

    seenIds.add(productId);
    return true;
  });
};

/** Gets home labels. */
export const getHomeLabels = (t) => ({
  newProducts: t("home.new_products"),
  styleQuote: t("home.style_quote"),
  newsletterTitle: t("home.newsletter_title"),
  newsletterCopy: t("home.newsletter_copy"),
  emailLabel: t("home.email_label"),
});

/** Gets home error message. */
export const getHomeErrorMessage = (error, t) =>
  error ? t("common.error", { message: error.message ?? "" }) : "";
