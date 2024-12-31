$(document).ready(function (){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    console.log(id);

    let booksData = [];

    fetch("../../books.json")
        .then((rawData) => rawData.json())
        .then(books => {

            console.log(books[id]);

            let book = books[id];
            let name = book["bookTitle"];
            let image = book["image"]
            let bookSynopsis = book["synopsis"];
            let price = book["price"];
            let genre = book["genre"];
            let pubYear = book["publicationDate"];
            let author = book["author"];
            let ISBN = book["ISBN"];

            $(".book-title-center").html(name);
            $(".bookStory").html(bookSynopsis);
            $(".bookImage").html(`<img src="${image}" alt="${name}"/>`);
            $(".bookISBN").html(ISBN);
            $(".bookGenre").html(genre);
            $(".bookPubYear").html(pubYear);
            $(".bookAuthor").html(author);
            $(".bookPrice").html(`P${price}.00`);
            $(".header-title").html(`${name} | LitHub`);

            // Add event listener to the "Add to Cart" button
            $("#add-to-cart").on("click", function () {
                addToCart(book);
            });              
        });

        function addToCart(book) {
            // Retrieve the cart from localStorage (or initialize if it doesn't exist)
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
            // Check if the book is already in the cart
            const existingItem = cart.find((item) => item.id === book.id);
    
            if (existingItem) {
                // If it exists, increase the quantity
                existingItem.quantity += 1;
            } else {
                // If not, add it as a new item with a quantity of 1
                cart.push({ ...book, quantity: 1 });
            }
    
            // Save the updated cart back to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));
    
            // Display confirmation
            alert(`${book.bookTitle} has been added to your cart.`);
        }
});