import { Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom>
        Bienvenido al sistema editorial
      </Typography>
      <Typography variant="subtitle1">
        Gestión de Autores y Publicaciones
      </Typography>
    </Box>
  );
};

export default Home;