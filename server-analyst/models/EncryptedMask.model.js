import mongoose from "mongoose";

const EncryptedMaskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  encryptedMask: {
    type: String,
    required: true,
  },
});

const EncryptedMask = mongoose.model("encrypted_mask", EncryptedMaskSchema);

export default EncryptedMask;
