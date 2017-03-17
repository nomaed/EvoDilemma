import { Actor } from "../Actor";
import { Action, IActor } from "../types";

export class Random extends Actor {
    public play(oponent: IActor): Action {
        return this.doAction(Math.floor(Math.random() * Action.size));
    }
}