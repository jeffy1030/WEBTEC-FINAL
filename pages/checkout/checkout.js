$(document).ready(function () {
    const checkoutItems = $("#checkout-items");
    const checkoutTotal = $("#checkout-total");

    // Load cart data
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        checkoutItems.html(`<p>Your cart is empty. Go back to add items.</p>`);
        return;
    }

    let total = 0;
    let num = 1;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        checkoutItems.append(`          
            <div class="row mb-3">
                <div class="col-md-6">${num++}. ${item.bookTitle}</div>
                <div class="col-md-2">P${item.price}.00</div>
                <div class="col-md-2">x${item.quantity}</div>
                <div class="col-md-2">P${subtotal}.00</div>
            </div>
        `);
    });

    checkoutTotal.text(`P${total}.00`);

    // Handle form submission
    // As long as it meets the condition where all inputs are "required", simple back-end will do
    $("#checkout-form").submit(function (e) {
        e.preventDefault();

        const name = $("#name").val();
        
        alert(`Thank you for your order, ${name}! Your total is P${total}.00.`);
        localStorage.removeItem("cart");
        window.location.href = "../../index.html";
    });
});
