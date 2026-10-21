// src/js/features/productDetails/state.js

export const productState = {
  // Product
  currentProduct: null,
  currentProductId: null,

  // User
  currentUser: null,

  // Variant Selection
  selectedMaterial: null,
  selectedSize: null,
  selectedVariantId: null,

  // Reviews
  editingReviewId: null,
  reviewToDelete: null,
};

export function resetVariantState() {
  productState.selectedMaterial = null;
  productState.selectedSize = null;
  productState.selectedVariantId = null;
}

export function resetReviewState() {
  productState.editingReviewId = null;
  productState.reviewToDelete = null;
}

export function resetProductState() {
  productState.currentProduct = null;
  productState.currentProductId = null;
  productState.currentUser = null;

  resetVariantState();
  resetReviewState();
}
