let channel: BroadcastChannel | null = null;

export function getBroadcastChannel() {
  if (typeof window === undefined) return null;

  if (!channel) channel = new BroadcastChannel("auth-channel");

  return channel;
}
