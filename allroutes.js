import bodyParser from "body-parser";
import express from "express";
import bcrypt, { hash } from "bcrypt";


import routeSort from "./router/3.paginationNsort/showData3_sorting.js";
import routeSearch from "./router/search_functionallity/searchMultiField.js";
import routeGrid from "./router/grid/exel.js";
import routeJob from "./router/form_3_update_data/form.js";


// tic_tac_toe
// pagination
// search
// update
// grid
var app = express();


app.use("/", routeSort);
app.use("/", routeSearch);
app.use("/", routeGrid);
app.use("/", routeJob);


export default app;
