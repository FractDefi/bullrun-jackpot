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
    address: BULLRUN_ADDRESS as Address,
    abi: erc20ABI,
    functionName: "approve",
    args: [JACKPOT_ADDRESS as Address, BigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935")],
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
