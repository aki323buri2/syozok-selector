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
		try 
		{
			yield put({ type: 'FETCH_BUKA_PENDING', payload: true });
			yield put({ type: 'BUKA', payload: yield call(fetchBuka) });
			yield put({ type: 'FETCH_BUKA_PENDING', payload: false });
		}
		catch (err)
		{
			yield put({ type: 'FETCH_BUKA_ERROR', payload: err });
			yield put({ type: 'BUKA', payload: [] });
			yield put({ type: 'FETCH_BUKA_PENDING', payload: false });
		}
	});
};
export default syozokSelectorSaga;

const fetchBukaUrl = 'http://laravel.suisvr.zeus.sss/buka';
const fetchBuka = function *()
{
	const fetch = url => axios.get(url).then(res => res.data);
	const buka = yield call(fetch, fetchBukaUrl);
	return buka;
}