declare module "discourse-sso" {
    export default class DiscourseSSO {
        constructor(secret: string);
        validate(payload: string, sig: string): boolean;
        getNonce(payload: string): string;
        buildLoginString(params: {
            nonce: string;
            email: string;
            external_id: string;
            name: string;
            username?: string;
            avatar_url?: string;
        }): string;
    }
}
