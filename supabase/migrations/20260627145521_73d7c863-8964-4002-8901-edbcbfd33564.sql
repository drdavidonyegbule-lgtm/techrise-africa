
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR NOT NULL UNIQUE,
  full_name VARCHAR NOT NULL,
  phone VARCHAR,
  role VARCHAR NOT NULL DEFAULT 'student',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.users TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.users TO authenticated;
GRANT ALL ON public.users TO service_role;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can register" ON public.users FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read users for matching" ON public.users FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can update by email" ON public.users FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.bootcamp_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  track VARCHAR NOT NULL CHECK (track IN ('juniors','seniors')),
  payment_status VARCHAR NOT NULL DEFAULT 'pending_verification',
  payment_method VARCHAR CHECK (payment_method IN ('paystack','bank_transfer')),
  reference_id VARCHAR UNIQUE,
  receipt_url TEXT,
  amount INTEGER NOT NULL DEFAULT 50000,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.bootcamp_registrations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bootcamp_registrations TO authenticated;
GRANT ALL ON public.bootcamp_registrations TO service_role;
ALTER TABLE public.bootcamp_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create a registration" ON public.bootcamp_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read registrations" ON public.bootcamp_registrations FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can update registration" ON public.bootcamp_registrations FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- Storage policies for receipts bucket (bucket created via tool)
CREATE POLICY "Public can upload receipts" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'receipts');
CREATE POLICY "Public can read receipts" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'receipts');
