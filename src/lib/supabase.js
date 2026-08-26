import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * posts テーブルから記事を取得（公開済みのみ、日付降順）
 * @param {number} limit - 取得件数（0 = 全件）
 */
export async function fetchPosts(limit = 0) {
    if (!supabase) return [];
    let query = supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('date', { ascending: false });
    if (limit > 0) query = query.limit(limit);
    const { data, error } = await query;
    if (error) { console.error('fetchPosts error:', error); return []; }
    return data || [];
}

/**
 * 単一記事を取得
 */
export async function fetchPostById(id) {
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
    if (error) { console.error('fetchPostById error:', error); return null; }
    return data;
}
