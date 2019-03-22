
export default store => next => action => {
  // console.log(action)
  //console.dir(action.palyLoad)
  return next(action)
}
