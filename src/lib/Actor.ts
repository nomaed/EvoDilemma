// import { log } from "./Logger";
import { Action, IActor } from "./types";

export abstract class Actor implements IActor {
    public readonly strategy = this.constructor.name;
    public currentScore = 0;
    public history: Array<Action> = [];

    constructor(public readonly name: string) {}

    public abstract play(oponent: IActor): Action;

    public updateResult(score: number, oponent: IActor, action: Action): void {
        // console.log(this.name, "oponent:", oponent.name, Action[action]);
        this.currentScore += score;
    }

    protected doAction(action: Action): Action {
        // console.log(this.name, Action[action]);
        this.history.push(action);
        return action;
    }
}