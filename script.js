const cursos = [
  // === CICLO 1 ===
  { codigo: "CBE004", nombre: "GÉNERO Y SOCIEDAD", ciclo: 1 },
  { codigo: "CBO101", nombre: "LENGUAJE", ciclo: 1 },
  { codigo: "CBO102", nombre: "MÉTODOS DE ESTUDIO", ciclo: 1 },
  { codigo: "CBO103", nombre: "GESTIÓN PERSONAL", ciclo: 1 },
  { codigo: "CBO104", nombre: "CÁLCULO I", ciclo: 1 },
  { codigo: "CBO105", nombre: "MATEMÁTICA BÁSICA", ciclo: 1 },
  { codigo: "CBO106", nombre: "BIOLOGÍA", ciclo: 1 },

  // === CICLO 2 ===
  { codigo: "CBO201", nombre: "FUNDAMENTOS DE INVESTIGACIÓN", ciclo: 2 },
  { codigo: "CBO202", nombre: "MEDIO AMBIENTE Y DESARROLLO", ciclo: 2, prerequisitos: ["CBO106"] },
  { codigo: "CBO203", nombre: "REALIDAD NACIONAL Y MUNDIAL", ciclo: 2 },
  { codigo: "CBO204", nombre: "CÁLCULO II", ciclo: 2, prerequisitos: ["CBO104"] },
  { codigo: "CBO205", nombre: "QUÍMICA INORGÁNICA Y ORGÁNICA", ciclo: 2 },
  { codigo: "CBO206", nombre: "FÍSICA GENERAL", ciclo: 2 },

  // === CICLO 3 ===
  { codigo: "B02006", nombre: "BIOLOGÍA CELULAR", ciclo: 3 },
  { codigo: "B02008", nombre: "FISICOQUÍMICA", ciclo: 3 },
  { codigo: "B02012", nombre: "ESTADÍSTICA", ciclo: 3 },
  { codigo: "B02019", nombre: "DIVERSIDAD ANIMAL", ciclo: 3 },
  { codigo: "B02020", nombre: "DIVERSIDAD VEGETAL", ciclo: 3 },

  // === CICLO 4 ===
  { codigo: "B02011", nombre: "BIOQUÍMICA GENERAL", ciclo: 4, prerequisitos: ["B02008", "B02006"] },
  { codigo: "B02013", nombre: "GENÉTICA GENERAL", ciclo: 4, prerequisitos: ["B02006", "B02012"] },
  { codigo: "B02024", nombre: "MICROBIOLOGÍA GENERAL", ciclo: 4, prerequisitos: ["B02006"] },
  { codigo: "B02030", nombre: "ECOLOGÍA GENERAL", ciclo: 4, prerequisitos: ["B02020", "B02019"] },
  { codigo: "B02062", nombre: "BIOÉTICA", ciclo: 4 },

  // === CICLO 5 ===
  { codigo: "B02018", nombre: "BIOLOGÍA MOLECULAR", ciclo: 5, prerequisitos: ["B02011"] },
  { codigo: "B02022", nombre: "DIVERSIDAD GENÉTICA", ciclo: 5, prerequisitos: ["B02019", "B02020", "B02013"] },
  { codigo: "B02025", nombre: "FISIOLOGÍA ANIMAL", ciclo: 5, prerequisitos: ["B02019", "B02011"] },
  { codigo: "B02026", nombre: "FISIOLOGÍA VEGETAL", ciclo: 5, prerequisitos: ["B02020", "B02011"] },
  { codigo: "B02027", nombre: "CITOGENÉTICA GENERAL", ciclo: 5, prerequisitos: ["B02013"] },

  // === CICLO 6 ===
  { codigo: "B02017", nombre: "BIOESTADÍSTICA", ciclo: 6, prerequisitos: ["B02012"] },
  { codigo: "B02023", nombre: "GENÉTICA MOLECULAR", ciclo: 6, prerequisitos: ["B02018", "B02013"] },
  { codigo: "B02028", nombre: "GENÉTICA HUMANA", ciclo: 6, prerequisitos: ["B02013", "B02018"] },
  { codigo: "B02029", nombre: "INMUNOLOGÍA", ciclo: 6, prerequisitos: ["B02024", "B02018"] },
  { codigo: "B02075", nombre: "INTRO A LA PROGRAMACIÓN", ciclo: 6 },

  // === CICLO 7 ===
  { codigo: "B02031", nombre: "BIOINFORMÁTICA", ciclo: 7, prerequisitos: ["B02075"] },
  { codigo: "B02033", nombre: "CITOGENÉTICA HUMANA", ciclo: 7, prerequisitos: ["B02027", "B02028"] },
  { codigo: "B02040", nombre: "INGENIERÍA GENÉTICA", ciclo: 7, prerequisitos: ["B02029", "B02023"] },
  { codigo: "B02077", nombre: "BACHILLER I", ciclo: 7 },

  // === CICLO 8 ===
  { codigo: "B02035", nombre: "GENÉTICA DE POBLACIONES", ciclo: 8, prerequisitos: ["B02013", "B02017"] },
  { codigo: "B02036", nombre: "BIOLOGÍA DEL DESARROLLO", ciclo: 8, prerequisitos: ["B02018"] },
  { codigo: "B02078", nombre: "BACHILLER II", ciclo: 8, prerequisitos: ["B02077"] },
  { codigo: "B02079", nombre: "GENÓMICA Y TRANSCRIPTÓMICA", ciclo: 8, prerequisitos: ["B02040"] },

  // === CICLO 9 ===
  { codigo: "B02034", nombre: "INGENIERÍA BIOQUÍMICA", ciclo: 9, prerequisitos: ["B02024", "B02018"] },
  { codigo: "B02044", nombre: "PROTEÓMICA", ciclo: 9, prerequisitos: ["B02079"] },
  { codigo: "B02045", nombre: "BIOTECNOLOGÍA ANIMAL", ciclo: 9, prerequisitos: ["B02040"] },
  { codigo: "B02063", nombre: "GENÉTICA MICROBIANA", ciclo: 9, prerequisitos: ["B02023", "B02024"] },

  // === CICLO 10 ===
  { codigo: "B02041", nombre: "BIOTECNOLOGÍA MICROBIANA", ciclo: 10, prerequisitos: ["B02034"] },
  { codigo: "B02046", nombre: "BIOTECNOLOGÍA VEGETAL", ciclo: 10, prerequisitos: ["B02040"] },
  { codigo: "B02071", nombre: "PRÁCTICAS PRE PROFESIONALES", ciclo: 10 },
  { codigo: "B02076", nombre: "SISTEMÁTICA Y EVOLUCIÓN", ciclo: 10, prerequisitos: ["B02035"] },
];

function crearMalla() {
  const malla = document.getElementById("malla");
  const ciclos = {};

  cursos.forEach(curso => {
    if (!ciclos[curso.ciclo]) ciclos[curso.ciclo] = [];
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
