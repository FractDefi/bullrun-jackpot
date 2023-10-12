"use client";
import { motion } from "framer-motion";
import { useWeb2Context } from "../contexts/web2Context";
import { useState } from "react";
import Image from "next/image";
import NumberInput from "@/src/components/Reusable/NumberInput";
import { Address, formatEther, parseEther } from "viem";
import BULLRUN from "@/src/statics/images/logo.png";
import useTokenBalance from "@/src/hooks/useTokenBalance";
import useAllowance from "@/src/hooks/useAllowance";
import useApprove from "@/src/hooks/useApprove";
import { BULLRUN_ADDRESS } from "@/src/statics/addresses";
import useStake from "@/src/hooks/useBuyTicket";

import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import { formatNumberToCurrency } from "../statics/helpers/numberFormatter";
import sign from "@/src/statics/images/sign.png";
import thesign from "@/src/statics/images/mainsign.png";
import useTicketPrice from "../hooks/useTicketPrice";
import useTotalPaid from "../hooks/useTotalPaid";
import useUserTickets from "../hooks/useUserTickets";
import useDailyJackpot from "../hooks/useDailyJackpot";
import useNextRound from "../hooks/useNextRound";
import Timer from "../components/Reusable/Timer";
import usePreviousRound from "../hooks/usePreviousRound";

