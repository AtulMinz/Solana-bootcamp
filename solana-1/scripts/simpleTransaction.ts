import {
  LAMPORTS_PER_SOL,
  Connection,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
  Keypair,
  SystemProgram,
  TransactionMessage,
} from "@solana/web3.js";

import { getKeypairFromEnvironment } from "@solana-developers/helpers";

import "dotenv/config";

(async () => {
  const senderKeyPair = getKeypairFromEnvironment("SECRET_KEY");
  const LAMPORTS_TO_SEND = 1000000000;
  //gets the address of the payer
  console.log("Payer Address: ", process.env.PAYER_KEY);

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  const balance = await connection.getBalance(senderKeyPair.publicKey);
  console.log("Balance of the sender:", balance / LAMPORTS_PER_SOL);

  const keyPair = Keypair.generate();

  console.log("New keypair generated:", keyPair.publicKey.toBase58());

  const transaction = new Transaction();

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeyPair.publicKey,
    toPubkey: keyPair.publicKey,
    lamports: LAMPORTS_TO_SEND,
    programId: SystemProgram.programId,
  });

  transaction.add(sendSolInstruction);

  let blockHash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeyPair,
  ]);

  console.log(
    `Finished!! sent ${LAMPORTS_TO_SEND / LAMPORTS_PER_SOL} SOL to ${
      keyPair.publicKey
    }`
  );

  console.log("Block Has for the transaction:", blockHash);
})();
