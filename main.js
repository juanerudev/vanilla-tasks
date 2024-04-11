const tareaInput = document.querySelector("#tareaInput");
const btnAgregarTarea = document.querySelector("#btn-agregar");
const listaTareas = document.querySelector("#lista")
const opciones = document.querySelectorAll('input[type="radio"]')



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

btnAgregarTarea.addEventListener("click", agregarTarea);