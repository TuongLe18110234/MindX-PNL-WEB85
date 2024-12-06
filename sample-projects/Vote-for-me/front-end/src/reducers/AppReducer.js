const appReducer = (state, action) => {
    switch (action.type) {
        case "CURRENT_USER":
            return {...state, user: action.payload};
        case "GET_ALL_COMMENTS":
            return {...state, comments: action.payload};
        case "CREATE_ONE_COMMENT":
            return {...state, comments: [...state.comments, action.payload]};
        case "UPDATE_ONE_COMMENT":
            return {
                ...state,
                comments: state.comments.map((comment) => 
                    comment._id === action.payload._id
                        ? {...comment, ...action.payload}
                        : comment
                )
            };
        case "DELETE_ONE_COMMENT":
            return {
                ...state,
                comments: state.comments.filter((comment) =>
                    comment._id !== action.payload._id 
                )
            }
        case "GET_ALL_VOTES":
            return {...state, votes: action.payload};
        case "UPDATE_ONE_VOTE":
            return {
                ...state,
                votes: state.votes.map((vote) => 
                    vote.userId === action.payload.userId
                        ? {...vote, ...action.payload}
                        : vote
                )
            };
        default:
            return state;
    }
}

export default appReducer;