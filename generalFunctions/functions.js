export const updateCart = (receivedItemsToUpdate) => {
  let cartItemsToReturn;
  localStorage.setItem("cartItems", JSON.stringify(receivedItemsToUpdate));
  cartItemsToReturn = JSON.parse(localStorage.getItem("cartItems"));
  return cartItemsToReturn;
};
