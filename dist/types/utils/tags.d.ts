export interface Tag {
    tag: string;
    state: Record<string, string>;
}
export interface LegacyBlock {
    id: number;
    data: number;
}
/**
 * Deconstructs a stringual tag into a tag object.
 * @param tag The stringual tag.
 * @returns The tag object.
 */
export declare const deconstructTag: (tag: string) => Tag;
/**
 * Constructs a stringual tag from a tag object.
 * @param tag The tag object.
 * @returns The stringual tag.
 */
export declare const constructTag: (tag: Tag) => string;
/**
 * Gets the ID and data from the block at the provided index.
 * @param idx The index of the block to fetch the ID and data for.
 * @param id The ID of the block at the provided index.
 * @param data The data of the block at the provided index.
 * @returns
 */
export declare const getIdAndData: (idx: number | null, id: number[], data: number[]) => LegacyBlock | null;
