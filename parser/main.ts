import * as fs from "fs";
import { stringify } from "querystring";

// testing google cloud NLP

const folder = "output";

// default filetype txt

let filetype = "txt";

if (process.argv.length === 2) {
  filetype = "txt";
} else {
  filetype = process.argv[2].substring(1);
}

const conversationCount = 3; // need a better way to find this

function genName(): string {
  const name = Math.floor(Math.random() * Math.pow(2, 16)).toString(16);
  const other = Math.floor(Math.random() * Math.pow(2, 16)).toString(16);
  const end = Math.floor(Math.random() * Math.pow(2, 16)).toString(16);
  return name + other + end;
}

export function parseAndWrite(file: string) {
  console.log("Parsing conversations.");
  const jsontext = fs.readFileSync(file, "utf-8");
  let jsonOBJ = JSON.parse(jsontext) as JSON;

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  for (let i = 0; i < conversationCount; i++) {
    console.log(i);
    console.log(jsonOBJ[i].title);
    const sf = jsonOBJ[i].title as string;
    const subfolder = sf.replace(/ /g, "_");
    if (!fs.existsSync(folder + "/" + subfolder)) {
      fs.mkdirSync(folder + "/" + subfolder);
    }
    Object.keys(jsonOBJ[i].mapping).forEach((key) => {
      const mappingObj = jsonOBJ[i].mapping[key].message;
      try {
        const author = mappingObj.author;
        if (author.role !== "system") {
          const id = mappingObj.content;
          const messageContent = id.parts;
          const mc = stringify(messageContent);
          const decodeMC = global.decodeURI(mc);
          // remove 0= from start of line
          const dmc_sub = decodeMC.substring(2, decodeMC.length);
          const name = genName();
          fs.writeFile(
            `${folder}/${subfolder}/${name}_${author.role}.${filetype}`,
            dmc_sub,
            function (err) {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      } catch (err) {
        console.log("Skipping, no content");
      }
    });
  }
  console.log("Done");
}

export default function getFiles(path: string): string[] {
  try {
    const files = fs.readdirSync(path);
    return files;
  } catch (error) {
    console.log(error);
    return [];
  }
}
