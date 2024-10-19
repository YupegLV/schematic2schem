import { NBT } from "prismarine-nbt";
declare const extractPaletteAndBlockData: (nbt: NBT, fast: boolean) => {
    palette: Record<string, number>;
    blockData: number[];
};
export default extractPaletteAndBlockData;
