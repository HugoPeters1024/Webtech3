window.localStorage.removeItem("StateWrapper");
if (!window.localStorage.getItem("StateWrapper")) {
    window.localStorage.setItem("StateWrapper",
    `{
      "LoggedIn" : { "value" : "true", "actions" : [] },
      "CurrentPage" : { "value" : "home.html", "actions" : [] },
      "CheckoutCart" : { value: ${JSON.stringify(new Cart)}}
      }`)  
}

var StateWrapper = JSON.parse(window.localStorage.getItem("StateWrapper")); 

function SaveState() {
    window.localStorage.setItem("StateWrapper", JSON.stringify(StateWrapper));
}

function GetState(state) {
    if (StateWrapper[state])
        return StateWrapper[state].value;
    else
        return null;
}

function SetState(state, value) {
    if (!StateWrapper[state]) {
        StateWrapper[state] = {}
        StateWrapper[state].actions = [];
    }
    var prevState = GetState(state, value);
    StateWrapper[state].value = value;
    if (prevState != value)
        StateWrapper[state].actions.forEach(element => { if (element) element(value);});
}

//InitUpdate flag will run the callback with current value right away if it is supplied.
function AddStateListener(state, action, initUpdate) {
    if (!StateWrapper[state]) {
        StateWrapper[state] = {};
        StateWrapper[state].actions = [];
    }
    if (!StateWrapper[state].actions)
        StateWrapper[state].action = [];
    StateWrapper[state].actions.push(action);
    if (initUpdate)
        action(GetState(state));
}