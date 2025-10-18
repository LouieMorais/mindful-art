-- Normalise preferred_languages to text[] if currently an untyped array
DO $$
DECLARE
  col_type text;
BEGIN
  SELECT data_type INTO col_type
  FROM information_schema.columns
  WHERE table_schema='public' AND table_name='profiles' AND column_name='preferred_languages';

  -- If it's not already an array of text, attempt to coerce.
  IF col_type IS DISTINCT FROM 'ARRAY' THEN
    -- Some Supabase Postgres catalogues report 'ARRAY' generically; fallback to a safer check.
    -- Try cast to text[] if column exists and isn't already text[]
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema='public' AND table_name='profiles' AND column_name='preferred_languages'
    ) THEN
      -- Attempt a cast; if it fails, do nothing (manual migration may be required).
      BEGIN
        ALTER TABLE public.profiles
          ALTER COLUMN preferred_languages TYPE text[]
          USING CASE
            WHEN preferred_languages IS NULL THEN NULL
            ELSE preferred_languages::text[]
          END;
      EXCEPTION WHEN others THEN
        -- No-op to avoid breaking pipelines; document for manual fix if needed.
        RAISE NOTICE 'Skipping preferred_languages type change (manual review needed).';
      END;
    END IF;
  END IF;
END$$;