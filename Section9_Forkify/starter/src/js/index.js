// Global app controller
import string from './models/Search';
// import {add, multiply as m, ID} from './views/searchView';

import * as sv from './views/searchView';

console.log(string);

console.log(
    `I can export functions and variables! 
    Add: ${sv.add(sv.ID, 2)};
    Multiply: ${sv.multiply(5, 5)};
    ID: ${sv.ID}.`
)