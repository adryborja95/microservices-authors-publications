import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";

import AuthorForm from "../components/authors/AuthorForm";
import AuthorList from "../components/authors/AuthorList";

const Authors = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <Container sx={{ mt: 4 }}>
     
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Autores
        </Typography>

        <Typography variant="subtitle1">
          Gestión de autores del sistema editorial
        </Typography>
      </Box>

      {/* Crear autor */}
      <AuthorForm onAuthorCreated={() => setRefresh(!refresh)} />

      {/* Listar autores */}
      <AuthorList refresh={refresh} />
    </Container>
  );
};

export default Authors;
