import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

interface LoadingProps {
  loading?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading = true }) => {
  if (!loading) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        mt: 25,
      }}
    >
      <Typography variant="h6">Please wait a moment</Typography>
      <CircularProgress sx={{ mt: 5 }} />
    </Box>
  );
};

export default Loading;
