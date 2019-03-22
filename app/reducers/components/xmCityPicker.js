import { handleActions } from 'redux-actions'

export const getCityList = handleActions({
    'request goodsList'(state, action) {
        return { ...state, loading: true }
    },
    'receive goodsList'(state, action) {
        // console.dir(action.payload)
        // console.dir(action.payload.res.data.data.list)
        let list = action.payload.res.data.data
        for (let i = 0; i < list.length; i++) {
            list[i].label = list[i].provinceName
            list[i].value = [list[i].provinceName,list[i].provinceld]
            if (list[i].cities) {
                list[i].children=list[i].cities;
                for (let j = 0; j < list[i].cities.length; j++) {
                    list[i].children[j].label = list[i].cities[j].cityName
                    // list[i].children[j].value = list[i].cities[j].cityId
                    list[i].children[j].value = [list[i].cities[j].cityName,list[i].cities[j].cityId]
                    let currentObj = list[i].cities[j]
                    if (currentObj.counties) {
                        currentObj.children = currentObj.counties
                        for (let k = 0; k < currentObj.counties.length; k++) {
                            currentObj.children[k].label = currentObj.counties[k].countyName
                            // currentObj.children[k].value = currentObj.counties[k].countyId
                            currentObj.children[k].value = [currentObj.counties[k].countyName,currentObj.counties[k].countyId]
                        }
                    }
                }
            }
        }
        const { req, res } = action.payload
        return { list, loading: false }
    },
    // 'del glist one'(state, action){
    //     const { index }=action.payload
    //     state.data.list.splice(index,1)
    //     return {...state,data:{
    //         list:[...state.data.list]
    //     }}
    // }
}, {
        data: {
            
        },
        loading: false
    });
