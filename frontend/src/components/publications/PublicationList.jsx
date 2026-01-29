import { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SearchIcon from "@mui/icons-material/Search";

import {
  getAllPublications,
  getPublicationById,
  changePublicationStatus,
} from "../../api/publicationApi";
import { getAllAuthors } from "../../api/authorApi";

const editorialStatuses = [
  "DRAFT",
  "IN_REVIEW",
  "APPROVED",
  "PUBLISHED",
  "REJECTED",
];

const PublicationList = ({ refresh }) => {
  const [publications, setPublications] = useState([]);
  const [authorsMap, setAuthorsMap] = useState({});
  const [selectedPublication, setSelectedPublication] = useState(null);

  const [contentOpen, setContentOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const [newStatus, setNewStatus] = useState("");
  const [searchId, setSearchId] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Autores
  useEffect(() => {
    getAllAuthors().then((res) => {
      const map = {};
      res.data.forEach((a) => {
        map[a.id] = `${a.nombre} ${a.apellido}`;
      });
      setAuthorsMap(map);
    });
  }, []);

  // Publicaciones
  const loadPublications = () => {
    getAllPublications()
      .then((res) => setPublications(res.data))
      .catch(() => setError("Error al cargar publicaciones"));
  };

  useEffect(() => {
    loadPublications();
  }, [refresh]);

  // Ver solo contenido (tabla)
  const openContent = (p) => {
    setSelectedPublication(p);
    setContentOpen(true);
  };

  // Ver detalle completo (por ID)
  const searchById = async () => {
    if (!searchId.trim()) return;

    try {
      const res = await getPublicationById(searchId.trim());
      setSelectedPublication(res.data);
      setDetailOpen(true);
      setError("");
    } catch {
      setError("Publicación no encontrada");
    }
  };

  // Cambiar estado
  const openStatus = (p) => {
    setSelectedPublication(p);
    setNewStatus(p.status);
    setStatusOpen(true);
  };

  const closeDialogs = () => {
    setContentOpen(false);
    setStatusOpen(false);
    setDetailOpen(false);
    setSelectedPublication(null);
    setNewStatus("");
  };

  const confirmStatusChange = async () => {
    try {
      await changePublicationStatus(selectedPublication.id, newStatus);
      setSuccessMessage("Estado editorial actualizado correctamente");
      setTimeout(() => setSuccessMessage(""), 4000);
      closeDialogs();
      loadPublications();
    } catch {
      setError("No se pudo cambiar el estado editorial");
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Lista de Publicaciones
      </Typography>

      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* BUSCAR POR ID */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Buscar publicación por ID (UUID)"
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
            <TableCell>Título</TableCell>
            <TableCell>Autor</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Resumen</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Fecha publicación</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {publications.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.title}</TableCell>
              <TableCell>{authorsMap[p.authorId]}</TableCell>
              <TableCell>{p.tipoPublicacion}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>{p.summary}</TableCell>
              <TableCell>{p.status}</TableCell>
              <TableCell>
                {p.publishedAt
                  ? new Date(p.publishedAt).toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => openContent(p)}
                  sx={{ mr: 1 }}
                >
                  Ver contenido
                </Button>
                <Button
                  size="small"
                  startIcon={<AutorenewIcon />}
                  onClick={() => openStatus(p)}
                >
                  Cambiar estado
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* MODAL SOLO CONTENIDO */}
      <Dialog open={contentOpen} onClose={closeDialogs} maxWidth="md" fullWidth>
        <DialogTitle>Contenido de la Publicación</DialogTitle>
        <DialogContent dividers>
          {selectedPublication && (
            <Typography sx={{ whiteSpace: "pre-line" }}>
              {selectedPublication.content}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogs}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL DETALLE COMPLETO (BÚSQUEDA POR ID) */}
      <Dialog open={detailOpen} onClose={closeDialogs} maxWidth="md" fullWidth>
        <DialogTitle>Detalle completo de la Publicación</DialogTitle>
        <DialogContent dividers>
          {selectedPublication && (
            <>
              <Typography><strong>Título:</strong> {selectedPublication.title}</Typography>
              <Typography><strong>Autor:</strong> {authorsMap[selectedPublication.authorId]}</Typography>
              <Typography><strong>Tipo:</strong> {selectedPublication.tipoPublicacion}</Typography>
              <Typography><strong>Categoría:</strong> {selectedPublication.category}</Typography>
              <Typography sx={{ mt: 1 }}><strong>Resumen:</strong> {selectedPublication.summary}</Typography>
              <Typography sx={{ mt: 2 }}><strong>Contenido:</strong></Typography>
              <Typography sx={{ whiteSpace: "pre-line" }}>{selectedPublication.content}</Typography>
              <Typography sx={{ mt: 2 }}><strong>Estado:</strong> {selectedPublication.status}</Typography>
              <Typography>
                <strong>Fecha publicación:</strong>{" "}
                {selectedPublication.publishedAt
                  ? new Date(selectedPublication.publishedAt).toLocaleString()
                  : "-"}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogs}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL CAMBIO DE ESTADO */}
      <Dialog open={statusOpen} onClose={closeDialogs}>
        <DialogTitle>Cambiar estado editorial</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            {editorialStatuses.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogs}>Cancelar</Button>
          <Button variant="contained" onClick={confirmStatusChange}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default PublicationList;

