import { KintoAccountInfo } from "kinto-web-sdk";
import {
  createPublicClient,
  getContract,
  http,
  Address,
  defineChain,
} from "viem"; // Ensure these imports are correct and 'viem' is installed
import contractsJSON from "../../public/abis/7887.json"; // Adjust the path to your contracts JSON file
export async function fetchFromContract(
  kintoSDK: any,
  contractAddress: string,
  abi: string,
  functionName: string,
  params: any[]
) {
  try {
    const contract = kintoSDK.contract({
      address: contractAddress,
      abi: JSON.parse(abi),
    });
    const data = await contract.read({ method: functionName, args: params });
    return data;
  } catch (error) {
    console.error("Error fetching from contract:", error);
    throw error;
  }
}
export async function writeToContract(
  kintoSDK: any,
  contractAddress: string,
  abi: string,
  functionName: string,
  params: any[],
  senderAddress: string,
  privateKey: string
) {
  try {
    const contract = kintoSDK.contract({
      address: contractAddress,
      abi: JSON.parse(abi),
    });
    const result = await contract.write({
      method: functionName,
      args: params,
      sender: senderAddress,
      privateKey: privateKey,
    });
    return result;
  } catch (error) {
    console.error("Error writing to contract:", error);
    throw error;
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
