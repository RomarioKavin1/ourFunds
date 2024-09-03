"use client";

import React, { useState } from "react";
import { SignProtocolClient, SpMode, OffChainSignType } from "@ethsign/sp-sdk";
import { privateKeyToAccount, Account } from "viem/accounts";
const privateKey =
  `0x${process.env.NEXT_PUBLIC_PVT_KEY || "abc"}` as `0x${string}`;
const account = privateKeyToAccount(privateKey);

// Initialize SignProtocolClient in Off-Chain mode
const client = new SignProtocolClient(SpMode.OffChain, {
  signType: OffChainSignType.EvmEip712,
  account,
});

const SignProtocolPage = () => {
  const [schemaInfo, setSchemaInfo] = useState<any>(null);
  const [attestationInfo, setAttestationInfo] = useState<any>(null);
  const [revokeResponse, setRevokeResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleCreateSchema = async () => {
    setLoading(true);
    setError(null);
    try {
      const schema = await client.createSchema({
        name: "User Verification",
        data: [{ name: "name", type: "string" }],
      });
      setSchemaInfo(schema);
      console.log("Schema created:", schema);
    } catch (err) {
      setError("Failed to create schema");
      console.error("Error creating schema:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to create an attestation
  const handleCreateAttestation = async () => {
    if (!schemaInfo) {
      setError("Create a schema first");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const attestation = await client.createAttestation({
        schemaId: schemaInfo.schemaId, // Use the schema ID from the created schema
        data: { name: "Alice" }, // Data to be attested according to the schema
        indexingValue: "unique-index", // Unique value for indexing purposes
      });
      setAttestationInfo(attestation);
      console.log("Attestation created:", attestation);
    } catch (err) {
      setError("Failed to create attestation");
      console.error("Error creating attestation:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to revoke an attestation
  const handleRevokeAttestation = async () => {
    if (!attestationInfo) {
      setError("Create an attestation first");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await client.revokeAttestation(
        attestationInfo.attestationId,
        {
          reason: "Incorrect data provided", // Reason for revocation
        }
      );
      setRevokeResponse(response);
      console.log("Attestation revoked:", response);
    } catch (err) {
      setError("Failed to revoke attestation");
      console.error("Error revoking attestation:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">
        Sign Protocol Off-Chain (Arweave) Demo
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4"
        onClick={handleCreateSchema}
        disabled={loading}
      >
        Create Schema
      </button>

      {schemaInfo && (
        <div className="mt-4">
          <p>Schema ID: {schemaInfo.schemaId}</p>
        </div>
      )}

      <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mt-4"
        onClick={handleCreateAttestation}
        disabled={loading || !schemaInfo}
      >
        Create Attestation
      </button>

      {attestationInfo && (
        <div className="mt-4">
          <p>Attestation ID: {attestationInfo.attestationId}</p>
        </div>
      )}

      <button
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 mt-4"
        onClick={handleRevokeAttestation}
        disabled={loading || !attestationInfo}
      >
        Revoke Attestation
      </button>

      {revokeResponse && (
        <div className="mt-4">
          <p>Revocation Successful: {JSON.stringify(revokeResponse)}</p>
        </div>
      )}
    </div>
  );
};

export default SignProtocolPage;
