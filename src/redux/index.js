import { createStore, applyMiddleware } from "redux";

import createSagaMiddleware from "redux-saga";

// import rootSaga from '@/src/app/network/sagas';
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga/index";
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// export const persistor = persistStore(store);

export const getState = () => {
	return store.getState();
};

sagaMiddleware.run(rootSaga);

export const dispatchAction = (action) => {
	store.dispatch(action);
};

export default store;
