import { NBT } from "prismarine-nbt";
export interface Dimensions {
    length: number;
    width: number;
    height: number;
}
declare const extractDimensions: (nbt: NBT) => Dimensions;
export default extractDimensions;
