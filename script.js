const cursos = [
  { codigo: "CBO106", nombre: "BIOLOGÍA", ciclo: 1 },
  { codigo: "CBO104", nombre: "CÁLCULO I", ciclo: 1 },
  { codigo: "CBO202", nombre: "MEDIO AMBIENTE", ciclo: 2, prerequisitos: ["CBO106"] },
  { codigo: "CBO204", nombre: "CÁLCULO II", ciclo: 2, prerequisitos: ["CBO104"] }
];

function crearMalla() {
  const malla = document.getElementById("malla");
  const ciclos = {};

  cursos.forEach(curso => {
    if (!ciclos[curso.ciclo]) {
      ciclos[curso.ciclo] = [];
    }
    ciclos[curso.ciclo].push(curso);
  });

  Object.entries(ciclos).forEach(([ciclo, lista]) => {
    const div = document.createElement("div");
    div.className = "ciclo";
    const titulo = document.createElement("h2");
    titulo.textContent = `Ciclo ${ciclo}`;
    div.appendChild(titulo);

    lista.forEach(curso => {
      const el = document.createElement("div");
      el.className = "curso bloqueado";
      el.textContent = curso.nombre;
      el.dataset.codigo = curso.codigo;
      el.addEventListener("click", () => toggleCurso(el, curso));
      div.appendChild(el);
    });

    malla.appendChild(div);
  });

  actualizarCursos();
}

function toggleCurso(elemento, curso) {
  const aprobados = JSON.parse(localStorage.getItem("cursosAprobados") || "[]");
  const index = aprobados.indexOf(curso.codigo);
  if (index > -1) {
    aprobados.splice(index, 1);
    elemento.classList.remove("completado");
  } else {
    aprobados.push(curso.codigo);
    elemento.classList.add("completado");
  }
  localStorage.setItem("cursosAprobados", JSON.stringify(aprobados));
  actualizarCursos();
}

function actualizarCursos() {
  const aprobados = JSON.parse(localStorage.getItem("cursosAprobados") || "[]");
  document.querySelectorAll(".curso").forEach(el => {
    const codigo = el.dataset.codigo;
    const curso = cursos.find(c => c.codigo === codigo);
    const prereqs = curso.prerequisitos || [];
    if (aprobados.includes(codigo)) {
      el.classList.add("completado");
      el.classList.remove("bloqueado");
    } else if (prereqs.every(p => aprobados.includes(p))) {
      el.classList.add("desbloqueado");
      el.classList.remove("bloqueado");
    } else {
      el.classList.add("bloqueado");
      el.classList.remove("desbloqueado", "completado");
    }
  });
}

window.onload = crearMalla;
