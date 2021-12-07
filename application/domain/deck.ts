import {Card, Suit, FaceValue} from "./card";
import {ILogger} from "../logger/logger";
import {IDeckDatabase} from "../db/db";

interface IDeck {
    id : number
    cards: Card[]
    shuffle() : void
    dealOneCard() : Card | Error
}

class Deck implements IDeck {

    private readonly _cards : Card[] = []
    private readonly _id : number
    private db: IDeckDatabase;

    constructor(readonly logger : ILogger, db: IDeckDatabase) {
        this.db = db
        this._id = Deck.generateDeckId()
        // read from file (sync) for the sake of demonstration
        const deck = this.db.readDeckState()
        if(!deck.length) {
            this._cards = Deck.generateInitialDeck()
            this.shuffle()
            return
        }
        this._cards = deck
    }

    get id(): number {
        return this._id;
    }

    get cards(): Card[] {
        return this._cards;
    }

    dealOneCard(): Card | Error {
        if(!this._cards.length) {
            return new Error("Deck is empty")
        }
        let topCard = this._cards.pop()
        this.logger.info(`remove top card: ${topCard}`)
        if(topCard === undefined) {
            this.logger.err("invalid element in deck")
            throw Error("invalid element in deck") //unhandled
        }

        this.logger.info(`persist to the file`)
        this.db.writeDeckState(this._cards)
        return topCard;
    }

    shuffle(): void {
        this.logger.info(`shuffle cards`)
        let cards = this._cards
        for(let i = cards.length - 1; i > 0; i--) {
            let newPosition = Math.floor(Math.random() * (i + 1))
            let temp = cards[i]
            cards[i] = cards[newPosition]
            cards[newPosition] = temp
        }

        this.logger.info(`persist to the file`)
        this.db.writeDeckState(this._cards)
    }

    private static generateDeckId() : number {
        return Date.now()
    }

    private static generateInitialDeck() : Card[] {
        let initialDeck = []
        for(const suit in Suit) {
            for(const faceValue in FaceValue) {
                initialDeck.push(new Card(faceValue as FaceValue, suit as Suit))
            }
        }
        return initialDeck
    }
}

export {
    IDeck,
    Deck
}