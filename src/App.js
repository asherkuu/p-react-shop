import React, { useEffect } from "react";
import axios from "axios";

function App() {
    useEffect(() => {
        console.log("Hi");
        axios.get("/api/data").then((res) => console.log(res.data));
    }, []);
    return <div className="App">Welcom to Shop</div>;
}

export default App;
