import { Address } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import jackpotABI from "@/src/statics/abis/jackpotABI.json";
import { JACKPOT_ADDRESS } from "../statics/addresses";

export default function useBuyTicket(count: number) {

  const preparation = usePrepareContractWrite({
    address: JACKPOT_ADDRESS as Address,
    abi: jackpotABI,
    enabled: count > 0,
    functionName: "buyTickets",
    args: [count],
    onError(err) {
      console.error(err);
    },
  });

  const transaction = useContractWrite({
    ...preparation.config,
    onError(err) {
      console.error(err);
    },
  });
  const confirmation = useWaitForTransaction({
    confirmations: 2,
    hash: transaction.data?.hash,
    onError(error) {
      console.error(error);
    },
  });

  return { confirmation, transaction };
}
