import fs from "fs";
import path from "path";

export const transformMongooseResponse = {
  toJSON: {
    transform(doc: any, ret: any) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
};

export const generateImageUniqueName = (filename: string) => {
  const strings = filename.split(".");
  const newStringName =
    strings[0] + Date.now() + "." + strings[strings.length - 1];

  return newStringName;
};

export const saveFile = async (filePath: string[], file: File) => {
  const singleFile = await file;
  //@ts-ignore
  const { createReadStream, filename, mimetype } = singleFile;
  const fileStream = createReadStream();
  const fileName = generateImageUniqueName(filename);

  // save file to  ../../assets/platformPic/${fileName}

  fileStream.pipe(fs.createWriteStream(path.join(...filePath, `${fileName}`)));
  
  //@ts-ignore
  singleFile.filename = fileName;
  return singleFile;
};
