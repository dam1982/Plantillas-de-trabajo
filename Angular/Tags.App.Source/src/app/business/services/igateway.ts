export interface IGateway<T> {
    GetSingle(filters:any):Promise<T>;
    GetCollection(filters:any):Promise<T[]>;
    Save(object:T):void;
    SaveCollection(object:T[]):void;
}
