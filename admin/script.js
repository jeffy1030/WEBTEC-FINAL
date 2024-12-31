$(document).ready(function () {
    var selectedRow = null;

    // Show alerts
    function showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".table-container");
        const main = document.querySelector(".main");
        container.insertBefore(div, main);

        setTimeout(() => document.querySelector(".alert").remove(), 3000);
    }

    // Clear input fields
    function clearFields() {
        document.querySelector("#bookID").value = "";
        document.querySelector("#ISBN").value = "";
        document.querySelector("#bookTitle").value = "";
        document.querySelector("#genre").value = "";
        document.querySelector("#publisher").value = "";
        document.querySelector("#pubDate").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#price").value = "";
        document.querySelector("#synopsis").value = "";
        document.querySelector("#bookImg").value = "";
    }

    // Add data
    $("#student-form").on("submit", function (e) {
        e.preventDefault();

        const bookID = $("#bookID").val();
        const ISBN = $("#ISBN").val();
        const bookTitle = $("#bookTitle").val();
        const genre = $("#genre").val();
        const publisher = $("#publisher").val();
        const pubDate = $("#pubDate").val();
        const author = $("#author").val();
        const price = $("#price").val();
        const synopsis = $("#synopsis").val();
        const image = $("#bookImg").val();

        // Validate fields
        if (!bookID || !ISBN || !bookTitle || !genre || !publisher || !pubDate || !author || !price) {
            showAlert("Please fill all the fields", "danger");
            return;
        }

        if (selectedRow == null) {
            const row = `
                <tr>
                    <td>${bookID}</td>
                    <td><img src="${image}" style="height: 5rem;"></td>
                    <td>${ISBN}</td>
                    <td>${bookTitle}</td>
                    <td>${genre}</td>
                    <td>${publisher}</td>
                    <td>${pubDate}</td>
                    <td>${author}</td>
                    <td>${price}</td>
                    <td>
                        <a href="#" class="btn btn-info btn-sm edit">Edit</a>
                        <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                    </td>
                </tr>
            `;
            $("#student-list").append(row);
            showAlert("Book added successfully", "success");
        } else {
            selectedRow.children[0].textContent = bookID;
            selectedRow.children[2].textContent = ISBN;
            selectedRow.children[3].textContent = bookTitle;
            selectedRow.children[4].textContent = genre;
            selectedRow.children[5].textContent = publisher;
            selectedRow.children[6].textContent = pubDate;
            selectedRow.children[7].textContent = author;
            selectedRow.children[8].textContent = price;
            selectedRow = null;
            showAlert("Book updated successfully", "info");
        }

        clearFields();
    });

    // Edit data
    $("#student-list").on("click", ".edit", function (e) {
        e.preventDefault();

        selectedRow = $(this).closest("tr")[0];
        $("#bookID").val(selectedRow.children[0].textContent);
        $("#ISBN").val(selectedRow.children[2].textContent);
        $("#bookTitle").val(selectedRow.children[3].textContent);
        $("#genre").val(selectedRow.children[4].textContent);
        $("#publisher").val(selectedRow.children[5].textContent);
        $("#pubDate").val(selectedRow.children[6].textContent);
        $("#author").val(selectedRow.children[7].textContent);
        $("#price").val(selectedRow.children[8].textContent);
        $("#synopsis").val("-");
    });

    // Delete data
    $("#student-list").on("click", ".delete", function (e) {
        e.preventDefault();
        $(this).closest("tr").remove();
        showAlert("Book deleted successfully", "danger");
    });

    // Fetch books from JSON
    fetch("../books.json")
        .then((rawData) => rawData.json())
        .then((books) => {
            books.forEach((book) => {
                const { id, price, image, bookTitle, ISBN, genre, publicationDate, author, publisher } = book;
                const row = `
                    <tr>
                        <td>${id}</td>
                        <td><img src="${image}" style="height: 5rem;"></td>
                        <td>${ISBN}</td>
                        <td>${bookTitle}</td>
                        <td>${genre}</td>
                        <td>${publisher}</td>
                        <td>${publicationDate}</td>
                        <td>${author}</td>
                        <td>${price}</td>
                        <td>
                            <a href="#" class="btn btn-info btn-sm edit">Edit</a>
                            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                        </td>
                    </tr>
                `;
                $("#student-list").append(row);
            });
        })
        .catch((error) => console.error("Error fetching books:", error));
});
