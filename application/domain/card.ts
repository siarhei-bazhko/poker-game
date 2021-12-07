enum Suit {
    Clubs = "CLUBS",
    Diamonds = "DIAMONDS",
    Hearts = "HEARTS",
    Spades = "SPADES"
}

enum FaceValue {
    Ace = "ACE",
    Two = "TWO",
    Three = "THREE",
    Four = "FOUR",
    Five = "FIVE",
    Six = "SIX",
    Seven = "SEVEN",
    Eight = "EIGHT",
    Nine = "NINE",
    Ten = "TEN",
    Jack = "JACK",
    Queen = "QUEEN",
    King = "KING"
}


class Card {
    private readonly _faceValue : FaceValue
    private readonly _suit : Suit

    constructor(faceValue : FaceValue, suit : Suit) {
        this._faceValue = faceValue
        this._suit = suit
    }

    get faceValue(): FaceValue {
        return this._faceValue;
    }

    get suit(): Suit {
        return this._suit;
    }

    toString() : string {
        return `{ suit: ${this._suit}, faceValue: ${this._faceValue} }`
    }
}

export {
    Card,
    Suit,
    FaceValue
}