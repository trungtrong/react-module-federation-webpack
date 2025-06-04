interface IBroadcastChannelEmitter {
    doesBroadcastChannelExist(channelName: string): boolean;
    doesBroadcastChannelInitialized(channelName: string): boolean;
    on(channelName: string): BroadcastChannel;
    getBroadcastChannel(channelName: string): BroadcastChannel | undefined
    subscribe<T>(params: { channelName: string; callback: (event: MessageEvent<T>) => void; clearAfterUnsubscribed?: boolean }): { unsubscribe: () => void };
    emit<T>(params: { channelName: string, data: T }): void;
    close(channelName: string): void;
    clearAll(): void;
}

class BroadcastChannelEmitter implements IBroadcastChannelEmitter {
    private _broadcastChannels: Map<string, BroadcastChannel>;

    constructor() {
        this._broadcastChannels = new Map();
    }

    doesBroadcastChannelExist(channelName: string) {
        const doesExist = this._broadcastChannels.has(channelName);
        if (!doesExist) {
            console.warn(`This broadcast Channel name ${channelName} doesn't exist`);
        }
        return doesExist;
    }

    doesBroadcastChannelInitialized(channelName: string) {
        const broadcastChannel = this.getBroadcastChannel(channelName);
        return !!broadcastChannel?.name;
    }

    on(channelName: string): BroadcastChannel {
        const broadcastChannel = this.getBroadcastChannel(channelName);
        if (broadcastChannel?.name) {
            return broadcastChannel;
        } else {
            this._broadcastChannels.set(channelName, new BroadcastChannel(channelName));
            return this._broadcastChannels.get(channelName) as BroadcastChannel;
        }
    }

    getBroadcastChannel(channelName: string): BroadcastChannel | undefined {
        if (!this.doesBroadcastChannelExist(channelName)) {
            return undefined;
        }
        //
        return this._broadcastChannels.get(channelName);
    }

    subscribe<T>(params: { channelName: string; callback: (event: MessageEvent<T>) => void; clearAfterUnsubscribed?: boolean }): { unsubscribe: () => void } {
        if (!this.doesBroadcastChannelExist(params.channelName)
            || !this.doesBroadcastChannelInitialized(params.channelName)) {
            return { unsubscribe: () => { } };
        }
        //
        const broadcastChannel = this.getBroadcastChannel(params.channelName) as BroadcastChannel;
        broadcastChannel.onmessage = params.callback;

        const unsubscribe = () => {
            broadcastChannel.close();
            if (params.clearAfterUnsubscribed) {
                this.close(params.channelName);
            }
        }
        return { unsubscribe };
    }


    emit<T>(params: { channelName: string, data: T }) {
        if (!this.doesBroadcastChannelExist(params.channelName)
            || !this.doesBroadcastChannelInitialized(params.channelName)) {
            return;
        }
        //
        const broadcastChannel = this.getBroadcastChannel(params.channelName) as BroadcastChannel;
        broadcastChannel.postMessage(params.data);
    }

    close(channelName: string) {
        if (!this.doesBroadcastChannelExist(channelName)
            || !this.doesBroadcastChannelInitialized(channelName)) {
            return;
        }
        //
        const broadcastChannel = this.getBroadcastChannel(channelName) as BroadcastChannel;
        broadcastChannel?.close();
        this._broadcastChannels.delete(channelName);
    }

    clearAll() {
        if (!this._broadcastChannels.size) {
            return;
        }
        //
        const allSubjects$ = this._broadcastChannels.values();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (allSubjects$ as Array).forEach((broadcastChannel: BroadcastChannel) => {
            broadcastChannel.close();
        })
        this._broadcastChannels.clear();
    }
}

const broadcastChannelEmitter = new BroadcastChannelEmitter();
export default broadcastChannelEmitter;
