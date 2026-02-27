const section = document.getElementById("section");
const btnSubmit = document.querySelector("#submit");
const quoteInput = document.getElementById("quote");
const authorInput = document.getElementById("author");

let citations = JSON.parse(localStorage.getItem("citations")) || [];
let editingIndex = null; 

function afficherCitations() {
    section.innerHTML = "";
    citations.forEach((c, index) => {

        const div = document.createElement("div");

        div.classList.add("citation");
        div.innerHTML = `
            <p>"${c.quote}"</p>
            <p><em>- ${c.author}</em></p>
            <button class="modifier">Modifier</button>
            <button class="supprimer">Supprimer</button>
        `;


        div.querySelector(".supprimer").addEventListener("click", () => {
            citations.splice(index, 1);
            localStorage.setItem("citations", JSON.stringify(citations));
            afficherCitations();
        });



        div.querySelector(".modifier").addEventListener("click", () => {
            quoteInput.value = c.quote;
            authorInput.value = c.author;
            editingIndex = index;
            form.querySelector("button").textContent = "Enregistrer la modification";
        });

        section.appendChild(div);
    });
}

afficherCitations();


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newQuote = quoteInput.value.trim();
    const newAuthor = authorInput.value.trim();

    if (!newQuote || !newAuthor) {
        alert("Tous les champs sont obligatoires !");
        return;
    }

    if (editingIndex !== null) {
    
    
        citations[editingIndex] = { quote: newQuote, author: newAuthor };
        editingIndex = null;
        form.querySelector("button").textContent = "Ajouter la citation";
    } else {
        citations.push({ quote: newQuote, author: newAuthor });
    }

    localStorage.setItem("citations", JSON.stringify(citations));
    afficherCitations();
    form.reset();
});