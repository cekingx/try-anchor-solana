import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SecondTry } from "../target/types/second_try";

describe("basic_storage", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SecondTry as Program<SecondTry>;

  it("Is initialized!", async () => {
    const seeds = []
    const [myStorage, _bump] = anchor.web3.PublicKey.findProgramAddressSync(seeds, program.programId);

    console.log("the storage account address is", myStorage.toBase58());
 
    await program.methods.initialize().accounts({
      signer: program.provider.publicKey,
      myStorage: myStorage,
    }).rpc();
    await program.methods.set(new anchor.BN(170)).accounts({myStorage: myStorage}).rpc();
		let myStorageStruct = await program.account.myStorage.fetch(myStorage);
    console.log("The value of x is:",myStorageStruct.x.toString());

    await program.methods.set(new anchor.BN(171)).accounts({myStorage: myStorage}).rpc();
		myStorageStruct = await program.account.myStorage.fetch(myStorage);
    console.log("The value of x is:",myStorageStruct.x.toString());

    console.log('program account', program.account)
	});
});