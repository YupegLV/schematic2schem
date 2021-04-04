import { Tags } from "prismarine-nbt";
import { TagType } from "../types/tag-type";

const convertPalette = (
  palette: Record<string, number>
): Tags[TagType.Compound] => {
  const blockStates = Object.keys(palette).reduce((acc, blockState) => {
    acc[blockState] = { type: TagType.Int, value: palette[blockState] };
    return acc;
  }, {});

  return {
    type: TagType.Compound,
    value: blockStates,
  };
};

export default convertPalette;
