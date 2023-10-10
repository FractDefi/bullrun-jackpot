import { Address, useAccount, useBalance, useContractRead } from "wagmi";
import { formatEther, parseEther } from "viem";
import { JACKPOT_ADDRESS, BULLRUN_ADDRESS } from "../statics/addresses";
import jackpotABI from "@/src/statics/abis/jackpotABI.json";

export default function useDailyJackpot() {
 
  const { data } = useContractRead({
    address: JACKPOT_ADDRESS as Address,
    abi: jackpotABI,
    functionName: "dailyPot",
    watch: true,
  });

  return data ? Number(formatEther(data as bigint)) : 0;
}
