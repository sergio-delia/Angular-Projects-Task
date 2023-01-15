import { START_LOADING, STOP_LOADING, UIActions } from "./projects.action";

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
}

export function projectsReducer(state = initialState, action: UIActions){
  console.log(state);

  switch(action.type){
    case START_LOADING:
      return {
        isLoading : true
      }

    case STOP_LOADING:
      return {
        isLoading: false
      }

    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading
