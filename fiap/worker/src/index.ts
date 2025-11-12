import { Env, Handler, HandlerContext } from './types';
import { consumeRateLimit } from './kv';
import { jsonResponse, errorResponse, HttpError, getIp } from './utils';
import { handleRegister, handleLogin, handleMe, authenticateRequest } from './auth';
import {
  handleListRooms,
  handleGetRoom,
  handleCreateRoom,
  handleJoinRoom,
  handleListMessages,
  handlePostMessage,
  handleListTasks,
  handleCreateTask,
  handleUpdateTask,
  handlePostCheckin,
  handleGetCheckins,
} from './rooms';
import { handleCreateDevice, handleListDevices, handleIngest, handleGetReadings } from './iot';
import { handleGetSuggestions } from './agent';
import { handleAvatar, handleTile, handleAtlas } from './assets';

interface Route {
  method: string;
  pattern: string;
  handler: Handler;
  auth?: 'optional' | 'user';
  skipRateLimit?: boolean;
}

const routes: Route[] = [
  { method: 'GET', pattern: '/health', handler: handleHealth, auth: 'optional', skipRateLimit: true },
  { method: 'POST', pattern: '/api/auth/register', handler: handleRegister, auth: 'optional' },
  { method: 'POST', pattern: '/api/auth/login', handler: handleLogin, auth: 'optional' },
  { method: 'GET', pattern: '/api/auth/me', handler: handleMe, auth: 'user' },
  { method: 'GET', pattern: '/api/rooms', handler: handleListRooms, auth: 'optional' },
  { method: 'GET', pattern: '/api/rooms/:roomId', handler: handleGetRoom, auth: 'optional' },
  { method: 'POST', pattern: '/api/rooms', handler: handleCreateRoom, auth: 'user' },
  { method: 'POST', pattern: '/api/rooms/:roomId/join', handler: handleJoinRoom, auth: 'user' },
  { method: 'GET', pattern: '/api/rooms/:roomId/messages', handler: handleListMessages, auth: 'user' },
  { method: 'POST', pattern: '/api/rooms/:roomId/messages', handler: handlePostMessage, auth: 'user' },
  { method: 'GET', pattern: '/api/rooms/:roomId/tasks', handler: handleListTasks, auth: 'user' },
  { method: 'POST', pattern: '/api/rooms/:roomId/tasks', handler: handleCreateTask, auth: 'user' },
  { method: 'PUT', pattern: '/api/tasks/:taskId', handler: handleUpdateTask, auth: 'user' },
  { method: 'POST', pattern: '/api/rooms/:roomId/checkins', handler: handlePostCheckin, auth: 'user' },
  { method: 'GET', pattern: '/api/rooms/:roomId/checkins', handler: handleGetCheckins, auth: 'user' },
  { method: 'GET', pattern: '/api/rooms/:roomId/readings', handler: handleGetReadings, auth: 'user' },
  { method: 'GET', pattern: '/api/rooms/:roomId/suggestions', handler: handleGetSuggestions, auth: 'user' },
  { method: 'POST', pattern: '/api/devices', handler: handleCreateDevice, auth: 'user' },
  { method: 'GET', pattern: '/api/devices', handler: handleListDevices, auth: 'user' },
  { method: 'POST', pattern: '/api/iot/ingest', handler: handleIngest, auth: 'optional', skipRateLimit: true },
  { method:'GET', pattern:'/api/assets/avatar', handler: handleAvatar, auth:'optional', skipRateLimit: true },
  { method:'GET', pattern:'/api/assets/tile', handler: handleTile, auth:'optional', skipRateLimit: true },
  { method:'GET', pattern:'/api/assets/atlas', handler: handleAtlas, auth:'optional', skipRateLimit: true },
];

const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,POST,PUT,OPTIONS',
  'access-control-allow-headers': 'content-type,authorization,x-device-secret',
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    try {
      const url = new URL(request.url);
      const match = findRoute(request.method, url.pathname);
      if (!match) {
        return withCors(errorResponse('Not Found', 404));
      }
      if (!match.route.skipRateLimit) {
        const ip = getIp(request);
        const rate = await consumeRateLimit(env, `rate:${ip}`, 60, 60);
        if (!rate.allowed) {
          return withCors(errorResponse('Too many requests', 429));
        }
      }
      const user = await authenticateRequest(request, env);
      if (match.route.auth === 'user' && !user) {
        return withCors(errorResponse('Unauthorized', 401));
      }
      const ctxPayload: HandlerContext = {
        env,
        request,
        params: match.params,
        user: user ?? null,
        waitUntil: (promise) => ctx.waitUntil(promise),
      };
      const response = await match.route.handler(ctxPayload);
      return withCors(response);
    } catch (err) {
      if (err instanceof HttpError) {
        return withCors(errorResponse(err.message, err.status, err.details));
      }
      console.error('Unhandled worker error', err);
      return withCors(errorResponse('Internal Error', 500));
    }
  },
};

function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));
  return new Response(response.body, { status: response.status, headers });
}

function findRoute(method: string, pathname: string) {
  for (const route of routes) {
    if (route.method !== method) continue;
    const params = matchPath(route.pattern, pathname);
    if (params) {
      return { route, params };
    }
  }
  return null;
}

function matchPath(pattern: string, pathname: string): Record<string, string> | null {
  const patternParts = trim(pattern).split('/');
  const pathParts = trim(pathname).split('/');
  if (patternParts.length !== pathParts.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i += 1) {
    const expected = patternParts[i];
    const actual = pathParts[i];
    if (expected.startsWith(':')) {
      params[expected.slice(1)] = decodeURIComponent(actual);
    } else if (expected !== actual) {
      return null;
    }
  }
  return params;
}

function trim(path: string): string {
  const clean = path.replace(/^\/+|\/+$|\s+/g, '');
  return clean ? clean : '';
}

async function handleHealth(ctx: HandlerContext): Promise<Response> {
  return jsonResponse({ ok: true });
}
