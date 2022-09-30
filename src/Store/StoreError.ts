export class StoreError implements Error {

    constructor (readonly name: string, readonly message: string) {}

}