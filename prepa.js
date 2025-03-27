const API_URL = 'http://localhost:8080/Product';

async function cargarProductos() {
    try {
        let response = await fetch(API_URL);
        let productos = await response.json();
        let tabla = document.getElementById('productos');
        
        tabla.innerHTML = '';
        productos.forEach(producto => {
            let fila = `<tr>
                <td>${producto.name}</td>
                <td>$${producto.price.toFixed(2)}</td>
                <td>${producto.quantity}</td>
                <td>
                    <button class="delete-btn" onclick="eliminarProducto('${producto.id}')">Eliminar</button>
                </td>
            </tr>`;
            tabla.innerHTML += fila;
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

document.getElementById('productForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let price = parseFloat(document.getElementById('price').value);
    let quantity = parseInt(document.getElementById('quantity').value);

    try {
        let response = await fetch(`${API_URL}/Product`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, price, quantity })
        });

        if (response.ok) {
            cargarProductos();
            document.getElementById('productForm').reset();
        } else {
            console.error('Error al agregar producto');
        }
    } catch (error) {
        console.error('Error al agregar producto:', error);
    }
});

async function eliminarProducto(id) {
    try {
        let response = await fetch(`${API_URL}/Delete${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            cargarProductos();
        } else {
            console.error('Error al eliminar producto');
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error);
    }
}

cargarProductos();
