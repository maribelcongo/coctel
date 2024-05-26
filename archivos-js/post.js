
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleFormularioBtn');
    const cancelarBtn = document.getElementById('cancelarBtn');
    const formulario = document.getElementById('coctelForm');
    const nuevaCoctelCard = document.getElementById('nuevaCoctelCard');

    if (toggleBtn && cancelarBtn && formulario && nuevaCoctelCard) {
        toggleBtn.addEventListener('click', function() {
            const elementsToHide = document.querySelectorAll('main > *:not(#nuevaCoctelCard)');
            elementsToHide.forEach(function(element) {
                element.style.display = 'none';
            });

            // Mostrar el formulario
            nuevaCoctelCard.style.display = 'block';
        });

        cancelarBtn.addEventListener('click', function() {
            const elementsToShow = document.querySelectorAll('main > *:not(#nuevaCoctelCard)');
            elementsToShow.forEach(function(element) {
                element.style.display = 'block';
            });

            // Ocultar el formulario
            nuevaCoctelCard.style.display = 'none';
        });

        formulario.addEventListener('submit', function(event) {
            event.preventDefault();

            const nombre = document.getElementById('nameInput').value;
            const preparacion = document.getElementById('preparationInput').value;
            const imagen = document.getElementById('imageInput').value;
            const alcohol = document.getElementById('alcoholInput').value;
            const ingredientes = document.getElementById('ingredientsInput').value.split(',');

            const nuevoCoctel = {
                nombre: nombre,
                preparacion: preparacion,
                imagen: imagen,
                alcohol: alcohol,
                ingredientes: ingredientes
            };

            fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoCoctel)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al crear el cóctel');
                }
                return response.json();
            })
            .then(data => {
                console.log('Cóctel creado exitosamente:', data);
        
                const elementsToShow = document.querySelectorAll('main > *:not(#nuevaCoctelCard)');
                elementsToShow.forEach(function(element) {
                    element.style.display = 'block';
                });

                // Ocultar el formulario
                nuevaCoctelCard.style.display = 'none';
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    } else {
        console.error('No se encontraron todos los elementos necesarios en el DOM.');
    }
});
