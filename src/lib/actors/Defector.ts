import { Actor } from "../Actor";
import { Action, IActor } from "../types";

export class Defector extends Actor {
    public play(oponent: IActor): Action {
        return this.doAction(Action.Defect);
    }
}