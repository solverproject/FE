import instance from "./instance";

const loginUser = async (userId) => {
    return await instance.post(`/api/users/login`, userId);
  };
  
const signUpUser = async (newbie) => {
    return await instance.post(`/api/users/signup`, newbie);
  };



  export { loginUser, signUpUser };