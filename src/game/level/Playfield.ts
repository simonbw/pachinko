import BaseEntity from "../../core/entity/BaseEntity";
import Entity from "../../core/entity/Entity";
import { V } from "../../core/Vector";
import { BallHole } from "../BallHole";
import { Peg } from "./Peg";
import Wall from "./Wall";

export class Playfield extends BaseEntity implements Entity {
  constructor(
    public readonly width: number = 20,
    public readonly height: number = 25
  ) {
    super();

    this.addChild(new Wall([0, 0], [this.width, 0]));
    this.addChild(new Wall([this.width, 0], [this.width, this.height]));
    this.addChild(new Wall([this.width, this.height], [0, this.height]));
    this.addChild(new Wall([0, this.height], [0, 0]));

    for (let j = 0; j < 8; j++) {
      const odd = j % 2 === 1;
      for (let i = 0; i < (odd ? 9 : 10); i++) {
        this.addChild(new Peg(V(i * 2 + (odd ? 2 : 1), j * 2 + 5)));
      }
    }

    const nHoles = 5;
    const holeWidth = this.width / nHoles;
    const holeHeight = 2;
    for (let i = 0; i < nHoles; i++) {
      this.addChild(
        new BallHole(
          V((i + 0.5) * holeWidth, this.height - holeHeight / 2),
          V(holeWidth, holeHeight)
        )
      );
    }

    const wallWidth = 0.4;
    for (let i = 1; i < nHoles; i++) {
      const x = i * holeWidth + wallWidth / 2;
      this.addChild(
        new Wall(V(x, this.height - (holeHeight + 1)), V(x, this.height))
      );
    }
  }
}
