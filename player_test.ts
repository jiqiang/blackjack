import { runTests, test } from "https://deno.land/std@v0.17.0/testing/mod.ts";
import {
  assertEquals,
  assertArrayContains
} from "https://deno.land/std@v0.17.0/testing/asserts.ts";
import Player from "./player.ts";

test({
  name: "test player",
  fn(): void {
    const name: string = "Glenn";
    const player = new Player(name);
    assertEquals(player.name, name);
    assertArrayContains(player.cards, []);
  }
});

runTests();
