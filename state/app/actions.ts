import { createAction } from '@reduxjs/toolkit';
import { ContractsState } from './reducer';

export const updateAppInfo = createAction<Partial<ContractsState>>('update/appInfo');
export const updateUserInfo = createAction<Partial<ContractsState>>('update/userInfo');