/**
 * Аннотация для АПИ, определяющая её основной URL
 * @param url основной URL
 * @constructor
 */
export default function RequestUrl(url: string): Function {
    return function <T extends { new (...args: any[]): {} }>(constructor: T): Function {
        return class extends constructor {
            public mainUrl = url;
        };
    };
}
