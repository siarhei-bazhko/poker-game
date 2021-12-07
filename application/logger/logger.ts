interface ILogger {
    info(obj: any) : void
    warn(obj: any) : void
    err(obj: any) : void
}

class ConsoleLogger implements ILogger {

    info(obj: any): void {
        console.log(`${new Date} INFO ${obj.toString()}`)
    }

    warn(obj: any): void {
        console.log(`${new Date} WARN ${obj.toString()}`)
    }

    err(obj: any): void {
        console.log(`${new Date} ERROR ${obj.toString()}`)
    }

}

export {
    ILogger,
    ConsoleLogger
}