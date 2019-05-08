export class Card {
    title: string;
    dateTime: string;
    data: any;
    uom: string;
    imageurl: string;
    error: Boolean = false;

    singleValueverify(value, max, min) {
        if (value > min && value < max) {
            this.error = false;
            this.data = value;
        }
        else {
            this.error = true;
        }
    }
    singleValueverifyWithTwoType(value, type1Max, type1min, type1UOM: string, type2Max, type2min, type2Uom: string) {
        if (value > type1min && value < type1Max) {
            this.error = false;
            this.data = value;
            this.uom = type1UOM
        }
        else if (value > type2min && value < type2Max) {
            this.error = false;
            this.data = value;
            this.uom = type2Uom
        }
        else {
            this.error = true;
        }
    }
    multiValueverify(value: any, key: string) {
        this.error = true;
        for (let i = 0; i < value.length - 1; i++) {
            if (value[i][key] == value[i + 1][key]) {
                continue;
            }
            else {
                this.error = false;
                break;
            }
        }
        this.data = Number(value[0][key]).toFixed(2);
    }

    multiValueverifynonNegative(value: any, key: string) {
        this.error = false;
        for (let i = 0; i < value.length - 1; i++) {
            if (value[i][key] > 0) {
                continue;
            }
            else {
                this.error = true;
                break;
            }
        }
        this.data = Number(value[0][key]).toFixed(2);
    }

}