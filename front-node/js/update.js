const form = document.getElementById("quoteForm");
const cancelBtn = document.getElementById("cancelBtn");
const message = document.getElementById("message");


const params = new URLSearchParams(window.location.search);
const quoteId = params.get("id");


let editingId = null;
const token = localStorage.getItem("token");


const getQuoteById = async () => {
  if (!quoteId) return;

  if (!token) {
    message.textContent = "Non autorisé, pas de token.";
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:3000/api/quote/${quoteId}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    if (!res.ok) throw new Error("Impossible de récupérer la citation");

    const data = await res.json();

 
    editingId = quoteId;


    form.quote.value = data.quote;
    form.author.value = data.author;

    message.textContent = "Modification en cours...";

  } catch (err) {
    console.error(err);
    message.textContent = err.message;
  }
};

console.log("quoteId:", quoteId);
getQuoteById();


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newQuote = form.quote.value.trim();
  const newAuthor = form.author.value.trim();

  if (!token) {
    alert("Non autorisé, pas de token !");
    return;
  }

  if (!newQuote || !newAuthor) {
    message.textContent = "Tous les champs sont obligatoires.";
    return;
  }

  try {
  
    if (editingId) {
      const response = await fetch(
        `http://localhost:3000/api/quote/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            quote: newQuote,
            author: newAuthor
          }),
        }
      );

      if (!response.ok) throw new Error("Modification refusée");

      message.textContent = "Quote modifié avec succès !";

 
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);

    } 
  
    else {
      const response = await fetch(
        "http://localhost:3000/api/quote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            quote: newQuote,
            author: newAuthor
          }),
        }
      );

      if (!response.ok) throw new Error("Enregistrement refusé");

      message.textContent = "Quote ajouté avec succès !";
      form.reset();
    }

  } catch (err) {
    console.error(err);
    message.textContent = err.message;
  }
});


cancelBtn.addEventListener("click", () => {
  form.reset();
  editingId = null;
  message.textContent = "Modification annulée";
});
