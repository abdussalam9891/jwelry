export async function saveRecentlyViewed(productId) {
  if (!productId) return;

  try {
    const user = await Auth.getCurrentUser();

    if (!user) return;

    await addRecentlyViewed(productId);
  } catch (error) {
    console.error(
      "Failed to save recently viewed:",
      error
    );
  }
}
