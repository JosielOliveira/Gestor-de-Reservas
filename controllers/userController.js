const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Verificar si el correo electrónico ya está registrado
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).send('El correo electrónico ya está registrado');
    }

    // Verificar si el nombre de usuario ya está registrado (puedes quitar esto si no te importa que el username sea duplicado)
    // const existingUserName = await User.findOne({ username });
    // if (existingUserName) {
    //   return res.status(400).send('El nombre de usuario ya está registrado');
    // }

    // Encriptar la contraseña
    // --> const hashedPassword = await bcrypt.hash(password, 10); --> ELIMINAR PARA COMPROBAR ERROR DE ENCRIPTADO  

    // Crear el nuevo usuario
    const user = new User({
      email,
      username,  // Aunque no se valida el username, se guarda igualmente
      password, // --> hashedPassword, --> tambien lo cambiamos por password para comprobar el error de encriptado 
    });

    // Guardar el usuario en la base de datos
    await user.save();
    res.status(201).send({
      message: 'Usuario creado exitosamente', 
      user: { email: user.email, username: user.username }  // Devolvemos solo email y username por razones de seguridad
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Iniciar sesión de usuario (login) 
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;  
    const user = await User.findOne({ email });  // Buscamos por email en lugar de username
    if (!user) {
      return res.status(400).send('Usuario no encontrado');
    }
    const isMatch = await bcrypt.compare(password, user.password); // Comparamos la contraseña ingresada con la contraseña encriptada en la base de datos 
    if (!isMatch) {
      return res.status(400).send('Contraseña incorrecta'); // Si no coinciden, devolvemos un error 
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Obtener perfil de usuario
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'password']; // Solo permitimos actualizar username y password
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send('Operación no permitida');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    updates.forEach(update => user[update] = req.body[update]);
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
