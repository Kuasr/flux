import { DispatchToken } from "./DispatchToken";
export declare type DispatchPool<T> = {
    [key: DispatchToken]: T;
};
