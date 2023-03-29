import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import {
  InputAdornment,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { ROUTES } from "src/routes";
import MuiLink from "@mui/material/Link";
import Logout from "@mui/icons-material/Logout";
import { useAuth } from "src/contexts/AuthProvider";
import Avatar from "src/components/Avatar";
import SearchIcon from "@mui/icons-material/Search";

const drawerWidth = 240;

export default function Layout(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const textInputRef = useRef("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearch = (value) => {
    navigate(ROUTES.SEARCH(value));
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={"bar"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        color: "black",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <AppBar component="nav" color="inherit">
        <Container>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <Link style={{ textDecoration: "none" }} to={ROUTES.HOME}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" }, mr: 1 }}
                  color="primary"
                >
                  <b>RE AD</b>
                </Typography>
              </Link>
              <TextField
                inputRef={textInputRef}
                placeholder="Search..."
                size="small"
                onKeyDown={(e) => {
                  if (e.code === "Enter") {
                    handleSearch(e.target.value);
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        size="small"
                        onClick={() => {
                          const value = textInputRef.current.value;
                          if (value?.length > 0) {
                            handleSearch(value);
                          }
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {user ? (
              <Box>
                <Link style={{ textDecoration: "none" }} to={ROUTES.WRITE}>
                  <Button variant="outlined">Create Post</Button>
                </Link>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar name={user?.name} width="32px" height="32px" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>
                    <Avatar /> Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={logout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Link style={{ textDecoration: "none" }} to={ROUTES.LOGIN}>
                  <Button sx={{ mr: 1 }}>Log in</Button>
                </Link>
                <Link style={{ textDecoration: "none" }} to={ROUTES.REGISTER}>
                  <Button variant="contained" sx={{ color: "white" }}>
                    Create account
                  </Button>
                </Link>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}
