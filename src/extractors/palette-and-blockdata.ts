import { NBT, Tags } from "prismarine-nbt";
import { TagType } from "../types/tag-type";
import mapping from "../legacy";

const extractPaletteAndBlockData = (
  nbt: NBT
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
  blocks.forEach((cur, idx) => {
    const idAndData = `${cur < 0 ? 256 + cur : cur}:${data[idx]}`;
    const tag = mapping.blocks[idAndData];

    if (typeof palette[tag] === "undefined") {
      palette[tag] = paletteIdx;
      paletteIdx++;
    }
    blockData.push(palette[tag]);
  });

  return { palette, blockData };
};

export default extractPaletteAndBlockData;
