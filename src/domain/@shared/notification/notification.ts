export type NotificationErrorProps = {
  message: string;
  context: string;
}

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  messages(context?: string): string {
    return this.errors
        .filter((error) => context ? error.context === context : error)
        .map((error) => {
          if (context === undefined || error.context === context) {
            return `${error.context}: ${error.message}`;
          }
        })
        .join(', ');
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}
