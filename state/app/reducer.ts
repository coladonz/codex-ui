import { BigNumber } from 'ethers';
import { createReducer } from '@reduxjs/toolkit';
import { updateAppInfo, updateUserInfo } from './actions';

export interface ContractsState {
	balances: Record<string, BigNumber>;
}

const initialState: ContractsState = {
	balances: {},
};

export default createReducer(initialState, (builder) =>
	builder
		.addCase(updateUserInfo, (state, action) => {
			const balances = action.payload.balances;
			if (balances) {
				Object.keys(balances).forEach(tokenAddr => {
					state.balances[tokenAddr.toLowerCase()] = balances[tokenAddr];
				})
			}
		})
);
