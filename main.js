const tareaInput = document.querySelector("#tareaInput");
const btnAgregarTarea = document.querySelector("#btn-agregar");




const agregarTarea = () => {
    console.log(tareaInput);
    console.log(tareaInput.value);
}


btnAgregarTarea.addEventListener("click", agregarTarea);