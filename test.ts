import { calculateHandValues } from './bj.ts';

function test_calculateHandValues(): boolean {
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
    ];

    for (let test of tests) {
        if (calculateHandValues(test.cards) !== test.expected) {
            console.log(test);
            return false;
        }
    };
    return true;
}

console.log((test_calculateHandValues() ? 'passed' : 'not passed'));
