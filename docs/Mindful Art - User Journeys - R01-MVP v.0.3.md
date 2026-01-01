![](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/mindful-art-topmastb-w.png)

# Mindful Art - User Journeys - Release 01 (MVP)

**_Version 0.3_, 13/10/2025**
**Product Manager:** Louie Morais

---

- [Mindful Art - User Journeys - Release 01 (MVP)](#mindful-art---user-journeys---release-01-mvp)
  - [1. Main Site Structure (User View - MVP)](#1-main-site-structure-user-view---mvp)
  - [2. Accessibility Strategy](#2-accessibility-strategy)
  - [3. User Specifications](#3-user-specifications)
    - [3.1. User-System Journeys and Flows](#31-user-system-journeys-and-flows)
    - [3.2. User Features](#32-user-features)
      - [3.2.1. Landing Page](#321-landing-page)
        - [3.2.1.1. Landing Page \> Registration](#3211-landing-page--registration)
        - [3.2.1.2. Landing Page \> Login](#3212-landing-page--login)
      - [3.2.2. Search/Search Results](#322-searchsearch-results)
        - [3.2.2.1. Search Screen on Load](#3221-search-screen-on-load)
        - [3.2.2.2. Search - With Results](#3222-search---with-results)
        - [3.2.2.3. Search - No Results](#3223-search---no-results)
      - [3.2.3. User Area](#323-user-area)
        - [3.2.3.1. User Area / Your Profile](#3231-user-area--your-profile)
        - [3.2.3.2. User Area / Your Galleries](#3232-user-area--your-galleries)
        - [3.2.3.3. User Area / Your Galleries / Gallery Page](#3233-user-area--your-galleries--gallery-page)
        - [3.2.3.4. User Area / Your Art Vault](#3234-user-area--your-art-vault)
      - [3.2.4. Artwork Page](#324-artwork-page)
        - [3.2.4.1. Search Results | Your Art Vault Page | Your Art Vault Strap \> Unchained Artwork Page](#3241-search-results--your-art-vault-page--your-art-vault-strap--unchained-artwork-page)
        - [3.2.4.2. Gallery Page | Gallery Strap \> Chained Artwork Page](#3242-gallery-page--gallery-strap--chained-artwork-page)
      - [3.2.5. Straps](#325-straps)
        - [3.2.5.1. Vault Strap](#3251-vault-strap)
        - [3.2.5.2. Gallery Straps](#3252-gallery-straps)
      - [3.2.6. Artwork Cards](#326-artwork-cards)
        - [3.2.6.1. Artwork Search Card](#3261-artwork-search-card)
        - [3.2.6.2. Artwork Vault Strap Card](#3262-artwork-vault-strap-card)
        - [3.2.6.3. Artwork Vault Card](#3263-artwork-vault-card)
        - [3.2.6.4. Artwork Gallery Strap Card](#3264-artwork-gallery-strap-card)
        - [3.2.6.5. Artwork Gallery Card](#3265-artwork-gallery-card)
      - [Preamble A: Create Gallery (3.2.7) and Save to Gallery (3.2.8) Screens - Features and Functionality](#preamble-a-create-gallery-327-and-save-to-gallery-328-screens---features-and-functionality)
      - [Preamble B: Success Screens to Create Gallery (3.2.7) and Save to Gallery (3.2.8) - Features and Functionality](#preamble-b-success-screens-to-create-gallery-327-and-save-to-gallery-328---features-and-functionality)
      - [3.2.7. Create Gallery Functionality](#327-create-gallery-functionality)
        - [3.2.7.1. Create Gallery From More Actions Menu - No Galleries Created Yet](#3271-create-gallery-from-more-actions-menu---no-galleries-created-yet)
        - [3.2.7.2. Create Gallery From More Actions Menu - One or More Galleries Previously Created](#3272-create-gallery-from-more-actions-menu---one-or-more-galleries-previously-created)
        - [3.2.7.3. Create Gallery From Create a Gallery CTA - No Galleries Created Yet](#3273-create-gallery-from-create-a-gallery-cta---no-galleries-created-yet)
        - [3.2.7.4. Create Gallery From Create a Gallery CTA - One or More Galleries Previously Created](#3274-create-gallery-from-create-a-gallery-cta---one-or-more-galleries-previously-created)
      - [3.2.8. Save to Gallery Functionality](#328-save-to-gallery-functionality)
        - [3.2.8.1. Save to Gallery From More Actions Menu - No Galleries Created Yet](#3281-save-to-gallery-from-more-actions-menu---no-galleries-created-yet)
        - [3.2.8.2. Save to Gallery From More Actions Menu - One or More Galleries Previously Created](#3282-save-to-gallery-from-more-actions-menu---one-or-more-galleries-previously-created)
  - [4. Document History](#4-document-history)
  - [5. Release 01 Documentation](#5-release-01-documentation)

<a href="#mindful-art---user-journeys---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 1. Main Site Structure (User View - MVP)

```Text
Landing Page
├── Search/Search Results Page
└── User Area
	└── Your Profile
	└── Your Galleries
	│	└── User Gallery 1
	│	│	└── Artwork 1
	│	│	└── Artwork 2
	│	└── User Gallery 2
	│	└── User Gallery 3
	│	└── User Gallery 4
	└── Your Art Vault
		└── Artwork 1
		└── Artwork 2
```

<a href="#mindful-art---user-journeys---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 2. Accessibility Strategy

<a href="#mindful-art---user-journeys---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 3. User Specifications

### 3.1. User-System Journeys and Flows

### 3.2. User Features

#### 3.2.1. Landing Page

- For the purpose of the MVP, the landing page will only hold registration/login functionality

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.1.1. Landing Page > Registration

**_Step 1: Choose Login Provider_**

![3-2-1-1-a-Registration-Step-001-Choose-Auth-Provider.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-1-1-a-Registration-Step-001-Choose-Auth-Provider.png)

![](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-1-1-b-Registration-Step-002-Auth-Provider-Back-Process.png)

- Google
- Apple

**_Step 2: Your Information_**

![](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-1-1-c-Registration-Step-003-Username-and-Geolinguistic-Info.png)

- Username
- Country of Residence
  - Pick from dropdown list of countries in the world
- Preferred Language
  - Pick from list of most spoken European languages without regional differentiation (Portuguese, instead of Portuguese (PT) or Portuguese (BR)). More than one selection is allowed up to 8 languages.

**_Step 3: Account Creation Success_**

- TBD - for MVP, send users to _3.2.2.1. Search_

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.1.2. Landing Page > Login

**_Step 1: Choose Login Provider_**

![3-2-1-1-d-Login.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-1-1-d-Login.png)

- Google
- Apple

**_Step 2: Login Success_**

- TBD - for MVP, send users to _3.2.2.1. Search_

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

#### 3.2.2. Search/Search Results

- Search by keyword
- Search from pool of art institutions via their APIs
- Search page displays search results underneath search form (same screen)
- Session, selections and statuses persistence on navigating out of the search page and returning to it using the browser back button or an interface back link or CTA. Back always means back to original state of previous page.
- Search results sessions, selections and statuses are always reset when clicking on links and CTAs other than "back."

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.2.1. Search Screen on Load

![3-2-2-1-Search-Default-On-Load.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-2-1-Search-Default-On-Load.png)

1. **Search Form**

- Keyword question and input text field
- Art institutions question and a customised multiple selection dropbox with checkboxes (all selected by default).

2. **Art Vault Strap (Conditional)**

- If artwork has been saved in the Art Vault (either in the current session or in a previous one), the Art Vault Strap will show in the search page. The Art Vault strap is to be displayed as an overlay at the bottom of the visible screen. At [3.2.5.1. Vault Strap](#3251-vault-strap).
  - **_Artwork Vault Strap Card_** at [3.2.6.2. Artwork Vault Strap Card](#3262-artwork-vault-strap-card).

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.2.2. Search - With Results

![3-2-2-2-a-Search-Results.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-2-2-a-Search-Results.png)

![3-2-2-2-b-Search-Results-Vault-Strap.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-2-2-b-Search-Results-Vault-Strap.png)

1. **Search Form**

- Number of results returned for keyword searched - keywords shown in copy
- Reset Search CTA - clears input and re-selects all institutions
- Keyword question and input text field - previous search keywords shown in field
- Art institutions question and multiple selection drobox (previous selection)
  - "All x institutions searched," or
  - "10 of 23 institutions selected for search"

2. **Search Results**

- Number of total results
- Results organised by institution
  - Partial number of results returned by institution: "10 results from Harvard Art Museum"
  - Institution logo - no link
  - **_Artwork Search Card_** at [3.2.6.1. Artwork Search Card](#3261-artwork-search-card).
  - Lazy-rendered.

3. **Art Vault Strap (Conditional)** at [3.2.5.1. Vault Strap](#3251-vault-strap).

- If artwork has been saved in the Art Vault (either in the current session or in a previous one at any time), the Art Vault Strap will show in the search page. The Art Vault strap is to be displayed as an overlay at the bottom of the visible screen.
  - **_Artwork Vault Strap Card_** at [3.2.6.2. Artwork Vault Strap Card](#3262-artwork-vault-strap-card).

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.2.3. Search - No Results

![3-2-2-3-Search-No-Results.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-2-3-Search-No-Results.png)

1. **Search Form**

- No results message - keywords shown in copy
- Reset Search CTA - clears input and re-selects all institutions
- Keyword question and input text field - previous search keywords shown in field
- Art institutions message and multiple selection drobox (previous selection)
  - "All x institutions searched," or
  - "10 of 23 institutions selected for search"

2. **Art Vault Strap (Conditional)** at [3.2.5.1. Vault Strap](#3251-vault-strap).

- If artwork has been saved in the Art Vault (either in the current session or in a previous one at any time), the Art Vault Strap will show in the search page. The Art Vault strap is to be displayed as an overlay at the bottom of the visible screen.
  - **_Artwork Vault Strap Card_** at [3.2.6.2. Artwork Vault Strap Card](#3262-artwork-vault-strap-card).

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

#### 3.2.3. User Area

All galleries and vault are accessed from the user area. The Profile Area has 3 major pages:

- **Your Profile** - with user information and basic stats - this is also the landing page for the area.
- **Your Galleries** - with all user-created galleries listed in alphabetical order (filters to be implemented later).
  - **Individual Gallery pages** - from the gallery listing in Your Galleries, users can access the individual gallery pages
- **Your Art Vault** - art saved for later

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.3.1. User Area / Your Profile

![3-2-3-1-User-Area-Your-Profile.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-3-1-User-Area-Your-Profile.png)

Displays all information provided in registration as read-only:

- a. Username and date the membership started - non editable
- b. Profile picture
  - ~~editable~~ - post-MVP
- c. Country of residence
  - ~~editable (Same UI as the one offered in the registration)~~ - post-MVP
- d. Preferred languages
  - ~~editable (Same UI as the one offered in the registration)~~ - post-MVP
- e. Contact and Login
  - ~~editable (Email contact and Google account linkage status)~~ - post-MVP
- f. ~~Your Statistics - Art pieces contemplated (Opened to full screen) and contemplations from other members~~ - post-MVP
  - ~~No stats - display message to get started~~ - post-MVP

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.3.2. User Area / Your Galleries

![3-2-3-2-a-User-Area-Your-Galleries-No-Gallery.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-3-2-a-User-Area-Your-Galleries-No-Gallery.png)

![3-2-3-2-b-User-Area-Your-Galleries-With-Galleries.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-3-2-b-User-Area-Your-Galleries-With-Galleries.png)

- a. Create a Gallery CTA
- b. Lists galleries as "**_Gallery Straps_**" ([3.2.5.2. Gallery Straps](#3252-gallery-straps)), alphabetically stacked, each strap contains:
  - Title of the gallery - Linked to gallery page
  - Amount of artworks in gallery
  - First Artwork Strap Cards
  - ~~Amount of appreciations~~ - post-MVP
  - ~~Navigate (forward and backward) the strap~~ - post-MVP
  - **_Artwork Gallery Strap Card_** at [3.2.6.4. Artwork Gallery Strap Card](#3264-artwork-gallery-strap-card).

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.3.3. User Area / Your Galleries / Gallery Page

![3-2-3-3-b-User-Area-Gallery-Page-With-Artworks.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-3-3-b-User-Area-Gallery-Page-With-Artworks.png)

- a. Link back to Your Galleries
- Gallery name as chosen by curator when gallery was created - Gallery names must be unique per curator, meaning that the same curator is not allowed to have two or more galleries sharing the exact same name. Two curators can have galleries sharing the same name.
- Gallery description as above
- ~~CTA link to change gallery name - make it inline on the page~~ - post-MVP
- ~~CTA link to change description - make it inline on the page~~ - post-MVP
- CTA to create a new gallery - journey as per **_[3.2.7. Create Gallery Functionality](#327-create-gallery-functionality)_**

- ~~CTA to delete gallery~~ - post-MVP
- ~~Gallery Edits: artwork order, visibility, etc~~ - post-MVP
- ~~Share gallery~~ - post-MVP
- **State 1: Empty - No Artwork**
  - What to do next content

- **State 2: Contains Artwork**
  - **_Artwork Gallery Card_** at [3.2.6.5. Artwork Gallery Card](#3265-artwork-gallery-card).

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.3.4. User Area / Your Art Vault

![3-2-3-4-b-User-Area-Your-Art-Vault-Page-With-Artwork.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-3-4-b-User-Area-Your-Art-Vault-Page-With-Artwork.png)

- Please be reminded that the Art Vault is not a gallery but a storage area for later viewing and works independently from galleries, as such:
  - Cards removed from the Vault (page or strap) do not get removed from any galleries.
  - Cards removed from galleries do not get removed from the Vault.
  - Cards inside the Vault are ordered by last-saved(in vault)-first-displayed
  - The Vault Strap strictly mirrors the order and contents of the Your Art Vault page, and vice-versa.
  - Cards are idempotent: they are either in or out of the Vault.
- Back button to **3.2.3.2. User Area > Your Galleries**
- How to use your art vault tutorial
  - **_State 1:_** With no artwork in Your Vault page - Vault tutorial expanded
  - **_State 2:_** With artwork in Your Vault page - Vault tutorial contracted to first paragraph

- Results are presented in the same format as Search Results without sorting for institutions and with the option for Art Vault options set for remove.
- **_Artwork Vault Card_** at [3.2.6.3. Artwork Vault Card](#3263-artwork-vault-card).

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

#### 3.2.4. Artwork Page

- Artwork Pages can be:
  - **Unchained Artwork Pages** - these are artwork pages that are called from outside a gallery, from places such as search results or Your Art Vault. They are called "unchained" because they are not linked in order to other artwork, as in a gallery.
  - **Chained Artwork Pages** - these are artwork pages that are called from inside a gallery page or strap. They are called "chained" because they are linked in order of appearance to other artworks in a gallery. For example, artwork 3 of a gallery with 12 pieces, will have artwork 4 as its next "chain" and artwork 2 as its previous - artwork 12 will be the last chain.
    - By default, the chained order is last-saved(in gallery)-first-displayed - MVP.
    - Chained artwork can be ordered by curators, if so, the order established by the curator is maintained until the last artwork present when the gallery was last re-ordered. New artwork saved after a gallery has been ordered is saved last: last-saved(in gallery)-last displayed - post-MVP.
  - The main visible difference is that a chained artwork page will show a previous and next artwork button and the artwork will be accompanied with its position (e.g. "4/25"), while unchained artworks link to nothing else and have no order position numbers.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.4.1. Search Results | Your Art Vault Page | Your Art Vault Strap > Unchained Artwork Page

- a. Artwork set to 100% full screen width - it is ok if part of the artwork goes beyond the visible screen fold. Request the **closest provider rendition** to the current viewport/zoom (fall back to client scale if a rendition isn’t available). Target **≥1600px** width for 100% on desktop; preserve aspect ratio; no distortion, no height clipping.
- b. Back CTA to page where the artwork was linked from - if from a search results card, search is not resubmitted and session is not reset - results, states and statuses are maintained as left before the artwork page was loaded. Encode **query + selected institutions** in the URL; store **scroll position** in memory keyed by the URL. This gives correct Back/Forward behaviour and deep links without heavy URL fragments.
- c. Zoom Controls (25%, 50% and 100% screen widths)
- d. Name of the artwork
- e. Name of artist,
- f. Year of creation
- g. All other meta and informational data about the artwork.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.4.2. Gallery Page | Gallery Strap > Chained Artwork Page

- a. Artwork set to 100% full screen width - it is ok if part of the artwork goes beyond the visible screen fold. Request the **closest provider rendition** to the current viewport/zoom (fall back to client scale if a rendition isn’t available). Target **≥1600px** width for 100% on desktop; preserve aspect ratio; no distortion.
- b. Artwork order position in gallery - 3/36, 22/22, etc.
- c. Previous and Next Artwork CTA
- d. Back CTA to page where the artwork was linked from - session is not reset - results, states and statuses are maintained as left before the artwork page was loaded. Encode **query + selected institutions** in the URL; store **scroll position** in memory keyed by the URL. This gives correct Back/Forward behaviour and deep links without heavy URL fragments.
- e. Zoom Controls (25%, 50% and 100% screen widths)
- f. Name of the artwork
- g. Name of artist,
- h. Year of creation
- i. All other meta and informational data about the artwork.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

#### 3.2.5. Straps

Straps work as stand-alone tasters of galleries hosting Artwork Cards or, as in the case of the Vault Strap, they work as a "basket" previewing items for later curation.

|                                                        | 3.2.5.1. Vault Strap                                        | 3.2.5.2. Gallery Strap                                          |
| ------------------------------------------------------ | ----------------------------------------------------------- | --------------------------------------------------------------- |
| Card Type hosted                                       | [3.2.6.2. Vault Strap Card](#3262-artwork-vault-strap-card) | [3.2.6.4. Gallery Strap Card](#3264-artwork-gallery-strap-card) |
| Appears in page                                        | Search Page                                                 | Your Gallery page                                               |
| Sorted by                                              | Last saved first                                            | User order/ last saved first                                    |
| Linked title to artwork listing page                   | ✅                                                          | ✅                                                              |
| ~~Linked CTA/icon to artwork listing page~~ - post-MVP | ✅                                                          | ✅                                                              |
| Number of artworks                                     | ✅                                                          | ✅                                                              |
| ~~Navigational controls (previous/next)~~ - post-MVP   | ✅                                                          | ✅                                                              |
| Collapse/Expand control                                | ✅                                                          |                                                                 |

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.5.1. Vault Strap

![3-2-5-1-Vault-Strap.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-5-1-Vault-Strap.png)

- Appears in the search/search results page whenever an Artwork Search Card is saved from the search results to the Art Vault.
- The Vault Strap lists Artwork Vault Strap Cards by order of last saved in the Vault first.
- The Vault Strap is persistent, meaning that it will always show up in the search/search results page, in all states (default/no-results/with-results), when it has contents added.
- Its position will be at the bottom of the viewing screen always before the fold: z-index at the highest above all other UI. **Temporary collapse/expand** control remembered in session storage so it doesn’t obstruct other UI
- Please be reminded that the Art Vault is not a gallery but a storage area and works independently from galleries, as such:
  - Cards removed from the Vault (page or strap) do not get removed from any galleries.
  - Cards removed from galleries do not get removed from the Vault.
  - Cards inside the Vault are ordered by last-saved(in vault)-first-displayed
  - The Vault Strap strictly mirrors the order and contents of the Your Art Vault page, and vice-versa.
  - Cards are idempotent: they are either in or out of the Vault.
- Artwork Vault Strap Cards in the Vault Strap are saved and persist across sessions, until the user removes the card. Artwork Vault Strap Cards are specified at **_[3.2.6.2. Artwork Vault Strap Card](#3262-artwork-vault-strap-card)_**.
- The Vault Strap has the following elements:
  - a. Title "Your Art Vault" linked to Your Art Vault page at **_[3.2.3.4. User Area / Your Art Vault](#3234-user-area--your-art-vault)_**.
  - b. Amount of artworks saved.
  - c. Collapse/Expand control.
  - ~~d. Forward (Next), Backward (Previous) controls~~ - post-MVP

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.5.2. Gallery Straps

![3-2-5-2-Gallery-Straps.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-5-2-Gallery-Straps.png)

- Appears in Your Galleries page - providing a taster of the galleries curated by users.
- The Gallery Strap lists Artwork Gallery Strap Cards strictly mirroring the artwork order in the individual gallery it is linked to:
  - By default, the chained order is last-saved(in gallery)-first-displayed - MVP.
  - Chained artwork can be ordered by curators, if so, the order established by the curator is maintained up to the last artwork present when the gallery was last re-ordered. New artwork saved after a gallery has been ordered is saved last: last-saved(in gallery)-last displayed - post-MVP.

- The saved order of artwork in a gallery is immutable unless the curator changes it.
- Artwork Gallery Strap Cards are specified at **_[3.2.6.4. Artwork Gallery Strap Card](#3264-artwork-gallery-strap-card)_**.
- The Gallery Strap has the following elements:
  - a. Name of the gallery linked to the individual gallery page, as in **_[3.2.3.3. User Area / Your Galleries / Gallery Page](#3233-user-area--your-galleries--gallery-page)_**.
  - b. Amount of artworks saved.
  - ~~c. Forward (Next), Backward (Previous) controls~~ - post-MVP

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

#### 3.2.6. Artwork Cards

There are five types of Artwork Cards:

- a. **Artwork Search Card -** appears as items in the search page results.
- b. **Artwork Vault Strap Card** - appears as items inside the Vault Strap in the search page.
- c. **Artwork Vault Card** - appears as items in Your Art Vault page.
- d. **Artwork Gallery Strap Card** - appears as ordered items inside the Gallery Straps in Your Galleries page.
- e. **Artwork Gallery Card** - appears as ordered items in the gallery pages.

|                                                     | Search Card                           | Vault Strap Card                           | Vault Card                           | Gallery Strap Card                           | Gallery Card                           |
| --------------------------------------------------- | ------------------------------------- | ------------------------------------------ | ------------------------------------ | -------------------------------------------- | -------------------------------------- |
| - Reference                                         | [3.2.6.1.](#3261-artwork-search-card) | [3.2.6.2.](#3262-artwork-vault-strap-card) | [3.2.6.3.](#3263-artwork-vault-card) | [3.2.6.4.](#3264-artwork-gallery-strap-card) | [3.2.6.5.](#3265-artwork-gallery-card) |
| - Appears inside strap                              |                                       | ✅                                         |                                      | ✅                                           |                                        |
| - Appears in page                                   | Search Page                           | Search Page                                | Vault Page                           | Your Gallery page                            | Ind. Gallery Pages                     |
| - Sorted by                                         | Institution                           | Last saved first                           | Last saved first                     | User order/ last saved first                 | User order/ last saved first           |
| - Gallery order display ("3/10")                    |                                       |                                            |                                      | ✅                                           | ✅                                     |
| - Thumbnail                                         | ✅                                    | ✅                                         | ✅                                   | ✅                                           | ✅                                     |
| - Links to <u>chained</u> artwork                   |                                       |                                            |                                      | ✅                                           | ✅                                     |
| - Links to <u>unchained</u> artwork                 | ✅                                    | ✅                                         | ✅                                   |                                              |                                        |
| - Artwork name                                      | ✅                                    |                                            | ✅                                   |                                              | ✅                                     |
| - Artist name                                       | ✅                                    |                                            | ✅                                   |                                              | ✅                                     |
| - Year                                              | ✅                                    |                                            | ✅                                   |                                              | ✅                                     |
| - Conditional - Amount of galleries hosting artwork | ✅                                    |                                            | ✅                                   |                                              | ✅                                     |
| - Conditional - In-vault/not-in-vault flag          | ✅                                    | ✅                                         | ✅                                   |                                              |                                        |
| **_More Actions Menu:_**                            |                                       |                                            |                                      |                                              |                                        |
| - Either _Save to vault_ or _Remove from vault_     | ✅                                    | ✅                                         | ✅                                   |                                              |                                        |
| - Save to gallery                                   | ✅                                    | ✅                                         | ✅                                   | ✅                                           | ✅                                     |
| - Remove from gallery                               |                                       |                                            |                                      | ✅                                           | ✅                                     |
| - Create gallery                                    | ✅                                    | ✅                                         | ✅                                   | ✅                                           | ✅                                     |

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.6.1. Artwork Search Card

![3-2-6-1-Artwork-Search-Card.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-6-1-Artwork-Search-Card.png)

Appears as items in the search/search results page.

- a. Linked thumbnail - takes user to the Unchained Artwork Page (picture in full size without links to next or previous artworks) - back button returns to the same session of Search/Search Results page without re-submitting the search or resetting selections.
- b. CTA to save/remove result to/from Art Vault, depending on whether the artwork is already in Art Vault or not
- c. **_More Actions Menu (3 Dots Menu):_**
  - Remove artwork from Art Vault
  - Save to gallery - explained in **_[3.2.8. Save to Gallery Functionality](#328-save-to-gallery-functionality)_**
  - Create gallery - explained in **_[3.2.7. Create Gallery Functionality](#327-create-gallery-functionality)_**

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.6.2. Artwork Vault Strap Card

![3-2-6-2-Artwork-Vault-Strap-Card.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-6-2-Artwork-Vault-Strap-Card.png)

Appears as items inside the Vault Strap in the search page. Please be reminded that the Art Vault is not a gallery but a storage area and works independently from galleries, as such:

- Cards removed from the Vault (page or strap) do not get removed from any galleries.
- Cards removed from galleries do not get removed from the Vault.
- Cards inside the Vault are ordered by last-saved(in vault)-first-displayed
- The Vault Strap strictly mirrors the order and contents of the Your Art Vault page, and vice-versa.
- Cards are idempotent: they are either in or out of the Vault.

**Artwork Vault Strap Card items:**

- a. Linked thumbnail - takes user to the Unchained Artwork Page (picture in full size without links to next or previous artworks) - back button returns to the same session of Search/Search Results page without re-submitting the search or resetting selections.
- b. CTA to remove result from Art Vault
- c. **_More Actions Menu (3 Dots Menu):_**
  - Remove artwork from Art Vault
  - Save to gallery - explained in **_[3.2.8. Save to Gallery Functionality](#328-save-to-gallery-functionality)_**
  - Create gallery - explained in **_[3.2.7. Create Gallery Functionality](#327-create-gallery-functionality)_**

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.6.3. Artwork Vault Card

![3-2-6-3-Artwork-Vault-Card.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-6-3-Artwork-Vault-Card.png)

- Please be reminded that the Art Vault is not a gallery but a storage area and works independently from galleries, as such:
  - Cards removed from the Vault (page or strap) do not get removed from any galleries.
  - Cards removed from galleries do not get removed from the Vault.
  - Cards inside the Vault are ordered by last-saved(in vault)-first-displayed
  - The Vault Strap strictly mirrors the order and contents of the Your Art Vault page, and vice-versa.
  - Cards are idempotent: they are either in or out of the Vault.

**_Appears as items in Your Art Vault page:_**

- a. Linked thumbnail - takes user to the Unchained Artwork Page (picture in full size without links to next or previous artworks) - back button returns to the same session of Search/Search Results page without re-submitting the search or resetting selections.
- b. Name of the artwork
- c. Name of artist,
- d. Year of creation
- e. Notification of in how many of the user's galleries the artwork is being exhibited
- f. CTA to remove result from Art Vault
- g. **_More Actions Menu (3 Dots Menu):_**
  - Remove artwork from Art Vault
  - Save to gallery - explained in **_[3.2.8. Save to Gallery Functionality](#328-save-to-gallery-functionality)_**
  - Create gallery - explained in **_[3.2.7. Create Gallery Functionality](#327-create-gallery-functionality)_**

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.6.4. Artwork Gallery Strap Card

![3-2-6-4-Artwork-Gallery-Strap-Card.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-6-4-Artwork-Gallery-Strap-Card.png)

Appears as ordered items inside the Gallery Straps in Your Galleries page.

- Position of the artwork in the gallery exhibition order (e.g. "3/12", i.e., position 3 of 12 artworks in gallery exhibition)
- a. Linked thumbnail - takes user to the Chained Artwork Page (picture in full size with links to next or previous artworks as per established order of pieces inside the gallery) - back button returns to the same session of Search/Search Results page without re-submitting the search or resetting selections.
- b. **_More Actions Menu (3 Dots Menu):_**
  - Remove artwork from gallery
  - Save to gallery - explained in **_[3.2.8. Save to Gallery Functionality](#328-save-to-gallery-functionality)_**
  - Create gallery - explained in **_[3.2.7. Create Gallery Functionality](#327-create-gallery-functionality)_**

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.6.5. Artwork Gallery Card

![3-2-6-5-Artwork-Gallery-Card.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-6-5-Artwork-Gallery-Card.png)

Appears as ordered items in the gallery pages:

- a. Position of the artwork in the gallery exhibition order (e.g. "3/12", i.e., position 3 of 12 artworks in gallery exhibition)
- b. Linked thumbnail - takes user to the Chained Artwork Page (picture in full size with links to next or previous artworks as per established order of pieces inside the gallery) - back button returns to the same session without re-submitting or resetting selections.
- c. Name of the artwork
- d. Name of artist,
- e. Year of creation
- f. Notification of in how many of the user's galleries the artwork is being exhibited
- g. **_More Actions Menu (3 Dots Menu):_**
  - Remove artwork from gallery
  - Save to gallery - explained in **_[3.2.8. Save to Gallery Functionality](#328-save-to-gallery-functionality)_**
  - Create gallery - explained in **_[3.2.7. Create Gallery Functionality](#327-create-gallery-functionality)_**

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

#### Preamble A: Create Gallery (3.2.7) and Save to Gallery (3.2.8) Screens - Features and Functionality

|                                                                | [3.2.7.1.](#3271-create-gallery-from-more-actions-menu---no-galleries-created-yet) | [3.2.7.2.](#3272-create-gallery-from-more-actions-menu---one-or-more-galleries-previously-created) | [3.2.7.3.](#3273-create-gallery-from-create-a-gallery-cta---no-galleries-created-yet) | [3.2.7.4.](#3274-create-gallery-from-create-a-gallery-cta---one-or-more-galleries-previously-created) | [3.2.8.1.](#3281-save-to-gallery-from-more-actions-menu---no-galleries-created-yet) | [3.2.8.2.](#3282-save-to-gallery-from-more-actions-menu---one-or-more-galleries-previously-created) |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| CTA Source                                                     | More Actions **Menu**                                                              | More Actions **Menu**                                                                              | Create Gallery **CTA**                                                                | Create Gallery **CTA**                                                                                | More Actions **Menu**                                                               | More Actions **Menu**                                                                               |
| Galleries previously created?                                  | ❌                                                                                 | ✅                                                                                                 | ❌                                                                                    | ✅                                                                                                    | ❌                                                                                  | ✅                                                                                                  |
| Primary Action                                                 | **Create** gallery                                                                 | **Create** gallery                                                                                 | **Create** gallery                                                                    | **Create** gallery                                                                                    | **Save** art to gallery                                                             | **Save** art to gallery                                                                             |
| Secondary Action                                               | **Save** art to gallery (optional)                                                 | **Save** art to gallery (optional)                                                                 |                                                                                       |                                                                                                       | **Create** gallery (required)                                                       | **Create** gallery (optional)                                                                       |
| Content emphasis                                               | First time                                                                         |                                                                                                    | First time                                                                            |                                                                                                       | First time, create gallery first                                                    | Optional gallery creation                                                                           |
| **_Artwork Information:_**                                     |                                                                                    |                                                                                                    |                                                                                       |                                                                                                       |                                                                                     |                                                                                                     |
| - Thumbnail                                                    | ✅                                                                                 | ✅                                                                                                 |                                                                                       |                                                                                                       | ✅                                                                                  | ✅                                                                                                  |
| - Artwork name                                                 | ✅                                                                                 | ✅                                                                                                 |                                                                                       |                                                                                                       | ✅                                                                                  | ✅                                                                                                  |
| - Artist name                                                  | ✅                                                                                 | ✅                                                                                                 |                                                                                       |                                                                                                       | ✅                                                                                  | ✅                                                                                                  |
| - Year                                                         | ✅                                                                                 | ✅                                                                                                 |                                                                                       |                                                                                                       | ✅                                                                                  | ✅                                                                                                  |
| - Conditional - Amount of galleries hosting artwork (post-MVP) | ✅                                                                                 | ✅                                                                                                 |                                                                                       |                                                                                                       | ✅                                                                                  | ✅                                                                                                  |
| - Confirm to save artwork (yes by default)                     | ✅                                                                                 | ✅                                                                                                 |                                                                                       |                                                                                                       |                                                                                     |                                                                                                     |
| **_Gallery Functions:_**                                       |                                                                                    |                                                                                                    |                                                                                       |                                                                                                       |                                                                                     |                                                                                                     |
| Create new gallery: name                                       | ✅                                                                                 | ✅                                                                                                 | ✅                                                                                    | ✅                                                                                                    | ✅                                                                                  | ✅ (optional)                                                                                       |
| Create new gallery: description                                | ✅                                                                                 | ✅                                                                                                 | ✅                                                                                    | ✅                                                                                                    | ✅                                                                                  | ✅ (optional)                                                                                       |
| Multiple selection list of previously created galleries        |                                                                                    |                                                                                                    |                                                                                       |                                                                                                       |                                                                                     | ✅                                                                                                  |

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

#### Preamble B: Success Screens to Create Gallery (3.2.7) and Save to Gallery (3.2.8) - Features and Functionality

|                                                                                     | [3.2.7.1.](#3271-create-gallery-from-more-actions-menu---no-galleries-created-yet) | [3.2.7.2.](#3272-create-gallery-from-more-actions-menu---one-or-more-galleries-previously-created) | [3.2.7.3.](#3273-create-gallery-from-create-a-gallery-cta---no-galleries-created-yet) | [3.2.7.4.](#3274-create-gallery-from-create-a-gallery-cta---one-or-more-galleries-previously-created) | [3.2.8.1.](#3281-save-to-gallery-from-more-actions-menu---no-galleries-created-yet) | [3.2.8.2.](#3282-save-to-gallery-from-more-actions-menu---one-or-more-galleries-previously-created) |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Galleries previously created?                                                       | ❌                                                                                 | ✅                                                                                                 | ❌                                                                                    | ✅                                                                                                    | ❌                                                                                  | ✅                                                                                                  |
| Primary Action                                                                      | **Create** gallery                                                                 | **Create** gallery                                                                                 | **Create** gallery                                                                    | **Create** gallery                                                                                    | **Save** art to gallery                                                             | **Save** art to gallery                                                                             |
| Secondary Action                                                                    | **Save** art to gallery (optional)                                                 | **Save** art to gallery (optional)                                                                 |                                                                                       |                                                                                                       | **Create** gallery (required)                                                       | **Create** gallery (optional)                                                                       |
| **_Artwork Information:_**                                                          |                                                                                    |                                                                                                    |                                                                                       |                                                                                                       |                                                                                     |                                                                                                     |
| - Confirm artwork was saved or removed                                              | ✅                                                                                 | ✅                                                                                                 |                                                                                       |                                                                                                       |                                                                                     |                                                                                                     |
| - Thumbnail                                                                         | ✅                                                                                 | ✅                                                                                                 |                                                                                       |                                                                                                       | ✅                                                                                  | ✅                                                                                                  |
| - Artwork name                                                                      | ✅                                                                                 | ✅                                                                                                 |                                                                                       |                                                                                                       | ✅                                                                                  | ✅                                                                                                  |
| - Artist name                                                                       | ✅                                                                                 | ✅                                                                                                 |                                                                                       |                                                                                                       | ✅                                                                                  | ✅                                                                                                  |
| - Year                                                                              | ✅                                                                                 | ✅                                                                                                 |                                                                                       |                                                                                                       | ✅                                                                                  | ✅                                                                                                  |
| - Conditional - Amount of galleries hosting artwork (post-MVP)                      | ✅                                                                                 | ✅                                                                                                 |                                                                                       |                                                                                                       | ✅                                                                                  | ✅                                                                                                  |
| **_Updates :_**                                                                     |                                                                                    |                                                                                                    |                                                                                       |                                                                                                       |                                                                                     |                                                                                                     |
| Galleries created in the session                                                    | ✅                                                                                 | ✅                                                                                                 | ✅                                                                                    | ✅                                                                                                    | ✅                                                                                  | ✅                                                                                                  |
| Galleries the artwork was saved to (including galleries created during the session) | ✅                                                                                 | ✅                                                                                                 |                                                                                       |                                                                                                       | ✅                                                                                  | ✅                                                                                                  |
| User galleries where the art piece featured before session - post-MVP               | ✅                                                                                 | ✅                                                                                                 |                                                                                       |                                                                                                       |                                                                                     | ✅                                                                                                  |
| Next steps info - post-MVP                                                          |                                                                                    |                                                                                                    | ✅                                                                                    | ✅                                                                                                    |                                                                                     |                                                                                                     |

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

#### [3.2.7. Create Gallery Functionality](#327-create-gallery-functionality)

In Mindful Art, users can create galleries from several CTAs present throughout the service:

- Via the **More Actions (3 Dots) Menu** in **Artwork Cards:**
  - a. **Artwork Search Card -** in the artwork items listed in search results
  - b. **Artwork Vault Strap Card** - in the artwork items listed in the Art Vault Strap that appears in search results when the user sends artwork to the Vault
  - c. **Artwork Vault Card** - in the artwork items listed in Your Art Vault Page
  - d. **Artwork Gallery Strap Card** - in the ordered artwork items listed in the gallery straps located in Your Galleries page
  - e. **Artwork Gallery Card** - in the ordered artwork items listed in the gallery pages
  - When creating a gallery from an Artwork Card, the artwork the menu was located in is offered to be saved in the created gallery. Single **atomic transaction** (create gallery + add artwork); rollback gallery if add fails.
- **_Create a Gallery CTAs:_**
  - Found at the top of the page in Your Galleries, Gallery and Your Art Vault pages
  - It creates an empty gallery

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.7.1. Create Gallery From More Actions Menu - No Galleries Created Yet

- Condition: no galleries have been created yet - first gallery still to be created

1. **3.2.7.1.a Create _First_ Gallery screen**

![3-2-7-1-a-Create-Gallery-Actions-Menu-First-Gallery-Ever.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-7-1-a-Create-Gallery-Actions-Menu-First-Gallery-Ever.png)

- Artwork
  - Thumbnail
  - Piece name
  - Author
  - Year of creation
  - ~~Conditional - Information about total of user galleries the art piece has been added to~~ - post-MVP
- Confirmation to add artwork (yes by default )
- Gallery Title/Name (40 Characters) - Gallery names must be unique per curator, meaning that the same curator is not allowed to have two or more galleries sharing the exact same name. Two different curators can have galleries sharing the same name.
- Gallery Description (350 Characters)

2. **3.2.7.1.b and 3.2.7.2.b Artwork Added Success screen**

![3-2-7-1-b-and-3-2-7-2-b-Create-Gallery-Artwork-Added-Success.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-7-1-b-and-3-2-7-2-b-Create-Gallery-Artwork-Added-Success.png)

- Artwork added confirmation
  - Thumbnail
  - Piece name
  - Author
  - Year of creation
  - ~~Conditional - Information about total of user galleries the art piece has been added to~~ - post-MVP
- Link to newly created gallery - date and time of creation
- Link to the gallery the artwork was added to
- ~~Conditional - Link to galleries where the artwork was already curated in~~ - post-MVP
- ~~Conditional - Next steps instructions~~ - post-MVP

3. **3.2.7.1.b and 3.2.7.2.b Artwork Not Added Success screen**

![3-2-7-1-c-and-3-2-7-2-c-Create-Gallery-Artwork-NOT-Added-Success.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-7-1-c-and-3-2-7-2-c-Create-Gallery-Artwork-NOT-Added-Success.png)

- Artwork not added confirmation
  - Thumbnail
  - Piece name
  - Author
  - Year of creation
  - ~~Conditional - Information about total of user galleries the art piece has been added to~~ - post-MVP
- Link to newly created gallery - date and time of creation

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.7.2. Create Gallery From More Actions Menu - One or More Galleries Previously Created

- Condition: one or more galleries have been previously created

1. **3.2.7.2.a Create _New_ Gallery screen**

![3-2-7-2-a-Create-Gallery-Actions-Menu-Other-Galleries-Exist.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-7-2-a-Create-Gallery-Actions-Menu-Other-Galleries-Exist.png)

- Artwork
  - Thumbnail
  - Piece name
  - Author
  - Year of creation
  - ~~Conditional - Information about total of user galleries the art piece has been added to~~ - post-MVP
- Confirmation to add artwork (yes by default )
- Gallery Title (40 Characters) - Gallery names must be unique per curator, meaning that the same curator is not allowed to have two or more galleries sharing the exact same name. Two different curators can have galleries sharing the same name.
- Gallery Description (350 Characters)

2. **3.2.7.1.b and 3.2.7.2.b Artwork Added Success screen**

![3-2-7-1-b-and-3-2-7-2-b-Create-Gallery-Artwork-Added-Success.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-7-1-b-and-3-2-7-2-b-Create-Gallery-Artwork-Added-Success.png)

- Artwork added confirmation
  - Thumbnail
  - Piece name
  - Author
  - Year of creation
  - ~~Conditional - Information about total of user galleries the art piece has been added to~~ - post-MVP
- Link to newly created gallery - date and time of creation
- Link to the gallery the artwork was added to
- ~~Conditional - Link to galleries where the artwork was already curated in~~ - post-MVP

3. **3.2.7.1.c and 3.2.7.2.c Artwork Not Added Success screen**

![3-2-7-1-c-and-3-2-7-2-c-Create-Gallery-Artwork-NOT-Added-Success.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-7-1-c-and-3-2-7-2-c-Create-Gallery-Artwork-NOT-Added-Success.png)

- Artwork not added confirmation
  - Thumbnail
  - Piece name
  - Author
  - Year of creation
  - ~~Conditional - Information about total of user galleries the art piece has been added to~~ - post-MVP
- Link to newly created gallery - date and time of creation

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.7.3. Create Gallery From Create a Gallery CTA - No Galleries Created Yet

- Condition: no galleries have been created yet - first gallery still to be created

1. **3.2.7.3.a. Create _First_ Gallery screen**

![3-2-7-3-a-Create-Gallery-Gallery-CTA-First-Gallery-Ever.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-7-3-a-Create-Gallery-Gallery-CTA-First-Gallery-Ever.png)

- No artwork to be shown
- Gallery Title (40 Characters) - Gallery names must be unique per curator, meaning that the same curator is not allowed to have two or more galleries sharing the exact same name. Two different curators can have galleries sharing the same name.
- Gallery Description (350 Characters)

2. **3.2.7.3.b. and 3.2.7.4.b. Success screen**

![3-2-7-3-b-and-3-2-7-4-b-Create-Gallery-Gallery-CTA-Success.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-7-3-b-and-3-2-7-4-b-Create-Gallery-Gallery-CTA-Success.png)

- No artwork to be shown
- Link to newly created gallery - date and time of creation
- ~~Conditional - Next steps instructions~~ - Post MVP

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.7.4. Create Gallery From Create a Gallery CTA - One or More Galleries Previously Created

- Condition: no galleries have been created yet - first gallery still to be created

1. **3.2.7.4.a. Create _New_ Gallery screen**

![3-2-7-4-a-Create-Gallery-Gallery-CTA-Other-Galleries-Exist.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-7-4-a-Create-Gallery-Gallery-CTA-Other-Galleries-Exist.png)

- No artwork to be shown
- Gallery Title (40 Characters) - Gallery names must be unique per curator, meaning that the same curator is not allowed to have two or more galleries sharing the exact same name. Two different curators can have galleries sharing the same name.
- Gallery Description (350 Characters)

2. **3.2.7.3.b. and 3.2.7.4.b. Success screen**

![3-2-7-3-b-and-3-2-7-4-b-Create-Gallery-Gallery-CTA-Success.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-7-3-b-and-3-2-7-4-b-Create-Gallery-Gallery-CTA-Success.png)

- No artwork to be shown
- Link to newly created gallery - date and time of creation
- ~~Conditional - Next steps instructions~~ - Post MVP

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

#### 3.2.8. Save to Gallery Functionality

In Mindful Art, users can save artwork to galleries mainly from the More Actions (3 Dots) menu. Please refer to [**_3.2.6. Artwork Cards_**](#326-artwork-cards).

- Single **atomic transaction** (create gallery + add artwork); rollback gallery if add fails.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.8.1. Save to Gallery From More Actions Menu - No Galleries Created Yet

- Condition: no galleries have been created yet - first gallery still to be created

1. **3.2.8.1.a. Save Artwork and Create _First_ Gallery screen**

![3-2-8-1-a-Save-to-Gallery-Actions-Menu-First-Gallery-Ever.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-8-1-a-Save-to-Gallery-Actions-Menu-First-Gallery-Ever.png)

- Artwork
  - Thumbnail
  - Piece name
  - Author
  - Year of creation
  - ~~Conditional - Information about total of user galleries the art piece has been added to~~ - post-MVP
- Gallery Title (40 Characters) - Gallery names must be unique per curator, meaning that the same curator is not allowed to have two or more galleries sharing the exact same name. Two different curators can have galleries sharing the same name.
- Gallery Description (350 Characters)

2. **3.2.8.1.b. Success screen**

![3-2-8-1-b-Save-to-Gallery-Artwork-Added-Success.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-8-1-b-Save-to-Gallery-Artwork-Added-Success.png)

- Artwork added confirmation
  - Thumbnail
  - Piece name
  - Author
  - Year of creation
  - ~~Conditional - Information about total of user galleries the art piece has been added to~~ - post-MVP
- Link to newly created gallery - date and time of creation
- Link to new gallery artwork was added to
- ~~Conditional - Next steps instructions~~ - post-MVP

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

##### 3.2.8.2. Save to Gallery From More Actions Menu - One or More Galleries Previously Created

- Condition: one or more galleries have been previously created

1. **3.2.8.2.a. and 3.2.8.2.b. Choose a Gallery to Save Artwork screen**

![3-2-8-2-a-Save-to-Gallery-Actions-Menu-Other-Galleries-Exist.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-8-2-a-Save-to-Gallery-Actions-Menu-Other-Galleries-Exist.png)

![3-2-8-2-b-Save-to-Gallery-Actions-Menu-Other-Galleries-Exist-Create-a-New-Gallery.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-8-2-b-Save-to-Gallery-Actions-Menu-Other-Galleries-Exist-Create-a-New-Gallery.png)

- Artwork
  - Thumbnail
  - Piece name
  - Author
  - Year of creation
  - ~~Conditional - Information about total of user galleries the art piece has been added to~~ - post-MVP
- List of galleries to add artwork to - multiple selection. Galleries already hosting the art piece will not be listed.
- Optional Create New Gallery
  - Gallery Title (40 Characters) - Gallery names must be unique per curator, meaning that the same curator is not allowed to have two or more galleries sharing the exact same name. Two different curators can have galleries sharing the same name.
  - Gallery Description (350 Characters)

2. **3.2.8.2.c. Success screen**

![3-2-8-2-c-Save-to-Gallery-Actions-Menu-Other-Galleries-Exist-Success.png](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3-2-8-2-c-Save-to-Gallery-Actions-Menu-Other-Galleries-Exist-Success.png)

- Artwork
  - Thumbnail
  - Piece name
  - Author
  - Year of creation
  - ~~Conditional - Information about total of user galleries the art piece has been added to~~ - post-MVP
- Conditional - Link to newly created gallery - date and time of creation
- Link to galleries artwork was added to (including new gallery)
- ~~Conditional - Link to galleries where the artwork was already curated in~~ - post-MVP
- ~~Conditional - Next steps instructions~~ - post-MVP

<a href="#mindful-art---user-journeys---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 4. Document History

| Version | Date     | Author       | Change                                                                                        |
| ------- | -------- | ------------ | --------------------------------------------------------------------------------------------- |
| 0.1     | 26/09/25 | Louie Morais | Created user journeys document from PID.                                                      |
| 0.2     | 13/10/25 | Louie Morais | Content copied from latest journeys in PID                                                    |
| 0.3     | 13/10/25 | Louie Morais | - Added specifications to several minor details about session management and artwork display. |

<a href="#mindful-art---user-journeys---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 5. Release 01 Documentation

- [Mindful Art - User Journeys - R01-MVP v.0.3.md](https://github.com/LouieMorais/mindful-art/blob/main/docs/Mindful%20Art%20-%20User%20Journeys%20-%20R01-MVP%20v.0.3.md)
- [Museum API - Harvard Art Museums.md](https://github.com/LouieMorais/mindful-art/blob/main/docs/Museum%20API%20-%20Harvard%20Art%20Museums.md)
- [Museum API - Rijksmuseum.md](https://github.com/LouieMorais/mindful-art/blob/main/docs/Museum%20API%20-%20Rijksmuseum.md)
- [Museum API - Europeana.md](https://github.com/LouieMorais/mindful-art/blob/main/docs/Museum%20API%20-%20Europeana.md)

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---
