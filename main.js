const tareaInput = document.querySelector("#tareaInput");
const btnAgregarTarea = document.querySelector("#btn-agregar");
const listaTareas = document.querySelector("#lista")
const opciones = document.querySelectorAll('input[type="radio"]')

let tareas = null;

const agregarTarea = () => {
    const tareaTexto = tareaInput.value;

    if (!validarTexto(tareaTexto)) {
        alert("Debe escribir algo en la tarea...");
        return false;
    }

    if (!validarDificultad()) {
        alert("Debe seleccionar alguna dificultad...");
        return false;
    }

    opciones.forEach(opcion => {
        if (opcion.checked) {
            const nuevaTarea = armarElemento(tareaTexto, opcion.id);
            listaTareas.appendChild(nuevaTarea)
            nuevaTarea.addEventListener("click", eliminarElemento)

            // guardarTarea(tareaInput.value);

            const objectTask = {
                "descripcion": tareaTexto,
                "dificultad": opcion.id,
            }
            
            guardarTarea(objectTask);

            opcion.checked = false;
            tareaInput.value = "";
        }
    });
}

const eliminarElemento = (e) => {
    if (e.target.nodeName == "LI") {
        e.target.remove()
    }
    else {
        e.target.parentNode.remove()
    }

    eliminarTarea(e.target)
}

const armarElemento = (texto, dificultad) => {
    const li = document.createElement("li");
    const a = document.createElement("a")

    a.innerText = texto
    li.appendChild(a)

    li.classList.add("tarea", `${dificultad}`)

    return li;
}

const validarTexto = (texto) => {
    return texto === "" ? false : true
}

const validarDificultad = () => {
    let algoSeleccionado = false;

    opciones.forEach(opcion => {
        if (opcion.checked) {
            algoSeleccionado = true;
            return algoSeleccionado;
        }
    });

    return algoSeleccionado;
}

const guardarTarea = (objTarea) => {
    tareas = obtenerTareas();
    tareas.push(objTarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

const obtenerTareas = () => {
    const tareasAlmacenadas = (localStorage.getItem("tareas"));

    if (tareasAlmacenadas) {
        return JSON.parse(tareasAlmacenadas);
    }
    else {
        return [];
    }
}

const eliminarTarea = (elemento) => {
    const textoElemento = elemento.outerText;
    tareas = obtenerTareas();

    const nuevoArray = tareas.filter((tarea) => tarea["descripcion"] !== textoElemento);

    console.log(nuevoArray);
    localStorage.setItem("tareas", JSON.stringify(nuevoArray));
}


btnAgregarTarea.addEventListener("click", agregarTarea);

const tareasCargadas = obtenerTareas();
tareasCargadas.forEach(tarea => {
    const tareaCargada = armarElemento(tarea.descripcion, tarea.dificultad);
    listaTareas.appendChild(tareaCargada);
    tareaCargada.addEventListener("click", eliminarElemento);
});