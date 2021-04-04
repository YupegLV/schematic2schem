# schematic2schem
This package is capable of converting MCEdit Schematics (.schematic, Minecraft version 1.12 and below) to Sponge Schematics (.schem, Minecraft version 1.13 and above). These schematics can then be placed into a Minecraft world using tools like WorldEdit.

## Usage
Below is a simple example of how this library can be used.
```typescript
import schematic2schem from "schematic2schem";

schematic2schem(structBuffer)
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

## Promises
This package uses promises, as processing a schematic might take a bit of time. To not freeze the main thread, this operation can be done in the background. See the second example on how to use this 

## Not implemented features
The following features of schematics have not been implemented (yet):
- BlockEntities, e.g. chest inventories
- Entities, e.g. armor stands or mobs

## FAQ
**I pasted my schematic into the world using a tool like Fast Async WorldEdit, but all stairs, slabs and other half-blocks are not properly covered by water!**
The 1.13 update introduced the concept of "waterlogging", so 1.12 schematics did not yet contain information on this. We have explictly set all waterlogging to `false` as some tools like WorldEdit have it `true` by default.

**I pasted my schematic into the world using a tool like Fast Async WorldEdit, but all iron bars, fences and walls are not connected to each other!**
In Minecraft 1.12 and earlier, fences, bars, glass panes and anything that can connect to blocks next to it did not yet exist in the BlockData. This was done automatically by your client instead. Nowadays, it is part of the BlockData. However, this does mean that it is impossible for 1.12 schematics to infer this automatically.

## Credits
The conversion is done using the mapping (legacy.json) provided by [WorldEdit](https://github.com/EngineHub/WorldEdit).
