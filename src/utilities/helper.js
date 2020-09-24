export const filterTaskList = (list, filters) => {
    const filterNames = Object.keys(filters)
    return list.filter(task => {
      return filterNames.every(filter => {
        return filters[filter].active ? task[filter] === filters[filter].active : 1
      })
    })
  }