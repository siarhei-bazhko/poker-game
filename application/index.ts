import {IDeck, Deck} from "./domain/deck"
import {DeckDatabase} from "./db/db";
import {ConsoleLogger} from "./logger/logger";
import {JsonParser} from "./utils/parser";

/**
 * This class is a starting point to the app and imitates client interaction
 */
class Runner {
    constructor() {
        this.init()
    }

    init() {
        const db = new DeckDatabase(new ConsoleLogger(), new JsonParser())
        const deck : IDeck = new Deck(new ConsoleLogger(), db)
        deck.shuffle()
        let len = deck.cards.length
        for(let i = 0; i < len; i++) {
            console.log(deck.dealOneCard())
        }
        console.log(deck.dealOneCard())
        console.log(deck.cards.length)
    }
}

new Runner();