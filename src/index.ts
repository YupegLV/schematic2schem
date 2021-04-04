import { promisify } from "util";
import { NBT, parse, writeUncompressed } from "prismarine-nbt";
import { gzipSync } from "zlib";
import { TagType } from "./types/tag-type";
import extractPalette from "./extractors/palette-and-blockdata";
import extractDimensions from "./extractors/dimensions";
import convertPalette from "./converters/convert-palette";

const schematic2schem = async (file: Buffer): Promise<Buffer> => {
  return promisify(parse)(file).then((nbt) => {
    const dimensions = extractDimensions(nbt);
    const convertedSchematic = extractPalette(nbt);
    const paletteTag = convertPalette(convertedSchematic.palette);

    const schematicTag: NBT = {
      type: TagType.Compound,
      name: "Schematic",
      value: {
        Version: { type: TagType.Int, value: 2 },
        DataVersion: { type: TagType.Int, value: 2586 }, // 2568 = version 1.16.5
        Width: { type: TagType.Int, value: dimensions.width },
        Height: { type: TagType.Int, value: dimensions.height },
        Length: { type: TagType.Int, value: dimensions.length },
        Palette: paletteTag,
        BlockData: {
          type: TagType.ByteArray,
          value: convertedSchematic.blockData,
        },
      },
    };

    const uncompressedSchematic = writeUncompressed(schematicTag);
    return gzipSync(Buffer.from(uncompressedSchematic));
  });
};

export default schematic2schem;
