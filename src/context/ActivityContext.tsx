import { createContext, ReactNode, useReducer, useMemo } from "react";
import { ActivityActions, activityReducer, activityState, initialState } from "../reducer/activity-reducer";

type ActivityContextProps  = {
    state: activityState
    dispatch: React.Dispatch<ActivityActions>
    caloriesConsumed: number
    caloriesBurned: number
    netCalories: number
}

type ActivityProviderProps = {
    children: ReactNode
}
export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps)


export const ActivityProvider = ({children} : ActivityProviderProps ) => {

    const[state, dispatch] = useReducer(activityReducer, initialState)
    const { activities } = state
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? (total + activity.calories) : total, 0), [activities])
    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? (total + activity.calories) : total ,0),[activities])
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned,[activities])

    return(
        <ActivityContext.Provider
            value={{
                state, 
                dispatch,
                caloriesConsumed,
                caloriesBurned,
                netCalories
            }}
        >
            {children}
        </ActivityContext.Provider>
    )
}
