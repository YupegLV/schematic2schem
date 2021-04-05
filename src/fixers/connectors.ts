import connectors, { stairs } from "../connectors";
import { Surrounding } from "../utils/surrounding";
import { Tag, LegacyBlock, deconstructTag } from "../utils/tags";
import mapping from "../legacy";

export const fixConnectors = (
  tag: Tag,
  { id }: LegacyBlock,
  { north, east, south, west }: Surrounding
): Tag => {
  if (north && connectors[id].includes(north.id)) {
    if (stairs.includes(north.id)) {
      const stairTag = deconstructTag(
        mapping.blocks[`${north.id}:${north.data}`]
      );
      if (stairTag.state["facing"] === "south") {
        tag.state["north"] = "true";
      }
    } else {
      tag.state["north"] = "true";
    }
  }
  if (east && connectors[id].includes(east.id)) {
    if (stairs.includes(east.id)) {
      const stairTag = deconstructTag(
        mapping.blocks[`${east.id}:${east.data}`]
      );
      if (stairTag.state["facing"] === "west") {
        tag.state["east"] = "true";
      }
    } else {
      tag.state["east"] = "true";
    }
  }
  if (south && connectors[id].includes(south.id)) {
    if (stairs.includes(south.id)) {
      const stairTag = deconstructTag(
        mapping.blocks[`${south.id}:${south.data}`]
      );
      if (stairTag.state["facing"] === "north") {
        tag.state["south"] = "true";
      }
    } else {
      tag.state["south"] = "true";
    }
  }
  if (west && connectors[id].includes(west.id)) {
    if (stairs.includes(west.id)) {
      const stairTag = deconstructTag(
        mapping.blocks[`${west.id}:${west.data}`]
      );
      if (stairTag.state["facing"] === "east") {
        tag.state["west"] = "true";
      }
    } else {
      tag.state["west"] = "true";
    }
  }

  return tag;
};
