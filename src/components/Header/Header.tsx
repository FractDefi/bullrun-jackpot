"use client";
import { BsTwitter } from "react-icons/bs";
import { BiLogoTelegram } from "react-icons/bi";

import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/src/statics/images/logo.png";
import Link from "next/link";
import WalletConnectButton from "../Reusable/WalletConnectButton";
import useTokenBalance from "@/src/hooks/useTokenBalance";
import { useWeb2Context } from "@/src/contexts/web2Context";
import { formatNumberToCurrency } from "@/src/statics/helpers/numberFormatter";
import { BULLRUN_ADDRESS } from "@/src/statics/addresses";

export default function Header() {
  const nativeBalance = useTokenBalance(BULLRUN_ADDRESS);
  const web2Context = useWeb2Context();

  return (
    <motion.div
      initial={{
        translateY: "-200px",
      }}
      animate={{ translateY: 0 }}
      transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
      className="w-full relative z-10 px-4 md:px-7 flex flex-col md:flex-row justify-center md:justify-between items-center gap-5 md:gap-0 py-2"
    >
      <Link href="/" className="h-full flex gap-4 items-center">
        {/* <Image src={logo} alt="logo" height={100} className="animate-wiggle" /> */}
        <Image src={logo} alt="logo" height={100} />
        <div className="flex gap-5">
          <div className="flex flex-col text-zinc-100 text-lg">
            {nativeBalance && (
              <span>
                {Number(nativeBalance.formatted).toFixed(0)}{" "}
                {nativeBalance.symbol}
                {web2Context && web2Context.bullrunPrice && (
                  <div>
                    {formatNumberToCurrency(
                      Number(web2Context.bullrunPrice) *
                        Number(nativeBalance.formatted)
                    )}
                  </div>
                )}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="flex justify-end">
          <WalletConnectButton />
      </div>
    </motion.div>
  );
}
