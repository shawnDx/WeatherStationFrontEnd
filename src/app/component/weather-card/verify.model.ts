export class Verify {
    temperature(temperature) {
        if (temperature < 10 && temperature > 50) {
            return true;
        }
        else {
            return false;
        }
    }
    pressure(pressure) {
        if (pressure < 90 && pressure > 110) {
            return true;
        }
        else {
            return false;
        }
    }
    humidity() {

    }
    windDirection() {

    }
    windVelocity() {

    }
    light() {

    }
}