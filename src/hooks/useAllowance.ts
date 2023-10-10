import { Address, useAccount, useContractRead } from "wagmi";
import { parseEther } from "viem";
import { erc20ABI } from "wagmi";
import { JACKPOT_ADDRESS, BULLRUN_ADDRESS } from "../statics/addresses";

export default function useAllowance() {
  const { address } = useAccount();

  const { data } = useContractRead({
    address: BULLRUN_ADDRESS as Address,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address as Address, JACKPOT_ADDRESS],
    watch: true,
  });

  return data ? (data as bigint) : parseEther("0");
}
