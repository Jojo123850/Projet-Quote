
const section = document.querySelector('#section');

async function deleteQuote(id, element) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:3000/api/quote/aiquote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );

    if (response.ok) {
      element.remove();
    } else {
      alert("Suppression pas accepté");
    }

    window.location.href = "index.html";

  } catch (error) {
    console.error(error);
  }
}

deleteQuote();
