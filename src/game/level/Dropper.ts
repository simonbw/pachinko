import BaseEntity from "../../core/entity/BaseEntity";
import Entity, { GameEventMap } from "../../core/entity/Entity";
import { createGraphics } from "../../core/entity/GameSprite";
import { clamp } from "../../core/util/MathUtil";

const DROPPER_SPEED = 10;

export class Dropper extends BaseEntity implements Entity {
  id = "dropper";
  width = 20;
  height = 25;
  sprite: NonNullable<BaseEntity["sprite"]>;

  constructor(private readonly bounds: readonly [number, number]) {
    super();

    this.sprite = createGraphics("backDecals")
      .circle(0, 0, 0.5)
      .fill({ color: 0xffff00, alpha: 0.5 });

    this.sprite.position.set(10, 1);
  }

  onTick(dt: GameEventMap["tick"]) {
    const dx = this.game!.io.getMovementVector()[0];
    this.sprite.x += dx * dt * DROPPER_SPEED;
    this.sprite.x = clamp(this.sprite.x, this.bounds[0], this.bounds[1]);
  }
}
