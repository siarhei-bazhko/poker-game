import {DeckDatabase} from "../application/db/db";
import {ConsoleLogger} from "../application/logger/logger";
import {JsonParser} from "../application/utils/parser";
import {Deck} from "../application/domain/deck";


describe("test deck core functionality",() => {

    const db = new DeckDatabase(new ConsoleLogger(), new JsonParser())
    const deck = new Deck(new ConsoleLogger(), db)

    it("deck should exist", () => {
        expect(deck).toBeDefined()
    })

    it("should satisfy IDeck contract", () => {
        expect(typeof deck.shuffle).toBe('function')
        expect(typeof deck.dealOneCard).toBe('function')
        expect(typeof deck.id).toBe('number')
        expect(deck.cards instanceof Array).toBe(true)
    })

    it("shuffle should not return exact card deck as before shuffle", () => {
        let haveDifferentElements = false
        let deepCardsCopy = JSON.parse(JSON.stringify(deck.cards))
        deck.shuffle()
        for(let i = 0; i < deck.cards.length; i++) {
            if(deepCardsCopy[i] !== deck.cards[i]) {
                haveDifferentElements = true
                break
            }
        }
        expect(haveDifferentElements).toBe(true)
    })

    it("dealOneCard should return top card from deck and decrease deck size", () => {
        expect(deck.cards.length).toBeGreaterThan(0)

        const topCard = deck.cards[deck.cards.length - 1]
        expect(deck.dealOneCard()).toBe(topCard)
    })

    it("dealOneCard should return client-error on empty deck", () => {
        let len = deck.cards.length
        for(let i = 0; i < len; i++) {
            expect(deck.dealOneCard() instanceof Error).toBe(false)
        }
        expect(deck.dealOneCard() instanceof Error).toBe(true)
    })
})