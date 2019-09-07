import { runTests, test } from "https://deno.land/std@v0.17.0/testing/mod.ts";
import { assertEquals } from "https://deno.land/std@v0.17.0/testing/asserts.ts";
import { calculateHandValues } from './bj.ts';

test({
    name: "test calculateHandValues",
    fn(): void {
        const tests = [
            { cards: ['3', '2'], expected: 5 },
            { cards: ['A', '2'], expected: 13 },
            { cards: ['10', '2'], expected: 12 },
            { cards: ['A', '10'], expected: 21 },
            { cards: ['A', '9'], expected: 20 },
            { cards: ['A', 'A', '1'], expected: 13 },
            { cards: ['A', 'A', '10'], expected: 12 },
            { cards: ['A', 'A', '9'], expected: 21 },
            { cards: ['A', 'A', 'A', '10'], expected: 13 },
            { cards: ['A', 'A', 'A', '9'], expected: 12 },
            { cards: ['A', 'A', 'A'], expected: 13 },
            { cards: ['2', '3', '4', '5', '6', '7', '8', '9'], expected: 44 },
        ];
    
        tests.forEach(test => assertEquals(calculateHandValues(test.cards), test.expected));
    }
});

runTests();
