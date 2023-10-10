import { Address, useAccount, useContractRead } from "wagmi";
import { formatEther } from "viem";
import { JACKPOT_ADDRESS } from "../statics/addresses";
import jackpotABI from "@/src/statics/abis/jackpotABI.json";

export default function usePreviousRound() {
  const { data } = useContractRead({
    address: JACKPOT_ADDRESS as Address,
    abi: jackpotABI,
    functionName: "getPreviousRoundStats",
    watch: false,
  });

  const prevRound = {
    winner: data ? (data as any)[0] : null,
    ticketCount: data ? Number((data as any)[1]) : 0,
    potAmount: data ? (data as any)[2] : 0,
  };
  return prevRound;
}
