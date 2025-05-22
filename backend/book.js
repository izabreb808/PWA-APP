document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const bookKey = params.get("id"); // np. /works/OL123W
  const detailsEl = document.getElementById("book-details");

  if (!bookKey) {
    detailsEl.innerHTML = "<p>Brak ID książki.</p>";
    return;
  }

  try {
    const res = await fetch(`https://openlibrary.org${bookKey}.json`);
    if (!res.ok) throw new Error("Błąd pobierania danych");

    const book = await res.json();

    const title = book.title ?? "Brak tytułu";
    const description = typeof book.description === "string"
      ? book.description
      : book.description?.value ?? "Brak opisu";

    const coverId = book.covers?.[0];
    const coverUrl = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : "https://via.placeholder.com/256x380?text=Brak+okładki";

    // Render
    detailsEl.innerHTML = `
      <img src="${coverUrl}" alt="Okładka książki" style="max-width:200px;" />
      <h2>${title}</h2>
      <p>${description}</p>
      <button id="save-btn">⭐ Zapisz do ulubionych</button>
    `;

    // Obsługa zapisu
    document.getElementById("save-btn").addEventListener("click", async () => {
      const bookData = {
        key: book.key,
        title,
        coverUrl,
        description,
        createdAt: new Date().toISOString()
      };

      await saveToFavorites(bookData);
      alert("Dodano do ulubionych!");
    });

  } catch (err) {
    console.error(err);
    detailsEl.innerHTML = "<p>Nie udało się pobrać danych książki.</p>";
  }
});
