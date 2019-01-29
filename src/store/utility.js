export const updateObjects = (oldState, updatedState) => {
    return {
        ...oldState,
        ...updatedState
    }
}