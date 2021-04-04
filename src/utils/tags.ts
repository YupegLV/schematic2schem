export const deconstructTag = (
  tag: string
): { tag: string; state: Record<string, string> } => {
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

export const constructTag = (tag: {
  tag: string;
  state: Record<string, string>;
}): string => {
  const blockState = Object.keys(tag.state).map((blockState) => {
    return `${blockState}=${tag.state[blockState]}`;
  });
  return `${tag.tag}[${blockState.join(",")}]`;
};
