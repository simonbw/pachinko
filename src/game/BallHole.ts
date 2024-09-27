import { Body, Box } from "p2";
import BaseEntity from "../core/entity/BaseEntity";
import Entity, { GameEventMap } from "../core/entity/Entity";
import { createGraphics } from "../core/entity/GameSprite";
import { isBall } from "./Ball";
import { Container, Graphics } from "pixi.js";

export class BallHole extends BaseEntity implements Entity {
  points: number;

  constructor(
    position: [number, number],
    size: [number, number],
    points: number = 100
  ) {
    super();
    this.points = points;

    this.body = new Body({
      type: Body.STATIC,
      position,
    });

    const [width, height] = size;

    const shape = new Box({ width, height });
    shape.sensor = true;
    this.body.addShape(shape);

    this.sprite = new Container();
    const graphics = new Graphics()
      .rect(-width / 2, -height / 2, width, height)
      .fill({ color: 0x000000, alpha: 0.5 });
    this.sprite.addChild(graphics);
    this.sprite.position.set(...position);
  }

  onBeginContact({ other }: GameEventMap["beginContact"]) {
    if (isBall(other)) {
      this.game?.dispatch("ballInHole", { ball: other, hole: this });
    }
  }
}
