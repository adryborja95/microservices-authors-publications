import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  Alert,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { createAuthor } from "../../api/authorApi";

const initialState = {
  tipoIdentificacion: "",
  identificacion: "",
  nacionalidad: "",
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  biografia: "",
  generoLiterario: "",
};

const AuthorForm = ({ onAuthorCreated }) => {
  const [author, setAuthor] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
    setSuccessMessage("");
  };

  const validate = () => {
    const newErrors = {};

    if (!author.tipoIdentificacion) newErrors.tipoIdentificacion = "Campo obligatorio";
    if (!author.identificacion) newErrors.identificacion = "Campo obligatorio";
    if (!author.nacionalidad) newErrors.nacionalidad = "Campo obligatorio";
    if (!author.nombre) newErrors.nombre = "Campo obligatorio";
    if (!author.apellido) newErrors.apellido = "Campo obligatorio";
    if (!author.telefono) newErrors.telefono = "Campo obligatorio";
    if (!author.generoLiterario) newErrors.generoLiterario = "Campo obligatorio";

    if (!author.email) {
      newErrors.email = "Campo obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(author.email)) {
      newErrors.email = "Correo no válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const cleanAuthor = {
      ...author,
      identificacion: author.identificacion.trim(),
      nombre: author.nombre.trim(),
      apellido: author.apellido.trim(),
      email: author.email.trim(),
      telefono: author.telefono.trim(),
      nacionalidad: author.nacionalidad.trim(),
      generoLiterario: author.generoLiterario.trim(),
      biografia: author.biografia?.trim(),
    };

    try {
      await createAuthor(cleanAuthor);
      onAuthorCreated();
      setSuccessMessage("Autor creado correctamente");
      setTimeout(() => {
       setSuccessMessage("");
      }, 2000);

      setAuthor(initialState);
      setErrors({});
      setServerError("");
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400 && data.messages) {
          setErrors(data.messages);
        } else if (data.message) {
          setServerError(data.message);
        } else {
          setServerError("Error inesperado");
        }
      } else {
        setServerError("No se pudo conectar con el servidor");
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Crear Autor
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {serverError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {serverError}
        </Alert>
      )}

      <TextField
        select
        required
        label="Tipo Identificación"
        name="tipoIdentificacion"
        fullWidth
        margin="normal"
        value={author.tipoIdentificacion}
        onChange={handleChange}
        error={!!errors.tipoIdentificacion}
        helperText={errors.tipoIdentificacion}
      >
        <MenuItem value="CEDULA">Cédula</MenuItem>
        <MenuItem value="PASAPORTE">Pasaporte</MenuItem>
        <MenuItem value="RUC">RUC</MenuItem>
      </TextField>

      <TextField
        required
        label="Identificación"
        name="identificacion"
        fullWidth
        margin="normal"
        value={author.identificacion}
        onChange={handleChange}
        error={!!errors.identificacion}
        helperText={errors.identificacion}
      />

      <TextField
        required
        label="Nombre"
        name="nombre"
        fullWidth
        margin="normal"
        value={author.nombre}
        onChange={handleChange}
        error={!!errors.nombre}
        helperText={errors.nombre}
      />

      <TextField
        required
        label="Apellido"
        name="apellido"
        fullWidth
        margin="normal"
        value={author.apellido}
        onChange={handleChange}
        error={!!errors.apellido}
        helperText={errors.apellido}
      />

      <TextField
        required
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        value={author.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        required
        label="Teléfono"
        name="telefono"
        fullWidth
        margin="normal"
        value={author.telefono}
        onChange={handleChange}
        error={!!errors.telefono}
        helperText={errors.telefono}
      />

      <TextField
        required
        label="Nacionalidad"
        name="nacionalidad"
        fullWidth
        margin="normal"
        value={author.nacionalidad}
        onChange={handleChange}
        error={!!errors.nacionalidad}
        helperText={errors.nacionalidad}
      />

      <TextField
        label="Biografía"
        name="biografia"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={author.biografia}
        onChange={handleChange}
      />

      <TextField
        required
        label="Género Literario"
        name="generoLiterario"
        fullWidth
        margin="normal"
        value={author.generoLiterario}
        onChange={handleChange}
        error={!!errors.generoLiterario}
        helperText={errors.generoLiterario}
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }} startIcon={<PostAddIcon />}>
        Guardar Autor
      </Button>
    </Box>
  );
};

export default AuthorForm;