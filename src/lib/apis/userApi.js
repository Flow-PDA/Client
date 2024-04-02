import instance, { authInstance } from "./base";

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

/**
 * sample API for authentication
 * @param {*} userKey
 * @returns
 */
async function modifyTest(userKey) {
  try {
    const reqBody = { name: "123" };
    const resp = await authInstance.put(`/users/${userKey}`, reqBody);

    return resp;
  } catch (error) {
    if (error.response.status == 401) {
      throw error;
    }
    return error.response;
  }
}

export { checkEmail, signup, login, modifyTest };
