import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import { CircularProgress, SvgIcon } from "@mui/material";

interface IProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#0C1012",
  borderRadius: "2rem",
};

export default function WaitingModal({ isActive, setIsActive }: IProps) {
  return (
    <Modal
      open={isActive}
      onClose={() => setIsActive(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="xs:!w-[15rem] md:!w-[20rem]">
        <div className="flex gap-3 flex-col bg-[#11171A] p-[1.3rem] rounded-[2rem] xs:w-[15rem] md:w-[20rem] xs:h-[15rem] md:h-[20rem]">
          <div className="h-full relative">
            <div className="h-full relative flex items-center justify-center flex-col gap-3">
              <CircularProgress size="4rem" />
              <div className="text-center">
                <h2 className="font-SpaceGroteskBold text-white text-base">
                  Waiting for confirmation
                </h2>
                <p className="font-SpaceGroteskRegular text-xs text-grayish">
                  Please sign this transaction in your wallet
                </p>
              </div>
            </div>
            <button
              className="absolute right-0 top-0 bg-bluishLight hover:bg-bluishLightHover rounded-full"
              onClick={() => setIsActive(false)}
            >
              <SvgIcon
                component={ClearIcon}
                sx={{
                  color: "rgb(138,153,168)",
                  fontSize: "1.5rem",
                  m: "0.4rem",
                }}
              />
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
