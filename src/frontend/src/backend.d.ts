import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Enrollment {
    id: bigint;
    age: bigint;
    playstyle: string;
    medicalProblem: boolean;
    name: string;
    email: string;
    planDuration: string;
    address: string;
    phone: string;
    batchTimeSlot: string;
    location: string;
    joiningDate: string;
    expiryDate: string;
    feePaid: boolean;
}
export interface ContactMessage {
    id: bigint;
    name: string;
    message: string;
    phone: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getContactMessage(contactMessageId: bigint): Promise<ContactMessage>;
    getContactMessages(): Promise<Array<ContactMessage>>;
    getEnrollments(): Promise<Array<Enrollment>>;
    isCallerAdmin(): Promise<boolean>;
    setFeePaid(enrollmentId: bigint, paid: boolean): Promise<void>;
    submitContactMessage(name: string, phone: string, message: string): Promise<void>;
    submitEnrollment(name: string, phone: string, age: bigint, email: string, address: string, batchTimeSlot: string, location: string, playstyle: string, planDuration: string, medicalProblem: boolean, joiningDate: string, expiryDate: string): Promise<void>;
}
