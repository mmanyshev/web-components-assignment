
import { addN } from "./addN";

test("addN add amount provided to any given number", () => {

  const addEight = addN(8)

  expect(addEight(10)).toBe(18);
  expect(addEight(-10)).toBe(-2);

  const minusEight = addN(-8)

  expect(minusEight(-10)).toBe(-18);
  expect(minusEight(10)).toBe(2);

  const addNumber = Math.random() * 100;
  const baseNumber = Math.random() * 100;

  const addAddNumber = addN(addNumber);

  // however that is re-implementation of internal logic
  // tests should be as plain and simple as possible...
  expect(addAddNumber(baseNumber)).toBe(baseNumber + addNumber);

});