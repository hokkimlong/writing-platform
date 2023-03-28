import { Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/routes";

const Tag = ({ name, id, available, ...props }) => {
  const navigate = useNavigate();
  return (
    <Chip
      onClick={(e) => {
        e.stopPropagation();
        if (id) {
          navigate(ROUTES.TAG(id));
        }
      }}
      component="a"
      clickable
      size="small"
      label={
        <Box display="flex" alignItems="center">
          <Typography color="primary" sx={{ fontWeight: "600" }}>
            #
          </Typography>
          <Typography variant="caption">{name}</Typography>
          {available && (
            <Box
              sx={{
                ml: "5px",
                background: (theme) => theme.palette.primary.light,
                borderRadius: "50%",
                color: "white",
                minWidth: "20px",
                minHeight: "20px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {available}
            </Box>
          )}
        </Box>
      }
      {...props}
    />
  );
};

export default Tag;
