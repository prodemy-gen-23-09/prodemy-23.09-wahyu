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

  // console.log("Product data stored in localStorage:", {
  //   productId,
  //   productName,
  //   productImage,
  //   productDescription,
  //   productPrice,
  // });

  window.location.href = "detailProduct.html";
}
