import * as React from "react";
import {Button, Card, Spinner} from "belle";

import * as IndexCSS from "./index.css";
import IServiceList from "./iservicelist";
import Service from "./service";

import "whatwg-fetch";

interface IProps {
}

interface IState {
    error?: string;
    serviceList?: IServiceList;
}

export class Body extends React.Component<IProps, IState> {
    state: IState = {
        error: null,
        serviceList: null,
    };

    render(): React.ReactElement<any> {
        const showBranding = !this.state.serviceList || this.state.serviceList.showBranding;
        return <div>
            <div className={IndexCSS.topbar} />
            <header style={{textAlign: "center"}}>
                <h1>
                    <strong>Nimblist</strong>{showBranding && " — A microservice list"}
                </h1>
                {showBranding && <div className={IndexCSS.subheader}>
                    <span>
                        A #fridaynighthack by <strong>
                            <a href="https://nettek.ca" target="_spotify">Joshua Netterfield</a>
                        </strong>.{" "}
                        <span>Posted Saturday, May 14, 2016.</span>
                    </span>
                </div>}
            </header>
            {showBranding && <br />}
            {this.state.error && this._renderError()}
            {!this.state.error && !this.state.serviceList && this._renderLoading()}
            {this.state.serviceList && this._renderServiceList()}
        </div>;
    }

    componentDidMount(): any {
        fetch("services.json", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            this.setState({
                error: "Failed to fetch services.json (invalid status code).",
            });
        }, err => {
            this.setState({
                error: "Failed to fetch services.json (network error).",
            });
        }).then(serviceList => {
            this.setState({
                serviceList,
            });
        });
    }

    private _renderError(): React.ReactElement<any> {
        let msg = this.state.error;
        return <Card className={IndexCSS.widget}>
            <p>
                {msg}
            </p>
        </Card>;
    }

    private _renderLoading(): React.ReactElement<any> {
        return <Card className={IndexCSS.widget}>
            Loading <Spinner />
        </Card>;
    }

    private _renderServiceList(): React.ReactElement<any> {
        return <Card className={IndexCSS.widget}>
            <table>
            <tr>
                <th style={{width: 200}}>Service URL</th>
                <th style={{width: 500}}>Description</th>
                <th>Status</th>
            </tr>
            {this.state.serviceList.services.map(service =>
                <Service key={service.url} service={service} />)}
            </table>
            <p style={{marginBottom: -10}}>
                <a href={this.state.serviceList.editURL}>
                    <Button style={{fontFamily: "Alegreya Sans"}}>
                        <i className="fa-edit fa" />{" "}Edit services.json
                    </Button>
                </a>
            </p>
        </Card>;
    }
}

export default Body;
