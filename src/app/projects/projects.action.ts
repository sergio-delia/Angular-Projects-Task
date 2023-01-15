import { Action } from '@ngrx/store'

export const START_LOADING = '[Projects] Start Loading';
export const STOP_LOADING = '[Projects] Stop Loading';

export class StartLoading implements Action{
  readonly type = START_LOADING
}

export class StopLoading implements Action{
  readonly type = STOP_LOADING
}

export type UIActions = StartLoading | StopLoading
