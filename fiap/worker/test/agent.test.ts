import { describe, expect, it } from 'vitest';
import { buildCandidates } from '../src/agent';

describe('agent heuristics', () => {
  it('suggests move when noise high + low energy', () => {
    const readings = [{ noise_db: 70, t_c: 25, lux: 400, created_at: Date.now() }];
    const checkins = [{ user_id: 'u1', energy: 2, mood: 3, status: 'focus', created_at: Date.now() }];
    const suggestions = buildCandidates(readings as any, checkins as any);
    expect(suggestions.some((s) => s.kind === 'move')).toBe(true);
  });

  it('suggests pause when temp high and mood low', () => {
    const readings = [{ noise_db: 50, t_c: 29, lux: 450, created_at: Date.now() }];
    const checkins = [{ user_id: 'u2', energy: 4, mood: 1, status: 'focus', created_at: Date.now() }];
    const suggestions = buildCandidates(readings as any, checkins as any);
    expect(suggestions.some((s) => s.kind === 'pause')).toBe(true);
  });
});
