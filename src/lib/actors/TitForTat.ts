// import { log } from "../Logger";
import { Actor } from "../Actor";
import { Action, IActor } from "../types";

export class TitForTat extends Actor {
    private memory = new WeakMap<IActor, Array<Action>>();
    public play(oponent: IActor): Action {
        const pastEncounters = this.memory.get(oponent);

        // if first interaction, coopearte
        if (!pastEncounters) {
            // console.log(this.name, "new oponent", oponent.name);
            return this.doAction(Action.Cooperate);
        }

        // reciprocate by acting as oponent acted last time
        const myAction = pastEncounters[pastEncounters.length - 1];
        // console.log(this.name, "reciprocating", oponent.name, "->", Action[myAction]);
        return this.doAction(myAction);
    }


    public updateResult(score: number, oponent: IActor, action: Action): void {
        super.updateResult(score, oponent, action);

        const pastEncounters = this.memory.get(oponent);
        if (!Array.isArray(pastEncounters)) {
            this.memory.set(oponent, [action]);
        } else {
            pastEncounters.push(action);
        }
    }
}