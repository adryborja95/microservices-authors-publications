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
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SearchIcon from "@mui/icons-material/Search";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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
      .then((res) => {
        setPublications(res.data || []);
        setError("");
      })
      .catch(() =>
        setError("No se pudo conectar con el servicio de publicaciones")
      );
  };

  useEffect(() => {
    loadPublications();
  }, [refresh]);

  // Ver contenido
  const openContent = (p) => {
    setSelectedPublication(p);
    setContentOpen(true);
  };

  // Buscar por ID
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
    setSearchId("");
  };

  const copyId = () => {
    navigator.clipboard.writeText(selectedPublication.id);
  };

  const confirmStatusChange = async () => {
    try {
      const res = await changePublicationStatus(selectedPublication.id, newStatus);
      const updatedPublication = res.data;

      setSuccessMessage("Estado editorial actualizado correctamente"); 
      setTimeout(() => setSuccessMessage(""), 2000);

      setPublications(prev =>
        prev.map(pub =>
          pub.id === updatedPublication.id ? updatedPublication : pub
        )
      );  
      closeDialogs();
    } catch {
      setError("No se pudo cambiar el estado editorial");
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Lista de Publicaciones
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
          {publications.length === 0 && !error && (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <Typography color="text.secondary">
                  No existen publicaciones registradas
                </Typography>
              </TableCell>
            </TableRow>
          )}

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

      {/* MODAL DETALLE */}
      <Dialog open={contentOpen} onClose={closeDialogs} maxWidth="md" fullWidth>
        <DialogTitle>Contenido de la Publicación</DialogTitle>
        <DialogContent dividers>
          {selectedPublication && (
            <>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="body2">
                  <strong>ID:</strong> {selectedPublication.id}
                </Typography>
                <Tooltip title="Copiar ID">
                  <IconButton size="small" onClick={copyId}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Typography sx={{ mt: 2 }}><strong>Contenido:</strong></Typography>
              <Typography sx={{ whiteSpace: "pre-line" }}>
                {selectedPublication.content}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogs}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL DETALLE */}
      <Dialog open={detailOpen} onClose={closeDialogs} maxWidth="md" fullWidth>
        <DialogTitle>DEtalle comppleto de la Publicación</DialogTitle>
        <DialogContent dividers>
          {selectedPublication && (
            <>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="body2">
                  <strong>ID:</strong> {selectedPublication.id}
                </Typography>
              </Box>

              <Typography><strong>Título:</strong> {selectedPublication.title}</Typography>
              <Typography><strong>Autor:</strong> {authorsMap[selectedPublication.authorId]}</Typography>
              <Typography><strong>Tipo:</strong> {selectedPublication.tipoPublicacion}</Typography>
              <Typography><strong>Categoría:</strong> {selectedPublication.category}</Typography>
              <Typography><strong>Resumen:</strong> {selectedPublication.summary}</Typography>
              <Typography sx={{ mt: 2 }}><strong>Contenido:</strong></Typography>
              <Typography sx={{ whiteSpace: "pre-line" }}>
                {selectedPublication.content}
              </Typography>
              <Typography sx={{ mt: 2 }}><strong>Estado:</strong> {selectedPublication.status}</Typography>
              <Typography><strong>Fecha publicación:</strong>{" "}
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
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
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


