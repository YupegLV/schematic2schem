/*
 * @Author: Yupeg.LV
 * @Date: 2024-10-18 18:32:26
 * @Description:
 */
import { promisify } from "util";
import { NBT, parse, writeUncompressed } from "prismarine-nbt";
import { gzipSync } from "zlib";
import { TagType } from "./types/tag-type";
import extractPaletteAndBlockData from "./extractors/palette-and-blockdata";
import extractDimensions from "./extractors/dimensions";
import convertPalette from "./converters/convert-palette";

function processByteArray(byteArray: number[]): number[] {
    const result: number[] = [];
    for (const byte of byteArray) {
        if (byte > 127) {
            result.push(byte - 256, 1);
        } else {
            result.push(byte);
        }
    }
    return result;
}
const schematic2schem = async (
    file: Buffer,
    fast: boolean = false
): Promise<Buffer> => {
    return promisify(parse)(file).then((nbt) => {
        const dimensions = extractDimensions(nbt);
        const convertedSchematic = extractPaletteAndBlockData(nbt, fast);
        const paletteTag = convertPalette(convertedSchematic.palette);
        convertedSchematic.blockData = processByteArray(
            convertedSchematic.blockData
        );
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
