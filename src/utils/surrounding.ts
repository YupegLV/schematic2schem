import { NBT, Tags } from "prismarine-nbt";
import extractDimensions, { Dimensions } from "../extractors/dimensions";
import { TagType } from "../types/tag-type";
import { getIdAndData, LegacyBlock } from "./tags";

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
export const getCoordinates = (
  idx: number,
  { width, length }: Dimensions
): Coordinates => {
  const x = idx % width;
  const y = Math.floor(idx / (width * length));
  const z = Math.floor(idx / width) % length;

  return { x, y, z };
};

/**
 * Gets the block to the north of this block, provided it exists.
 * North is towards negative z.
 * @param coordinates The coordinates of the block.
 * @param dimensions The dimensions of the schematic.
 * @returns The index of the block to the north or null if there is none.
 */
export const getBlockNorth = (
  { x, y, z }: Coordinates,
  { length, width }: Dimensions
) => {
  return z === 0 ? null : (y * length + (z - 1)) * width + x;
};

/**
 * Gets the block to the east of this block, provided it exists.
 * North is towards positive x.
 * @param coordinates The coordinates of the block.
 * @param dimensions The dimensions of the schematic.
 * @returns The index of the block to the east or null if there is none.
 */
export const getBlockEast = (
  { x, y, z }: Coordinates,
  { length, width }: Dimensions
) => {
  return x === width - 1 ? null : (y * length + z) * width + (x + 1);
};

/**
 * Gets the block to the south of this block, provided it exists.
 * North is towards positive z.
 * @param coordinates The coordinates of the block.
 * @param dimensions The dimensions of the schematic.
 * @returns The index of the block to the south or null if there is none.
 */
export const getBlockSouth = (
  { x, y, z }: Coordinates,
  { length, width }: Dimensions
) => {
  return z === length - 1 ? null : (y * length + (z + 1)) * width + x;
};

/**
 * Gets the block to the west of this block, provided it exists.
 * North is towards negative x.
 * @param coordinates The coordinates of the block.
 * @param dimensions The dimensions of the schematic.
 * @returns The index of the block to the west or null if there is none.
 */
export const getBlockWest = (
  { x, y, z }: Coordinates,
  { length, width }: Dimensions
) => {
  return x === 0 ? null : (y * length + z) * width + (x - 1);
};

/**
 * Gets the surrounding blocks of the block at the provided index.
 * @param idx The index of the block to get the surrounded blocks of.
 * @param nbt The full NBT of the schematic.
 * @returns The surrounding blocks of the schematic.
 */
export const getSurrounding = (idx: number, nbt: NBT): Surrounding => {
  const dimensions = extractDimensions(nbt);
  const coordinates = getCoordinates(idx, dimensions);

  const north = getBlockNorth(coordinates, dimensions);
  const east = getBlockEast(coordinates, dimensions);
  const south = getBlockSouth(coordinates, dimensions);
  const west = getBlockWest(coordinates, dimensions);

  const id = (nbt.value["Blocks"] as Tags[TagType.ByteArray]).value;
  const data = (nbt.value["Data"] as Tags[TagType.ByteArray]).value;
  return {
    north: getIdAndData(north, id, data),
    east: getIdAndData(east, id, data),
    south: getIdAndData(south, id, data),
    west: getIdAndData(west, id, data),
  };
};
