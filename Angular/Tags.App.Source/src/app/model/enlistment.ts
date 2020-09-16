import { EnlistmentBoxes } from './enlistment-boxes';

export class Enlistment {

    EnlistmentNumber: number;
    OrderNumber: number;
    ProductCode: string;
    ProductName: string;
    BoxesNumber: string;
    CustomerName: string;
    Boxes: EnlistmentBoxes[];


    public ValidationBoxesNumber(boxes: string) {
        const solo = boxes.match(/^\d+$/); //Numero solo
        const rango = boxes.match(/^\d+([-]\d+)([,]\d+)*$/); // Rango obligatorio /^(\d([-]\d+))([,]\d+)*$/
        const items = boxes.match(/^\d+([,]\d+)+$/); // Items obligatorio

        if (solo === null && rango === null && items === null) {
            throw "Solo se permiten los siguientes formatos:  <br/> * Una caja (1)  <br/> * Rango de cajas (1-6) <br/> * Varias cajas no consecutivas (1,3,5,6) <br/> * Rango junto con cajas no consecutivas (1-6,8,11)";
        } else {
            this.BoxesNumber = boxes;
        }

        let cant = 0;

        if (rango !== null) {
            let [ini, f] = rango["input"].split("-");
            let inicio = parseInt(ini);
            let fin = parseInt(f.split(",")[0]);
            cant = fin - inicio;
            if (cant < 1) {
                throw "Rango incorrecto. Se debe escribir ascendentemente de la siguiente forma: " + fin + "-" + inicio + ",por favor corrija.";
            }
        }

        if (items !== null) {
            if (items["input"].split("-").length > 1) {
                let [ini, f] = items["input"].split("-");
                let inicio = parseInt(ini.split(",").pop());
                let fin = parseInt(f.split(",")[0]);
                cant = fin - inicio;
                if (cant < 1) {
                    throw "Rango incorrecto. Se debe escribir ascendentemente de la siguiente forma: " + fin + "-" + inicio + ",por favor corrija.";
                }
            }
        }

    }


}
