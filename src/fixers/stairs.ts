import { stairs } from "../connectors";
import { Surrounding } from "../utils/surrounding";
import { Tag, deconstructTag } from "../utils/tags";
import mapping from "../legacy";

/* Not my proudest function, but it does the job... */
const fixStairs = (
  tag: Tag,
  { north, east, south, west }: Surrounding
): Tag => {
  if (!tag.state["facing"]) {
    return tag;
  }

  switch (tag.state["facing"]) {
    case "north": {
      if (south && stairs.includes(south.id)) {
        const stairTag = deconstructTag(
          mapping.blocks[`${south.id}:${south.data}`]
        );
        if (stairTag.state["half"] === tag.state["half"]) {
          switch (stairTag.state["facing"]) {
            case "east": {
              tag.state["shape"] = "inner_right";
              break;
            }
            case "west": {
              tag.state["shape"] = "inner_left";
            }
          }
        }
      }
      if (north && stairs.includes(north.id)) {
        const stairTag = deconstructTag(
          mapping.blocks[`${north.id}:${north.data}`]
        );
        if (stairTag.state["half"] === tag.state["half"]) {
          switch (stairTag.state["facing"]) {
            case "east": {
              tag.state["shape"] = "outer_right";
              break;
            }
            case "west": {
              tag.state["shape"] = "outer_left";
            }
          }
        }
      }
      return tag;
    }
    case "east": {
      if (east && stairs.includes(east.id)) {
        const stairTag = deconstructTag(
          mapping.blocks[`${east.id}:${east.data}`]
        );
        if (stairTag.state["half"] === tag.state["half"]) {
          switch (stairTag.state["facing"]) {
            case "north": {
              tag.state["shape"] = "outer_left";
              break;
            }
            case "south": {
              tag.state["shape"] = "outer_right";
            }
          }
        }
      }
      if (west && stairs.includes(west.id)) {
        const stairTag = deconstructTag(
          mapping.blocks[`${west.id}:${west.data}`]
        );
        if (stairTag.state["half"] === tag.state["half"]) {
          switch (stairTag.state["facing"]) {
            case "north": {
              tag.state["shape"] = "inner_left";
              break;
            }
            case "south": {
              tag.state["shape"] = "inner_right";
            }
          }
        }
      }
      return tag;
    }
    case "south": {
      if (south && stairs.includes(south.id)) {
        const stairTag = deconstructTag(
          mapping.blocks[`${south.id}:${south.data}`]
        );
        if (stairTag.state["half"] === tag.state["half"]) {
          switch (stairTag.state["facing"]) {
            case "east": {
              tag.state["shape"] = "outer_left";
              break;
            }
            case "west": {
              tag.state["shape"] = "outer_right";
            }
          }
        }
      }
      if (north && stairs.includes(north.id)) {
        const stairTag = deconstructTag(
          mapping.blocks[`${north.id}:${north.data}`]
        );
        if (stairTag.state["half"] === tag.state["half"]) {
          switch (stairTag.state["facing"]) {
            case "east": {
              tag.state["shape"] = "inner_left";
              break;
            }
            case "west": {
              tag.state["shape"] = "inner_right";
            }
          }
        }
      }
      return tag;
    }
    case "west": {
      if (east && stairs.includes(east.id)) {
        const stairTag = deconstructTag(
          mapping.blocks[`${east.id}:${east.data}`]
        );
        if (stairTag.state["half"] === tag.state["half"]) {
          switch (stairTag.state["facing"]) {
            case "north": {
              tag.state["shape"] = "inner_right";
              break;
            }
            case "south": {
              tag.state["shape"] = "inner_left";
            }
          }
        }
      }
      if (west && stairs.includes(west.id)) {
        const stairTag = deconstructTag(
          mapping.blocks[`${west.id}:${west.data}`]
        );
        if (stairTag.state["half"] === tag.state["half"]) {
          switch (stairTag.state["facing"]) {
            case "north": {
              tag.state["shape"] = "outer_right";
              break;
            }
            case "south": {
              tag.state["shape"] = "outer_left";
            }
          }
        }
      }
      return tag;
    }
    default:
      return tag;
  }
};

export default fixStairs;
