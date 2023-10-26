console.log("Hello via Bun!");
import { Bool, UInt64 } from "o1js";

// Defining two UInt32 numbers
const a: UInt64 = new UInt64(1);
const b: UInt64 = new UInt64(2);

// Trying to add the two UInt32 numbers and store in a UInt64 (incorrect type assignment)
const result: Bool = a.greaterThanOrEqual(b); // This will cause a type error

console.log(`The result of adding a and b is: ${result}`);

// Task: Correct the types so that the code compiles and runs without errors.