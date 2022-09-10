import { Box, Typography } from "@mui/material";

const Header = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "backgroundColor",
        borderTop: "1px solid #e0f1f8",
        borderBottom: "1px solid #e0f1f8",
        boxShadow:
          "0px -1px 0px 0px rgba(0,0,0,0.2), 0px 1px 0px 0px rgba(0,0,0,0.14), 0px 2px 0px 0px rgba(0,0,0,0.12)",
        padding: "0px",
        margin: "0px",
        height: 100,
        textAlign: "center",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        color: "primary.contrastText",
      }}
    >
      <Typography
        variant="overline"
        noWrap={true}
        sx={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        {" "}
        {props.title}{" "}
      </Typography>
    </Box>
  );
};

export default Header;
