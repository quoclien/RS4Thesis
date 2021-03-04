import express from "express";
import { Request, Response } from "express";
import path from 'path';
import { spawn } from "child_process";


const app = express();
app.get("/", (req: Request, res: Response) => {
  const path_to_python_script = path.join(__dirname, "..", "..", "python", "test.py");
  const ps = spawn("python", [path_to_python_script, `Duy`, `Quoc`]);

  ps.stdout.on("data", function (data) {
    res.send(data.toString());
  });
});

app.listen(3000, () => console.log("Server is running in port 3000"));
