import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";

import PublicationForm from "../components/publications/PublicationForm";
import PublicationList from "../components/publications/PublicationList";

const Publications = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <Container sx={{ mt: 4 }}>
     
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Publicaciones
        </Typography>

        <Typography variant="subtitle1">
          Gestión de publicaciones y estados editoriales
        </Typography>
      </Box>

      {/* Crear publicación */}
      <PublicationForm
        onPublicationCreated={() => setRefresh(!refresh)}
      />

      {/* Listar publicaciones */}
      <PublicationList refresh={refresh} />
    </Container>
  );
};

export default Publications;

