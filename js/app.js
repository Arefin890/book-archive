
const countDiv = document.getElementById('result-count');
const h2 = document.getElementById('search-not');
// Load Data from sever
const loadData = () => {
    const bookContainer = document.getElementById('books-list');
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;

    if (searchText === '') {
        document.getElementById('error-message').style.display = 'block';
        // document.getElementById('search-not').style.display = 'none';
        searchText.textContent = '';
        searchField.value = '';
        bookContainer.textContent = '';
        countDiv.textContent = '';
        h2.textContent = '';
    }

    else {
        // clear the privious error message
        document.getElementById('error-message').style.display = 'none';
        const searchText = searchField.value;
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayBook(data.docs))
        searchField.value = '';
    }

}

// Display search book
const displayBook = books => {
    console.log(books);
    const bookContainer = document.getElementById('books-list');
    bookContainer.textContent = '';
    countDiv.textContent = '';

    if (books.length === 0) {
        h2.style.display = 'block';
    }
    else {


        books.forEach(book => {

            const div = document.createElement('div');
            div.classList.add('card');
            // image url
            const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

            div.innerHTML = `
                    <img src="${imgUrl}" class="card-img-top book_image" alt="Image">
                    <div class="card-body">
                    <h5 class="card-title">Book Name: ${book.title}</h5>
                    <h5 class="card-text">Author Name: ${book.author_name}</h5>
                    <h5 class="card-title">Publisher: ${book.publisher}</h5>
                    <h5 class="card-text">First Publish: ${book.first_publish_year}</h5>
                    </div>
       `;
            bookContainer.appendChild(div);
        });

        const countDiv = document.getElementById('result-count');
        countDiv.innerHTML = `
        <h3>Total result Found : ${books.length}</h3>
    `;

    }
}
