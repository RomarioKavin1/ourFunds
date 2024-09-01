import {
  SignProtocolClient,
  SpMode,
  EvmChains,
  delegateSignAttestation,
  delegateSignRevokeAttestation,
  delegateSignSchema,
} from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";
const privateKey = "0xabc"; // Optional

const client = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains.polygonMumbai,
  account: privateKeyToAccount(privateKey), // Optional if you are using an injected provider
});

// Create schema
const createSchemaRes = await client.createSchema({
  name: "xxx",
  data: [{ name: "name", type: "string" }],
});

// Delegated create schema
const delegationPrivateKey = "0xaaaaa";
const info = await delegateSignSchema(
  {
    name: "xxx",
    data: [{ name: "name", type: "string" }],
  },
  {
    chain: EvmChains.polygonMumbai,
    delegationAccount: privateKeyToAccount(delegationPrivateKey),
  }
);
const delegateCreateSchemaRes = await client.createSchema(info.schema, {
  delegationSignature: info.delegationSignature,
});

// Create attestation
const createAttestationRes = await client.createAttestation({
  schemaId: "0x3",
  data: { name: "a" },
  indexingValue: "xxx",
});

// Delegated create attestation
const delegationPrivateKey = "0xaaaaa";
const info = await delegateSignAttestation(
  {
    schemaId: "0x1",
    data: { name: "a" },
    indexingValue: "xxx",
  },
  {
    chain: EvmChains.polygonMumbai,
    delegationAccount: privateKeyToAccount(delegationPrivateKey),
  }
);

const delegationCreateAttestationRes = await client.createAttestation(
  info.attestation,
  {
    delegationSignature: info.delegationSignature,
  }
);

// Revoke attestation
const revokeAttestationRes = await client.revokeAttestation("0x3", {
  reason: "test",
});

// Delegated revoke attestation
const delegationPrivateKey = "0xaaaaa";
const info = await delegateSignRevokeAttestation(attestationId, {
  chain: EvmChains.polygonMumbai,
  reason: "test",
  delegationAccount: privateKeyToAccount(delegationPrivateKey),
});
const delegationRevokeAttestationRes = await client.revokeAttestation(
  info.attestationId,
  {
    reason: info.reason,
    delegationSignature: info.delegationSignature,
  }
);
