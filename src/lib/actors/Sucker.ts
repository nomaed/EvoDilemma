import { Actor } from "../Actor";
import { Action, IActor } from "../types";

export class Sucker extends Actor {
    public play(oponent: IActor): Action {
        return this.doAction(Action.Cooperate);
    }
}