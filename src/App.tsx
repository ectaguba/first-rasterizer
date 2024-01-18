import React from "react";

import Canvas from "./components/Canvas.tsx";
import LineField from "./components/LineField.tsx";

const App: React.FC = () => {
    // Implement way for user to change lines
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Rasterizer in the Web</h1>
            <Canvas width={600} height={600} />
        </div>
    );
};

export default App;