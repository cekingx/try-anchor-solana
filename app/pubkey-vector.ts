import { Program, setProvider, web3, workspace } from "@coral-xyz/anchor"
import { keypair, provider } from "./shared"
import { PubkeyVector } from "../target/types/pubkey_vector"

async function main() {
  setProvider(provider)
  const program = workspace.PubkeyVector as Program<PubkeyVector>

  const storageAccount = web3.Keypair.generate()
  console.log('storageAccount:', storageAccount.publicKey.toBase58())

  const initAccount = {
    signer: keypair.publicKey,
    storage: storageAccount.publicKey,
  }

  const initHash = await program.methods
    .initialize()
    .accounts(initAccount)
    .signers([storageAccount])
    .rpc()
  console.log('initHash:', initHash)

  const setHash = await program.methods
    .setArray([keypair.publicKey, storageAccount.publicKey])
    .accounts(initAccount)
    .signers([keypair])
    .rpc()
  console.log('setHash:', setHash)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})