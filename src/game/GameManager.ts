import BaseEntity from "../core/entity/BaseEntity";
import Entity, { GameEventMap } from "../core/entity/Entity";
import { KeyCode } from "../core/io/Keys";
import { Ball } from "./Ball";
import { BallData, Balls } from "./BallData";
import { Level } from "./level/Level";
import { PauseMenu } from "./PauseMenu";
import { ShopScreen } from "./shop/ShopScreen";

export class GameManager extends BaseEntity implements Entity {
  id = "gameManager";

  levelNumber = 0;

  ballDatas: readonly BallData[] = [];

  nextLevel() {
    this.game?.addEntity(new Level(this.levelNumber, this.ballDatas));
  }

  onGameStart() {
    this.ballDatas = [
      Balls.basic,
      Balls.basic,
      Balls.basic,
      Balls.basic,
      Balls.basic,
      Balls.basic,
      Balls.basic,
      Balls.basic,
      Balls.basic,
      Balls.big,
    ];
    this.nextLevel();
  }

  onShopScreenEnd() {
    this.nextLevel();
  }

  onLevelComplete({ level }: GameEventMap["levelComplete"]) {
    this.levelNumber++;
    level.destroy();
    this.addChild(new ShopScreen(this));
  }

  onBallPurchased({ ballData }: GameEventMap["ballPurchased"]) {
    this.ballDatas = [...this.ballDatas, ballData];
  }

  onKeyDown({ key }: { key: KeyCode }) {
    if (key === "Escape") {
      this.game?.addEntity(new PauseMenu());
      this.game?.pause();
    }
  }
}
