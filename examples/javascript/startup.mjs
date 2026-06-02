import { memside } from "./memside-client.mjs";

const startup = await memside("/context/startup");
console.log(JSON.stringify(startup, null, 2));
