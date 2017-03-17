// import { log } from "./Logger";
import { Action, IActor, IEnvironment, IRules } from "./types";

const DEFAULT_RULES: IRules = {
    turnCost: 2,
    cooperationCost: 2,
    cooperationBenefit: 5,
};

export class World implements IEnvironment {
    public cooperationCost: number;
    public cooperationBenefit: number;
    public turnCost: number;
    public actors = new Set<IActor>();

    constructor(rules?: IRules) {
        Object.assign(this, rules || DEFAULT_RULES);
    }

    public runTournament(turns: number) {
        for (let turn = 1; turn <= turns; turn++) {
            // console.log(`--------- Round ${turn} ---------`);
            this.roundRobin();
        }
    }

    private roundRobin() {
        const contestants = [...this.actors.values()];
        for (let i = 0; i < contestants.length - 1; i++) {
            for (let j = i + 1; j < contestants.length; j++) {
                this.confront(contestants[i], contestants[j]);
            }
        }
    }

    private confront(a1: IActor, a2: IActor) {
        const a1action = a1.play(a2);
        const a2action = a2.play(a1);
        a1.updateResult(this.calculateScore(a1action, a2action), a2, a2action);
        a2.updateResult(this.calculateScore(a2action, a1action), a1, a1action);
    }

    private calculateScore(selfAction: Action, otherAction: Action): number {
        let score = 0 - this.turnCost;
        if (selfAction === Action.Cooperate) {
            score -= this.cooperationCost;
        }
        if (otherAction === Action.Cooperate) {
            score += this.cooperationBenefit;
        }
        return score;
    }
}