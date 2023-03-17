import instance from "./instance";

const getCard = async () => {
  console.log("호출은함?");
  const response = await instance.get(`/api/boards`);
  console.log(response);
  return response.data.data;
};

const loginUser = async (userId) => {
  return await instance.post(`/api/users/login`, userId);
};

const signUpUser = async (newbie) => {
  return await instance.post(`/api/users/signup`, newbie);
};

export { getCard, loginUser, signUpUser };
