export const filterTaskList = (list, filters) => {
    const entries = Object.entries(Object.assign(...filters))
    return list.filter(task => {
      return entries.every(([key, val]) => {
        return task[key] === val
      })
    })
  }