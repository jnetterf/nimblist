import * as React from "react";
import * as ReactDOM from "react-dom";
import {RootInstanceProvider} from "react-hot-loader/Injection";
import {style} from "belle";

import Body from "./body";

(function main(): void {
    style.card.style = {
        marginBottom: 20,
        padding: 20,
        borderRadius: 2,
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
        boxSizing: "border-box",
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    };

    const rootInstance = ReactDOM.render(<Body />, document.getElementById("root"));

    if ((module as any).hot) {
        RootInstanceProvider.injectProvider({
            getRootInstances: function(): (React.Component<any, any> | Element | void)[] {
                // Help React Hot Loader figure out the root component instances on the page:
                return [rootInstance];
            },
        });
    }
}());
