import { Ball } from "../game/Ball";
import { BallData } from "../game/BallData";
import { BallHole } from "../game/BallHole";
import { Level } from "../game/level/Level";

export type CustomEvents = {
  /** Dispatched when a game starts */
  gameStart: undefined;

  /** Dispatched when a level starts */
  levelStart: { level: Level };

  /** Dispatched when a ball is launched */
  ballLaunched: { ball: Ball };

  ballInHole: { ball: Ball; hole: BallHole };

  /** Dispatched when a level is over */
  levelComplete: { level: Level };

  shopScreenStart: undefined;

  ballPurchased: { ballData: BallData };

  shopScreenEnd: undefined;

  /** Dispatched when a game is over */
  gameOver: undefined;
};
