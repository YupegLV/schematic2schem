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
export const deconstructTag = (tag: string): Tag => {
  if (!tag.includes("[")) {
    return { tag, state: {} };
  }

  const tagParts = tag.split("[");
  const blockState = tagParts[1]
    .slice(0, -1)
    .split(",")
    .reduce((acc, state) => {
      const stateParts = state.split("=");
      acc[stateParts[0]] = stateParts[1];
      return acc;
    }, {});

  return {
    tag: tagParts[0],
    state: blockState,
  };
};

/**
 * Constructs a stringual tag from a tag object.
 * @param tag The tag object.
 * @returns The stringual tag.
 */
export const constructTag = (tag: Tag): string => {
  const blockState = Object.keys(tag.state).map((blockState) => {
    return `${blockState}=${tag.state[blockState]}`;
  });
  return `${tag.tag}[${blockState.join(",")}]`;
};

/**
 * Gets the ID and data from the block at the provided index.
 * @param idx The index of the block to fetch the ID and data for.
 * @param id The ID of the block at the provided index.
 * @param data The data of the block at the provided index.
 * @returns
 */
export const getIdAndData = (
  idx: number | null,
  id: number[],
  data: number[]
): LegacyBlock | null => {
  if (idx === null) {
    return null;
  }
  return { id: id[idx] < 0 ? 256 + id[idx] : id[idx], data: data[idx] };
};
