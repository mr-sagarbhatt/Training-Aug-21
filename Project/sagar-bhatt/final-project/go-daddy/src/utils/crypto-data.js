import CryptoJS from "crypto-js";
// import { encrypt, decrypt } from "crypto-js/aes";

const secretKey = "my-secret-key@123";

// * ENCRYPT
const encryptData = (data) => {
  try {
    var encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
    return encryptedData;
  } catch (err) {
    console.log(err.message);
  }
};

// * DECRYPT
const decryptData = (encryptedData) => {
  try {
    var bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (err) {
    console.log(err.message);
  }
};

export { encryptData, decryptData };
