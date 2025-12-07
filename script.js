// ---- Página principal (nuevo) ----
function cargarMenu() {
    const cont = document.getElementById("menu");
    cont.innerHTML = ""; // limpiar
    // iteramos personas
    personas.forEach((p, i) => {
        // tarjeta
        const card = document.createElement("button");
        card.className = "name-card fade-in";
        card.setAttribute("type","button");
        card.setAttribute("aria-label", `Abrir ${p.nombre}`);
        card.style.border = "none";
        card.style.background = p.color || "#222"; // color fallback

        // fondo desenfocado
        const bg = document.createElement("div");
        bg.className = "bg-img";
        bg.style.backgroundImage = `url('${p.foto}')`;

        // overlay para legibilidad del texto
        const overlay = document.createElement("div");
        overlay.className = "overlay";

        // contenido (nombre)
        const content = document.createElement("div");
        content.className = "content";
        content.innerHTML = `<div class="name">${p.nombre}</div>
                             ${p.subtitle ? `<div class="subtitle">${p.subtitle}</div>` : ``}`;

        // añadir elementos
        card.appendChild(bg);
        card.appendChild(overlay);
        card.appendChild(content);

        // click: ir a persona.html con id
        card.onclick = () => {
            window.location.href = `persona.html?id=${i}`;
        };

        // accesibilidad con teclado
        card.onkeydown = (e) => {
            if (e.key === "Enter" || e.key === " ") card.click();
        };

        // staggered animation delay (cada card aparece después)
        const delay = i * 120; // ms
        card.style.animationDelay = `${delay}ms`;

        cont.appendChild(card);
    });
}


// ---- Lista de regalos ----
function cargarLista() {
    const id = new URLSearchParams(window.location.search).get("id");
    const persona = personas[id];

    document.getElementById("lista-nombre").textContent = persona.nombre;

    const galeria = document.getElementById("galeria");

    persona.regalos.forEach(r => {
        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <img src="${r.img}">
            <p>${r.txt}</p>
        `;

        galeria.appendChild(div);

        document.getElementById("btn-regresar-lista").onclick = () =>
        window.location.href = "index.html";
    });
}
