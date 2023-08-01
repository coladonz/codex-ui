import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { bunniGauges } from "@/config/contracts";
import Image from "next/image";

export default function ClaimPools() {
  return (
    <Box>
      <Grid container>
        <Grid item md={12} lg={12} className="border border-gray-300 text-sm">
          <Table>
            <TableBody>
              <TableRow
                key="Staked cdxLIT"
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  Staked cdxLIT
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  <div>
                    <div>Amount Claimable</div>
                    <div className="text-lg text-black font-bold">$ -</div>
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  <div>
                    <div>Average vAPR</div>
                    <div className="text-lg text-black font-bold">- %</div>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="text"
                    className="codex-button"
                    onClick={() => {}}
                  >
                    <Image
                      src="/icons/claim.svg"
                      width={20}
                      height={20}
                      alt="claim"
                    />
                    Claim
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow
                key="Staked CDX"
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  Staked CDX
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  <div>
                    <div>Amount Claimable</div>
                    <div className="text-lg text-black font-bold">$ -</div>
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  <div>
                    <div>Average vAPR</div>
                    <div className="text-lg text-black font-bold">- %</div>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="text"
                    className="codex-button"
                    onClick={() => {}}
                  >
                    <Image
                      src="/icons/claim.svg"
                      width={20}
                      height={20}
                      alt="claim"
                    />
                    Claim
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow
                key="Locked CDX"
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  Locked CDX
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  <div>
                    <div>Amount Claimable</div>
                    <div className="text-lg text-black font-bold">$ -</div>
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  <div>
                    <div>Average vAPR</div>
                    <div className="text-lg text-black font-bold">- %</div>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="text"
                    className="codex-button"
                    onClick={() => {}}
                  >
                    <Image
                      src="/icons/claim.svg"
                      width={20}
                      height={20}
                      alt="claim"
                    />
                    Claim
                  </Button>
                </TableCell>
              </TableRow>

              {bunniGauges.map((gauge, index) => (
                <TableRow
                  key={gauge.pid}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      color: "rgb(156 163 175 / var(--tw-text-opacity))",
                    }}
                  >
                    {gauge.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "rgb(156 163 175 / var(--tw-text-opacity))",
                    }}
                  >
                    <div>
                      <div>Amount Claimable</div>
                      <div className="text-lg text-black font-bold">$ -</div>
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "rgb(156 163 175 / var(--tw-text-opacity))",
                    }}
                  >
                    <div>
                      <div>Average vAPR</div>
                      <div className="text-lg text-black font-bold">- %</div>
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="text"
                      className="codex-button"
                      onClick={() => {}}
                    >
                      <Image
                        src="/icons/claim.svg"
                        width={20}
                        height={20}
                        alt="claim"
                      />
                      Claim
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
}
