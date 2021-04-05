# schematic2schem

This package is capable of converting MCEdit Schematics (.schematic, Minecraft version 1.12 and below) to Sponge Schematics (.schem, Minecraft version 1.13 and above). These schematics can then be placed into a Minecraft world using tools like WorldEdit.

## Usage

Below is a simple example of how this library can be used.

```typescript
import schematic2schem from "schematic2schem";

schematic2schem(schematicBuffer)
  .then((schemBuffer) => {
    // Do something with the schem buffer, e.g. write it to a file.
  })
  .catch((err) => console.log(err));
```

A more advanced example is shown below. In this example, a file containing an MCEdit schematic on the local file system is read (`test/test_large.schematic`). It is then turned into a Sponge schematic. Finally, this schematic's data is written to another file (`test/out.schem`).

```typescript
import { readFile, writeFile } from "fs";
import schematic2schem from "schematic2schem";

readFile("test/test_large.schematic", async (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  try {
    const schemBuffer = await schematic2schem(data);
    writeFile("test/out.schem", schemBuffer, (err) => {
      if (err) console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
});
```

Additionally, you can turn on "fast-mode" by passing on a boolean: `schematic2schem(data, true)`. In "fast-mode", no attempt to fix block state will be made. This means that blocks like fences, glass panes, walls, iron bars and stairs will not see their block data being fixed to match neighbouring blocks. This means that, for example, fences will not connect to neighbouring blocks even though they should. These fixes have been built-in due to how Minecraft 1.13+ addresses fences connecting to others. In versions below 1.13, this was done fully on the client-side, rather than this info being stored in the NBT data (in 1.13+).

## Features

This library comes with the following features:

- Converts MCEdit schematics (1.12 and below) to Sponge schematics (1.13 and higher)
- Correctly fixes the block state of fences, iron bars, glass panes and walls so that they are connected to compatible neighbouring blocks
- Correctly fixes stair shape when stairs connect to neighbouring stairs

## Features that are not implemented

The following features of schematics have not been implemented (yet):

- BlockEntities, e.g. chest inventories
- Entities, e.g. armor stands or mobs

## Promises

This package uses promises, as processing a schematic might take a bit of time. To not freeze the main thread, this operation can be done in the background. See the second example on how to use this

## Credits

The conversion is done using the mapping (legacy.json) provided by [WorldEdit](https://github.com/EngineHub/WorldEdit).
