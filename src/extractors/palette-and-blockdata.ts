import { NBT, Tags } from "prismarine-nbt";
import { TagType } from "../types/tag-type";
import mapping from "../legacy";
import connectors, { stairs } from "../connectors";
import extractDimensions from "./dimensions";
import { constructTag, deconstructTag } from "../utils/tags";

const extractPaletteAndBlockData = (
  nbt: NBT,
  fast: boolean
): { palette: Record<string, number>; blockData: number[] } => {
  if (!nbt.value["Blocks"]) {
    throw new Error("Input file is missing 'Blocks' tag");
  }
  if (!nbt.value["Data"]) {
    throw new Error("Input file is missing 'Data' tag");
  }

  const blocks = (nbt.value["Blocks"] as Tags[TagType.ByteArray]).value;
  const data = (nbt.value["Data"] as Tags[TagType.ByteArray]).value;
  if (blocks.length !== data.length) {
    throw new Error(
      "Blocks ByteArray and Data ByteArray are not of the same length"
    );
  }

  let paletteIdx = 0;
  const palette = {};
  const blockData: number[] = [];
  blocks.forEach((_, idx) => {
    const idAndData = getIdAndData(idx, blocks, data)!;
    const tag = fast
      ? mapping.blocks[`${idAndData.id}:${idAndData.data}`]
      : fixBlockState(idAndData.id, idAndData.data, idx, nbt);

    if (typeof palette[tag] === "undefined") {
      palette[tag] = paletteIdx;
      paletteIdx++;
    }
    blockData.push(palette[tag]);
  });

  return { palette, blockData };
};

const fixBlockState = (id: number, data: number, idx: number, nbt: NBT) => {
  if (connectors[id]) {
    const surrounding = getSurrounding(idx, nbt);
    const tag = deconstructTag(mapping.blocks[`${id}:${data}`]);
    if (surrounding.north && connectors[id].includes(surrounding.north.id)) {
      if (stairs.includes(surrounding.north.id)) {
        const stairTag = deconstructTag(
          mapping.blocks[`${surrounding.north.id}:${surrounding.north.data}`]
        );
        if (stairTag.state["facing"] == "south") {
          tag.state["north"] = "true";
        }
      } else {
        tag.state["north"] = "true";
      }
    }
    if (surrounding.east && connectors[id].includes(surrounding.east.id)) {
      if (stairs.includes(surrounding.east.id)) {
        const stairTag = deconstructTag(
          mapping.blocks[`${surrounding.east.id}:${surrounding.east.data}`]
        );
        if (stairTag.state["facing"] == "west") {
          tag.state["east"] = "true";
        }
      } else {
        tag.state["east"] = "true";
      }
    }
    if (surrounding.south && connectors[id].includes(surrounding.south.id)) {
      if (stairs.includes(surrounding.south.id)) {
        const stairTag = deconstructTag(
          mapping.blocks[`${surrounding.south.id}:${surrounding.south.data}`]
        );
        if (stairTag.state["facing"] == "north") {
          tag.state["south"] = "true";
        }
      } else {
        tag.state["south"] = "true";
      }
    }
    if (surrounding.west && connectors[id].includes(surrounding.west.id)) {
      if (stairs.includes(surrounding.west.id)) {
        const stairTag = deconstructTag(
          mapping.blocks[`${surrounding.west.id}:${surrounding.west.data}`]
        );
        if (stairTag.state["facing"] == "east") {
          tag.state["west"] = "true";
        }
      } else {
        tag.state["west"] = "true";
      }
    }

    return constructTag(tag);
  }

  return mapping.blocks[`${id}:${data}`];
};

const getSurrounding = (
  idx: number,
  nbt: NBT
): {
  north: { id: number; data: number } | null;
  east: { id: number; data: number } | null;
  south: { id: number; data: number } | null;
  west: { id: number; data: number } | null;
} => {
  const dimensions = extractDimensions(nbt);
  const x = idx % dimensions.width;
  const y = Math.floor(idx / (dimensions.width * dimensions.length));
  const z = Math.floor(idx / dimensions.width) % dimensions.length;

  // North: negative Z
  const north =
    z === 0 ? null : (y * dimensions.length + (z - 1)) * dimensions.width + x;

  // East: positive X
  const east =
    x === dimensions.width - 1
      ? null
      : (y * dimensions.length + z) * dimensions.width + (x + 1);

  // South: positive Z
  const south =
    z === dimensions.length - 1
      ? null
      : (y * dimensions.length + (z + 1)) * dimensions.width + x;

  // West: negative X
  const west =
    x === 0 ? null : (y * dimensions.length + z) * dimensions.width + (x - 1);

  const id = (nbt.value["Blocks"] as Tags[TagType.ByteArray]).value;
  const data = (nbt.value["Data"] as Tags[TagType.ByteArray]).value;
  return {
    north: getIdAndData(north, id, data),
    east: getIdAndData(east, id, data),
    south: getIdAndData(south, id, data),
    west: getIdAndData(west, id, data),
  };
};

const getIdAndData = (
  idx: number | null,
  id: number[],
  data: number[]
): { id: number; data: number } | null => {
  if (idx === null) {
    return null;
  }
  return { id: id[idx] < 0 ? 256 + id[idx] : id[idx], data: data[idx] };
};

export default extractPaletteAndBlockData;
