// Type definitions for vinyl-buffer
// Project: https://github.com/hughsk/vinyl-buffer
// Definitions by: Jeff Whelpley <https://github.com/jeffwhelpley>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../tsd_typings/node/node.d.ts"/>

declare module "vinyl-buffer" {
    function vinylBuffer(): NodeJS.ReadWriteStream;
    export = vinylBuffer;
}
