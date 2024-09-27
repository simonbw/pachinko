import BaseEntity from "../../core/entity/BaseEntity";
import Entity, { GameEventMap } from "../../core/entity/Entity";
import { rNormal, shuffle } from "../../core/util/Random";
import { V } from "../../core/Vector";
import { Ball, isBall } from "../Ball";
import { BallData } from "../BallData";
import { Dropper } from "./Dropper";
import { LevelScoreboard } from "./LevelScoreboard";
import { Playfield } from "./Playfield";

export class Level extends BaseEntity implements Entity {
  id = "level";
  width = 20;
  height = 25;

  readonly levelNumber: number;
  readonly scoreToBeat: number;

  score = 0;
  dropper: Dropper;
  ballStacks: BallStacks;
  selectedStack: number = 0;

  constructor(levelNumber: number, balls: readonly BallData[]) {
    super();
    this.levelNumber = levelNumber;
    this.scoreToBeat = levelNumber * 100;

    this.addChild(new LevelScoreboard(this));
    this.dropper = this.addChild(new Dropper([0, this.width]));
    this.addChild(new Playfield(this.width, this.height));
    this.ballStacks = new BallStacks(balls);
  }

  onRender() {
    this.game!.camera.center(V(this.width / 2, this.height / 2));
  }

  async onBallInHole({ ball, hole }: GameEventMap["ballInHole"]) {
    await this.wait(0.5);
    ball.destroy();

    // Calculate score
    this.score += hole.points;

    await this.wait(0.5);

    const playfieldIsClear =
      this.game?.entities.getByFilter(isBall).length === 0;
    if (playfieldIsClear) {
      if (this.score >= this.scoreToBeat) {
        this.game?.dispatch("levelComplete", { level: this });
      }

      if (this.ballStacks.isEmpty()) {
        this.game?.dispatch("gameOver", undefined);
      }
    }
  }

  onKeyDown({ key, event }: GameEventMap["keyDown"]) {
    switch (key) {
      case "Space":
        this.launchBall();
        break;
      case "Tab":
        if (event.shiftKey) {
          this.ballStacks.prevStack();
        } else {
          this.ballStacks.nextStack();
        }
        break;
    }
  }

  launchBall() {
    if (!this.ballStacks.currentStack.isEmpty()) {
      const ballData = this.ballStacks.currentStack.pop();
      const [x, y] = this.dropper.getPosition();
      this.addChild(new Ball([x + rNormal(0, 0.1), y], ballData));
    }
  }
}

export function isLevel(entity?: Entity): entity is Level {
  return entity instanceof Level;
}

class BallStacks {
  stacks: BallStack[] = [];

  currentStackIndex = 0;

  constructor(balls: ReadonlyArray<BallData>, n: number = 3) {
    const stacks: BallData[][] = [];
    // create n stacks
    for (let i = 0; i < n; i++) {
      stacks.push([]);
    }
    const shuffledBalls = shuffle([...balls]);
    // divide the balls evenly into the stacks
    for (let i = 0; i < shuffledBalls.length; i++) {
      stacks[i % n].push(shuffledBalls[i]);
    }

    for (const stack of stacks) {
      this.stacks.push(new BallStack(stack));
    }
  }

  nextStack() {
    this.currentStackIndex = (this.currentStackIndex + 1) % this.stacks.length;
  }

  prevStack() {
    this.currentStackIndex =
      (this.currentStackIndex - 1 + this.stacks.length) % this.stacks.length;
  }

  get currentStack() {
    return this.stacks[this.currentStackIndex];
  }

  get ballsRemaining() {
    return this.stacks.reduce((acc, stack) => acc + stack.balls.length, 0);
  }

  isEmpty() {
    return this.stacks.every((stack) => stack.isEmpty());
  }
}

class BallStack {
  balls: BallData[] = [];

  constructor(balls: BallData[]) {
    this.balls = balls;
  }

  pop() {
    return this.balls.shift()!;
  }

  peek() {
    return this.balls.at(0);
  }

  isEmpty() {
    return this.balls.length === 0;
  }
}
