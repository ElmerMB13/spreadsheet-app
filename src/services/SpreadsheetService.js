import baseService from './service';

const SPREADSHEET_BASE = 'spreadsheets/';

export const create = async () => await baseService.post(SPREADSHEET_BASE);

export const update = async (id, body) => await baseService.put(`${SPREADSHEET_BASE}${id}`, body);

export const show = async (id) => await baseService.get(`${SPREADSHEET_BASE}${id}`);
