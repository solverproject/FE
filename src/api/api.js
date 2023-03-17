import instance from "./instance";

const getCard = async () => {
  const response = await instance.get(`/api/boards`);
  return response.data;
};

const loginUser = async (userId) => {
  return await instance.post(`/api/users/login`, userId);
};

const signUpUser = async (newbie) => {
  return await instance.post(`/api/users/signup`, newbie);
};

export { getCard, loginUser, signUpUser };
