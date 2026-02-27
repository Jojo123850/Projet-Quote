const section = document.querySelector('#section');

async function getRandomQuote() {
  try {
    const response = await fetch("http://localhost:3000/api/quote/aiquote");
    const data = await response.json();

    const quoteContainer = document.createElement("div");
    quoteContainer.classList.add("quote");
    quoteContainer.dataset.id = data.id; 

    quoteContainer.innerHTML = `
      <p class="quote-text">${data.quote}</p>
      <p class="quote-author">${data.author}</p>
      <div>
        <button class="delete-btn">Supprimer</button>
        <button class="update-btn">Modifier</button>
      </div>
      <form class="edit-form" style="display:none">
        <input type="text" name="quote" value="${data.quote}" />
        <input type="text" name="author" value="${data.author}" />
        <button type="submit">Enregistrer</button>
        <button type="button" class="cancel-btn">Annuler</button>
      </form>
       <button class="update-btn">Modifier</button>
    `;

    section.appendChild(quoteContainer);


    quoteContainer.querySelector(".update-btn").addEventListener("click", () => {
      quoteContainer.querySelector(".edit-form").style.display = "block";
    });


    quoteContainer.querySelector(".cancel-btn").addEventListener("click", () => {
      quoteContainer.querySelector(".edit-form").style.display = "none";
    });

    quoteContainer.querySelector(".edit-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const newQuote = e.target.quote.value;
      const newAuthor = e.target.author.value;
      const id = quoteContainer.dataset.id;
      updateQuote(id, quoteContainer, newQuote, newAuthor); 
    });

  } catch (error) {
    console.error("Erreur :", error);
  }
}

getRandomQuote();