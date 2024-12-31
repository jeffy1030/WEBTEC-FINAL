$(document).ready(function () {
    let booksData = []; // To store all books data
    let filteredBooks = []; // To store filtered books based on genre
    let currentGenre = "View Books"; // To track the selected genre
    let currentSort = "Sort by A-Z"; // To track the selected sorting method

    // Fetch the book data
    fetch("../../books.json")
        .then((rawData) => rawData.json())
        .then((books) => {
            booksData = books; // Store the books data
            filteredBooks = [...booksData]; // Initially, filteredBooks contains all books
            displayBooks(filteredBooks); // Display all books initially
        });

    // Function to display books
    function displayBooks(books) {
        $('.books').empty(); // Clear current books

        if (books.length === 0) {
            $('.books').append('<p class="text-center">No books found.</p>');
            return;
        }

        books.forEach(book => {
            let { id, price, image, bookTitle, author } = book;

            $('.books').append(
                ` <div class="card">                    
                    <div class="card-body">                         
                        <a href="../../pages/productList/productList.html?id=${id}"><img src="${image}" class="img-fluid"></a>
                        <div class="book-title">
                            <h5 class="card-title fs-3">${bookTitle}</h5>
                        </div>
                        <div class="book-author">
                            <h5 class="card-title">Author: ${author}</h5>
                        </div>
                        <div class="book-price">
                            <p class="card-text fs-5">Price: P${price}.00</p>
                        </div>       
                    </div>                                                      
                </div>`
            );
        });
    }

    // Search functionality
    $('#searchBar').on('input', function () {
        let query = $(this).val().toLowerCase();
        let filteredBooks = booksData.filter(book =>
            book.bookTitle.toLowerCase().includes(query)       
        );
        displayBooks(filteredBooks); // Update the displayed books
    });

    function filterAndSortBooks() {
        let filtered = [...booksData];

        // Apply genre filter
        if (currentGenre !== "View Books") {
            filtered = filtered.filter(book => book.genre === currentGenre);
        }

        // Apply sorting
        switch (currentSort) {
            case 'View Books':
                filtered = [...booksData];
                break;
            case 'Sort by Price: (Low to Max)':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'Sort by Price: (Max to Low)':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'Sort by A-Z':
                filtered.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle));
                break;
            case 'Sort by Z-A':
                filtered.sort((a, b) => b.bookTitle.localeCompare(a.bookTitle));
                break;
        }

        displayBooks(filtered);
    }

    // Filter by Genre
    $('.genre-dropdown-menu').on('click', '.dropdown-item', function () {
        currentGenre = $(this).text(); // Update the current genre

        if (currentGenre === 'View Books') {
            $('.btn-success.dropdown-toggle').text('Sort by Genre '); // Reset button title
        } else {
            $('.btn-success.dropdown-toggle').text(`Genre: ${currentGenre}`);
        }

        filterAndSortBooks(); // Apply the combined filter and sort
    });

    // Sort by Price or Lettering
    $('.sort-dropdown-menu').on('click', '.dropdown-item', function () {
        currentSort = $(this).text(); // Update the current sorting method
        if (currentSort === 'View All Books') {
            $('.btn-info.dropdown-toggle').text('Sort '); // Update the button title
        }
        else{
            $('.btn-info.dropdown-toggle').text(currentSort); // Update the button title
        }
        filterAndSortBooks(); // Apply the combined filter and sort
    });
});
