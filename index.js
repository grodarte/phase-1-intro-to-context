// Your code here
function createEmployeeRecord(array){
    const employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(arrays){
    const employeeRecords = []
    arrays.forEach(array=>employeeRecords.push(createEmployeeRecord(array)))
    return employeeRecords
}

function createTimeInEvent(employeeObj, dateStamp){
    const clockIn = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0,10),
    }
    employeeObj["timeInEvents"].push(clockIn)
    return employeeObj
}

function createTimeOutEvent(employeeObj, dateStamp){
    const clockOut = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0,10),
    }
    employeeObj["timeOutEvents"].push(clockOut)
    return employeeObj
}

function hoursWorkedOnDate(employeeObj, formDate){
    let clockIn = employeeObj["timeInEvents"].find(obj=> obj["date"] === formDate)["hour"]
    let clockOut = employeeObj["timeOutEvents"].find(obj=> obj["date"] === formDate)["hour"]
    let hoursWorked = (clockOut - clockIn)/100
    return hoursWorked
}

function wagesEarnedOnDate(employeeObj, formDate){
    let hoursWorked = hoursWorkedOnDate(employeeObj, formDate)
    let wagesEarned = hoursWorked * employeeObj["payPerHour"]
    return wagesEarned
}

function allWagesFor(employeeObj){
    let allDates = employeeObj["timeOutEvents"].map(obj=>obj["date"])
    let allWages = allDates.reduce(
        (wageAccum, formDate) => {
            return wageAccum + wagesEarnedOnDate(employeeObj, formDate)
        }, 0
    )
    return allWages
}

function calculatePayroll(array){
    let totalWages = array.reduce(
        (wageAccum, employeeObj) => {
            return wageAccum + allWagesFor(employeeObj)
        }, 0
    )
    return totalWages
}