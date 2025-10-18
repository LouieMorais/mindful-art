-- RLS enablement and self-only policies for profiles, vault_items, galleries, gallery_items, and read-only audit_log

-- Enable RLS (safe if already enabled)
ALTER TABLE IF EXISTS public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.vault_items    ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.galleries      ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.gallery_items  ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.audit_log      ENABLE ROW LEVEL SECURITY;

-- PROFILES: self-only (select/update)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='profiles' AND policyname='profiles_self_select'
  ) THEN
    EXECUTE 'CREATE POLICY profiles_self_select ON public.profiles FOR SELECT USING (auth.uid() = id);';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='profiles' AND policyname='profiles_self_update'
  ) THEN
    EXECUTE 'CREATE POLICY profiles_self_update ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);';
  END IF;
END$$;

-- VAULT_ITEMS: self-only (all)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='vault_items' AND policyname='vault_items_self_all'
  ) THEN
    EXECUTE 'CREATE POLICY vault_items_self_all ON public.vault_items FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);';
  END IF;
END$$;

-- GALLERIES: self-only (all)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='galleries' AND policyname='galleries_self_all'
  ) THEN
    EXECUTE 'CREATE POLICY galleries_self_all ON public.galleries FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);';
  END IF;
END$$;

-- GALLERY_ITEMS: self-only (all via gallery owner)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='gallery_items' AND policyname='gallery_items_self_all'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY gallery_items_self_all
      ON public.gallery_items
      FOR ALL
      USING (
        auth.uid() = (
          SELECT user_id FROM public.galleries g WHERE g.id = gallery_items.gallery_id
        )
      )
      WITH CHECK (
        auth.uid() = (
          SELECT user_id FROM public.galleries g WHERE g.id = gallery_items.gallery_id
        )
      );
    $pol$;
  END IF;
END$$;

-- AUDIT_LOG: allow user to SELECT their own rows (no insert/update/delete)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='audit_log' AND policyname='audit_log_self_select'
  ) THEN
    EXECUTE 'CREATE POLICY audit_log_self_select ON public.audit_log FOR SELECT USING (auth.uid() = user_id);';
  END IF;
END$$;