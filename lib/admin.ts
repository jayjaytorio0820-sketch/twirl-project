'use client';
import { getSupabase } from './supabase';
export const sb = () => getSupabase()!;
export const MONTHS = ['Ene','Peb','Mar','Abr','May','Hun','Hul','Ago','Set','Okt','Nob','Dis'];
export const shortDate = (s: string) => { const [y, m, d] = s.split('-').map(Number); return `${MONTHS[m - 1]} ${d}, ${y}`; };
