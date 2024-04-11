import {
  PublicKey,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const connnection = new Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);
const address = new PublicKey("Go5KgcuUcBY2iLmFGN9BDMfMFEqSg4iLLmX72rr4cRQv");
const balance = await connnection.getBalance(address);
const balanceSol = balance / LAMPORTS_PER_SOL;
console.log("Connected");
console.log(`Account ${address} has ${balanceSol} of SOL`);
