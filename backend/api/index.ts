import app, { startServer } from '../src/server';

export default async function handler(req: any, res: any) {
  await startServer();
  return app(req, res);
}
