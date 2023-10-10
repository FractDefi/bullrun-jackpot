import { formatNumberToCurrency } from "@/src/statics/helpers/numberFormatter";
import Image from "next/image";
import { GiTicket, GiTwoCoins } from "react-icons/gi";

export default function NumberInput({
  tokenImgSrc,
  ticketPrice,
  value,
  unitPrice,
  balance,
  setValueCallback,
}: {
  tokenImgSrc: any;
  ticketPrice: Number;
  value: string;
  unitPrice: Number;
  balance: string;
  setValueCallback: (value: string) => void;
}) {
  return (
    <div className="w-full flex items-center h-12 gap-2 bg-zinc-100 border-2 border-ogre text-black rounded-lg pl-2">
      <GiTicket size={35} className="text-ogre" />

      <input
        value={value}
        onChange={(e) => setValueCallback(e.target.value)}
        type="number"
        placeholder={`How many tickets?`}
        className="pt-1 w-full outline-none bg-transparent"
      />
      <div className="pt-1">
        {formatNumberToCurrency(
          Number(ticketPrice) * Number(value) * Number(unitPrice)
        )}
      </div>
      <div className="pt-1 flex gap-2 hover:bg-ogre/10 border-l-[1px] border-ogre/20 justify-center items-center relative whitespace-nowrap px-4 h-full transition-colors duration-500">
        {balance !== "0" ? Number(balance).toFixed(4) : 0}

        <Image src={tokenImgSrc} height={30} className="pb-1" alt="eth" />
      </div>
    </div>
  );
}
