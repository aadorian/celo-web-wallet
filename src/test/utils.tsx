import { render } from '@testing-library/react'
import * as React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { RootState } from '../app/rootReducer'
import { monitoredSagas } from '../app/rootSaga'
import { walletInitialState } from '../features/wallet/walletSlice'
import { DefaultSagaState } from '../utils/saga'
import { RecursivePartial } from '../utils/typescript'

// Needs to be kept in sync with all slices used in store
// TODO find a way to create full mock state without requiring this to be
// updated when state schema changes
export function getFullInitialState(): RootState {
  return {
    wallet: walletInitialState,
    saga: getSagaDefaultState() as any,
  }
}

function getSagaDefaultState() {
  const sagas = Object.keys(monitoredSagas)
  const state: { [name: string]: DefaultSagaState } = {}
  sagas.forEach((sagaName) => (state[sagaName] = { progress: null, error: null }))
  return state
}

export function createMockStore(overrides: RecursivePartial<RootState> = {}) {
  const initialState = getFullInitialState()
  // Apply overrides. Note: only merges one level deep
  for (const key of Object.keys(overrides)) {
    // @ts-ignore overrides already checked to be partial of RootState
    initialState[key] = { ...initialState[key], ...overrides[key] }
  }
  return configureStore<RootState>()(initialState)
}

export function renderWithProvider(
  node: React.ReactElement,
  overrides?: RecursivePartial<RootState>
) {
  const mockStore = createMockStore(overrides)
  return render(<Provider store={mockStore}>{node}</Provider>)
}
