import * as React from "react";

import {IService} from "./iservicelist";

import "whatwg-fetch";

interface IProps {
    service: IService;
}

interface IState {
    state: "ok" | "pending" | "fail";
}

export class Service extends React.Component<IProps, IState> {
    state: IState = {
        state: "pending",
    };

    render(): React.ReactElement<any> {
        return <tr>
            <td>
                <a style={{textDecoration: "underline"}} href={this.props.service.url}>
                    {this.props.service.url}
                </a>
            </td>
            <td>{this.props.service.description}</td>
            <td>{this.state.state}</td>
        </tr>;
    }

    componentWillReceiveProps(props: IProps): void {
        this.setState({
            state: "pending",
        });
        this._fetchForService(props.service);
    }

    componentDidMount(): any {
        this._fetchForService(this.props.service);
    }

    private _fetchForService: (service: IService) => void = (service: IService) => {
        fetch(this.props.service.url || this.props.service.checkURL, {
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                this.setState({
                    state: "ok",
                });
                return;
            }
            console.warn(response);
            this.setState({
                state: "fail",
            });
        }, err => {
            console.warn(err);
            this.setState({
                state: "fail",
            });
        });
    }
}

export default Service;
