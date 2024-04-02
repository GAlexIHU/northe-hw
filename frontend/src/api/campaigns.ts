import { Api } from './api';

export interface ICreateCampaign {
  from: string;
  to: string;
  amount: number;
  prefix: string;
  currency: string;
}

export const getCampaigns = async () => {
  try {
    const response = await Api.get('/campaigns');

    return response.data.campaigns;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};

export const getCampaignById = async (id: string) => {
  try {
    const response = await Api.get(`/campaigns/${id}`);

    return response.data.campaign;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNewCampaign = async (body: ICreateCampaign) => {
  try {
    const response = await Api.post('/campaigns', body);

    return response.data;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

export const deleteCampaignById = async (id: string) => {
  try {
    const response = await Api.delete(`/campaigns/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

export const generateVouchers = async (id: string, amount: number) => {
  try {
    const response = await Api.post(`/campaigns/${id}/vouchers/batch`, {
      amount,
    });
    return response.data;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};