export default function Home() {
  const web2Context = useWeb2Context();
  const [value, setValue] = useState("");

  const bullrunBalance = useTokenBalance(BULLRUN_ADDRESS);
  const ticketPrice = useTicketPrice();
  const totalPaid = useTotalPaid();
  const userTickets = useUserTickets();
  const dailyJackpot = useDailyJackpot();
  const nextRound = useNextRound();
  const previousRound = usePreviousRound();

  const bullrunAllowance = useAllowance();
  const approveBullrunTX = useApprove();

  const buyTicketTX = useStake(Number(value));

  return (
    <section className="relative w-full flex flex-col items-center gap-10 lg:gap-20 pt-28 md:pt-0 justify-center tracking-widest">
      <motion.div
        initial={{ scale: 1.05, opacity: 0, translateY: "-20px" }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center gap-2 md:gap-4"
      >
        <div className="">
          {/* <div className="animate-wiggle text-4xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-bullrun2 to-[#B07133]"> */}
          <div className="text-4xl md:text-7xl text-transparent text-center bg-clip-text bg-gradient-to-r from-ogre to-[#B07133]">
            ENTER BULL MARKET LOADED
          </div>
        </div>
        <div className="text-2xl md:text-5xl text-black underline">
          PLAY BULLRUN JACKPOT
        </div>

        {previousRound.ticketCount != 0 && (
          <div className="bg-white p-2 rounded-xl">
            <div className="text-bullrun text-xl w-full text-center ">
              {`Yesterday, ${previousRound.winner.slice(
                0,
                5
              )}...${previousRound.winner.slice(-5)}`}{" "}
              won {formatEther(previousRound.potAmount)} BULLRUN (
              {formatNumberToCurrency(
                Number(formatEther(previousRound.potAmount)) *
                  Number(web2Context?.bullrunPrice)
              )}
              ) with only {previousRound.ticketCount} tickets
            </div>
          </div>
        )}

        <div className="max-w-[90%] w-full flex flex-col md:flex-row gap-4 justify-center">
          <div className="w-full text-xl bg-ogre/50 backdrop-blur-sm rounded-2xl relative max-w-3xl flex flex-col justify-center items-center p-5 text-black">
            <div className="flex flex-col justify-center items-center text-2xl">
              Daily Jackpot
              <div>
                {dailyJackpot.toFixed(4)} BULLRUN (
                {formatNumberToCurrency(
                  Number(web2Context?.bullrunPrice) * dailyJackpot
                )}
                )
              </div>
            </div>
            <div className="mt-5 z-10 w-full flex flex-col items-center gap-5">
              <div className="w-full flex justify-between items-center">
                Ticket Price
                <div>
                  {ticketPrice} BULLRUN (
                  {web2Context &&
                    formatNumberToCurrency(
                      Number(web2Context.bullrunPrice) * Number(ticketPrice)
                    )}
                  )
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                Total Paid Ever
                <div>{totalPaid} BULLRUN</div>
              </div>
              <div className="w-full flex justify-between items-center">
                Your Tickets today
                <div>{userTickets}</div>
              </div>
            </div>

            <div className="mt-5 z-10 w-full flex flex-col md:flex-row justify-center items-center gap-2">
              Next Random Winner In{" "}
              <div>
                <Timer toDate={nextRound} />
              </div>
            </div>

            <div className="z-10 mt-5 mx-auto">
              <NumberInput
                value={value}
                balance={bullrunBalance ? bullrunBalance.formatted : "0"}
                setValueCallback={setValue}
                tokenImgSrc={BULLRUN}
                ticketPrice={ticketPrice}
                unitPrice={
                  web2Context && web2Context.bullrunPrice
                    ? web2Context.bullrunPrice
                    : 0
                }
              />
            </div>

            <div className="mt-5 z-10 flex gap-10">
              {Number(bullrunAllowance) === 0 ||
              bullrunAllowance <
                parseEther((Number(value) * ticketPrice).toString()) ? (
                <button
                  disabled={!approveBullrunTX.transaction.write}
                  onClick={() => {
                    if (approveBullrunTX.transaction.write) {
                      setValue("");
                      approveBullrunTX.transaction.write();
                    }
                  }}
                  className="bg-neutral-700 rounded-md disabled:contrast-50 transition-transform relative flex justify-center items-center p-5 uppercase text-bullrun"
                >
                  {approveBullrunTX.confirmation.isLoading ? (
                    <div className="pt-0.5 z-10 flex gap-2 items-center">
                      APPROVING...{" "}
                      <Image
                        src={BULLRUN}
                        height={30}
                        className="animate-wiggle"
                        alt="logo"
                      />
                    </div>
                  ) : (
                    <div className="pt-0.5 z-10 flex gap-2">APPROVE</div>
                  )}
                </button>
              ) : (
                <button
                  disabled={
                    !buyTicketTX.transaction.write ||
                    !value ||
                    (bullrunBalance &&
                      Number(value) * ticketPrice > bullrunBalance.value)
                  }
                  onClick={() => {
                    if (buyTicketTX.transaction.write) {
                      buyTicketTX.transaction.write();
                    }
                  }}
                  className="bg-neutral-700 rounded-md  disabled:contrast-50 transition-transform relative flex justify-center items-center p-5 uppercase text-bullrun"
                >
                  {buyTicketTX.confirmation.isLoading ? (
                    <div className="z-10 flex gap-2 items-center">
                      BUYING TICKETS...{" "}
                      <Image
                        src={BULLRUN}
                        height={30}
                        className="animate-wiggle"
                        alt="logo"
                      />
                    </div>
                  ) : (
                    <div className="z-10 flex gap-2">BUY {value} TICKETS</div>
                  )}
                </button>
              )}
            </div>
            <a
              className="mt-2 text-xs underline"
              href="https://baseswap.fi/swap?outputCurrency=0x1a9132ee02d7e98e51b7389d2e7bb537184867aa"
              target="_blank"
            >
              Buy BULLRUN
            </a>
          </div>

          <div className="bg-zinc-950/30 backdrop-blur-sm rounded-2xl relative h-full p-5 text-white">
            <div className="text-xl">Rules</div>
            <ul className="pl-2 mt-2 list-disc">
              <li>Every 3 days, a new Jackpot and a random new winner!</li>
              <li>Buy Tickets with BULLRUN, no LIMITS!</li>
              <li>1 ticket gives 1 entry, unlimited entries.</li>
              <li>Be the luckiest winner and get the JACKPOT!</li>
              <li>Winner receives the JACKPOT automatically, no claiming.</li>
              <li>
                At the end of the lottery, a 5% fee is kept to feed the bulls.
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
