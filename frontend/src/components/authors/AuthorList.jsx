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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const AuthorList = ({ refresh }) => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState("");
  const [openDetail, setOpenDetail] = useState(false);

  // Listar autores
  useEffect(() => {
    getAllAuthors()
      .then((res) => {
        setAuthors(res.data || []);
        setError("");
      })
      .catch(() =>
        setError("No se pudo conectar con el servicio de autores")
      );
  }, [refresh]);

  // Ver detalle
  const viewDetail = async (id) => {
    try {
      const res = await getAuthorById(id);
      setSelectedAuthor(res.data);
      setOpenDetail(true);
      setError("");
    } catch {
      setError("No se pudo obtener el detalle del autor");
    }
  };

  // Buscar por ID
  const searchById = () => {
    if (!searchId.trim()) return;
    viewDetail(searchId.trim());
  };

  const closeDialog = () => {
    setOpenDetail(false);
    setSelectedAuthor(null);
    setSearchId("");
  };

  const copyId = () => {
    navigator.clipboard.writeText(selectedAuthor.id);
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

      {/* BUSCAR POR ID */}
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

      {/* TABLA */}
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
          {authors.length === 0 && !error && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography color="text.secondary">
                  No existen autores registrados
                </Typography>
              </TableCell>
            </TableRow>
          )}

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

      {/* MODAL DETALLE */}
      <Dialog open={openDetail} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Detalle del Autor</DialogTitle>

        <DialogContent dividers>
          {selectedAuthor && (
            <>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  <strong>ID (UUID):</strong> {selectedAuthor.id}
                </Typography>
                <Tooltip title="Copiar ID">
                  <IconButton size="small" onClick={copyId}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Typography><strong>Nombre:</strong> {selectedAuthor.nombre} {selectedAuthor.apellido}</Typography>
              <Typography><strong>Identificación:</strong> {selectedAuthor.tipoIdentificacion} - {selectedAuthor.identificacion}</Typography>
              <Typography><strong>Nacionalidad:</strong> {selectedAuthor.nacionalidad}</Typography>
              <Typography><strong>Email:</strong> {selectedAuthor.email}</Typography>
              <Typography><strong>Teléfono:</strong> {selectedAuthor.telefono}</Typography>
              <Typography><strong>Género literario:</strong> {selectedAuthor.generoLiterario}</Typography>
              <Typography><strong>Biografía:</strong> {selectedAuthor.biografia || "No registrada"}</Typography>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AuthorList;
