import { useEffect, useState } from "react";
import { getAllAuthors, getAuthorById } from "../../api/authorApi";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Button,
  Box,
  Alert,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";

const AuthorList = ({ refresh }) => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState("");

  // Listar autores
  useEffect(() => {
    getAllAuthors()
      .then((res) => setAuthors(res.data))
      .catch(() => setError("Error al cargar autores"));
  }, [refresh]);

  // Ver detalle (desde tabla o búsqueda)
  const viewDetail = async (id) => {
    try {
      const res = await getAuthorById(id);
      setSelectedAuthor(res.data);
      setError("");
    } catch {
      setError("No se pudo obtener el detalle del autor");
      setSelectedAuthor(null);
    }
  };

  // Buscar por ID
  const searchById = () => {
    if (!searchId.trim()) return;
    viewDetail(searchId.trim());
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Lista de Autores
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* 🔍 BUSCAR AUTOR POR ID */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Buscar autor por ID (UUID)"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={searchById}
        >
          Buscar
        </Button>
      </Box>

      {/* TABLA DE AUTORES */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Identificación</TableCell>
            <TableCell>Nacionalidad</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Género</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {authors.map((a) => (
            <TableRow key={a.id}>
              <TableCell>
                {a.nombre} {a.apellido}
              </TableCell>
              <TableCell>
                {a.tipoIdentificacion} - {a.identificacion}
              </TableCell>
              <TableCell>{a.nacionalidad}</TableCell>
              <TableCell>{a.email}</TableCell>
              <TableCell>{a.telefono}</TableCell>
              <TableCell>{a.generoLiterario}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => viewDetail(a.id)}
                >
                  Ver detalle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* DETALLE DEL AUTOR */}
      {selectedAuthor && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Detalle del Autor
          </Typography>

          <Typography>
            <strong>Nombre:</strong> {selectedAuthor.nombre}{" "}
            {selectedAuthor.apellido}
          </Typography>
          <Typography>
            <strong>Identificación:</strong>{" "}
            {selectedAuthor.tipoIdentificacion} -{" "}
            {selectedAuthor.identificacion}
          </Typography>
          <Typography>
            <strong>Nacionalidad:</strong> {selectedAuthor.nacionalidad}
          </Typography>
          <Typography>
            <strong>Email:</strong> {selectedAuthor.email}
          </Typography>
          <Typography>
            <strong>Teléfono:</strong> {selectedAuthor.telefono}
          </Typography>
          <Typography>
            <strong>Género literario:</strong>{" "}
            {selectedAuthor.generoLiterario}
          </Typography>
          <Typography>
            <strong>Biografía:</strong>{" "}
            {selectedAuthor.biografia || "No registrada"}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default AuthorList;
