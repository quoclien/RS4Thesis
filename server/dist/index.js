"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const app = express_1.default();
app.get("/", (req, res) => {
    const path_to_python_script = path_1.default.join(__dirname, "..", "..", "python", "test.py");
    const ps = child_process_1.spawn("python", [path_to_python_script, `Duy`, `Quoc`]);
    ps.stdout.on("data", function (data) {
        res.send(data.toString());
    });
});
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running in port ${port}`));
