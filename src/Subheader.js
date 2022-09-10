import { Box, Typography } from "@mui/material";

const Subheader = (props) => {

  let title = props.title;
  if (props.title.length > 14) {
    title = props.title.substring(0, 11) + "...";
  }
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "backgroundColor",
        boxShadow:
          "0px -0.5px 0px 0px rgba(0,0,0,0.2), 0px 0.7px 0px 0px rgba(0,0,0,0.14), 0px 1px 0px 0px rgba(0,0,0,0.12)",
        padding: "0px",
        margin: "0px",
        height: 50,
        textAlign: "center",
      }}
    >
      <Typography
        variant="overline"
        sx={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        {" "}
        {title}{" "}
      </Typography>
    </Box>
  );
};

export default Subheader;
