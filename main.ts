/**
 * This project follows a black line using line sensors.
 * 
 * Use variables for setting parameters and changing easily
 * 
 * This version adds a lap counter
 */
let MotorSpeedRight = 0
let MotorSpeedLeft = 0
let Base_Speed = 45
let TurnRatio = 2
let MotorCalilbration = 0
let LapCounter = 0
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
basic.forever(function () {
    while (LapCounter < 6) {
        if (mbit_Robot.Ultrasonic_Car() < 10) {
            LapCounter += 1
            basic.showNumber(LapCounter)
            if (LapCounter < 5) {
                dance.playDanceSound(dance.DanceSound.Slide, dance.SoundMode.UntilDone)
                basic.pause(5000)
            } else {
                dance.playDanceSound(dance.DanceSound.Victory, dance.SoundMode.InBackground)
                dance.fastWiggle(100)
                mbit_Robot.CarCtrl(mbit_Robot.CarState.Car_Stop)
            }
        }
        basic.pause(100)
    }
})
