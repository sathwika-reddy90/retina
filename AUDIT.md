# Content & functionality audit

Source: www.retinapaints.com, crawled on 29 Oct 2026 (63 HTML pages and 197 linked documents). All 149 PDF and document links returned HTTP 200 at crawl time.

The redesign reuses the live site's copy, product data, shade catalogue, store list, investor documents and images. **Nothing below has been "corrected" in the content.** Where the source contradicts itself, it is reproduced as published and listed here for Retina Paints to resolve.

---

## 1. Discrepancies to resolve (reproduced as published)

### Company figures
| Topic | Where | What it says |
| --- | --- | --- |
| Stores / cities | Homepage stats; Franchise page | 75+ stores, 50+ cities |
| | Homepage franchise pop-up | "Now in 15+ cities with 100+ stores" |
| | Store locator data | 60 stores in 28 districts (Telangana, Andhra Pradesh) |
| Customers | Homepage | 10,00,000+ Happy Customers |
| | MD's Message | 100000+ Happy Clients |
| Own land & building | History & Milestones | 2020 |
| | Company Profile | 2022 (Rayaraopet near Ghatkesar) |
| Vision / Mission | Homepage | "To color every home in India with quality and trust." / "To provide seamless franchise opportunities with end-to-end support." |
| | Vision & Mission page | Different, longer wording (both kept in their original places) |
| Registered office | Footer, Contact page, Company Profile | Three different wordings of the same address |

### Products
| Product | Issue |
| --- | --- |
| Expo Ultimax, Glow Premium | The warranty badge image reads **5 years** (the packs also show 5); its alt text reads "3 Year Warranty". **5 years is shown.** |
| Glow Premium | "View More in product Sheet" links to the **Glow Advanced** PDF. |
| Coarse Putty | The description is the **Eco Damp primer** copy. Real product copy is needed. |
| Retina Wall Fix | Technical details list Type "Emulsion" and a garbled Thinning value ("120-140 sft. /Litre/single coat and 60-70 20-30% of water"). The description also claims "the first putty in India to meet the global standards", which is unverified. |
| Retina Texture | The Coverage capacity value is empty on the live page, so the row is omitted. |
| Eco Advanced | Live page heading reads "Interior Emulsions – Elegance & Durability…" for a waterproof primer. The primer heading is used instead. |
| Spark | Listed under both Interior Emulsions and Distempers, with technical Type "Emulsion". Shown once, under Distempers (as in the live navigation). |
| Coarse Putty | "Thinner Recommended: Portable Water." (probably "Potable"). |
| Eye (distemper) | The "View Product" link redirects to an image file. There is no product page. |
| Elite PU Quick Dry Enamel, Elite High Sheen Synthetic Enamel | The "View Product" links return 404. Full-size pack images also 404, so 300px thumbnails are used. |

These three products appear in the catalogue with an **"Enquire about …"** action (it opens the expert-advice form) instead of a dead link.

### Store locator
Three entries look like placeholder data. The live script also labels the dataset "Sample data of stores…":
- Hyderabad › Miyapur: "Plot No. 45, Main Road, Miyapur", 9876543210
- Hyderabad › Kukatpally: "Shop No. 12, Kukatpally Housing Board", 9876543211
- Visakhapatnam: "Door No. 10-2-3, Beach Road", 9876543213

These entries are kept and still displayed. Please confirm or remove them.

### Shade catalogue (`/color-documents/colors-all.xml`)
- 1,002 shades in 144 strips. Only 7 shades have names (QC0011–QC0017).
- Code `QC125` has 5 characters, unlike every other code. It sits next to a full `QC125x` strip and is probably a typo.

### Investor relations
- AGM 2023: "13th AGM Transcript" and "Amendment in Memorandum of Association" both link to `Transcript.pdf`.
- Board meetings 96, 97, 99, 100, 105 and 106: each intimation/outcome pair points to the same PDF. The 96th outcome PDF is also linked as "Audited Financial Results – 31.03.2025".
- The KMP and IEPF pages say contact details "will be updated/published following confirmation".
- Some documents are WordPress uploads (`/retina2025/wp-content/uploads/…`, `/beta/wp-content/uploads/…`). If WordPress is retired, these files must be moved.

