import { createRef } from "react";
// state of current page/section
const state = {
    sections: 3,
    pages: 3,
    zoom: 1,
    top: createRef(),
};

export default state;