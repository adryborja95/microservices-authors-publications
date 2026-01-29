import { Typography, Box } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Home = () => {
  return (
    <Box textAlign="center">
      <MenuBookIcon
        sx={{
          fontSize: 200,
          mb: 2,
          color: "secondary.main",
        }}
      />

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