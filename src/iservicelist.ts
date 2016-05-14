export interface IService {
    url: string;
    /**
     * Defaults to url.
     */
    checkURL?: string;
    description: string;
}

interface IServiceList {
    showBranding: boolean;
    editURL: string;
    services: IService[];
}

export default IServiceList;

