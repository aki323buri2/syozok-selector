export const syozokSelectorReducers = {
	buka: (state = [], action) =>
	{
		if (action.type === 'BUKA') return action.payload;
		return state;
	}, 
	syozok: (state = null, action) =>
	{
		if (action.type === 'SYOZOK') return action.payload;
		return state;
	}, 
	pendingBuka: (state = false, action) =>
	{
		if (action.type === 'PENDING_BUKA') return action.payload;
		return state;
	}, 
};
export default syozokSelectorReducers;