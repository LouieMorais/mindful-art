# Mindful Art Audit - User Journeys and UX - Release 01 (MVP)

**Audited Document:** _Mindful Art - User Journeys - R01-MVP v.0.3.md_
**Product Manager:** Louie Morais
**UX Reviewer:** Jon V.
**_15/10/2025_**

---

- [Mindful Art Audit - User Journeys and UX - Release 01 (MVP)](#mindful-art-audit---user-journeys-and-ux---release-01-mvp)
  - [Summary of Critical Issues](#summary-of-critical-issues)
  - [1. Missing Wireframes](#1-missing-wireframes)
  - [2. Numbering Inconsistencies](#2-numbering-inconsistencies)
  - [3. Functional Ambiguities](#3-functional-ambiguities)
  - [4. Missing Functionality in Wireframes](#4-missing-functionality-in-wireframes)
  - [5. Wireframe-Specific Issues](#5-wireframe-specific-issues)
  - [6. Post-MVP Clarity](#6-post-mvp-clarity)

---

## Summary of Critical Issues

| #   | Issue                                                                              | Severity  | Section          |
| --- | ---------------------------------------------------------------------------------- | --------- | ---------------- |
| 1   | **No wireframes for Artwork Pages** (chained/unchained)                            | 🔴 High   | 3.2.4.1, 3.2.4.2 |
| 2   | **No error state wireframes** (duplicate gallery name, atomic transaction failure) | 🟡 Medium | 3.2.7, 3.2.8     |
| 3   | **Session persistence behavior unclear** (refresh vs. navigation)                  | 🟡 Medium | 3.2.2            |
| 4   | **Vault Strap z-index conflicts** not shown in wireframes                          | 🟡 Medium | 3.2.5.1          |
| 5   | **Institution logos missing** in search results wireframes                         | 🟢 Low    | 3.2.2.2          |
| 6   | **Gallery count element** (clickable vs. static) unclear                           | 🟢 Low    | 3.2.6.3, 3.2.6.5 |

**Recommendation:** Prioritize creating wireframes for 3.2.4.1 and 3.2.4.2 (Artwork Pages) and error states before development begins.

---

## 1. Missing Wireframes

**1.1.** Section **3.2.3.3.a** references "User Area - Gallery Page - No Artwork" but the wireframe filename is `3.2.3.3.a. User Area - Gallery Page - No Artwork.png` (exists). However, the document at **3.2.3.3** shows only one wireframe reference (`3-2-3-3-b`) but describes two states. ✅ **Resolved**: Both wireframes exist.

**1.2.** Section **3.2.3.4** references "Your Art Vault Page - No Artwork" but only shows wireframe `3-2-3-4-b` in the document. ✅ **Resolved**: Wireframe `3.2.3.4.a` exists.

**1.3.** Section **3.2.4.1** and **3.2.4.2** (Artwork Pages) have **no wireframes** referenced or provided in the zip file. ⚠️ **Discrepancy**: Critical screens missing.

---

## 2. Numbering Inconsistencies

**2.1.** Document references images with hyphens (e.g., `3-2-1-1-a`) but wireframe filenames use periods (e.g., `3.2.1.1.a`). Not a functional issue but inconsistent notation.

**2.2.** Section **3.2.1.1** shows 4 wireframes (a, b, c, d) but the document structure suggests **3.2.1.1** (Registration) should only have a-c, and **3.2.1.2** (Login) should have d. The wireframe `3.2.1.1.d. Login.png` is correctly named but placed under 3.2.1.1 instead of 3.2.1.2.

---

## 3. Functional Ambiguities

**3.1. Session Persistence (3.2.2)**

- Document states: "Encode **query + selected institutions** in the URL; store **scroll position** in memory keyed by the URL."
- **Ambiguity**: How does this interact with browser refresh? Is scroll position lost on refresh but query persists? Needs clarification on session storage vs. URL state.

**3.2. Vault Strap Collapse State (3.2.5.1)**

- Document: "**Temporary collapse/expand** control remembered in session storage"
- **Ambiguity**: Does this persist across page navigation within the same session, or only on the search page? If user navigates to Vault page and back, is collapse state maintained?

**3.3. Gallery Name Uniqueness (Multiple Sections)**

- Document repeatedly states: "Gallery names must be unique per curator"
- **Ambiguity**: What happens if a user tries to create a duplicate name? Is there real-time validation, or does it fail on submit? No error state wireframes provided.

**3.4. Atomic Transactions (3.2.7, 3.2.8)**

- Document: "Single **atomic transaction** (create gallery + add artwork); rollback gallery if add fails."
- **Ambiguity**: What error message does the user see if rollback occurs? No error state wireframes.

**3.5. Artwork Rendering (3.2.4.1, 3.2.4.2)**

- Document: "Request the **closest provider rendition** to the current viewport/zoom (fall back to client scale if a rendition isn't available). Target **≥1600px** width for 100%"
- **Ambiguity**: What happens if the artwork aspect ratio is extremely tall (e.g., 1:10)? Document says "it is ok if part of the artwork goes beyond the visible screen fold" but doesn't specify vertical scrolling behavior or max-height constraints.

**3.6. "More Actions Menu" Availability (3.2.6)**

- Document shows different menu options for different card types (table in 3.2.6)
- **Ambiguity**: Wireframes don't clearly show disabled/hidden menu items. For example, if artwork is already in all galleries, does "Save to gallery" option disappear or become disabled?

**3.7. Vault Strap Z-Index (3.2.5.1)**

- Document: "z-index at the highest above all other UI"
- **Potential Issue**: Could obstruct critical UI elements (e.g., submit buttons, dropdowns). No wireframe shows how this interacts with expanded dropdowns or modals.

---

## 4. Missing Functionality in Wireframes

**4.1. Search Results - Institution Logos (3.2.2.2)**

- Document: "Institution logo - no link"
- **Missing in Wireframes**: No institution logos visible in `3.2.2.2.a` or `3.2.2.2.b`.

**4.2. Artwork Cards - Gallery Count (3.2.6.3, 3.2.6.5)**

- Document: "Notification of in how many of the user's galleries the artwork is being exhibited"
- **Ambiguity in Wireframes**: Wireframes show this element but don't clarify if it's a static number or a clickable link to see which galleries.

**4.3. Gallery Strap Navigation Controls (3.2.5.2)**

- Document: "~~Forward (Next), Backward (Previous) controls~~ - post-MVP"
- **Confirmed**: Correctly marked as post-MVP in both document and wireframes.

**4.4. Vault Strap Navigation Controls (3.2.5.1)**

- Document: "~~d. Forward (Next), Backward (Previous) controls~~ - post-MVP"
- **Confirmed**: Correctly marked as post-MVP.

---

## 5. Wireframe-Specific Issues

**5.1. Wireframe 3.2.3.1 (Your Profile)**

- Document lists items a-f, but wireframe doesn't clearly show all elements (e.g., "Contact and Login" section).
- **Ambiguity**: Is this section collapsed by default?

**5.2. Wireframe 3.2.7.1.a vs 3.2.7.2.a**

- Both wireframes look nearly identical but represent different states (first gallery vs. subsequent galleries).
- **Missing Differentiation**: No visual indicator in wireframes to distinguish these states (e.g., "Creating your first gallery!" vs. "Create a new gallery").

**5.3. Wireframe 3.2.8.2.a vs 3.2.8.2.b**

- Document describes these as two separate screens, but they appear to be the same screen with an expanded "Create New Gallery" section.
- **Clarification Needed**: Is this a single screen with conditional expansion, or two separate screens?

---

## 6. Post-MVP Clarity

The document extensively uses `~~strikethrough~~` to mark post-MVP features, which is excellent. However:

**6.1.** Some features are marked post-MVP in tables but not in body text (e.g., "Amount of appreciations" in 3.2.3.2).

**6.2.** Section **3.2.3.1** (Your Profile) marks most fields as "~~editable~~ - post-MVP" but doesn't clarify if read-only display is fully implemented in MVP.
