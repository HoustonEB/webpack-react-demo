
class testClass {
    property = 'property';
    show = true;

    constructor(props) {
        // super(props);
        console.log(this, '2')
    }

    output() {
        console.log(this.property, 'property');
    }

    [true ? 'show' : 'hide']() {
        console.log(arguments, '--');
    }
}
export {
    testClass
}