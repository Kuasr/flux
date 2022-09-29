export class DispatcherError implements Error {

    constructor (readonly name: string, readonly message: string) {}

}