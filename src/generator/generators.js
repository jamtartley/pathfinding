import { generate as RecursiveBacktracker } from "generator/recursive_backtracker.js";

export const GeneratorType = Object.freeze({
    RECURSIVE_BACKTRACKER: "recursive-backtracker"
});

export const GeneratorFunctionMap = {
    [GeneratorType.RECURSIVE_BACKTRACKER]: RecursiveBacktracker
};
