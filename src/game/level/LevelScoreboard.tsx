import React from "react";
import Entity from "../../core/entity/Entity";
import { ReactEntity } from "../../core/ReactEntity";
import { isLevel, Level } from "./Level";

export class LevelScoreboard extends ReactEntity implements Entity {
  constructor(level: Level) {
    super(() => (
      <div className="absolute top-10 right-10 flex flex-col gap-4">
        <h2 className="text-white text-xl">
          Level {level.levelNumber.toLocaleString()}
        </h2>
        <h2 className="text-white text-lg">
          {level.score.toLocaleString()} points
        </h2>
        <h3 className="text-white">Balls</h3>
        <section className="flex flex-row gap-1 items-stretch">
          {level.ballStacks.stacks.map((ballStack, i) => (
            <ol key={i} className="flex flex-col gap-1 items-center">
              {ballStack.balls.map((ball) => (
                <li className="rounded bg-slate-300 inline-block px-1">
                  {ball.name}
                </li>
              ))}
              {level.ballStacks.currentStack === ballStack && <span>*</span>}
            </ol>
          ))}
        </section>
        <menu>
          <button onClick={() => (this.game!.slowMo = 0.5)}>0.5x</button>
          <button onClick={() => (this.game!.slowMo = 1)}>1x</button>
          <button onClick={() => (this.game!.slowMo = 2)}>2x</button>
          <button onClick={() => (this.game!.slowMo = 3)}>3x</button>
          <button onClick={() => (this.game!.slowMo = 10)}>10x</button>
        </menu>
      </div>
    ));
  }
}
