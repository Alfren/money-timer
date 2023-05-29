import { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AttachMoney } from "@mui/icons-material";

export default function App() {
  const [rate, setRate] = useState(null);
  const [time, setTime] = useState(0);
  const [state, setState] = useState(true);

  useEffect(() => {
    const interval = setInterval(
      () => setTime((currentTime) => currentTime + 1),
      1000
    );
    if (state) clearInterval(interval);
    return () => clearInterval(interval);
  }, [state]);

  const toggleState = () => setState(!state);
  const handleReset = () => {
    setState(true);
    setTime(0);
  };
  return (
    <Stack spacing={3} mt={3}>
      <Stack direction="row" spacing={3} justifyContent="center">
        <TextField
          size="small"
          label="Hourly Rate"
          type="number"
          autoFocus={rate === null}
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          inputProps={{ step: "0.01" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            ),
          }}
          disabled={!state}
        />
      </Stack>
      <Typography variant="h4" align="center" color="white">
        {((rate / 60 / 60) * time).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </Typography>
      <Typography variant="h4" align="center" color="white">
        {Math.floor(time / 60) > 0 && `${Math.floor(time / 60)}m`} {time % 60}s
      </Typography>
      <Stack direction="row" spacing={3} justifyContent="center">
        {!state ? (
          <Button variant="outlined" color="error" onClick={toggleState}>
            Stop
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="success"
            onClick={toggleState}
            disabled={!rate}
          >
            Start
          </Button>
        )}
        {!state ||
          (time > 0 && (
            <Button variant="outlined" color="warning" onClick={handleReset}>
              Reset
            </Button>
          ))}
      </Stack>
    </Stack>
  );
}
