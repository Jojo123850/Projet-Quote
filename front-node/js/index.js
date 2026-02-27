const section = document.querySelector('#section');

async function getAiQuote() {
  try {
    const response = await fetch("http://localhost:3000/api/quote/aiquote"); 
    const data = await response.json();

    const quoteContainer = document.createElement("div");
    quoteContainer.classList.add("quote");

    quoteContainer.innerHTML = `
      <div>
          <h1>Citation du jour</h1>
          <p class="quote-text">${data.quote}</p>
          <p class="quote-author">${data.author}</p> 
      </div> 
    `;

    section.prepend(quoteContainer);

  } catch (error) {
    console.error("Erreur IA :", error);
  }
}

async function getAllQuotes() {
  try {
    const response = await fetch("http://localhost:3000/api/quote/all");
    const data = await response.json();

    if (!data || data.length === 0) {
      section.innerHTML += `<p>Aucune citation disponible pour le moment.</p>`;
      return;
    }

    data.forEach((q) => {
      const quoteContainer = document.createElement("div");
      quoteContainer.classList.add("quote");

      quoteContainer.innerHTML = `
        <div>
          <p class="quote-text">${q.quote}</p>
          <p class="quote-author">${q.author}</p>
          <button class="edit-btn">Modifier</button>
          <button class="delete-btn">Supprimer</button>
        </div>
      `;

      // Modifier
      quoteContainer.querySelector(".edit-btn").addEventListener("click", () => {
        window.location.href = `update.html?id=${q._id}`;
      });

 
      quoteContainer.querySelector(".delete-btn").addEventListener("click", () => {
        if (confirm("Voulez-vous vraiment supprimer cette citation ?")) {
          window.location.href = `index.html?id=${q._id}`;
        }
      });

      section.appendChild(quoteContainer);
    });

  } catch (error) {
    console.error("Erreur serveur :", error);
    section.innerHTML += `<p>Impossible de récupérer les citations.</p>`;
  }
}


getAiQuote();
getAllQuotes();