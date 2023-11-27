function handleProductClick(
  productId,
  productName,
  productImage,
  productDescription,
  productPrice
) {
  // Set the data to localStorage so it can be accessed on the detailProduct.html page
  localStorage.setItem("productId", productId);
  localStorage.setItem("productName", productName);
  localStorage.setItem("productImage", productImage);
  localStorage.setItem("productDescription", productDescription);
  localStorage.setItem("productPrice", productPrice);

  // Log the data to the console for debugging
  console.log("Product data stored in localStorage:", {
    productId,
    productName,
    productImage,
    productDescription,
    productPrice,
  });

  // Redirect to the detailProduct.html page
  window.location.href = "detailProduct.html";
}
