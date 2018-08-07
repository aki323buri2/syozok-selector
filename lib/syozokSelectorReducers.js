export const syozokSelectorReducers = {
	syozok: (state = '', action) =>
	{
		if (action.type === 'SYOZOK') return action.payload;
		return state;
	}, 
	buka: (state = [], action) =>
	{
		if (action.type === 'BUKA') return action.payload;
		return state;
	}, 
	fetchBukaPending: (state = false, action) =>
	{
		if (action.type === 'FETCH_BUKA_PENDING') return action.payload;
		return state;
	}, 
	fetchBukaError: (state = null, action) =>
	{
		if (action.type === 'FETCH_BUKA_ERROR') return action.payload;
		return state;
	}, 
};
export default syozokSelectorReducers;