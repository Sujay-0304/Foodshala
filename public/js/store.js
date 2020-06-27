


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
   var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('btn-primary');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var buttonCart = addToCartButtons[i];
        buttonCart.addEventListener('click', addToCart);
    }

  document.getElementsByClassName('btn-success')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked() {


    alert('Thank you for your purchase');
    var cartItems = document.getElementsByClassName('items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);

    updateCartTotal();

}

}


function removeCartItem(event){
  event.target.parentElement.parentElement.remove();
 updateCartTotal();
}




function quantityChanged(event){
  var input = event.target;
  if(isNaN(input.value) || input.value <= 0){
    input.value = 1;
  }
    updateCartTotal();
}



function addToCart(event){
  var buttonCartAdder = event.target;

  var shopItems = buttonCartAdder.parentElement.parentElement;
   var titletag = shopItems.getElementsByClassName("titletag")[0].innerText;
   var pricetag = shopItems.getElementsByClassName("pricetag")[0].innerText;
   console.log(titletag,pricetag);
   addItemsToCart(titletag,pricetag);
  updateCartTotal();
}


function addItemsToCart(titletag,pricetag){

   var cartRow = document.createElement("div");
   //cartRow.classList.add("row");
  var cartItems = document.getElementsByClassName("items")[0];

  var cartItemName = cartItems.getElementsByClassName("cart-title");
  for(var i=0;i< cartItemName.length;i++){
    if(cartItemName[i].innerText === titletag){
      alert("you have this item already in cart");
      return;
    }
  }
  var cartRowContents =`

  <div class="cart-item items">
  <div class="row cart-row inside text-center">
      <div class="col-3 cart-title"> ${titletag} </div>
      <div class="col-3 veg cart-price"> ${pricetag} </div>
      <div class="col-3"> <input type="number" class="quantity" value="1"></div>
      <div class="col-3"> <button type="button" class="btn  btn-danger"name="button">REMOVE</button> </div>
      </div>
      </div>
      <hr>
        `;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click",removeCartItem);
  cartRow.getElementsByClassName("quantity")[0].addEventListener("change",quantityChanged);



}




function updateCartTotal(){

var cartItemContainer = document.getElementsByClassName("items")[0];
var cartRows = cartItemContainer.getElementsByClassName(" cart-row");
var total= 0;

for(var i=0; i<cartRows.length ; i++){

var cartRow = cartRows[i];

var cartPrice = cartRow.getElementsByClassName("cart-price")[0];

var quantityElement = cartRow.getElementsByClassName("quantity")[0];



var price = cartPrice.innerText.replace("price:", "");

var quantity = quantityElement.value;

total = total+(quantity*price);
}
document.getElementsByClassName("cost")[0].innerText = total;
}
