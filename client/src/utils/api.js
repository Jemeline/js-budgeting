import axios from 'axios';

export async function apiLogin(payload) {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, payload);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiRegister(payload) {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/register`, payload);
    return res;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
}

export async function apiVerify(id) {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/verify/${id}`);
    return res;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
}

export async function apiToken(userData) {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/verify`, userData);
    return res;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
}

export async function apiGetUser(id) {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/find-by-id/${id}`);
    return res;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
}

export async function apiAddBudget(payload) {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/budget`, payload);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiUpdateBudget(id, payload) {
  try {
    const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/budget/${id}`, payload);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiRemoveBudget(id) {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/budget/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiGetBudgetByUser(id) {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/budget-by-user/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
