import { OffChainSignType, SignProtocolClient, SpMode } from "@ethsign/sp-sdk";
import { privateKeyToAccount, Account } from "viem/accounts";
export const VoteProposalSchema = "SPS_qE22XnXs1_3fr0Ln0OxC0";
export const DisputeProposalSchema = "SPS_qE22XnXs1_3fr0Ln0OxC0";
export const handleVoteAttestation = async ({
  setLoading,
  setError,
  setAttestationInfo,
  organisation,
  proposal,
  forVote,
  againstVote,
}: {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAttestationInfo: (attestation: any) => void;
  organisation: string;
  proposal: string;
  forVote: number;
  againstVote: number;
}) => {
  const privateKey =
    `0x${process.env.NEXT_PUBLIC_PVT_KEY || "abc"}` as `0x${string}`;
  const account = privateKeyToAccount(privateKey);
  const client = new SignProtocolClient(SpMode.OffChain, {
    signType: OffChainSignType.EvmEip712,
    account,
  });
  setLoading(true);
  setError(null);
  try {
    const attestation = await client.createAttestation({
      schemaId: VoteProposalSchema,
      data: {
        Organisation: organisation,
        "Proposal ID": proposal,
        "For ": forVote,
        Against: againstVote,
      },
      indexingValue: "unique-index",
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
