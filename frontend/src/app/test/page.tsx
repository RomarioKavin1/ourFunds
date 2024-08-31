// pages/connect.js
import { useState } from "react";
import { createKintoSDK, KintoAccountInfo } from "kinto-web-sdk";

const ConnectKintoWallet = () => {
  const [accountInfo, setAccountInfo] = useState<null | KintoAccountInfo>(null);
  const [error, setError] = useState<string | null>(null);

  // Replace 'your-app-address' with your actual app address
  const appAddress = "your-app-address";
  const kintoSDK = createKintoSDK(appAddress);

  const connectWallet = async () => {
    try {
      const account = await kintoSDK.connect();
      setAccountInfo(account);
      setError(null);
    } catch (err) {
      setError("Failed to connect: " + (err as Error).message);
      setAccountInfo(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Connect to Kinto Wallet</h1>
      <button
        onClick={connectWallet}
        style={{ padding: "10px", cursor: "pointer" }}
      >
        Connect Wallet
      </button>

      {accountInfo && (
        <div style={{ marginTop: "20px" }}>
          <h2>Connected Account Info:</h2>
          <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ConnectKintoWallet;
