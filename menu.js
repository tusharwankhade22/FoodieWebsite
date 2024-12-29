//cart
let cartIcon=document.querySelector("#cart-icon");
let cart=document.querySelector(".cart");
let closeCart=document.querySelector("#close-cart");

cartIcon.addEventListener("click",()=>{
    cart.classList.add("active")
})

closeCart.addEventListener("click",()=>{
    cart.classList.remove("active")
})

//cart working Js
if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded",ready)
}
else{
    ready();
}

//Making Function
function ready(){
    //remove items from Cart
    var removeCartButtons=document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for(var i=0;i < removeCartButtons.length;i++){
        var button=removeCartButtons[i];
        button.addEventListener("click",removeCartItem)
    }
    //quantity changes
    var quantityInputs=document.getElementsByClassName("cart-quantity")
    for(var i=0;i< quantityInputs.length;i++){
        var input=quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    //Add to Cart

    var addCart=document.getElementsByClassName("add-cart");
    for(var i=0;i < addCart.length;i++){
        var button=addCart[i];
        button.addEventListener("click",addCartClicked);
    }

    //buy button work
    document.getElementsByClassName("btn-buy")[0]
    .addEventListener("click",buyButtonClicked);
}
//buy button
function buyButtonClicked(){

    alert("Your Order is Placed")
    var cartContent =document.getElementsByClassName("cart-content")[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

//Remove Items From Cart
function removeCartItem(event){
    var buttonClicked=event.target
    buttonClicked.parentElement.remove();
    updatetotal();
}

//quantity changes
function quantityChanged(event){
    var input=event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value=1;
    }
    updatetotal();
}
//Add to cart
function addCartClicked(event){
    var button=event.target;
    var shopProducts=button.parentElement;
    var title=shopProducts.getElementsByClassName("product-title")[0].innerText
    var price=shopProducts.getElementsByClassName("price")[0].innerText
    var productImg=shopProducts.getElementsByClassName("product-img")[0].src

    addProductToCart(title,price,productImg);
    updatetotal();
}

function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems=document.getElementsByClassName("cart-content")[0];
    var cartItemsNames=cartItems.getElementsByClassName("cart-product-title");
    for(var i=0;i < cartItemsNames.length;i++){
        if (cartItemsNames[i].innerText == title) {
            alert("You Have already add this Item to cart")
            return;
        }
    }

var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">
                                ${title}
                            </div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity" >
                        </div>
                        <!-- remove cart -->
                        <i class="bx bxs-trash-alt cart-remove"></i>
`;
cartShopBox.innerHTML=cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox
 .getElementsByClassName("cart-remove")[0]
 .addEventListener("click",removeCartItem)
cartShopBox
 .getElementsByClassName("cart-quantity")[0]
 .addEventListener("change",quantityChanged)
}
//update total
function updatetotal(){
    var cartContent=document.getElementsByClassName("cart-content")[0];
    var cartBoxes=cartContent.getElementsByClassName("cart-box")
    var total=0;
    for(var i=0;i<cartBoxes.length;i++){
        var cartBox=cartBoxes[i];
        var priceElement=cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement=cartBox.getElementsByClassName("cart-quantity")[0];
        var price=parseFloat(priceElement.innerText.replace("$",""))
        var quantity=quantityElement.value;
        total=total+(price*quantity);
        //if price contain some cents value
    }
    total=Math.round(total *100)/100;
    document.getElementsByClassName("total-price")[0].innerText="$"+total;
    console.log(total);
}


//search 
// Search Bar Functionality
const searchBar = document.getElementById("search-bar");
const shopContent = document.querySelector(".shop-content");

searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase(); // Get search query
  const products = shopContent.getElementsByClassName("product-box");

  let hasResults = false;

  Array.from(products).forEach((product) => {
    const title = product.querySelector(".product-title").innerText.toLowerCase();
    if (title.includes(query)) {
      product.style.display = "block"; // Show matching products
      hasResults = true;
    } else {
      product.style.display = "none"; // Hide non-matching products
    }
  });

  // No results found message
  const existingMessage = document.querySelector('.no-results');
  if (!hasResults && query.length > 0) {
    if (!existingMessage) {
      const noResultsMessage = document.createElement('p');
      noResultsMessage.classList.add('no-results');
      noResultsMessage.textContent = "No products found.";
      shopContent.appendChild(noResultsMessage);
    }
  } else if (existingMessage) {
    existingMessage.remove();
  }
});

