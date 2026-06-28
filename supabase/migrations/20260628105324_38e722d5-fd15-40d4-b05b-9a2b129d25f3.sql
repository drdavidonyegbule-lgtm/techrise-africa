
-- USERS: revoke anon, scope to service role
DROP POLICY IF EXISTS "Anyone can read users for matching" ON public.users;
DROP POLICY IF EXISTS "Anyone can register" ON public.users;
DROP POLICY IF EXISTS "Anyone can update by email" ON public.users;
REVOKE ALL ON public.users FROM anon, authenticated;
GRANT ALL ON public.users TO service_role;

-- REGISTRATIONS
DROP POLICY IF EXISTS "Anyone can create a registration" ON public.bootcamp_registrations;
DROP POLICY IF EXISTS "Anyone can read registrations" ON public.bootcamp_registrations;
DROP POLICY IF EXISTS "Anyone can update registration" ON public.bootcamp_registrations;
REVOKE ALL ON public.bootcamp_registrations FROM anon, authenticated;
GRANT ALL ON public.bootcamp_registrations TO service_role;

-- STORAGE: remove public access to receipts bucket
DROP POLICY IF EXISTS "Public can upload receipts" ON storage.objects;
DROP POLICY IF EXISTS "Public can read receipts" ON storage.objects;
