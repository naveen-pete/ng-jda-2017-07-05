import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        alert('Store App - An unexpected error occurred.');
        console.log('Store App - Unexpected error occurred.', error);
    }
}
