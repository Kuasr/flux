export class ReduceStoreError implements Error {

    constructor (readonly name: string, readonly message: string) {}

}