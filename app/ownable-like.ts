import { web3, Program, Wallet, AnchorProvider, workspace, setProvider } from "@coral-xyz/anchor"
import { OwnableLike } from "../target/types/ownable_like"

const secretKey = new Uint8Array([132, 182,  14,  56,  37, 224,  13,  41, 255,  44, 175,
  228, 218, 131, 120, 180, 195, 224,  48,  75,  66, 218,
   48, 115, 120, 205, 240, 254,  94, 113, 127, 134, 124,
  233, 179, 231,  96,  33,  41, 105, 227, 173, 200, 196,
   26, 247, 154,  58,  36,  26,  97,  27,  56,   6, 232,
  200,  37, 249, 117,  90,  60, 220,  81,  96
])

async function main() {
  const connection = new web3.Connection('http://localhost:8899', 'confirmed');
  const keypair = web3.Keypair.fromSecretKey(secretKey);
  console.log('keypair:', keypair.publicKey.toBase58())
  const wallet = new Wallet(keypair);
  const provider = new AnchorProvider(connection, wallet, {});
  setProvider(provider);
  const program = workspace.OwnableLike as Program<OwnableLike>;

  const storageAccount = web3.Keypair.generate();
  console.log('storageAccount:', storageAccount.publicKey.toBase58())

  const initAccount = {
    signer: keypair.publicKey,
    storage: storageAccount.publicKey,
  }

  const txHash = await program.methods
    .initialize()
    .accounts(initAccount)
    .signers([storageAccount])
    .rpc()
  console.log('txHash:', txHash)

  const newTxHash = await program.methods
    .isOwner()
    .accounts(initAccount)
    .signers([keypair])
    .rpc()
  console.log('newTxHash:', newTxHash)

}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})