import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Título */}
        <Typography variant="h6" component= {Link} to="/" sx={{ flexGrow: 3, textDecoration: "none", color: "inherit" }}>
          Editorial Digital
        </Typography>

        {/* Botones */}
        <Box>
          <Button color="primary" component={Link} to="/authors">Autores</Button>
          <Button color="primary" component={Link} to="/publications">Publicaciones</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
