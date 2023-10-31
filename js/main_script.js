document.addEventListener("DOMContentLoaded", () => {
    const productosTable = document.getElementById("productosTable").querySelector("tbody");
    const actualizarButton = document.getElementById("actualizarButton");
    const registrarButton = document.getElementById("registrarButton");

    // Función para actualizar los datos de la tabla
    const actualizarTabla = () => {
        // Limpia la tabla antes de cargar nuevos datos
        productosTable.innerHTML = "";

        // Realiza la solicitud a la API
        fetch("https://siaweb-nodejs.carlos-reneren7.repl.co/productos")
            .then((response) => response.json())
            .then((data) => {
                // Itera a través de los productos y crea filas en la tabla
                data.forEach((producto) => {
                    const row = productosTable.insertRow();
                    const nombreCell = row.insertCell(0);
                    const precioCell = row.insertCell(1);
                    const descripcionCell = row.insertCell(2);
                    const accionesCell = row.insertCell(3);

                    nombreCell.innerHTML = producto.nombre;
                    precioCell.innerHTML = producto.precio;
                    descripcionCell.innerHTML = producto.descripcion;

                    // Crea botones de eliminar y actualizar en cada fila
                    const eliminarButton = document.createElement("button");
                    eliminarButton.textContent = "Eliminar";
                    eliminarButton.addEventListener("click", () => {
                        // Aquí puedes agregar lógica para eliminar el producto
                        // Llama al endpoint de eliminación de la API
                        fetch(`https://siaweb-nodejs.carlos-reneren7.repl.co/productos/${producto.nombre}`, {
                            method: "DELETE"
                        })
                            .then((response) => {
                                if (response.status === 200) {
                                    // Eliminación exitosa, actualiza la tabla
                                    actualizarTabla();
                                } else {
                                    console.error("Error al eliminar el producto:", response.statusText);
                                }
                            })
                            .catch((error) => console.error("Error al eliminar el producto:", error));
                    });

                    const actualizarButton = document.createElement("button");
                    actualizarButton.textContent = "Actualizar";
                    actualizarButton.addEventListener("click", () => {
                        
                        alert(`Falta implementar eso xd`);
                    });

                    accionesCell.appendChild(eliminarButton);
                    accionesCell.appendChild(actualizarButton);
                });
            })
            .catch((error) => console.error("Error al obtener datos de la API:", error));
    };

    actualizarButton.addEventListener("click", actualizarTabla);

    registrarButton.addEventListener("click", () => {
        // Redirige a la página del formulario de registro
        window.location.href = "formulario_registro.html"; // Crea un archivo HTML para el formulario de registro
    });

    // Llama a la función para cargar los datos iniciales de la tabla
    actualizarTabla();
});