const fs = require("fs");
const path = require("path");

// Leer package.json
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "package.json"), "utf8")
);
const appJsonPath = path.resolve(__dirname, "app.json");
const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf8"));

// Actualizar la versión en app.json
appJson.expo.version = packageJson.version;

// Escribir los cambios en app.json
fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2), "utf8");

console.log(`Versión sincronizada a ${packageJson.version} en app.json`);
