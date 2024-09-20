import { ErrorCode } from "./ErrorCode";

export class AppException extends Error {
    private errorCode: ErrorCode;

    constructor(errorCode: ErrorCode, message?: string) {
        super(message);
        this.errorCode = errorCode;
    }
    public getErrorCode(): ErrorCode {
        return this.errorCode;
    }
    public setErrorCode(errorCode: ErrorCode): void {
        this.errorCode = errorCode;
    }

}