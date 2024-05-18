
const socket = io ()
let product
document.getElementById('addProduct').addEventListener('click', function () {
    Swal.fire({
        title: 'Ingrese los datos del producto',
        html:

            '<p>Titulo:<input type="string" id="swal-input1" class="swal2-input"></p>' +
            '<p>Descripcion:<input type="string" id="swal-input2" class="swal2-input"></p>' +
            '<p>Precio:<input type="number" id="swal-input3" class="swal2-input"></p>' +
            '<p>Codigo:<input type="text" id="swal-input4" class="swal2-input"></p>' +
            '<p>Stock:<input type="number" id="swal-input5" class="swal2-input"></p>' +
            '<p>Category:<input type="string" id="swal-input6" class="swal2-input"></p>',

        focusConfirm: false,
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: "Añadir",
        cancelButtonText: "Cancelar",

        preConfirm: () => {

            let title = document.getElementById('swal-input1').value;
            let description = document.getElementById('swal-input2').value;
            let price = document.getElementById('swal-input3').value;
            let code = document.getElementById('swal-input4').value;
            let stock = document.getElementById('swal-input5').value;
            let category = document.getElementById('swal-input6').value;

            if (!title || !description || !price || !code || !stock || !category) {
                Swal.showValidationMessage('Por favor, completa todos los campos');
            } else {
                return { title, description, price, code, stock, category }
            }
        }
    }).then((result) => {
        product = result.value
        console.log(product)
        socket.emit('product', product)
    }).catch(Swal.noop)
});

socket.on('productList', data => {
    console.log('Productos: ', data)
})