const initState = {
    animateCls: 'left', //过渡动画样式
}

export const globaltrans = (state = initState, action) => {
    switch (action.type) {
        case "CURRENT_ANIMATE":
            return {
                ...state,
                animateCls: action.cls
            }
        default:
            return state
    }
}