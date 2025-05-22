document.addEventListener("DOMContentLoaded", async () => {
  const listEl = document.getElementById("favorites-list");

  try {
    const favorites = await getAllFavorites();

    if (!favorites.length) {
      listEl.innerHTML = "<p>Nie zapisano żadnych książek.</p>";
      return;
    }

    listEl.innerHTML = ""; // wyczyść placeholder

    favorites.forEach(book => {
      const div = document.createElement("div");
      div.className = "book";

      div.innerHTML = `
        <img src="${book.coverUrl}" alt="Okładka książki" />
        <div>
          <h3>${book.title}</h3>
          <p>${book.description.substring(0, 100)}...</p>
          <p><small>Dodano: ${new Date(book.createdAt).toLocaleDateString()}</small></p>
        </div>
      `;

      listEl.appendChild(div);
    });

  } catch (error) {
    console.error(error);
    listEl.innerHTML = "<p>Wystąpił błąd podczas wczytywania danych.</p>";
  }
});
