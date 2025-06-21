export const formatMessage = (message: string): string => {
    return message.trim();
};

export const getCurrentTimestamp = (): string => {
    return new Date().toISOString();
};