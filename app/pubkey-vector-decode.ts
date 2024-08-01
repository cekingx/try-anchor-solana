import { Program, setProvider, workspace } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js"
import { provider } from "./shared";
import { PubkeyVector } from "../target/types/pubkey_vector";


async function main() {
  const connection = new Connection('http://localhost:8899', 'confirmed');
  const trxHash = '46GcJi2yXmqH2g8xQKgpkZwhSrEcZEJY4BozVoJrhLqRgUteThuvJjdDwypmXNDtGQ7eckcTW3jS1FRWeqbTFFj1'
  const result1 = await connection.getParsedTransaction(trxHash)
  console.log('result1:', result1)

  setProvider(provider)
  const program = workspace.PubkeyVector as Program<PubkeyVector>
  const storageAccount = new PublicKey('3AGewqqT6ENfj1ZFEAwy497dP7yEoDGKP6Ch24xTPEgx')
  const result2 = await program.account.storage.fetch(storageAccount)
  console.log('result2:', result2)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})