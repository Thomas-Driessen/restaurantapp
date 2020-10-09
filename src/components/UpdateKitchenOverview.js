import { extendObservable } from 'mobx';

class UpdateKitchenOverview {
    constructor() {
        extendObservable(this, {
            update: true
        })
    }
}
export default new UpdateKitchenOverview();
