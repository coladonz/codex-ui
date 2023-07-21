import { AppState } from "@/state";
import { BigNumber, ethers } from "ethers";
import { useSelector } from "react-redux";

export const useBalance = (tokenAddr: string): BigNumber => {
    return useSelector((state: AppState) => state.app.balances ? BigNumber.from(state.app.balances[tokenAddr.toLowerCase()] || ethers.constants.Zero) : ethers.constants.Zero);
}