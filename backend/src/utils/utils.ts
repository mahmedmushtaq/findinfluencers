import fs from "fs";
import path from "path";

export const transformMongooseResponse = {
  toJSON: {
    transform(doc: any, ret: any) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
};

export const generateImageUniqueName = (filename: string) => {
  const name = filename.replace(/\s/g, "");
  //@ts-ignore
  const strings = name.split(".");
  const newStringName =
    strings[0] + Date.now() + "." + strings[strings.length - 1];

  return newStringName;
};

export const saveFile = async (publicPath: string, file: any) => {
  return new Promise(async (resolve, reject) => {
    const singleFile = await file;
    //@ts-ignore
    const { createReadStream, filename, mimetype } = singleFile;
    const fileStream = createReadStream();
    const fileName = generateImageUniqueName(filename);

    console.log("fileName is = ", fileName);

    // save file to  ../../assets/platformPic/${fileName}

    fileStream
      .pipe(
        fs.createWriteStream(
          path.join(
            path.resolve(__dirname + `/../../public/${publicPath}`),
            `${fileName}`
          )
        )
      )
      .on("finish", () => {
        singleFile.filename = fileName;
        setTimeout(() => {
          return resolve(singleFile);
        }, 50);

        //@ts-ignore
      })
      .on("error", (e: any) => {
        console.log("error on transferring file is = ", e);
        return reject(e);
      });
  });
};

export const getMessageServerUrl = (req: any) => {
  return (
    process.env.MESSAGES_SERVER_URL + req.originalUrl.replace(req.baseUrl, "")
  );
};

export const currentDateDifference = (date1: any) => {
  //@ts-ignore
  const date = new Date() - date1;
  return date;
};
