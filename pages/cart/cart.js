$(document).ready(function () {
    const cartTable = $("#cart-items");
    const totalPriceElement = $("#total-price");

    // Function to load the cart from localStorage
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Clear the table before rendering
        cartTable.empty();

        if (cart.length === 0) {
            cartTable.append(`
                <tr>
                    <td colspan="5" class="text-center">Your cart is empty!</td>
                </tr>
            `);
            totalPriceElement.text("P0.00");
            return;
        }

        let total = 0;

        // Render each item in the cart
        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            cartTable.append(`
                <tr>
                    <td>${item.bookTitle}</td>
                    <td>P${item.price}.00</td>
                    <td>
                        <input type="number" class="form-control quantity-input" 
                               data-index="${index}" value="${item.quantity}" min="1">
                    </td>
                    <td>P${subtotal}.00</td>
                    <td>
                        <button class="btn btn-danger remove-btn" data-index="${index}">Remove</button>
                    </td>
                </tr>
            `);
        });

        // Update total price
        totalPriceElement.text(`P${total}.00`);
    }

    // Event listener for changing quantity
    cartTable.on("input", ".quantity-input", function () {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const index = $(this).data("index");
        const newQuantity = parseInt($(this).val(), 10);

        if (newQuantity >= 1) {
            cart[index].quantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        }
    });

    // Event listener for removing items
    cartTable.on("click", ".remove-btn", function () {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const index = $(this).data("index");

        // Remove item from cart
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    });

    $(".btn-success").click(function () {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart.length === 0) {
            alert("Your cart is empty! Add items before proceeding to checkout.");
            return;
        }
        window.location.href = "../../pages/checkout/checkout.html";
    });

    // Initial load
    loadCart();
});