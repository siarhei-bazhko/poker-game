// just for demonstration
interface IParser {
    parse(data: any) : any
    stringify(data : any) : string
}

class JsonParser implements IParser {
    parse(data: any): object {
        return JSON.parse(data);
    }

    stringify(data: any): string {
        return JSON.stringify(data);
    }
}

export {
    IParser,
    JsonParser
}