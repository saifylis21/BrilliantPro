import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({isLoggedIn: false, role: ""});

export { useGlobalState, setGlobalState };