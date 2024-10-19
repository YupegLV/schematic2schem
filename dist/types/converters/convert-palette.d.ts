import { Tags } from "prismarine-nbt";
import { TagType } from "../types/tag-type";
declare const convertPalette: (palette: Record<string, number>) => Tags[TagType.Compound];
export default convertPalette;
