"use client";

import { useRouter } from "next/navigation";
import { createKintoSDK, KintoAccountInfo } from "kinto-web-sdk";
import { useEffect, useState } from "react";
import { fetchKYCViewerInfo } from "@/utils/kinto";
type KYCViewerInfo = {
  isIndividual: boolean;
  isCorporate: boolean;
  isKYC: boolean;
  isSanctionsSafe: boolean;
  getCountry: string;
  getWalletOwners: string[];
};

export default function SignIn() {
  const appAddress = "0x14A1EC9b43c270a61cDD89B6CbdD985935D897fE";
  if (!appAddress) {
    throw new Error("NEXT_PUBLIC_KINTO_APP_ADDRESS is not defined");
  }
  const [kycInfo, setKYCInfo] = useState<KYCViewerInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const kintoSDK = createKintoSDK(appAddress);
  const router = useRouter();
  const [kintoAccount, setKintoAccount] = useState<KintoAccountInfo>();
  const connectAndFetchKYC = async () => {
    setLoading(true);
    setError(null);

    try {
      // Connect to the wallet using Kinto SDK
      const accountInfo = await kintoSDK.connect();
      setKintoAccount(accountInfo);

      // Fetch KYC information using the fetched account info
      const kycData = await fetchKYCViewerInfo(accountInfo);
      setKYCInfo(kycData);

      console.log("KYC Information:", kycData);
    } catch (error) {
      console.error("Error fetching KYC information:", error);
      setError("Failed to fetch KYC information.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect to automatically connect and fetch data when the component mounts
  useEffect(() => {
    connectAndFetchKYC();
  }, []);
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
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">KYC Viewer Info</h1>

          {loading ? (
            <p>Loading KYC Information...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : kycInfo ? (
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <p>Wallet Address: {kintoAccount?.walletAddress}</p>
              <p>Is Individual: {kycInfo.isIndividual ? "Yes" : "No"}</p>
              <p>Is Corporate: {kycInfo.isCorporate ? "Yes" : "No"}</p>
              <p>Is KYC Verified: {kycInfo.isKYC ? "Yes" : "No"}</p>
              <p>Sanctions Safe: {kycInfo.isSanctionsSafe ? "Yes" : "No"}</p>
              <p>Country: {kycInfo.getCountry}</p>
              <p>Wallet Owners: {kycInfo.getWalletOwners.join(", ")}</p>
            </div>
          ) : (
            <button
              onClick={connectAndFetchKYC}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Fetch KYC Information
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
