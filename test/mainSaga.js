import { put, call, fork } from 'redux-saga/effects';
import syozokSelectorSaga from '../lib/syozokSelectorSaga';
export const mainSaga = function *()
{
	yield fork(syozokSelectorSaga);
};
export default mainSaga;