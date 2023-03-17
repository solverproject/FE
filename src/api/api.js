import instance from "./instance";

const getCard = async () => {
  const response = await instance.get(`/api/boards`);
  return response.data;
};

export { getCard };
