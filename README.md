![](https://github.com/LouieMorais/mindful-art/blob/main/src/assets/mindful_art_topmast.png?raw=true)

# Mindful Art - Project Initiation Document - Release 01 (MVP)

![CI Status](https://github.com/LouieMorais/mindful-art/workflows/CI/badge.svg)

**_Version 0.8_, 13/10/2025**
**Product Manager:** Louie Morais

Design is representative of future releases, not current MVP:

![Gallery Page](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/3.2.3.3.b.%20User%20Area%20-%20Gallery%20Page%20-%20With%20Artworks.png?raw=true)

---

- [Mindful Art - Project Initiation Document - Release 01 (MVP)](#mindful-art---project-initiation-document---release-01-mvp)
  - [1. Project Overview](#1-project-overview)
    - [1.1. Purpose](#11-purpose)
    - [1.2. Background and Rationale](#12-background-and-rationale)
    - [1.3. Business and Educational Context](#13-business-and-educational-context)
    - [1.4. Stakeholders and Responsibilities](#14-stakeholders-and-responsibilities)
    - [1.5. Relationship to the Exhibition Curator Brief](#15-relationship-to-the-exhibition-curator-brief)
  - [2. MVP Scope and Objectives](#2-mvp-scope-and-objectives)
    - [2.1. MVP Definition](#21-mvp-definition)
    - [2.2. Objectives](#22-objectives)
      - [Functional Objectives](#functional-objectives)
      - [Experiential Objectives](#experiential-objectives)
    - [2.3. In Scope](#23-in-scope)
    - [2.4. Art API Providers for MVP](#24-art-api-providers-for-mvp)
    - [2.5. Out of Scope (Post-MVP Features)](#25-out-of-scope-post-mvp-features)
    - [2.6. MVP Deliverables](#26-mvp-deliverables)
    - [2.7. MVP Success Statement](#27-mvp-success-statement)
  - [3. Future Vision](#3-future-vision)
    - [3.1. Strategic Intent](#31-strategic-intent)
    - [3.2. Conceptual Expansion](#32-conceptual-expansion)
      - [3.2.1. Reflective Practice and Personal Growth](#321-reflective-practice-and-personal-growth)
      - [3.2.2. Community and Sharing](#322-community-and-sharing)
      - [3.2.3. Educational and Institutional Collaboration](#323-educational-and-institutional-collaboration)
    - [3.3. Technical and Architectural Direction](#33-technical-and-architectural-direction)
    - [3.4. Research and Design Development](#34-research-and-design-development)
    - [3.5. Long-Term Vision Statement](#35-long-term-vision-statement)
  - [4. Functional Scope (User Features)](#4-functional-scope-user-features)
    - [4.1. Landing Page and Authentication](#41-landing-page-and-authentication)
    - [4.2. Search and Results](#42-search-and-results)
    - [4.3. User Area](#43-user-area)
    - [4.4. Galleries and Curation](#44-galleries-and-curation)
    - [4.5. Artwork Pages](#45-artwork-pages)
    - [4.6. General Interface Features](#46-general-interface-features)
  - [5. Behavioural Journeys Summary](#5-behavioural-journeys-summary)
    - [5.1. Overview](#51-overview)
    - [5.2. Registration and Login Journey](#52-registration-and-login-journey)
    - [5.3. Search and Discovery Journey](#53-search-and-discovery-journey)
    - [5.4. Vault and Gallery Management Journey](#54-vault-and-gallery-management-journey)
    - [5.5. Artwork Viewing Journey](#55-artwork-viewing-journey)
    - [5.6. Error and Feedback Journey](#56-error-and-feedback-journey)
  - [6. Non-Functional Requirements](#6-non-functional-requirements)
    - [6.1. Performance Standards](#61-performance-standards)
    - [6.2. Accessibility Standards](#62-accessibility-standards)
    - [6.3. Error and Loading Behaviour](#63-error-and-loading-behaviour)
    - [6.4. Security and Privacy](#64-security-and-privacy)
    - [6.5. Responsiveness and Compatibility](#65-responsiveness-and-compatibility)
    - [6.6. Reliability and Availability](#66-reliability-and-availability)
  - [7. Success Criteria / Definition of Done](#7-success-criteria--definition-of-done)
    - [7.1. Purpose](#71-purpose)
    - [7.2. Functional Success Criteria](#72-functional-success-criteria)
    - [7.3. Non-Functional Success Criteria](#73-non-functional-success-criteria)
    - [7.4. Documentation and Delivery Criteria](#74-documentation-and-delivery-criteria)
    - [7.5. Definition of Done](#75-definition-of-done)
  - [8. Technology Overview](#8-technology-overview)
  - [9. Governance and Responsibilities](#9-governance-and-responsibilities)
    - [9.1. Governance Overview](#91-governance-overview)
    - [9.2. Governance Structure](#92-governance-structure)
    - [9.3. Roles and Responsibilities](#93-roles-and-responsibilities)
    - [9.4. Decision-Making and Escalation](#94-decision-making-and-escalation)
    - [9.5. Communication and Version Control](#95-communication-and-version-control)
    - [9.6. Review and Sign-Off](#96-review-and-sign-off)
  - [10. Document History](#10-document-history)
  - [11. Release 01 Documentation](#11-release-01-documentation)

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 1. Project Overview

### 1.1. Purpose

_Mindful Art_ is a digital platform that enables users to search, curate, and reflect upon artworks drawn from multiple museum and university collections. The project unifies open cultural data into a single, user-centred interface that supports both personal curation and mindful engagement with visual art.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 1.2. Background and Rationale

The project arises from the **Exhibition Curator Project Brief**, which tasks developers with creating a viewer-driven exhibition platform using at least two open institutional APIs. While the brief defines the technical and functional baseline, _Mindful Art_ extends the concept through an experience framework encouraging slow looking, emotional awareness, and contemplative engagement with art.

The rationale for _Mindful Art_ rests on three principles:

1. **Accessibility of knowledge:** democratise access to public art collections through open APIs.
2. **Mindful interaction:** design the interface to encourage focus and reflection rather than distraction.
3. **Curatorial empowerment:** enable users to act as their own curators, assembling temporary or permanent exhibitions that express personal or thematic intent.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 1.3. Business and Educational Context

_Mindful Art_ functions both as a software-engineering capstone and as a cultural-heritage prototype. It demonstrates how modern web development practices can serve curatorial and educational objectives. The project is relevant to:

- **Cultural institutions** seeking open-access engagement tools.
- **Educators** exploring digital-humanities applications.
- **Developers** examining full-stack integration of open cultural data.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 1.4. Stakeholders and Responsibilities

| **Stakeholder Role**                  | **Primary Responsibility**                                                                       |
| ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Product Manager**                   | Defines vision, scope, and priorities; ensures alignment with the Exhibition Curator Brief.      |
| **Documentation Specialist**          | Maintains this PID / README and guarantees traceability between requirements and implementation. |
| **UX / UI Designer**                  | Designs all interfaces, interaction patterns, and accessibility flows.                           |
| **Front-End Developer**               | Implements application logic, state management, and API integration.                             |
| **DevOps Engineer**                   | Configures hosting, deployment pipelines, and performance monitoring.                            |
| **Quality Assurance Lead**            | Verifies compliance with MVP acceptance criteria and non-functional standards.                   |
| **Cultural Partners / API Providers** | Supply open-access data and images under free-use or educational licences.                       |

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 1.5. Relationship to the Exhibition Curator Brief

The project fully adheres to the mandatory MVP criteria specified in the **Exhibition Curator Project Brief**:

- Searches and filters artworks across at least two open institutional APIs.
- Allows saving of artworks into a temporary collection.
- Enables creation of user-defined exhibitions persisting for the session.
- Displays images and metadata for each artwork.
- Communicates loading and error states clearly.

In addition, _Mindful Art_ introduces a **mindfulness-based design philosophy** that informs the tone, interface pacing, and visual hierarchy throughout the product.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 2. MVP Scope and Objectives

### 2.1. MVP Definition

- The _Mindful Art R01 MVP_ delivers a fully functional, persistent web platform through which authenticated users can discover, save, and curate artworks sourced from at least two open museum or university APIs.
- All user data, including profile details, Art Vault contents, and curated Galleries, are stored in a secure cloud database and remain available across sessions.
- The MVP satisfies every mandatory requirement of the _Exhibition Curator Project Brief_ while providing the structural foundation for later reflective and collaborative extensions.

Core user capabilities include:

1. Registering or signing in through third-party authentication (Google or Apple).
2. Searching artworks across multiple institutional APIs.
3. Viewing artwork images and metadata (title, artist, date, source).
4. Storing artworks to a persistent personal **Art Vault**.
5. Creating and managing **Galleries** containing selected artworks.
6. Viewing Galleries in sequence with chained artwork navigation.
7. Receiving clear visual feedback for all loading, success, and error states.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 2.2. Objectives

#### Functional Objectives

1. Integrate a minimum of two open institutional APIs for artwork retrieval.
2. Provide keyword search and institutional filtering.
3. Display results with thumbnails and core metadata.
4. Allow authenticated users to store, remove, and organise artworks in persistent Vaults and Galleries.
5. Maintain full cross-session persistence of all user data through the back-end database.
6. Present explicit loading indicators and error messages for asynchronous operations.
7. Deliver a responsive interface usable on desktop, tablet, and mobile devices.

#### Experiential Objectives

1. Encourage mindful engagement by promoting calm visual design and focused interaction.
2. Minimise cognitive load through clear hierarchy and restrained motion.
3. Ensure accessibility and inclusivity through compliance with WCAG 2.1 AA.
4. Maintain a consistent aesthetic and tonal identity that supports reflection.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 2.3. In Scope

- Third-party authentication (Google or Apple).
- Persistent user profiles stored in the database.
- Search and filtering across multiple APIs.
- Art Vault with permanent storage of saved artworks.
- Creation, editing, and deletion of Galleries.
- Chained artwork navigation within a Gallery.
- Responsive and accessible front-end built in React and TypeScript.
- Cloud deployment (Vercel or Netlify) with persistent database back end.
- Documentation for local setup and hosting.
- Bare-bones vanilla UI with responsive structural styling.
- Accessible and responsive structural code ready for later styling.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 2.4. Art API Providers for MVP

- Harvard Art Museums (https://api.harvardartmuseums.org).
- Rijksmuseum (https://www.rijksmuseum.nl/en/collection/).
- Cleveland Museum of Art (https://www.clevelandart.org/art/).
- The Met Museum (https://www.metmuseum.org/).

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 2.5. Out of Scope (Post-MVP Features)

- Reflective journalling and guided “slow-looking” modes.
- Social and collaborative features such as sharing, comments, and group curation.
- Institutional analytics dashboards.
- Advanced filtering by medium, period, or technique.
- Native mobile application build.
- AI-driven recommendations or personalised themes.
- Artwork ordering in gallery. Instead, last saved appears first by default.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 2.6. MVP Deliverables

1. Publicly hosted production build of the _Mindful Art_ web application.
2. Working authentication, search, Vault, and Gallery workflows with persistent storage.
3. Accessible, responsive vanilla user interface.
4. Complete PID / README (this document) describing scope, setup, and compliance.
5. Source-code repository with inline documentation and commit history.
6. Test evidence for accessibility, performance, and error-state handling.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 2.7. MVP Success Statement

The _Mindful Art R01 MVP_ is deemed successful when:

- An authenticated user can log in, search artworks from multiple institutions, save selections, curate them into persistent Galleries, and navigate between them seamlessly.
- All data remain intact across sessions and devices.
- The interface meets defined accessibility and performance standards.
- The platform demonstrates clear readiness for the reflective and community extensions planned in later releases.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 3. Future Vision

### 3.1. Strategic Intent

While the R01 MVP establishes the platform’s core functionality, _Mindful Art_ is designed as an evolving system that merges cultural access with personal reflection. The long-term goal is to build a sustainable and scalable environment in which users engage with art mindfully and share that engagement with others. The Future Vision defines how the product will expand beyond functional discovery and curation towards reflective practice, community exchange, and institutional collaboration.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 3.2. Conceptual Expansion

The development path beyond the MVP will extend the platform across three main dimensions: reflection, collaboration, and partnership.

#### 3.2.1. Reflective Practice and Personal Growth

- Introduce guided reflection tools such as written journals, thematic prompts, and timed viewing modes that encourage deliberate observation and self-awareness.
- Support optional thematic journeys (for example, “Stillness”, “Identity”, or “Memory”) that organise artworks by emotional or conceptual resonance rather than institution.
- Provide a private reflective space within each user’s profile where notes and personal insights can be linked to artworks or Galleries.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

#### 3.2.2. Community and Sharing

- Allow users to publish selected Galleries publicly or share them privately with collaborators.
- Enable comments, annotations, or discussion threads within shared Galleries.
- Establish moderation and attribution rules to ensure respectful and educational exchange.
- Introduce optional discovery feeds where users can explore community-curated exhibitions.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

#### 3.2.3. Educational and Institutional Collaboration

- Offer collaborative tools for teachers, students, and researchers to create and discuss Galleries in a classroom or research context.
- Provide analytics dashboards for partner museums and universities to understand user engagement and popular themes.
- Enable co-curated or featured exhibitions prepared jointly with participating institutions.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 3.3. Technical and Architectural Direction

Subsequent releases will introduce architectural and performance enhancements to support these extensions:

- Scalable database structure for user reflections, comments, and collaborative data.
- Improved caching and API management to support larger institutional datasets.
- Integration of institutional analytics and data-sharing pipelines.
- Optional Progressive Web App (PWA) capabilities for offline use and cross-device continuity.
- Modular refactoring to separate functional layers such as search, curation, and reflection.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 3.4. Research and Design Development

Ongoing research and design will focus on:

- Evaluating the cognitive and emotional impact of digital mindfulness in cultural engagement.
- Refining the visual identity and interaction design to support calm and sustained focus.
- Expanding accessibility standards to ensure usability for neurodiverse and sensory-impaired users.
- Collaborating with cultural partners on design principles for inclusive, reflective interfaces.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 3.5. Long-Term Vision Statement

_Mindful Art_ envisions a digital ecosystem where public collections and personal awareness intersect. Users will not simply browse images but engage in an ongoing reflective dialogue with art, guided by calm technology and thoughtful design. Through community participation and institutional collaboration, _Mindful Art_ aims to promote slower, deeper, and more meaningful interaction with visual culture in the digital age.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 4. Functional Scope (User Features)

### 4.1. Landing Page and Authentication

- **Third-party Login and Registration:** Users authenticate through Google and Apple.
- **Minimal Onboarding:** New users provide a username, country of residence, and preferred languages.
- **Redirect on Success:** After registration or login, users are directed to the Search screen.
- **Account Persistence:** User sessions and profile data persist until manual sign-out.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 4.2. Search and Results

- **Keyword Search:** Users can search artworks across integrated institutional APIs.
- **Institution Filtering:** A multi-select filter allows the user to include or exclude institutions, all selected by default.
- **Dynamic Results:** Returned artworks are grouped by institution and displayed with thumbnail, title, artist, and year.
- **No Results State:** Displays a clear message with a Reset Search control.
- **Art Vault Strap (Conditional):** Appears when artworks have been stored in the user’s Vault, providing quick access.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 4.3. User Area

- **Your Profile:** Displays username, start date, country, and preferred languages (read-only).
- **Your Art Vault:** Lists all artworks stored by the user. Each item links directly to the full artwork view or can be added to a Gallery.
- **Your Galleries:** Lists all Galleries created by the user in alphabetical order, with access to each individual Gallery page.
- **Individual Gallery Pages:** Show the contents of each Gallery with options to view, rename, or remove artworks.
- **Settings:** Provides access to sign-out.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 4.4. Galleries and Curation

- **Create Gallery:** Users can create new Galleries from the User Area or from the artwork options menu.
- **Save to Gallery:** From any artwork card, users can save artworks in an existing Gallery or create a new one.
- **Gallery View:** Displays all artworks within the Gallery in the order defined by the curator.
- **Artwork Navigation:** Artworks are chained within a Gallery, with next and previous controls and position indicators.
- **Vault Integration:** Artworks can be moved between from the Vault to Galleries or removed entirely.
- **Artwork Ordering:** Order by **last-saved-first** (until curator re-ordering is in scope post-MVP).

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 4.5. Artwork Pages

- **Unchained Artwork Page:** Accessed from Search or Vault; shows a single artwork in full view with metadata.
- **Chained Artwork Page:** Accessed from within a Gallery; includes next and previous navigation and artwork position indicator.
- **Zoom Controls:** Adjustable display sizes at 25, 50, and 100 percent width.
- **Back Behaviour:** Returns the user to the previous screen without resetting its state or filters.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 4.6. General Interface Features

- **Error and Loading Feedback:** All asynchronous actions display a visible loading indicator and an informative message on failure.
- **Responsive Design:** Layout adapts to desktop, tablet, and mobile screen sizes.
- **Accessibility Compliance:** All components meet WCAG 2.1 AA, supporting keyboard navigation and assistive technologies.
- **Consistent Aesthetic:** Typography, colour palette, and spacing are designed for visual calm and minimal cognitive friction.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 5. Behavioural Journeys Summary

### 5.1. Overview

- This section provides a concise summary of the user journeys that define how users interact with the core features of _Mindful Art_. It abstracts the detailed screen-by-screen flow into a logical progression of states and transitions, describing the expected behaviour, feedback, and accessibility considerations at each stage.
- Each journey assumes the user is authenticated, with persistent data available in the back-end database.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 5.2. Registration and Login Journey

1. The user arrives on the landing page and selects **Continue with Google** or **Continue with Apple**.
2. The platform authenticates via the chosen provider.
3. First-time users complete minimal onboarding by supplying username, country, and preferred languages.
4. Returning users are logged in automatically unless they have signed out.
5. Successful authentication redirects the user to the **Search** screen.
6. Error messages appear if the authentication fails or if API access is unavailable.

**System States:**

- Loading indicator during authentication.
- Error message for failed login.
- Accessibility note: All buttons are focusable and fully navigable by keyboard.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 5.3. Search and Discovery Journey

1. The user lands on the **Search** screen after authentication.
2. A prompt invites entry of a keyword or phrase.
3. Upon submission, the system queries all integrated institutional APIs concurrently.
4. Search results are grouped by institution and displayed as artwork cards containing thumbnail, title, artist, and year.
5. The user may filter institutions to refine results.
6. Selecting an artwork opens the **Artwork Page** for detailed view.
7. The user can choose **Store to Your Art Vault** or **Save to Gallery** directly from the artwork card or detail page.
8. A notification confirms the save action.

**System States:**

- Loading spinner and message (“Loading artworks…”) while data is fetched.
- No Results state with Reset Search button.
- Error message if institutional API fails to respond.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 5.4. Vault and Gallery Management Journey

1. The user accesses the **User Area** and opens the **Art Vault**.
2. The Vault lists all stored artworks with controls remove, save to Gallery or create a Gallery.
3. When creating a new Gallery, the user provides a title and optional description.
4. Artworks can be saved to existing Galleries directly from the Vault.
5. From the **Your Galleries** list, the user opens any Gallery to view its contents.
6. Within the Gallery, the user can remove artworks and navigate between them using next and previous controls.

**System States:**

- Confirmation message for each successful save or removal.
- Empty state if the Vault or Gallery has no artworks.
- Accessibility note: Keyboard navigation supports all interactive elements.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 5.5. Artwork Viewing Journey

1. Selecting any artwork opens its **Artwork Page**.
2. Metadata and a high-resolution image are displayed.
3. The user can zoom the image to 25, 50, or 100 percent width.
4. In a Gallery context, next and previous navigation controls appear with artwork numbering.
5. Selecting **Back** returns the user to the previous context (Search, Vault, or Gallery) without resetting that page’s filters or position.

**System States:**

- Image placeholder during load.
- Error message if image fails to load.
- Accessibility note: Zoom and navigation controls are labelled and keyboard accessible.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 5.6. Error and Feedback Journey

Errors and feedback are handled consistently across all screens:

- **Loading:** A visible spinner and text such as “Loading…” or “Fetching artworks”.
- **Success:** A short-lived confirmation message confirming a completed action.
- **Error:** A clear message explaining what failed and suggesting retry actions.
- **Accessibility:** All messages are announced to screen readers and meet contrast standards.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 6. Non-Functional Requirements

### 6.1. Performance Standards

- The application must render the first visible content within **two seconds** on a standard broadband connection.
- Image assets must be **lazy-loaded**, displaying placeholder frames until each image has fully rendered.
- All API requests must include **loading indicators** to communicate progress to the user.
- The interface must remain **responsive** during API calls, without blocking or visible layout shift.
- Front-end caching and asynchronous loading must be implemented to minimise redundant API requests.
- The system must degrade gracefully if one or more APIs are unavailable, maintaining basic functionality.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 6.2. Accessibility Standards

- All interface components must be responsive (web, tablet and mobile) and comply with **WCAG 2.1 AA** accessibility criteria.
- Every interactive element must be operable by keyboard, with visible focus states.
- ARIA labels and roles must be implemented for all icons, navigation controls, and dynamic components.
- Text contrast ratios must meet or exceed **4.5:1**.
- Dynamic content, including alerts and loading messages, must be announced to screen readers.
- All media and visual elements must avoid flashing or motion that could trigger sensory discomfort.
- Accessibility testing must be carried out using automated and manual tools such as axe-core and keyboard walkthroughs.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 6.3. Error and Loading Behaviour

- All asynchronous actions must display a visible **loading indicator** and **informative message**.
- If a process fails, a user-friendly **error message** must appear, explaining the issue and providing a retry option.
- Technical details or system codes must not be exposed to the user.
- Success feedback must appear briefly after completion of any save, delete, or update action.
- Error messages must be localised according to the user’s language settings.
- Users must be able to continue using unaffected parts of the application during a partial failure.
- **Loading Behaviour:** **per-institution inline error panels** (others render normally) and **skeleton cards per institution** while loading.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 6.4. Security and Privacy

- Authentication tokens must be stored securely and invalidated upon sign-out.
- Personal data (username, country, and language) must be stored in accordance with **GDPR** and applicable UK data-protection legislation.
- No sensitive authentication data are stored client-side beyond short-lived tokens.
- All API and database communications must use **HTTPS** encryption.
- Third-party APIs must be used only for publicly available or appropriately licensed data.
- Logs and analytics must exclude personal identifiers.
- For analytics/observability, a **self-hosted, PII-free** solution (e.g., Plausible/Umami).

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 6.5. Responsiveness and Compatibility

- The interface must be fully functional on desktop, tablet, and mobile screen sizes.
- Layouts must adapt fluidly to viewport width without horizontal scrolling.
- All core functions (Search, Vault, and Gallery management) must remain accessible and usable on small screens.
- The system must support current versions of major browsers: Chrome, Edge, Safari, and Firefox.
- The application must continue to operate with degraded visuals if external fonts or non-critical assets fail to load.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 6.6. Reliability and Availability

- The hosted production build must achieve **99.5 percent uptime** over any 30-day period.
- Application errors and API failures must be logged for diagnostic purposes.
- Service interruptions must display a fallback message explaining the problem.
- The system must tolerate temporary network loss, allowing the user to retry actions once reconnected.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 7. Success Criteria / Definition of Done

### 7.1. Purpose

This section defines the measurable standards that determine whether the _Mindful Art R01 MVP_ satisfies its objectives. Each criterion corresponds directly to a functional or non-functional requirement from Sections 2. and 6, ensuring transparent traceability between specification and delivery.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 7.2. Functional Success Criteria

The MVP is considered functionally complete when all of the following are achieved:

1. **Authentication and Persistence:**
   Users can register or sign in through Google or Apple, and their profile data, Vault, and Galleries persist across sessions.
2. **Search and Retrieval:**
   Users can search artworks across at least two institutional APIs, view thumbnails and metadata, and filter results by institution.
3. **Vault Functionality:**
   Artworks can be stored in the Vault, viewed, removed, and saved to Galleries at any time.
4. **Gallery Management:**
   Users can create, edit, and delete Galleries. Artworks within a Gallery can be viewed sequentially with chained navigation.
5. **Artwork Display:**
   Artwork pages show a high-resolution image and metadata with adjustable zoom levels. Navigation returns users to the previous screen without resetting filters or position.
6. **Loading and Error Handling:**
   All asynchronous operations display clear loading indicators and user-friendly error messages, with retry options where appropriate.
7. **Responsive and Accessible Design:**
   The application is fully responsive on desktop, tablet, and mobile devices, and meets WCAG 2.1 AA standards for accessibility.
8. **Data Security:**
   All user data are transmitted via HTTPS and stored in compliance with GDPR and UK data-protection legislation.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 7.3. Non-Functional Success Criteria

The MVP is considered non-functionally complete when it meets the following performance, accessibility, and reliability standards:

1. **Performance:**
   - First visible content (First Contentful Paint) loads within two seconds on a standard broadband connection.
   - Lazy loading and caching reduce redundant API requests.
2. **Accessibility:**
   - All navigation is keyboard operable with clear focus states.
   - Screen readers announce all dynamic content and feedback messages.
   - Colour contrast ratios meet or exceed 4.5:1.
3. **Reliability:**
   - Production environment maintains at least 99.5 percent uptime.
   - Application logs errors without exposing sensitive data.
   - System tolerates transient network failure gracefully.
4. **User Feedback:**
   - All save, delete, and update actions provide visible confirmation.
   - Success messages fade automatically after display.
   - Error messages include actionable guidance.
5. **Compatibility:**
   - Core functionality operates correctly on current versions of Chrome, Edge, Safari, and Firefox.
   - Mobile layouts remain legible and interactive.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 7.4. Documentation and Delivery Criteria

1. The PID / README is complete, reviewed, and versioned.
2. The source-code repository includes setup instructions, inline documentation, and commit history.
3. Hosting and local setup have been verified according to documentation.
4. Test results demonstrate compliance with accessibility, performance, and reliability standards.
5. A presentation or demo video illustrates all core journeys from authentication to Gallery navigation.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 7.5. Definition of Done

The _Mindful Art R01 MVP_ is officially complete when:

- All functional and non-functional success criteria have been verified.
- All critical bugs are resolved.
- Accessibility and performance tests meet or exceed defined thresholds.
- Documentation and repository are finalised and published.
- The product operates continuously in the hosted environment for a minimum of seven days without significant fault.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 8. Technology Overview

- Front end: React with TypeScript.
- State management: React Context and Hooks.
- Styling: Structural CSS Modules with responsive grid layout.
- Authentication: Google and Apple via Supabase Auth.
- Database: Supabase PostgreSQL for persistent profiles, Art Vault, and Galleries.
- APIs: at least two open museum or university sources, normalised to the project’s artwork model.
- Hosting: Vercel or Netlify, HTTPS enforced.
- Accessibility: WCAG 2.1 AA baseline.
- Performance: image lazy loading, client-side caching, and visible loading indicators.

**Related documents**

- Technical Architecture Document: full stack details, data model, API mappings, CI/CD, and deployment procedures.
- Testing and Validation Document: strategy, coverage, environments, tooling, acceptance gates, and reporting.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 9. Governance and Responsibilities

### 9.1. Governance Overview

- Governance ensures that _Mindful Art_ is managed with clear lines of responsibility, authority, and communication. Each contributor operates within a defined role corresponding to their area of professional expertise.
- All decisions concerning scope, compliance, and publication are made according to this mapping, ensuring both transparency and accountability across the lifecycle of the project.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 9.2. Governance Structure

- The governance model follows a **single product ownership structure** with clearly delegated responsibilities.
- All work is traceable through version-controlled documentation and repository commits.
- The Product Manager acts as the final authority for scope, compliance, and release sign-off.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 9.3. Roles and Responsibilities

| **Role**                                | **Primary Responsibilities**                                                                                                                             | **Deliverables / Authority**                                           |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Product Manager**                     | Defines the overall vision and objectives of _Mindful Art_. Approves scope changes and release milestones.                                               | Final sign-off on MVP compliance, scope decisions, and roadmap.        |
| **Documentation Specialist**            | Maintains the PID/README, ensures that documentation reflects the implemented system, and validates alignment with the Exhibition Curator Project Brief. | All official documentation (PID, version logs, and deliverables list). |
| **UX / UI Designer**                    | Designs interfaces, defines user journeys, and ensures accessibility compliance. Works with developers to maintain fidelity between design and build.    | Wireframes, user journeys, accessibility review reports.               |
| **Front-End Developer**                 | Implements application logic, API integrations, Vault and Gallery features, and error/loading feedback.                                                  | Functional front-end codebase and integration of all APIs.             |
| **DevOps Engineer**                     | Configures hosting, CI/CD pipelines, environment management, and monitoring. Ensures deployment consistency and uptime.                                  | Build automation, hosting configuration, uptime logs.                  |
| **Quality Assurance Lead**              | Defines and executes test plans covering functionality, performance, accessibility, and reliability.                                                     | Test reports and validation documentation for Definition of Done.      |
| **Cultural Partners and API Providers** | Provide open-access datasets, metadata, and images. Verify correct attribution and licensing of institutional materials.                                 | Validated API connections and documentation of data use permissions.   |
| **Ethics and Compliance Reviewer**      | Ensures that the project adheres to GDPR, accessibility standards, and appropriate use of open cultural data.                                            | Compliance certification for each release.                             |

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 9.4. Decision-Making and Escalation

- Technical and design decisions are taken collaboratively by the relevant leads but must remain within the defined MVP scope.
- Any proposed change to the MVP scope, schedule, or success criteria requires review and approval by the Product Manager.
- Documentation updates must accompany every approved scope or feature change to maintain full traceability.
- Unresolved conflicts between contributors are escalated to the Product Manager for final arbitration.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 9.5. Communication and Version Control

- All documentation and code changes are tracked through a shared version control system.
- Change requests are logged with a short description, rationale, and associated commit reference.
- Regular review meetings or asynchronous checkpoints are held at each iteration milestone.
- All published versions of the PID/README must include a revision number and date of release.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

### 9.6. Review and Sign-Off

The following review and approval sequence applies to each new release or major update:

1. **Technical Review** – Developers and DevOps verify build integrity and deployment.
2. **Design and Accessibility Review** – UX/UI Designer confirms interface compliance.
3. **Testing and Validation** – QA Lead verifies functional and non-functional success criteria.
4. **Documentation Review** – Documentation Specialist confirms alignment between the implemented system and this PID.
5. **Final Approval** – Product Manager signs off the release as compliant with the MVP specification.

Only after completion of this sequence may a release be tagged as stable and recorded as a public version of _Mindful Art_.

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 10. Document History

| Version | Date     | Author       | Change                                                                                                                                                                                              |
| ------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0.1     | 17/09/25 | Louie Morais | Documentation started                                                                                                                                                                               |
| 0.2     | 25/09/25 | Louie Morais | - Consolidated main user journeys and page functionality<br />- Added Document history (Documentation template finalised)                                                                           |
| 0.3     | 26/09/25 | Louie Morais | Finalised document - split user journeys chapters into separate document. Pending review of both documents for alignment and harmonisation.                                                         |
| 0.4     | 26/09/25 | Louie Morais | PID reviewed and aligned with User Journey document R01-MVP v.0.2.                                                                                                                                  |
| 0.6     | 11/10/25 | Louie Morais | - Re-alignment with revised user journeys: clarity required for features production and design.<br />- UX matured and better defined<br />- Wireframes produced based on revised user journeys      |
| 0.7     | 13/10/25 | Louie Morais | - Finalised all journeys and wireframes for MVP <br />- User Features (3.2) has been migrated to User Journeys document and a summary of features and functions has been implemented in version 0.7 |
| 0.8     | 13/10/25 | Louie Morais | - Re-structured and re-distributed content across several documents - PID is more project-oriented.                                                                                                 |

<a href="#mindful-art---project-initiation-document---release-01-mvp" style="float: right; font-size: 0.8em; display: block; padding: 10px 0;  clear: both">**[BACK TO INDEX]**</a>

---

## 11. Release 01 Documentation

[Mindful Art - User Journeys - R01-MVP v.0.3.md](https://github.com/LouieMorais/mindful-art/blob/main/docs/Mindful%20Art%20-%20User%20Journeys%20-%20R01-MVP%20v.0.3.md)
[Museum API - Harvard Art Museums.md](https://github.com/LouieMorais/mindful-art/blob/main/docs/Museum%20API%20-%20Harvard%20Art%20Museums.md)
[Museum API - Rijksmuseum.md](https://github.com/LouieMorais/mindful-art/blob/main/docs/Museum%20API%20-%20Rijksmuseum.md)
[Museum API - Europeana.md](https://github.com/LouieMorais/mindful-art/blob/main/docs/Museum%20API%20-%20Europeana.md)


