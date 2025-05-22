document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  const queryInput = document.getElementById("query");
  const resultsSection = document.getElementById("results");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = queryInput.value.trim();
    if (!query) return;

    resultsSection.innerHTML = "<p>Szukanie książek...</p>";
    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      console.log('data', data);

      if (!data.docs || data.docs.length === 0) {
        resultsSection.innerHTML = "<p>Brak wyników.</p>";
        return;
      }

      renderResults(data.docs.slice(0, 10)); // max 10 wyników
    } catch (error) {
      resultsSection.innerHTML = "<p>Błąd podczas pobierania danych.</p>";
      console.error(error);
    }
  });

  function renderResults(books) {
    resultsSection.innerHTML = "";

    books.forEach((book) => {
      const div = document.createElement("div");
      div.className = "book";

      const title = book.title ?? "Brak tytułu";
      const author = book.author_name?.[0] ?? "Nieznany autor";
      const coverId = book.cover_i;
      const coverUrl = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : "https://via.placeholder.com/128x180?text=Brak+okładki";

      div.innerHTML = `
        <img src="${coverUrl}" alt="Okładka książki">
        <div>
          <h3>${title}</h3>
          <p>Autor: ${author}</p>
          <a href="book.html?id=${book.key}" class="details-link">Szczegóły</a>
        </div>
      `;

      resultsSection.appendChild(div);
    });
  }
});
