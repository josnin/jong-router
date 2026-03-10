export interface GuardContext {
    path?: string;
    params?: Record<string, string>;
    query?: URLSearchParams;
    data?: any;
}
export interface IRoute {
    pattern: string;
    component?: Promise<any>;
    html?: string;
    children?: IRoute[];
    guards?: ((ctx?: any) => boolean)[];
    redirect?: string;
    data?: Record<string, any>;
}
declare class JongRouter {
    private routes;
    private outlet;
    private basePath;
    private isRoot;
    constructor(routes: IRoute[], outlet: HTMLElement, basePath?: string, isRoot?: boolean);
    init(): void;
    private handleClick;
    private navigate;
    private renderRoute;
    private matchRoute;
    private extractRouteParams;
    navigateTo(route: string): void;
}
export default JongRouter;
