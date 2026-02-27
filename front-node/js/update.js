async function updateQuote(id, element, newQuote, newAuthor) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:3000/api/quote/aiquote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ quote: newQuote, author: newAuthor })
      }
    );

    if (response.ok) {
      element.querySelector(".quote-text").textContent = newQuote;
      element.querySelector(".quote-author").textContent = newAuthor;
      element.querySelector(".edit-form").style.display = "none";
    } else {
      alert("Modification refusée");
    }

  } catch (error) {
    console.error(error);
  }
}