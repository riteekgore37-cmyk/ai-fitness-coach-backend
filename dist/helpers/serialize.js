"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = void 0;
const class_transformer_1 = require("class-transformer");
/**
 * Serializes the given object or array of objects into the specified class type.
 *
 * @template T - The class type to serialize the object(s) into.
 * @param serializable - The object or array of objects to be serialized.
 * @param serializer - The class constructor function for the target serialization type.
 * @returns The serialized object(s) of type T or an array of serialized objects of type T.
 */
const serialize = (serializable, serializer) => {
    if (!serializable)
        return serializable;
    // If the serializable object is a Document, convert it to a JSON object.
    if (serializable.hasOwnProperty("toJSON"))
        serializable = serializable.toJSON();
    serializable = JSON.parse(JSON.stringify(serializable));
    // If the serializable object is an array, serialize each item in the array.
    if (Array.isArray(serializable)) {
        return serializable.map((item) => (0, exports.serialize)(item, serializer));
    }
    // Serialize the object and return it.
    return (0, class_transformer_1.plainToClass)(serializer, serializable, {
        excludeExtraneousValues: true,
    });
};
exports.serialize = serialize;
//# sourceMappingURL=serialize.js.map