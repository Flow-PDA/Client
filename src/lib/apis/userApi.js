import instance from "./base";

/**
 * check if email is valid
 * @param {*} email
 * @returns object with message. msg: "available" | "invalid"
 */
async function checkEmail(email) {
  try {
    const resp = await instance.get(`/users/check/${email}`);

    return resp.data;
  } catch (error) {
    console.log(error);
    return { msg: "invalid" };
  }
}

export { checkEmail };
