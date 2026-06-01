import api from "../core/api.js";

export async function getProductBySlug(
slug
) {
return api.get(
`/v1/products/slug/${slug}`
);
}

export async function getProductReviews(
productId,
page = 1,
sort = "latest"
) {
return api.get(
`/v1/reviews/product/${productId}?page=${page}&sort=${sort}`
);
}


export async function createReview(
  productId,
  formData
) {
  return api.post(
    `/v1/reviews/product/${productId}`,
    formData
  );
}

export async function getSimilarProducts(
category
) {
return api.get(
`/v1/products?category=${category}&limit=10`
);
}

export async function getTrendingProducts() {
return api.get(
"/v1/products?tag=trending&limit=10"
);
}
