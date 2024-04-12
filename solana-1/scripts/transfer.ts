import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  LAMPORTS_PER_SOL,
  VersionedTransaction,
} from "@solana/web3.js";

import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
  console.log("Please provide a public key to send");
  process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log("suppliedToPubkey: ", suppliedToPubkey);

const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
  "Loaded our own keypair, the destination public key, and connected to Solana"
);

const transaction = new Transaction();

const LAMPORTS_TO_SEND = 50000000;

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeypair,
]);

const LAMPORTS_TO_SOL = LAMPORTS_TO_SEND / LAMPORTS_PER_SOL;

console.log(`Finished! sent ${LAMPORTS_TO_SOL} to address ${toPubkey}`);

console.log(`Transaction signature is ${signature}`);

connection.getBalance(senderKeypair.publicKey).then((value) => {
  console.log("Remaining SOL: ", value / LAMPORTS_PER_SOL);
});
