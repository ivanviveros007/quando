import * as shape from "d3-shape";
import { moderateScale } from "@/src/helpers";

interface Point {
  x: number;
  y: number;
}

//** Path Line */
const line = (width: number, height: number): string => {
  const path = shape
    .line<Point>()
    .x((d) => d.x)
    .y((d) => d.y)([
    { x: width / 2, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
    { x: 0, y: 0 },
    { x: width / 2, y: 0 },
  ]);

  return path ?? "";
};

//** Path Curved */
const lineCurvedDown = (
  iPosition: number,
  height: number,
  circle: number
): string => {
  const position = iPosition;
  const circleWidth = circle + position;
  const trim = (position + circleWidth) / 2;

  const curved = shape
    .line<Point>()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
    { x: position - moderateScale(20), y: 0 },
    { x: position - moderateScale(10), y: moderateScale(2) },
    { x: position - moderateScale(2), y: moderateScale(10) },
    { x: position, y: moderateScale(17) },
    { x: trim - moderateScale(25), y: height / 2 + moderateScale(2) },
    { x: trim - moderateScale(10), y: height / 2 + moderateScale(10) },
    { x: trim, y: height / 2 + moderateScale(10) },
    { x: trim + moderateScale(10), y: height / 2 + moderateScale(10) },
    { x: trim + moderateScale(25), y: height / 2 + moderateScale(2) },
    { x: circleWidth, y: moderateScale(17) },
    { x: circleWidth + moderateScale(2), y: moderateScale(10) },
    { x: circleWidth + moderateScale(10), y: 0 },
    { x: circleWidth + moderateScale(20), y: 0 },
  ]);

  return curved ?? "";
};

export const getPathDown = (
  width: number,
  iHeight: number,
  centerWidth: number
): string => {
  const height = moderateScale(iHeight);
  const circleWidth = moderateScale(centerWidth) + moderateScale(16);
  return `${line(width, height)} ${lineCurvedDown(
    width / 2 - circleWidth / 2,
    height,
    circleWidth
  )}`;
};
