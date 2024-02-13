'use client';

import io, { Socket } from "socket.io-client";
import { WebSocketInterface } from "../websocket.interface";

class WebSocketServer implements WebSocketInterface {
    private _socket: Socket;
    
    public constructor() {
        this._socket = io('http://localhost:4000');

        this._socket.on('connect', () => {
            console.log('Connected to server via websocket.');
        });
    }

    // BUSINESS LOGIC
    public emit(event: string, data: any) {
        this._socket.emit(event, data);
    }

    public on(event: string, callback: (data: any) => void) {
        this._socket.on(event, callback);
    }

    // GETTERS AND SETTERS
    public get socket(){
        return this._socket; 
    }
}

export default new WebSocketServer();
