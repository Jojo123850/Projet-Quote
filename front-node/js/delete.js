export async function deleteQuote(id, element) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Non autorisé !");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/quote/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.ok) {
      element.remove();
      alert("Citation supprimée !");
    } else {
      const data = await response.json();
      alert("Erreur : " + (data.message || "Suppression refusée"));
    }
  } catch (error) {
    console.error(error);
    alert("Erreur serveur lors de la suppression");
  }
}