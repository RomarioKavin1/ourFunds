import { KintoAccountInfo } from "kinto-web-sdk";
import {
  createPublicClient,
  getContract,
  http,
  Address,
  defineChain,
  encodeFunctionData,
} from "viem"; // Ensure these imports are correct and 'viem' is installed
import contractsJSON from "../../public/abis/7887.json"; // Adjust the path to your contracts JSON file
import { FactoryABI, FactoryAddress } from "./abi";
export async function fetchOrgs() {
  const client = createPublicClient({
    chain: kintoChain,
    transport: http(),
  });
  const contract = getContract({
    address: FactoryAddress as Address,
    abi: FactoryABI,
    client: { public: client },
  });
  const data = await contract.read.getOrganizations([]);
  return data;
}

export async function createOrganization(
  kintoSDK: any,
  OrgName: string,
  SharePrice: number
) {
  const data = encodeFunctionData({
    abi: FactoryABI,
    functionName: "createOrganization",
    args: [OrgName, SharePrice],
  });
  try {
    const response = await kintoSDK.sendTransaction([
      { to: FactoryAddress, data, value: BigInt(0) },
    ]);
  } catch (error) {
    console.error("Failed to login/signup:", error);
  }
}
export const kintoChain = defineChain({
  id: 7887,
  name: "Kinto",
  network: "kinto",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.kinto-rpc.com/"],
      webSocket: ["wss://rpc.kinto.xyz/ws"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://kintoscan.io" },
  },
});
type KYCViewerInfo = {
  isIndividual: boolean;
  isCorporate: boolean;
  isKYC: boolean;
  isSanctionsSafe: boolean;
  getCountry: string;
  getWalletOwners: string[];
};
export async function fetchKYCViewerInfo(
  accountInfo: KintoAccountInfo | null
): Promise<KYCViewerInfo | null> {
  // Check if the wallet address is available
  if (!accountInfo?.walletAddress) {
    console.log("No wallet address found");
    return null;
  }

  const client = createPublicClient({
    chain: kintoChain,
    transport: http(),
  });
  const kycViewer = getContract({
    address: contractsJSON.contracts.KYCViewer.address as Address,
    abi: contractsJSON.contracts.KYCViewer.abi,
    client: { public: client },
  });

  try {
    const [
      isIndividual,
      isCorporate,
      isKYC,
      isSanctionsSafe,
      getCountry,
      getWalletOwners,
    ] = await Promise.all([
      kycViewer.read.isIndividual([accountInfo.walletAddress]),
      kycViewer.read.isCompany([accountInfo.walletAddress]),
      kycViewer.read.isKYC([accountInfo.walletAddress]),
      kycViewer.read.isSanctionsSafe([accountInfo.walletAddress]),
      kycViewer.read.getCountry([accountInfo.walletAddress]),
      kycViewer.read.getWalletOwners([accountInfo.walletAddress]),
    ]);

    // Return the fetched KYC information
    return {
      isIndividual,
      isCorporate,
      isKYC,
      isSanctionsSafe,
      getCountry,
      getWalletOwners,
    } as KYCViewerInfo;
  } catch (error) {
    console.error("Failed to fetch KYC viewer info:", error);
    return null; // Return null if fetching fails
  }
}
