import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useAppSelector, useAppDispatch } from "../hooks";
import { openForm } from "../redux/postSlice";
function Bar() {
  const dispatch = useAppDispatch();
  const length : number = useAppSelector((state) => state.post.favouritePosts).length;
  return (
    <div className="navbar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          component="nav"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <Toolbar>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Tooltip title="Home">
                <Typography
                  className="app-logo "
                  color="blue"
                  fontSize="35px"
                  fontWeight="bold"
                  marginLeft="5%"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  Posts
                </Typography>
              </Tooltip>
            </Link>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                marginLeft: "75%",
                gap: "20%",
              }}
            >
              <Link to="/favourite">
                <IconButton size="large" aria-label="" color="default">
                  <Tooltip disableFocusListener title="Added Posts">
                    <Badge badgeContent={length} color="error">
                      <GradeRoundedIcon />
                    </Badge>
                  </Tooltip>
                </IconButton>
              </Link>

              <Link to="/">
                <IconButton
                  onClick={() => dispatch(openForm(null))}
                  size="large"
                  aria-label=""
                  color="default"
                >
                  <Tooltip disableFocusListener title="Add new post">
                    <PostAddIcon />
                  </Tooltip>
                </IconButton>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Bar;
