import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromProjects from './projects/projects.reducer'

export interface State {
  projects: fromProjects.State;
}

export const reducers: ActionReducerMap<State> = {
  projects: fromProjects.projectsReducer,
}

export const getProjectsState = createFeatureSelector<fromProjects.State>('projects');
export const getIsLoading = createSelector(getProjectsState, fromProjects.getIsLoading);
