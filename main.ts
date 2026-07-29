let lastDir = 0
let currentDir = 0
let nowDir = 0
let rightCorrections = 0
let leftCorrections = 0
let switches = 0
let Base_Speed = 40
let TurnOffset = 40
// Pre-computed motor speeds
let SpeedInside = Base_Speed - TurnOffset
let SpeedOutside = Base_Speed + TurnOffset
// LOOP 2: Fast Evaluation (Twice per second) with Subtle Adjustments
basic.forever(function () {
    // 500ms (0.5s) window for rapid real-world reaction
    basic.pause(1000)
    // CONDITION 1: Over-steering / Bouncing (Scaled down for 0.5s)
    // CONDITION 2: Under-steering / Sluggish (Scaled down for 0.5s)
    if (switches >= 2 || leftCorrections >= 2 && rightCorrections >= 2) {
        // Subtle, gradual drop to soften turn
        TurnOffset += -2
    } else if (leftCorrections >= 2 && rightCorrections == 0 || rightCorrections >= 2 && leftCorrections == 0) {
        // Subtle, gradual rise to sharpen turn
        TurnOffset += 4
    } else if (leftCorrections == 0 && rightCorrections == 0) {
        // Subtle, gradual rise to sharpen turn
        TurnOffset += 2
    }
    // Keep TurnOffset bounded within a safe range
    TurnOffset = Math.constrain(TurnOffset, 30, 50)
    led.plotBarGraph(
    TurnOffset,
    50
    )
    // Update pre-computed motor speeds for Loop 1
    SpeedInside = Base_Speed - TurnOffset
    SpeedOutside = Base_Speed + TurnOffset
    // Reset counters for the next 0.5s window
    switches = 0
    leftCorrections = 0
    rightCorrections = 0
})
// LOOP 1: Drive the Car & Track Edge Transitions (Unchanged)
basic.forever(function () {
    if (mbit_Robot.Line_Sensor(mbit_Robot.enPos.LeftState, mbit_Robot.enLineState.Black)) {
        mbit_Robot.CarCtrlSpeed2(mbit_Robot.CarState.Car_Run, SpeedInside, SpeedOutside)
        nowDir = 1
    } else if (mbit_Robot.Line_Sensor(mbit_Robot.enPos.RightState, mbit_Robot.enLineState.Black)) {
        mbit_Robot.CarCtrlSpeed2(mbit_Robot.CarState.Car_Run, SpeedOutside, SpeedInside)
        nowDir = 2
    } else {
        mbit_Robot.CarCtrlSpeed2(mbit_Robot.CarState.Car_Run, Base_Speed, Base_Speed)
        nowDir = 0
    }
    // Detect NEW correction pulses
    if (nowDir != currentDir) {
        if (nowDir == 1) {
            leftCorrections += 1
            if (lastDir == 2) {
                switches += 1
            }
            lastDir = 1
        } else if (nowDir == 2) {
            rightCorrections += 1
            if (lastDir == 1) {
                switches += 1
            }
            lastDir = 2
        }
        currentDir = nowDir
    }
})
