import fs from 'fs';
import {Card} from "../domain/card";
import {ILogger} from "../logger/logger";
import {IParser} from "../utils/parser";

interface IDeckDatabase {
    readDeckState(): Card[]
    writeDeckState(data: Card[]): void
}

class DeckDatabase implements IDeckDatabase {

    private logger: ILogger;
    private parser: IParser;

    constructor(logger: ILogger, parser: IParser) {
        this.logger = logger
        this.parser = parser;
    }

    readDeckState(): Card[] {
        try {
            const json = fs.readFileSync('./deck_state.json', 'utf-8')
            return this.parser.parse(json)
        } catch(err) {
            this.logger.warn(`cannot read json ${err}`)
            return []
        }
    }

    writeDeckState(data: Card[]): void {
        const json = this.parser.stringify(data)
        fs.writeFileSync('./deck_state.json', json)
    }
}

export {
    IDeckDatabase,
    DeckDatabase
}