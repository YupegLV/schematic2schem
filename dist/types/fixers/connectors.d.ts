import { Surrounding } from "../utils/surrounding";
import { Tag, LegacyBlock } from "../utils/tags";
export declare const fixConnectors: (tag: Tag, { id }: LegacyBlock, { north, east, south, west }: Surrounding) => Tag;
