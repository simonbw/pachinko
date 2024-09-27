import { Body, Circle } from "p2";
import BaseEntity from "../core/entity/BaseEntity";
import Entity from "../core/entity/Entity";
import { createGraphics } from "../core/entity/GameSprite";
import { V } from "../core/Vector";
import { Materials } from "./config/CollisionMaterials";
import { BallData } from "./BallData";

const ROLLING_FRICTION = 0.001;
const GRAVITY = 100;

export class Ball extends BaseEntity implements Entity {
  body: NonNullable<BaseEntity["body"]>;
  sprite: NonNullable<BaseEntity["sprite"]>;
  readonly ballData: BallData;

  constructor(position: [number, number], ballData: BallData) {
    super();

    this.ballData = ballData;

    this.body = new Body({
      type: Body.DYNAMIC,
      mass: ballData.mass,
      position,
      ccdSpeedThreshold: 1,
      ccdIterations: 8,
    });

    const shape = new Circle({ radius: ballData.radius });
    shape.material = Materials.Ball;
    this.body.addShape(shape);

    this.sprite = createGraphics("ball")
      .circle(0, 0, ballData.radius)
      .fill(this.ballData.color);
  }

  onRender() {
    this.sprite.position.set(...this.body.position);
    this.sprite.rotation = this.body.angle;
  }

  onTick() {
    // Gravity
    this.body.applyForce([0, GRAVITY]);
    // Rolling friction
    this.body.applyForce(V(this.body.velocity).imul(-ROLLING_FRICTION));
  }
}

export function isBall(entity?: Entity): entity is Ball {
  return entity != undefined && entity instanceof Ball;
}
