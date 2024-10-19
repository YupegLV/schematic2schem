import { NBT } from "prismarine-nbt";
import { Dimensions } from "../extractors/dimensions";
import { LegacyBlock } from "./tags";
export interface Surrounding {
    north: LegacyBlock | null;
    east: LegacyBlock | null;
    south: LegacyBlock | null;
    west: LegacyBlock | null;
}
export interface Coordinates {
    x: number;
    y: number;
    z: number;
}
/**
 * Gets the coordinates of the block at the provided index.
 * @param idx The index of the block to get the coordinates of.
 * @param dimensions The dimensions of the schematic.
 * @returns The coordinates of the block in the schematic.
 */
export declare const getCoordinates: (idx: number, { width, length }: Dimensions) => Coordinates;
/**
 * Gets the block to the north of this block, provided it exists.
 * North is towards negative z.
 * @param coordinates The coordinates of the block.
 * @param dimensions The dimensions of the schematic.
 * @returns The index of the block to the north or null if there is none.
 */
export declare const getBlockNorth: ({ x, y, z }: Coordinates, { length, width }: Dimensions) => number;
/**
 * Gets the block to the east of this block, provided it exists.
 * North is towards positive x.
 * @param coordinates The coordinates of the block.
 * @param dimensions The dimensions of the schematic.
 * @returns The index of the block to the east or null if there is none.
 */
export declare const getBlockEast: ({ x, y, z }: Coordinates, { length, width }: Dimensions) => number;
/**
 * Gets the block to the south of this block, provided it exists.
 * North is towards positive z.
 * @param coordinates The coordinates of the block.
 * @param dimensions The dimensions of the schematic.
 * @returns The index of the block to the south or null if there is none.
 */
export declare const getBlockSouth: ({ x, y, z }: Coordinates, { length, width }: Dimensions) => number;
/**
 * Gets the block to the west of this block, provided it exists.
 * North is towards negative x.
 * @param coordinates The coordinates of the block.
 * @param dimensions The dimensions of the schematic.
 * @returns The index of the block to the west or null if there is none.
 */
export declare const getBlockWest: ({ x, y, z }: Coordinates, { length, width }: Dimensions) => number;
/**
 * Gets the surrounding blocks of the block at the provided index.
 * @param idx The index of the block to get the surrounded blocks of.
 * @param nbt The full NBT of the schematic.
 * @returns The surrounding blocks of the schematic.
 */
export declare const getSurrounding: (idx: number, nbt: NBT) => Surrounding;
