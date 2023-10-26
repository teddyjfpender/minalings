import { UInt32, UInt64 } from "o1js";

// Defining two UInt32 numbers
const a: UInt64 = UInt64.from(10)
const b: UInt64 = UInt64.from(5_000_000_000);

// Trying to add one UInt64 number to a UInt32 number (incorrect type assignment)
const result: UInt64 = a.add(b); // This will cause a type error

console.log(`The result of adding a and b is: ${result} 🎉`);

// Task: Correct the types so that the code compiles and runs without errors.