### News
- The brand-ambassador post links two videos (`…/beta/dev/…/*.mp4`) that return HTTP 500. They are not shown.
- Post breadcrumbs linked to `/blog/`, which is a 404. `/blog/` now redirects to News & Events.
- The section is titled "Insights & Inspiration: **The Retina Retail Blog**" (kept as published).

### Typos kept verbatim (recommend fixing at source)
"Fingi", "it’s name" / "it’s basket", "Reitna", "Shir.", "Genreal Announcements", "Franchsiee", "Harrasment", "easy clean ability ." The careers location "Andhrapradesh" and the jobs' "Posted 1 year ago" labels are also reproduced as crawled.

### Small functional fixes made
- Footer `mailto:` links on the live site included trailing periods and spaces (`careers@retinapaints.com.`, ` franchisee@retinapaints.com.`), which broke them. They now use valid addresses.
- The copyright year is generated automatically (the live site shows 2025).

---

## 2. Preserved functionality

| Live feature | Redesign |
| --- | --- |
| All 59 crawled routes | Same URLs, verified by `npm run check:links` |
| Header search (`/?s=`) | Site-wide instant search over pages, products, jobs, news and 180+ documents. The legacy `/?s=` URL still works. |
| Product catalogue and 16 product pages | Same names, descriptions, warranties, features, technical details, product-sheet PDFs, surface preparation and "You may also like" |
| Colors page (XML shade catalogue, 6 room previews) | Full catalogue visualizer: 1,002 real shades, 7 rooms (including the homepage's Kids Room), family filter, code/name search, copy code, shareable `#QC…` links |
| Homepage colour visualizer | Rebuilt with real Retina shade codes (the live widget used generic web colours) |
| Store locator (state → district) | Same data and flow, plus district quick-pick, tap-to-call and Google Maps directions |
| Franchise enquiry, Expert advice / callback, Contact, Job application forms | Same fields and field names, inline validation, accessible errors. They submit to `PUBLIC_FORM_ENDPOINT`, or open a pre-filled email when unset. |
| "Join Us", "Become a Partner", "Apply Now", "Get Expert Advice" | Open the matching form (native `<dialog>`) or scroll to it |
| Careers search (keywords, category, type, location) | Instant client-side filter. Accepts the live query parameters (`search_keywords`, `selected_category`, …). |
| Board of Directors directorship pop-ups | Accessible dialogs with the same tables |
| IPO and shareholding PDF viewers | Kept, inside an expandable "Preview document" panel |
| YouTube videos (franchise, success stories) | Privacy-friendly click-to-load embeds |
| Homepage franchise pop-up | Non-blocking card, shown once per session after 15s or 35% scroll |
| WhatsApp chat button | Kept (same number and message) |
| Social links, phone numbers, all emails | Kept in the header, footer and contact page |

## 3. Presentation changes (meaning unchanged)
- Product page H1 is now the product name. The category heading ("Exterior Emulsions – Beauty That Lasts, Protection That Endures") is shown as eyebrow and tagline.
- Feature labels use the live captions in readable form ("dust-resistance" → "Dust resistance", "kills-germs" → "Kills germs"). The stronger alt texts ("Dust Proof", "Anti Viral") were not used.
- Product name spacing is normalised ("Zing +" → "Zing+", "X - Gen+" → "X-Gen+").
- The three hero slides became one hero ("Transform Your Space with Superior Paints"), the exterior section ("Shield Your Home with Long-Lasting Protection!") and the franchise section ("Partner with Retina Paints – Grow Your Business!").
- Colour "families" (Reds, Blue Greens, Earth Tones, …) are a browsing aid computed from each strip's colour values. They are not official Retina collections.
- New microcopy is limited to navigation labels, section eyebrows, helper text and empty states. It adds no product claims.

## 4. Asset gaps
- **Lifestyle photography**: the live site has no licensed, high-quality photography of Indian interiors. The hero uses the brand's own room render, repainted live in real Retina shades. Commissioning or licensing a small set of interior and exterior photographs is recommended. Every image slot uses Astro's optimised `<Image>`, so new photos can be dropped in.
- Photos are missing for three independent directors (monograms are shown).
- The store data has no coordinates. Directions use an address search.
- A form-handling backend is needed for production (see README).
