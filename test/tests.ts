import { expect } from "chai";
import { readFile } from "fs/promises";
import { promisify } from "util";
import { NBT, parse, Tags } from "prismarine-nbt";
import { TagType } from "../src/types/tag-type";
import schematic2schem from "../src/index";

describe("Test converter", () => {
  it("can convert schematic to schem", async () => {
    const schematicBuffer: Buffer = await readFile("./test/crane.schematic");
    const schemBuffer: Buffer = await schematic2schem(schematicBuffer);
    const parsedSchem: NBT = await promisify(parse)(schemBuffer);

    /* Check for mandatory properties */
    expect(parsedSchem.type).to.equal("compound");
    expect(parsedSchem.name).to.equal("Schematic");

    /* Check for Version */
    let versionTag = parsedSchem.value["Version"];
    expect(versionTag).to.not.be.undefined;
    versionTag = versionTag as Tags[TagType.Int];
    expect(versionTag.type).to.equal(TagType.Int);
    expect(versionTag.value).to.equal(2);

    /* Check for DataVersion */
    let dataVersionTag = parsedSchem.value["DataVersion"];
    expect(dataVersionTag);
    dataVersionTag = dataVersionTag as Tags[TagType.Int];
    expect(dataVersionTag.type).to.equal(TagType.Int);
    expect(dataVersionTag.value).to.equal(2586);

    /* Check for Width */
    let widthTag = parsedSchem.value["Width"];
    expect(widthTag);
    widthTag = widthTag as Tags[TagType.Int];
    expect(widthTag.type).to.equal(TagType.Int);
    expect(widthTag.value).to.equal(52);

    /* Check for Height */
    let heightTag = parsedSchem.value["Height"];
    expect(heightTag);
    heightTag = heightTag as Tags[TagType.Int];
    expect(heightTag.type).to.equal(TagType.Int);
    expect(heightTag.value).to.equal(62);

    /* Check for Length */
    let lengthTag = parsedSchem.value["Length"];
    expect(lengthTag);
    lengthTag = lengthTag as Tags[TagType.Int];
    expect(lengthTag.type).to.equal(TagType.Int);
    expect(lengthTag.value).to.equal(25);

    /* Check for Palette */
    let paletteTag = parsedSchem.value["Palette"];
    expect(paletteTag);
    paletteTag = paletteTag as Tags[TagType.Compound];
    expect(paletteTag.type).to.equal(TagType.Compound);

    expect(Object.keys(paletteTag.value).length).to.equal(47);

    /* Check for BlockData */
    let blockDataTag = parsedSchem.value["BlockData"];
    expect(blockDataTag);
    blockDataTag = blockDataTag as Tags[TagType.ByteArray];
    expect(blockDataTag.type).to.equal(TagType.ByteArray);
    expect(blockDataTag.value.length).to.equal(80600);
  });
});
