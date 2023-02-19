import Constants from 'expo-constants';

const extra = Constants?.manifest?.extra;

export const SUPABASE_URL = extra?.SUPABASE_URL;
export const SUPABASE_API_KEY = extra?.SUPABASE_API_KEY;
export const SUPABASE_SERVICE_KEY = extra?.SUPABASE_SERVICE_KEY;

export const AUTH0_DOMAIN = extra?.AUTH0_DOMAIN;
export const AUTH0_CLIENT_ID = extra?.AUTH0_CLIENT_ID;
export const AUTH0_CLIENT_SECRET = extra?.AUTH0_CLIENT_SECRET;
