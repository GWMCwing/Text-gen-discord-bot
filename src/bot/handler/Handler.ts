import { Client } from 'discord.js';

abstract class Handler {
  protected client: Client;
  constructor(client: Client) {
    this.client = client;
  }
  public abstract start(): void;
}

export default Handler;
