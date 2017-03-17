import { log, setLogger } from "./lib/Logger";
import { IActorConstructor } from "./lib/types";
import { World } from "./lib/World";
import { Sucker } from "./lib/actors/Sucker";
import { Defector } from "./lib/actors/Defector";
import { Random } from "./lib/actors/Random";
import { TitForTat } from "./lib/actors/TitForTat";


export function bootstrap() {
    setLogger(<HTMLTextAreaElement>document.getElementById("output-window"));
    const world = new World();
    const contestantsTypes: Array<IActorConstructor> = [
        Sucker,
        Random,
        Defector,
        TitForTat,
    ];
    const batchSize = 10;

    for (let i = 1; i <= batchSize; i++) {
        contestantsTypes.forEach(Ctor => {
            world.actors.add(new Ctor(`${Ctor.name}-${i}`));
        });
    }

    world.runTournament(100);
    const players = [...world.actors.values()];
    players.sort((a, b) => b.currentScore - a.currentScore);
    players.forEach(actor => log(`${actor.name}: ${actor.currentScore}\n`));
}

