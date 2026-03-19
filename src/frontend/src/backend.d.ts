import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactMessage {
    id: bigint;
    name: string;
    message: string;
    phone: string;
}
export interface backendInterface {
    getContactMessage(contactMessageId: bigint): Promise<ContactMessage>;
    getContactMessages(): Promise<Array<ContactMessage>>;
    submitContactMessage(name: string, phone: string, message: string): Promise<void>;
}
