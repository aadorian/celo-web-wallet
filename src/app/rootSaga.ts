import { combineReducers, Reducer } from '@reduxjs/toolkit'
import { spawn } from 'redux-saga/effects'
import { createWalletReducer, createWalletSaga } from '../features/wallet/createWallet'
import { fetchBalancesReducer, fetchBalancesSaga } from '../features/wallet/fetchBalances'
import { importWalletSaga } from '../features/wallet/importWallet'
import { DefaultSagaState } from '../utils/saga'

// All regular sagas must be included here
const sagas = [importWalletSaga]

// All monitored sagas must be included here
export const monitoredSagas: {
  [name: string]: { saga: any; reducer: Reducer<DefaultSagaState> }
} = {
  createWallet: {
    saga: createWalletSaga,
    reducer: createWalletReducer,
  },
  fetchBalances: {
    saga: fetchBalancesSaga,
    reducer: fetchBalancesReducer,
  },
}

// TODO This dynamic combination of reducers causes the typings to be lost,
// but if the reducers are listed manually, there's a circular definition causing errors.
export const monitoredSagaReducers = combineReducers(
  Object.keys(monitoredSagas).reduce(
    (acc: { [name: string]: Reducer<DefaultSagaState> }, sagaName: string) => {
      acc[sagaName] = monitoredSagas[sagaName].reducer
      return acc
    },
    {}
  )
)

export function* rootSaga() {
  for (const s of sagas) {
    yield spawn(s)
  }
  for (const m of Object.values(monitoredSagas)) {
    yield spawn(m.saga)
  }
}