import { put, call, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
export const syozokSelectorSaga = function *()
{
	yield fork(function *()
	{
		yield put({ type: 'FETCH_BUKA' });
	});
	yield takeLatest('FETCH_BUKA', function *(action)
	{
		yield put({ type: 'PENDING_BUKA', payload: true });
		yield put({ type: 'BUKA', payload: yield call(fetchBuka) });
		yield put({ type: 'PENDING_BUKA', payload: false });
	});
};
export default syozokSelectorSaga;

const fetchBuka = function *()
{
	const fetch = url => axios.get(url).then(res => res.data);
	try
	{
		const buka = yield call(fetch, 'http://laravel.suisvr.zeus.sss/buka');
		yield put({ type: 'FETCH_BUKA_ERROR', payload: null });
		return buka;
	}
	catch (err)
	{
		yield put({ type: 'FETCH_BUKA_ERROR', payload: err });
		throw [];
	}
}