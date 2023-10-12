import { Address, useContractRead } from "wagmi";
import { formatEther } from "viem";
import { JACKPOT_ADDRESS } from "../statics/addresses";
import jackpotABI from "@/src/statics/abis/jackpotABI.json";

export default function useTotalPaid() {
  const { data } = useContractRead({
    address: JACKPOT_ADDRESS as Address,
    abi: jackpotABI,
    functionName: "totalPaid",
    watch: true,
  });

  return data ? formatEther(data as bigint) : '0';
}
