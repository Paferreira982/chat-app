export default interface DriverInterface {
    connect(): void;
    disconnect(): Promise<void>;
}
