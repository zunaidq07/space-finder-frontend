import ReactDOM from "react-dom";
import { Login } from "../../src/components/Login";

describe('Login component test suite', () => {

    let container: HTMLDivElement;
    const authServiceMock = {
       login : jest.fn()
    }
    const setUserMock = jest.fn();
    // beforeAll(() => {
    //     console.log('beforeAll');
    // });
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(
            <Login authorService={authServiceMock as any} setUser={setUserMock as any}/>, 
            container
        )
    })
    // afterAll(() => {
    //     console.log('after All');
    // });
    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
        console.log('after Each');
    });
    test('Renders correctly initial document', () => {


        const title = document.querySelector('h1');
        expect(title!.textContent).toBe('Please Login!');

        const inputs = document.querySelectorAll('input');
        expect(inputs).toHaveLength(3);
        expect(inputs[0]).toBe('');
        expect(inputs[1]).toBe('');
        expect(inputs[2]).toBe('Login');

        const label = document.querySelector('label');
        expect(label).not.toBeInTheDocument()
    })
})