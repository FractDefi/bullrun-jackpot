import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaWallet } from "react-icons/fa";

export default function WalletConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            className="w-full h-12"
            {...(!ready && {
              "aria-hidden": true,
            })}
          >
            <div className="w-full h-full">
              {!connected && (
                <button
                  onClick={openConnectModal}
                  className="bg-neutral-700 rounded-md hover:scale-110 transition-transform relative flex justify-center items-center p-5 uppercase text-ogre"
                >
                  <div className="z-10 flex gap-2">
                    <FaWallet size={23} />
                    Connect Wallet
                  </div>
                </button>
              )}

              {chain && chain.unsupported && (
                <button
                  onClick={openChainModal}
                  className="bg-neutral-700 rounded-md  hover:scale-110 transition-transform relative flex justify-center items-center p-5 uppercase text-ogre"
                >
                  <div className="z-10 flex gap-2">Unsupported network</div>
                </button>
              )}

              {connected && !chain.unsupported && (
                <button
                  onClick={openAccountModal}
                  className="bg-neutral-700 rounded-md hover:scale-110 transition-transform relative flex justify-center items-center p-5 uppercase text-ogre"
                >
                  <div className="z-10 flex gap-2"> {account.displayName}</div>
                </button>
              )}
            </div>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
