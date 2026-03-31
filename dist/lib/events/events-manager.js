"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsManager = void 0;
const async_handler_1 = require("../../helpers/async-handler");
const node_events_1 = __importDefault(require("node:events"));
/**
 * EventsManager is a singleton class that manages events.
 * It uses the EventEmitter class from Node.js to handle events.
 */
class EventsManager {
    constructor() {
        this.emitter = new node_events_1.default();
    }
    static getInstance() {
        if (!EventsManager.instance) {
            EventsManager.instance = new EventsManager();
        }
        return EventsManager.instance;
    }
    /**
     * Register an event listener.
     * @param event The event name.
     * @param listener The listener function.
     */
    static on(event, listener) {
        try {
            EventsManager.getInstance().emitter.on(event, (0, async_handler_1.asyncHandler)(listener));
        }
        catch (error) {
            console.error(error);
        }
    }
    /**
     * Remove an event listener.
     * @param event The event name.
     * @param listener The listener function.
     */
    static emit(event, ...args) {
        EventsManager.getInstance().emitter.emit(event, ...args);
    }
    /**
     * Create a queue to store events.
     * @returns An EventsQueue object.
     * @see EventsQueue
     */
    createQueue() {
        return new class EventsQueue {
            constructor() {
                this.queue = [];
            }
            add(event, ...args) {
                this.queue.push({ event, args });
            }
            clear() {
                this.queue = [];
            }
            process() {
                this.queue.forEach((item) => {
                    EventsManager.emit(item.event, ...item.args);
                });
                this.clear();
            }
        };
    }
}
exports.EventsManager = EventsManager;
//# sourceMappingURL=events-manager.js.map