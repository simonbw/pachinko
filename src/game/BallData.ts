import { FillInput } from "pixi.js";

export interface BallData {
  readonly name: string;
  readonly color: FillInput;
  readonly radius: number;
  readonly mass: number;
}

export const Balls = {
  basic: {
    name: "basic",
    color: 0xccccff,
    radius: 0.35,
    mass: 1,
  },
  big: {
    name: "big",
    color: 0xffcccc,
    radius: 0.5,
    mass: 2,
  },
} satisfies { [key: string]: BallData };
