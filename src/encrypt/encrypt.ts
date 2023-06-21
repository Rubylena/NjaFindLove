import { EncryptStorage } from "encrypt-storage";

const encryptStorage = new EncryptStorage(
  `${import.meta.env.VITE_SECURE_LOCAL_STORAGE_HASH_KEY}`
);

export { encryptStorage };
