import {
  Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { erc20ABI } from "wagmi";
import { JACKPOT_ADDRESS, BULLRUN_ADDRESS } from "../statics/addresses";

export default function useApprove() {
  const preparation = usePrepareContractWrite({
    address: BULLRUN_ADDRESS,
    abi: erc20ABI,
    functionName: "approve",
    args: [JACKPOT_ADDRESS, BigInt("100000000000000000000")],
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
    onSuccess() {},
  });

  return { confirmation, transaction };
}
