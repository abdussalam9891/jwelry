import api from "../core/api.js";





export async function getProducts(
  params = {}
) {
  const query =
    new URLSearchParams(
      params
    ).toString();

  return api.get(
    `/v1/products?${query}`
  );
}

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



export async function updateReview(
  reviewId,
  formData
) {
  return api.patch(
    `/v1/reviews/${reviewId}`,
    formData
  );
}

export async function deleteReview(
  reviewId
) {
  return api.delete(
    `/v1/reviews/${reviewId}`
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
