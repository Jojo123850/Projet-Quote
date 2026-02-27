const button = document.querySelector("button");

button.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

    if (!email || !password) {
    alert("Merci de remplir tous les champs !");
    return;
  }

  const obj = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:3000/api/auth/register",
         {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
      },
    });

     if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de l'inscription");
    }

    const data = await response.json();
    // console.log("Utilisateur créé :", data.token);
    localStorage.setItem("token", data.token )
    window.location.href = "connect.html";
  } catch (error) {
    console.error("Erreur :", error);
  }
});