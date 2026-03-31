/**
 * This project follows a black line using line sensors.
 * 
 * Use variables for setting parameters and changing easily
 */
let MotorSpeedRight = 0
let MotorSpeedLeft = 0
let Base_Speed = 45
let TurnRatio = 2
let MotorCalilbration = 0
basic.forever(function () {
    if (mbit_Robot.Line_Sensor(mbit_Robot.enPos.LeftState, mbit_Robot.enLineState.Black)) {
        MotorSpeedLeft = Base_Speed / TurnRatio
        MotorSpeedRight = Base_Speed
        MotorSpeedRight += MotorCalilbration
    } else if (mbit_Robot.Line_Sensor(mbit_Robot.enPos.RightState, mbit_Robot.enLineState.Black)) {
        MotorSpeedLeft = Base_Speed
        MotorSpeedRight = Base_Speed / TurnRatio
        MotorSpeedRight += MotorCalilbration
    }
    mbit_Robot.CarCtrlSpeed2(mbit_Robot.CarState.Car_Run, MotorSpeedLeft, MotorSpeedRight)
})
