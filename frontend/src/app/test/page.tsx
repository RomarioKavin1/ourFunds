"use client";

import { useRouter } from "next/navigation";
import { createKintoSDK, KintoAccountInfo } from "kinto-web-sdk";
import { useEffect, useState } from "react";

export default function SignIn() {
  const appAddress = "0x14A1EC9b43c270a61cDD89B6CbdD985935D897fE";
  if (!appAddress) {
    throw new Error("NEXT_PUBLIC_KINTO_APP_ADDRESS is not defined");
  }
  const kintoSDK = createKintoSDK(appAddress);
  const router = useRouter();
  const [kintoAccount, setKintoAccount] = useState<KintoAccountInfo>();
  useEffect(() => {
    kintoSDK
      .connect()
      .then((accountInfo: KintoAccountInfo) => {
        console.log("Connected account info:", accountInfo);
        setKintoAccount(accountInfo);
      })
      .catch((error: any) => {
        console.error("Failed to connect:", error);
      });
  }, []);
  const handleClick = async () => {
    console.log("Button clicked");
    try {
      const accountInfo = await kintoSDK.createNewWallet();
      console.log("Connected account info:", accountInfo);
      // const encodedAccountInfo = encodeURIComponent(
      //   JSON.stringify(newAccountInfo.walletAddress)
      // );
      // const url = `/wallet?accountInfo=${encodedAccountInfo}`;
      // console.log("Redirecting to:", url);
      // router.push(url);
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {!kintoAccount ? (
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              onClick={handleClick}
            >
              Sign in using Kinto Wallet
            </button>
          ) : (
            <div>{kintoAccount.walletAddress}</div>
          )}
        </div>
      </main>
    </div>
  );
}
