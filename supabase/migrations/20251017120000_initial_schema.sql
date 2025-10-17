-- Your schema from the dashboard
CREATE TABLE artworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own artworks"
  ON artworks FOR SELECT
  USING (auth.uid() = user_id);