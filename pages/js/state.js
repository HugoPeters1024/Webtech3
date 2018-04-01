var StateWrapper = {};
SetState("LoggedIn", true);

function GetState(state) {
    if (StateWrapper.state)
        return StateWrapper.state.value;
    else
        return null;
}

function SetState(state, value) {
    if (!StateWrapper.state) {
        StateWrapper.state = {}
        StateWrapper.state.actions = [];
    }
    var prevState = GetState(state, value);
    StateWrapper.state.value = value;
    if (prevState != value)
        StateWrapper.state.actions.forEach(element => { element(value);})
}

function AddStateListener(state, action, initUpdate) {
    if (!StateWrapper.state) {
        StateWrapper.state = {};
        StateWrapper.state.actions = [];
    }
    StateWrapper.state.actions.push(action);
    if (initUpdate)
        StateWrapper.state.actions.forEach(element => {
            element(StateWrapper.state.value);
        });
}