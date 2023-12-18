interface IRoute {
    pattern: string;
    component?: Promise<any>;
    html?: string;
    guards?: (() => boolean)[];
    redirect?: string;
    data?: any;
}
declare class JongRouter {
    private routes;
    private outlet;
    private shadowRoot1;
    constructor(routes: IRoute[], outlet: HTMLElement, shadowRoot1?: ShadowRoot | undefined);
    init(): void;
    private setupNavigation;
    private navigate;
    private loadContent;
    private loadComponent;
    private handleClick;
    private matchRoute;
    private extractQueryParams;
    private extractRouteParams;
    navigateTo(route: string): void;
}
export { IRoute };
export default JongRouter;
