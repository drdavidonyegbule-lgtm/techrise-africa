
-- Restrict the private 'receipts' bucket so no anon or authenticated user
-- can read/write directly. All access is funneled through trusted server
-- code that uses the service role (which bypasses RLS).
DROP POLICY IF EXISTS "receipts_block_anon_authenticated_select" ON storage.objects;
DROP POLICY IF EXISTS "receipts_block_anon_authenticated_insert" ON storage.objects;
DROP POLICY IF EXISTS "receipts_block_anon_authenticated_update" ON storage.objects;
DROP POLICY IF EXISTS "receipts_block_anon_authenticated_delete" ON storage.objects;

CREATE POLICY "receipts_block_anon_authenticated_select"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'receipts' AND false);

CREATE POLICY "receipts_block_anon_authenticated_insert"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'receipts' AND false);

CREATE POLICY "receipts_block_anon_authenticated_update"
ON storage.objects FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'receipts' AND false)
WITH CHECK (bucket_id = 'receipts' AND false);

CREATE POLICY "receipts_block_anon_authenticated_delete"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id = 'receipts' AND false);
