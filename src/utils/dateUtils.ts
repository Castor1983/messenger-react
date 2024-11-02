import { createType } from "../types/messageType";

export const toDate = (timestamp: createType) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
    return date.toLocaleString()
}
