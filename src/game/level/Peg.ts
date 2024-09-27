import { Body, Circle } from "p2";
import BaseEntity from "../../core/entity/BaseEntity";
import Entity from "../../core/entity/Entity";
import { createGraphics } from "../../core/entity/GameSprite";
import { Materials } from "../config/CollisionMaterials";

export class Peg extends BaseEntity implements Entity {
  body: NonNullable<BaseEntity["body"]>;
  sprite: NonNullable<BaseEntity["sprite"]>;

  constructor(position: [number, number]) {
    super();

    this.body = new Body({
      type: Body.STATIC,
      mass: 1,
      position,
    });

    const radius = 0.15;

    const shape = new Circle({ radius });
    shape.material = Materials.Peg;
    this.body.addShape(shape);

    this.sprite = createGraphics("pegs").circle(0, 0, radius).fill(0xaaaaaa);
    this.sprite.position.set(...this.body.position);
    this.sprite.rotation = this.body.angle;
  }
}

export function isPeg(entity: Entity): entity is Peg {
  return entity instanceof Peg;
}
