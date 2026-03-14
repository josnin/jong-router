/**
 * Context passed to Route Guards to decide if a user can access a route.
 */
export interface GuardContext {
    path?: string;
    params?: Record<string, string>;
    query?: URLSearchParams;
    data?: any;
}
/**
 * Definition of a single Route.
 */
export interface IRoute {
    pattern: string;
    component?: Promise<any>;
    html?: string;
    children?: IRoute[] | (() => Promise<{
        default: IRoute[];
    }>);
    guards?: ((ctx?: any) => boolean)[];
    redirect?: string;
    data?: Record<string, any>;
}
declare class JongRouter {
    private routes;
    private outlet;
    constructor(routes: IRoute[], outlet: HTMLElement);
    /**
     * Starts the router by listening to browser events and initial navigation.
     */
    init(): void;
    /**
     * Intercepts clicks to handle internal navigation without refreshing the page.
     */
    private handleClick;
    /**
     * Matches the current browser URL against the route table and triggers rendering.
     */
    private navigate;
    /**
     * Handles Guards, Component instantiation, and Nested routes.
     */
    private renderRoute;
    /**
     * Basic string matching. Supports ':param' wildcards and '**' catch-all.
     */
    private matchRoute;
    /**
     * Maps URL values to parameter names based on the pattern.
     */
    private extractRouteParams;
    /**
     * Programmatic navigation (e.g., router.navigateTo('/dashboard'))
     */
    navigateTo(route: string): void;
}
export default JongRouter;
