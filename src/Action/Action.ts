export type ActionPayload = Object

export class Action {

    constructor(readonly type: string, readonly payload: ActionPayload) {}

}
