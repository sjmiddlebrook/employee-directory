import axios from 'axios';

function getEmployeeData(employeeName) {
  const url = `http://api.additivasia.io/api/v1/assignment/employees/${employeeName}`;
  return axios.get(url)
    .then(res => {
      const employeeData = res.data;
      const [title, subordinatesObj] = employeeData;
      let directSubordinates;
      if (subordinatesObj !== undefined) {
        directSubordinates = subordinatesObj['direct-subordinates'];
      }
      const splitName = employeeName.toLowerCase().split(' ');
      const capitalizedName = splitName.map(word => word.charAt(0).toUpperCase() + word.substr(1))
      const name = capitalizedName.join(' ');
      return {name, title, directSubordinates};
    })
}

function getAllSubordinates(employeeStack, allSubordinates = []) {
  const isStackEmpty = employeeStack === undefined || employeeStack.length === 0;
  if (isStackEmpty) {
    // base case to return all the subordinates of the employee when no more employees to look at
    return allSubordinates;
  }
  // remove employee from the stack
  const currentEmployee = employeeStack.pop();
  if (allSubordinates.includes(currentEmployee)) {
    // potential case where the employee node has already been visited
    return getAllSubordinates(employeeStack, allSubordinates);
  }
  allSubordinates.push(currentEmployee);
  return getEmployeeData(currentEmployee)
    .then(currentData => {
      if (currentData !== undefined && currentData.directSubordinates !== undefined) {
        // update stack with additional reports if employee has direct reports
        employeeStack.push(...currentData.directSubordinates);
      }
      return getAllSubordinates(employeeStack, allSubordinates);
    })
    .catch(() => {
      return getAllSubordinates(employeeStack, allSubordinates);
    });
}

export {
  getEmployeeData,
  getAllSubordinates
};
