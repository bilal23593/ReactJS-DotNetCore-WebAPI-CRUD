import api from "./api"
export const ACTION_TYPES = {
    CREATE:'CREATE',
    UPDATE:'UPDATE',
    DELETE:'DELETE',
    FETCH_ALL:'FETCH_ALL'
}


//Redux thunk wrapper function // Other way // ()-function parameter for wrapper
//dispath- Inner function parameter
// export const fetchAll = () =>{
//     return dispatch =>
//     {

//     }
// }

const formatData = data =>({
    ...data,
    age: parseInt(data.age ? data.age : 0)
})

export const fetchAll = () => dispatch =>
    {   
        //get api request
        api.dCandidate().fetchAll()
        .then(
                response => {

                    console.log(response);
                    dispatch({
                        type: ACTION_TYPES.FETCH_ALL,
                        payload: response.data
                    })
                }
        )
        .catch(err => console.log(err))

    }

export const create = (data,onSuccess) => dispatch=>{
    debugger;   
    data = formatData(data)
    api.dCandidate().create(data)
    .then(
        res => {
            dispatch({
                type : ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        }
    )
    .catch(err => console.log(err))
} 

export const update = (id, data,onSuccess) => dispatch=>{
    data = formatData(data)
    api.dCandidate().update(id,data)
    .then(
        res => {
            dispatch({
                type : ACTION_TYPES.UPDATE,
                payload: {id, ...data}
            })
            onSuccess()
        }
    )
    .catch(err => console.log(err))
} 

export const Delete = (id, onSuccess) => dispatch=>{
    api.dCandidate().delete(id)
    .then(
        res => {
            dispatch({
                type : ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        }
    )
    .catch(err => console.log(err))
} 
