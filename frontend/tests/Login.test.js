import React from "react";
import Login from "../components/Login";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Link Component", () => {
    let props;
    let mountedComponent;
    const loginView = () => {
        if (!mountedComponent) {
            mountedComponent = mount(<Login {...props} />);
        }
        return mountedComponent;
    };

    beforeEach(() => {
        props = {};
        mountedComponent = undefined;
    });
    //Smoke test - Does the component render?
    it("Component renders", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Login />, div);
    });
});
