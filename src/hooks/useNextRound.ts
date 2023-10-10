import { Address, useAccount, useContractRead } from "wagmi";
import { formatEther } from "viem";
import { JACKPOT_ADDRESS } from "../statics/addresses";
import jackpotABI from "@/src/statics/abis/jackpotABI.json";

export default function useNextRound() {

  const { data } = useContractRead({
    address: JACKPOT_ADDRESS as Address,
    abi: jackpotABI,
    functionName: "nextRound",
    watch: true,
  });

  return data ? Number(data) : 0;
}
