export const EventBus = {
  channels: {},
  subscribe(channelName: string, listener: (data: unknown) => void) {
    if (!this.channels[channelName]) {
      this.channels[channelName] = [];
    }
    this.channels[channelName].push(listener);
  },

  publish(channelName: string, data: unknown) {
    const channel = this.channels[channelName];
    if (!channel || !channel.length) {
      return;
    }

    channel.forEach((listener: (data: unknown) => void) => listener(data));
  },
};
