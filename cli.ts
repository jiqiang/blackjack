import { BufReader } from "https://deno.land/std@v0.17.0/io/bufio.ts";
import { TextProtoReader } from "https://deno.land/std@v0.17.0/textproto/mod.ts";
import { encode } from "https://deno.land/std@v0.17.0/strings/mod.ts";
import { red } from "https://deno.land/std@v0.17.0/fmt/colors.ts";

async function main(): Promise<void> {
  let line: string;
  const tpr = new TextProtoReader(new BufReader(Deno.stdin, 1024));
  while (true) {
    //await Deno.stdout.write(encode("> "));
    line = await tpr.readLine();

    // if (err) {
    //     console.error(red(`failed to read line from stdin: ${err}`));
    // }

    if (line === "q") {
      break;
    }

    await Deno.stdout.write(encode(line + "\n"));
  }
  Deno.exit(0);
}

main();
