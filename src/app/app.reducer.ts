interface State{
    testValue: boolean;
}

const initialState: State = {
    testValue: false
};

export function appReducer(state = initialState, action){
    switch(action.type){
        case 'START_LOADING':
            return{
                testValue: true
            };
        case 'STOP_LOADING':
            return{
                testValue: false
            };
        default:
            return state;
    }
}