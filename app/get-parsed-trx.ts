import { Connection, PublicKey, Struct } from "@solana/web3.js";
import { publicKey, u64, bool } from '@solana/buffer-layout-utils';
import { u32, u8, struct } from '@solana/buffer-layout';

interface Storage {
  authority: PublicKey;
}

const StorageLayout = struct<Storage>([
  publicKey('authority'),
]);

async function main() {
  const connection = new Connection('http://localhost:8899', 'confirmed');
  const txHash = '5mxW9nzE9CFw88fLFqaHLaWbFqL2BjLB6cqncPuRw5heodw595xHNZMAud8Xju9oFZofsKQj2k2N8pBYPETHNisf'
  const dataAccount = new PublicKey('HVkQCFfSwaHQVYuTtNTTYmFGoiBcQkm8HSMDPa9Ma92Y')

  const parsed = await connection.getParsedTransaction(txHash);
  console.log('parsed:', parsed)

  const dataAccountInfo = await connection.getAccountInfo(dataAccount);
  console.log('dataAccountInfo:', dataAccountInfo)
  if(dataAccountInfo?.data) {
    const storage = StorageLayout.decode(dataAccountInfo.data);
    console.log('storage:', storage)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})