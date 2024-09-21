// src/errors/ErrorCode.ts

export enum ErrorCode {
    UNCATEGORIZED_EXCEPTION = 9999,
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    PASSWORD_MISMATCH = 1003,
    INVALID_PASSWORD = 1004,
    UNAUTHENTICATED= 1005,

}

export const ErrorMessages: Record<ErrorCode, string> = {
    [ErrorCode.UNCATEGORIZED_EXCEPTION]: "Uncategorized error",
    [ErrorCode.USER_NOT_FOUND]: "User not found",
    [ErrorCode.USER_ALREADY_EXISTS]: "User already exists",
    [ErrorCode.PASSWORD_MISMATCH]: "Password mismatch",
    [ErrorCode.INVALID_PASSWORD]: "Invalid password",
    [ErrorCode.UNAUTHENTICATED]: "Unauthenticated",

};
