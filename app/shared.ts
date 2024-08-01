import { AnchorProvider, Wallet, web3 } from "@coral-xyz/anchor";

export const secretKey = new Uint8Array([132, 182,  14,  56,  37, 224,  13,  41, 255,  44, 175,
  228, 218, 131, 120, 180, 195, 224,  48,  75,  66, 218,
   48, 115, 120, 205, 240, 254,  94, 113, 127, 134, 124,
  233, 179, 231,  96,  33,  41, 105, 227, 173, 200, 196,
   26, 247, 154,  58,  36,  26,  97,  27,  56,   6, 232,
  200,  37, 249, 117,  90,  60, 220,  81,  96
])

export const connection = new web3.Connection('http://localhost:8899', 'confirmed');

export const keypair = web3.Keypair.fromSecretKey(secretKey);
export const wallet = new Wallet(keypair);
export const provider = new AnchorProvider(connection, wallet, {});