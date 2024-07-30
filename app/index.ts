import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { FirstTry } from "../target/types/first_try";

const secretKey = new Uint8Array([132, 182,  14,  56,  37, 224,  13,  41, 255,  44, 175,
  228, 218, 131, 120, 180, 195, 224,  48,  75,  66, 218,
   48, 115, 120, 205, 240, 254,  94, 113, 127, 134, 124,
  233, 179, 231,  96,  33,  41, 105, 227, 173, 200, 196,
   26, 247, 154,  58,  36,  26,  97,  27,  56,   6, 232,
  200,  37, 249, 117,  90,  60, 220,  81,  96
])

async function main() {
  const connection = new anchor.web3.Connection('http://localhost:8899', 'confirmed');
  const keypair = anchor.web3.Keypair.fromSecretKey(secretKey);
  console.log('keypair:', keypair.publicKey.toBase58())
  const wallet = new anchor.Wallet(keypair);
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  anchor.setProvider(provider);
  const program = anchor.workspace.FirstTry as Program<FirstTry>;

  const txHash = await program.methods
    .someFunc()
    .accounts({})
    .signers([keypair])
    .rpc()
  console.log('txHash:', txHash)
  const logs = await connection.getSignaturesForAddress(keypair.publicKey);
  console.log('logs:', logs)
  logs.forEach(async (log) => {
    const tx = await connection.getParsedTransaction(log.signature);
    console.log('tx:', tx)
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})