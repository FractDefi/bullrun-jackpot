import { Address, useAccount, useContractRead } from "wagmi";
import { formatEther } from "viem";
import { JACKPOT_ADDRESS } from "../statics/addresses";
import jackpotABI from "@/src/statics/abis/jackpotABI.json";

export default function useUserTickets() {

  const {address} = useAccount()

  const { data } = useContractRead({
    address: JACKPOT_ADDRESS as Address,
    abi: jackpotABI,
    functionName: "dailyBuyerTickets",
    args: [address],
    watch: true,
  });

  return data ? Number(data) : 0;
}
