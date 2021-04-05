import { NBT, Tags } from "prismarine-nbt";
import { TagType } from "../types/tag-type";
import mapping from "../legacy";
import connectors, { stairs } from "../connectors";
import {
  constructTag,
  deconstructTag,
  getIdAndData,
  LegacyBlock,
} from "../utils/tags";
import { getSurrounding } from "../utils/surrounding";
import { fixConnectors } from "../fixers/connectors";
import fixStairs from "../fixers/stairs";

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
      : fixBlockState({ id: idAndData.id, data: idAndData.data }, idx, nbt);

    if (typeof palette[tag] === "undefined") {
      palette[tag] = paletteIdx;
      paletteIdx++;
    }
    blockData.push(palette[tag]);
  });

  return { palette, blockData };
};

const fixBlockState = (block: LegacyBlock, idx: number, nbt: NBT): string => {
  if (!connectors[block.id] && !stairs.includes(block.id)) {
    return mapping.blocks[`${block.id}:${block.data}`];
  }

  const surrounding = getSurrounding(idx, nbt);
  let tag = deconstructTag(mapping.blocks[`${block.id}:${block.data}`]);
  if (connectors[block.id]) {
    tag = fixConnectors(tag, block, surrounding);
  }
  if (stairs.includes(block.id)) {
    tag = fixStairs(tag, surrounding);
  }

  return constructTag(tag);
};

export default extractPaletteAndBlockData;
