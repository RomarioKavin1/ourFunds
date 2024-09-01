import { KintoAccountInfo } from "kinto-web-sdk";
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
export async function fetchKYCInfo(kintoSDK: any, userId: string) {
  try {
    const kycInfo = await kintoSDK.kyc.getInfo({ userId });
    return kycInfo;
  } catch (error) {
    console.error("Error fetching KYC information:", error);
    throw error;
  }
}
