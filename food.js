
//console.log("here");
var addToCartButton = document.getElementsByClassName('btn-primary')
//console.log(addToCartButton)
for (var i = 0; i < addToCartButton.length; i++) {
    var button = addToCartButton[i]
    button.addEventListener('click', addToCart)
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('btn-primary')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCart)
    }

    //document.getElementsByClassName("btn-purchase").addEventListener('click', placeOrder)

}

function addToCart(event) {
    //console.log("clicked")
    var buttonClicked = event.target
    var item = buttonClicked.parentElement
    //var name = item.getElementsByClassName("item-name")[0].innerText
    //console.log(item)
    var name = item.getElementsByClassName("item-name")[0].innerText
    var price = item.getElementsByClassName("price")[0].innerText
    //console.log(price)
    //console.log(name)
    addItemToCart(name, price)
    updateCartTotal()
}

function addItemToCart(name, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('container')
    var cartItem = document.getElementsByClassName('cart-item')[0]
    var cartItemName = cartItem.getElementsByClassName('cart-item-title')
    for (var i =0; i < cartItemName.length; i++) {
        if (cartItemName[i].innerText == name) {
            return
        }
    }
   /* var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${name}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
        </div>
        <div>
            <button class="btn btn-danger" type="button">REMOVE</button>
         </div><br><br>`*/
    var cartRowContents = `
        <div class = 'cart-row'>
            <div class="cart-item cart-column">
                <span class="cart-item-title">${name}</span>
                <span class="cart-price cart-column">${price}</span>
                <span class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </span>
            <div>
        </div><br><br>`
    /*var cartRowContents = `
        <div class = 'cart-row'>
            <div class="cart-item cart-column">
                <div class="cart-item-title">${name}</div>
                <div class="cart-price cart-column">${price}</div>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>
            <div>
        </div><br><br>`*/

    cartRow.innerHTML = cartRowContents
    cartItem.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function removeCartItem(event) {
    var buttonClicked = event.target
    var item = buttonClicked.parentElement.parentElement.parentElement.parentElement
    console.log(item)
    item.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}


function updateCartTotal() {
   // console.log('bla')
    var cartItemContainer = document.getElementsByClassName('cart-item')[0]
   // console.log(cartItemContainer)
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
       // console.log('bla')
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
       // console.log(quantity)
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}


var modal = document.getElementById("myModal");
var btn = document.getElementById("order");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}






