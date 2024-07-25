import fs from "fs";

export const publicKeyController = (req, res) => {
  try {
    const publicKey = fs.readFileSync(
      "/Users/antonia/Documents/projects/mpc-fullstack-app/server-analyst/publickey.crt",
      "utf8"
    );
    res.send({ publicKey });
  } catch (err) {
    res.status(500).send("Error reading the public key file");
  }
};
