
import { addN } from "./addN";

test("addN add amount provided to any given number", () => {

  const addEight = addN(8);

  expect(addEight(10)).toBe(18);
  expect(addEight(-10)).toBe(-2);

  const minusEight = addN(-8);

  expect(minusEight(-10)).toBe(-18);
  expect(minusEight(10)).toBe(2);

});
