-- Unique constraints and indexes for idempotency and performance
-- Use guards to avoid duplicate creation.

-- VAULT_ITEMS: unique (user_id, artwork_key)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.vault_items'::regclass
      AND conname = 'vault_items_user_artwork_key_unique'
  ) THEN
    ALTER TABLE public.vault_items
      ADD CONSTRAINT vault_items_user_artwork_key_unique UNIQUE (user_id, artwork_key);
  END IF;
END$$;

-- GALLERY_ITEMS: unique (gallery_id, artwork_key)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.gallery_items'::regclass
      AND conname = 'gallery_items_gallery_artwork_unique'
  ) THEN
    ALTER TABLE public.gallery_items
      ADD CONSTRAINT gallery_items_gallery_artwork_unique UNIQUE (gallery_id, artwork_key);
  END IF;
END$$;

-- GALLERIES: unique (user_id, lower(name))
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE tablename = 'galleries' AND indexname = 'unique_user_gallery_name'
  ) THEN
    CREATE UNIQUE INDEX unique_user_gallery_name
    ON public.galleries (user_id, lower(name));
  END IF;
END$$;

-- Indices for common access patterns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE tablename='vault_items' AND indexname='idx_vault_items_user_created'
  ) THEN
    CREATE INDEX idx_vault_items_user_created
      ON public.vault_items (user_id, created_at DESC);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE tablename='gallery_items' AND indexname='idx_gallery_items_order'
  ) THEN
    CREATE INDEX idx_gallery_items_order
      ON public.gallery_items (gallery_id, position NULLS LAST, created_at DESC);
  END IF;
END$$;

-- updated_at trigger function (idempotent)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach triggers where updated_at exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='galleries' AND column_name='updated_at'
  ) THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_trigger WHERE tgname='trg_galleries_updated_at'
    ) THEN
      CREATE TRIGGER trg_galleries_updated_at
        BEFORE UPDATE ON public.galleries
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='profiles' AND column_name='updated_at'
  ) THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_trigger WHERE tgname='trg_profiles_updated_at'
    ) THEN
      CREATE TRIGGER trg_profiles_updated_at
        BEFORE UPDATE ON public.profiles
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
  END IF;
END$$;