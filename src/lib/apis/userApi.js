import instance from "./base";

/**
 * check if email is valid
 * @param {*} email
 * @returns object with message. msg: "available" | "invalid"
 */
async function checkEmail(email) {
  try {
    const resp = await instance.get(`/users/check/${email}`);

    return resp;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

/**
 * send signup request
 * @param {*} reqBody required : email, name, password, phoneNumber, birth
 * @returns
 */
async function signup(reqBody) {
  try {
    const resp = await instance.post(`/users/signup`, reqBody);

    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

/**
 *
 * @param {*} email
 * @param {*} password
 * @returns
 */
async function login(email, password) {
  try {
    const reqBody = { email, password };
    const resp = await instance.post(`/users/login`, reqBody);

    return resp;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export { checkEmail, signup, login };
