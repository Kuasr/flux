import { DispatchToken } from "./DispatchToken"

export type DispatchPool<T> = {
    [key: DispatchToken]: T
}