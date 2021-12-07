# poker-game
LogMeIn assignment. Repo contains backbone architecture for a poker game


## Start
In order to start the project:
 1. Clone the repo: `git clone https://github.com/siarhei-bazhko/poker-game.git`
 2. To execute the client code `npm install && npm start`
 3. To run tests run `npm test`

## Example

The code created 52-card standard deck (see [wiki](https://en.wikipedia.org/wiki/Standard_52-card_deck)). Then `shuffle()` function randomly permutates cards in the deck.
`dealOneCard()` removes one card from the deck or throws an exception if deck is empty. 

```
// Create persistence layer and inject specific logger and formatter
const db = new DeckDatabase(new ConsoleLogger(), new JsonParser())

// Create deck instance and inject deck-specific logger and previously created db
const deck : IDeck = new Deck(new ConsoleLogger(), db)

deck.shuffle()
let len = deck.cards.length
for(let i = 0; i < len; i++) {
    console.log(deck.dealOneCard())
}

try {
    deck.dealOneCard()
} catch (err) {
    console.log(`catch user-error ${err}`)
}
```

## Design decisions / TODO

1. Domain and application 'layers' are merged
   - Since contract consists of only 2 methods in the current design domain layer is the central point, where the rest of dependencies (e.g., _Logger_, _Persistence_) are injected. Potentially future evolution of the design    could separate domain objects and application-details (in case domain will include more entities, like _Player_, _Game_)
and more implementation-specific features (such as communication and persistence model) will be defined
  
2. Untyped errors
   - Potentially contract can include typed errors, that can increase quality

3. Exceptions are thrown in domain layer
   - This is caused by early design stages (see 1), where application and domain layers are merged

4. Persistence and logging are included for the demonstration purposes only
   - Thus, read/write to the file are done synchronously. This might not be a problem for a multithreaded client as long as it can execute presentation layer separately from the rest.
 