export enum Action {
    Cooperate,
    Defect,
    size // to get length of enum
}

export interface IActorConstructor {
    new (name: string): IActor;
}

export interface IActor {
    readonly strategy: string;
    readonly name: string;
    currentScore: number;
    history: Array<Action>;
    play(oponent: IActor): Action;
    updateResult(score: number, oponent: IActor, action: Action): void;
}

export interface IRules {
    turnCost: number;
    cooperationCost: number;
    cooperationBenefit: number;
}

export interface IEnvironment extends IRules {
    actors: Set<IActor>;
}