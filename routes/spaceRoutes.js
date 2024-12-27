const express = require('express'); // Importa la librería express
const spaceController = require('../controllers/spaceController'); // Llama al controller de spaces
const authMiddleware = require('../middleware/authMiddleware'); // Asegúrate de tener el middleware importado

const router = express.Router(); // Crea una nueva instancia de Router

// Rutas de espacios con autenticación

router.get('/', authMiddleware, spaceController.getAllSpaces); // Obtener todos los espacios
router.post('/', authMiddleware, spaceController.createSpace); // Crear un espacio (requiere autenticación)
router.get('/:id', authMiddleware, spaceController.getSpaceById); // Obtener un espacio por ID (requiere autenticación)
router.put('/:id', authMiddleware, spaceController.updateSpace); // Actualizar un espacio (requiere autenticación)
router.delete('/:id', authMiddleware, spaceController.deleteSpace); // Eliminar un espacio (requiere autenticación)

module.exports = router; // Exporta el router para usarlo en otras partes de la aplicación
