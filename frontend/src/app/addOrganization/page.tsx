"use client";

import BackgroundGradient from "@/components/BackgroundGradient";
import { useEffect, useState } from "react";
import Profile from "@/components/Profile";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import {
  createOrganization,
  fetchKYCViewerInfo,
  fetchOrgs,
} from "@/utils/kinto";
import { createKintoSDK, KintoAccountInfo } from "kinto-web-sdk";
import { KYCViewerInfo } from "../home/page";

const AddOrganization = () => {
  const appAddress = "0x2F10715B3439a8606eF3f7a2e6927ea2da735C67";
  if (!appAddress) {
    throw new Error("NEXT_PUBLIC_KINTO_APP_ADDRESS is not defined");
  }
  const [kycInfo, setKYCInfo] = useState<KYCViewerInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const kintoSDK = createKintoSDK(appAddress);
  ``;
  const [kintoAccount, setKintoAccount] = useState<KintoAccountInfo>();
  const [orgs, setOrgs] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    connectAndFetchKYC();
    console.log("Fetching organizations");
    Orgs();
  }, []);
  const Orgs = async () => {
    setOrgs((await fetchOrgs()) as any[]);
    console.log(orgs);
  };
  const connectAndFetchKYC = async () => {
    setLoading(true);
    setError(null);
    try {
      const accountInfo = await kintoSDK.connect();
      setKintoAccount(accountInfo);
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
  const [organizationName, setOrganizationName] = useState("");
  const [organizationDescription, setOrganizationDescription] = useState("");
  const [organizationAmout, setOrganizationAmount] = useState(0);

  // Add more state variables for additional form fields

  const inputFields = [
    {
      title: "Organization Name",
      stateValue: organizationName,
      setter: setOrganizationName,
      textArea: false,
    },
    {
      title: "Organization Description",
      stateValue: organizationDescription,
      setter: setOrganizationDescription,
      textArea: true,
    },
    {
      title: "Share Amount in WEI",
      stateValue: organizationAmout,
      setter: setOrganizationAmount,
      textArea: false,
    },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log({ organizationName, organizationDescription });
    await createOrg(organizationName, organizationAmout).then(() => {
      toast.success("New Organization successfully created", {
        position: "bottom-right", // Position of the toast
        autoClose: 2000, // Duration in milliseconds
        hideProgressBar: false, // Show progress bar
        closeOnClick: true, // Close on click
        pauseOnHover: true, // Pause on hover
        draggable: true, // Allow dragging
        progress: undefined, // Progress bar
        theme: "dark", // Theme for the toast
        onClose: () => router.push("/home"),
      });
    });
  };
  const createOrg = async (name: string, shareprice: number) => {
    await createOrganization(kintoSDK, name, shareprice);
    console.log("Organization created");
    Orgs();
  };

  return (
    <div
      className="flex flex-col h-screen p-8 overflow-y-scroll scroll-smooth"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <BackgroundGradient />
      <Profile user={kintoAccount?.walletAddress} />

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-6xl text-third z-10 font-extrabold mb-16">
          Create New Organization
        </h1>
        <div className="border h-auto p-16 w-3/5 m-10 rounded-[20px] z-10 bg-[white]/[0.08] border-[white]/[0.12]">
          <form onSubmit={handleSubmit}>
            {inputFields.map(
              ({ title, stateValue, setter, textArea }, index) => (
                <div key={index} className="mb-8">
                  <label className="block text-white text-2xl font-medium mb-6">
                    {title}
                  </label>
                  {textArea ? (
                    <textarea
                      className="w-full p-3 rounded-md bg-[white]/[0.05] border border-[white]/[0.2] text-white hover:bg-[white]/[0.08]"
                      onChange={(e) => setter(e.target.value)}
                      placeholder={`Enter ${title.toLowerCase()}`}
                      rows={4}
                      value={stateValue} // Bind stateValue directly to individual state
                    />
                  ) : (
                    <input
                      className="w-full p-3 rounded-md bg-[white]/[0.05] border border-[white]/[0.2] text-white hover:bg-[white]/[0.08]"
                      type="text"
                      onChange={(e) => setter(e.target.value)}
                      placeholder={`Enter ${title.toLowerCase()}`}
                      value={stateValue} // Bind stateValue directly to individual state
                    />
                  )}
                </div>
              )
            )}
            <div className="flex justify-center">
              <button
                className="bg-[white]/[0.12] py-2 px-4 rounded-lg flex items-center mt-10 
                        gap-4 border-[white]/[0.2] border transition-all hover:bg-[white]/[0.2]"
                type="submit"
              >
                Create Organization
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ToastContainer should be included at the top level of your app */}
      <ToastContainer />
    </div>
  );
};

export default AddOrganization;
