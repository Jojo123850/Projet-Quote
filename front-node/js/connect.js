const form = document.querySelector(".formulaire");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (!email || !password) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  const payload = { email, password };

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Réponse serveur :", data);

    if (response.ok) {
      localStorage.setItem("token", data.token);

      window.location.href = "index.html";
    } else {

      const message = data.message || "Email ou mot de passe incorrect";
      alert(message);
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    alert("Impossible de se connecter. Vérifiez votre connexion.");
  }
});