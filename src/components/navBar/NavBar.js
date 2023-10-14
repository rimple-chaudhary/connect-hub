import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { intitialUserState, selectLoginDataWithAll, setLoginData } from "../../redux/slice/AuthSlice";

const settings = ["Profile", "Logout"];

function NavBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { loggedInUser } = useSelector(selectLoginDataWithAll);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = (setting) => {
    if (setting === "Logout") {
      dispatch(setLoginData(intitialUserState));
      navigate("/signin");
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" className="navBar-container">
    
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <div style={{display:"flex", alignItems:"center"}}> 
          <FavoriteIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            style={{ color: "magenta" }}
          />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Amitié
          </Typography>
          </div>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <h5 style={{color:"white", paddingRight:"10px"}}> {loggedInUser.email}</h5>
                <Avatar
                  alt="Remy Sharp"
                  src="https://i.pinimg.com/736x/32/9f/2d/329f2d773f83f86af5a26dffd529ab50.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleLogout(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
