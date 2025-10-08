import { JSX } from "react";
import { Box, Button, Container, Typography } from "@mui/material";

const Fallback = (): JSX.Element => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
          <Box
            sx={{
              textAlign: "center",
              px: 2,
            }}
          >
            <Box sx={{ maxWidth: 800, mx: "auto" }}>
              <svg
                viewBox="0 0 800 500"
                width="100%"
                height="auto"
                role="img"
                aria-label="Website crash illustration"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Website crashed illustration</title>
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0" stopColor="#f5f7fa" />
                    <stop offset="1" stopColor="#e9eef8" />
                  </linearGradient>
                  <linearGradient id="s" x1="0" x2="1">
                    <stop offset="0" stopColor="#ffd1d1" />
                    <stop offset="1" stopColor="#ff9a9a" />
                  </linearGradient>
                </defs>

                <rect
                  x="60"
                  y="40"
                  width="680"
                  height="340"
                  rx="20"
                  fill="url(#g)"
                  stroke="#d0d7ea"
                  strokeWidth="4"
                />

                <rect
                  x="110"
                  y="90"
                  width="580"
                  height="240"
                  rx="10"
                  fill="#ffffff"
                  stroke="#cfd8e9"
                  strokeWidth="2"
                />

                <g transform="translate(350,180) scale(1.8)">
                  <circle
                    cx="0"
                    cy="0"
                    r="42"
                    fill="url(#s)"
                    stroke="#ff6b6b"
                    strokeWidth="3"
                  />
                  <path
                    d="M-20 -20 L20 20 M20 -20 L-20 20"
                    stroke="#7a1f1f"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </g>

                <path
                  d="M200 160 C260 180 320 140 380 170 C440 200 500 130 560 160"
                  stroke="#ff6b6b"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />

                <circle cx="200" cy="130" r="6" fill="#ffdede" />
                <circle cx="600" cy="260" r="5" fill="#ffdede" />
                <rect
                  x="320"
                  y="390"
                  width="160"
                  height="16"
                  rx="4"
                  fill="#d0d7ea"
                />
                <rect
                  x="360"
                  y="410"
                  width="80"
                  height="12"
                  rx="6"
                  fill="#cfd8e9"
                />
              </svg>
            </Box>

            <Typography variant="h3" component="h1" sx={{ mt: -2 }}>
              Oops! Something went wrong.
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ mb: 2, mt: 1 }}
            >
              We encountered an unexpected error.
              later.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.href = '/'}
              sx={{ borderRadius: 1, px: 2, py: 1 }}
            >
              Home Page
            </Button>
          </Box>
        </Container>
  )
}

export default Fallback