# Quamcrete Coatings — concept site

Speculative one-page lead-gen site for **Quamcrete Coatings**, El Paso, TX, from the
El Paso $300 pipeline. Built 2026-09-05, adapted from `old-west-construction` with a dark
premium reskin. Static site, no build step: `index.html` + `styles.css` + `script.js` +
`assets/`.

Research notes: `RESEARCH.md`. Photo brief that produced the assets: `PHOTO-BRIEF.md`.

## The hook (for outreach)

They brand themselves "HIGH END" with a sharp logo and run seasonal Meta ads, but the
whole business is one Facebook page. Every ad, plus the WhatsApp button, dead ends in a
chat thread. Epoxy buyers comparison shop hard (flake vs metallic, prep method, warranty)
and a Quamcrete prospect finds no gallery, no system explainer, no quote form. Competitors
rank with "1 to 3 day install / 10 year warranty" landing pages. A one page site with a
finish gallery, the one day install and 10 year points spelled out, and a
"Get a floor quote" form (space + finish + size) captures those ad clicks as real leads.

## Verified vs placeholder

| On the page | Status | Source / note |
|---|---|---|
| Name "Quamcrete Coatings", "Epoxy & Polyaspartic" positioning | Verified | Facebook bio |
| Tagline "Solutions to stand the test of time" | Verified | their logo |
| Phone **(915) 603-0570** (tel/sms, footer, forms) | Verified-ish | Facebook contact info (listed twice). **Their cover graphic shows a different number, (915) 218-3364. Confirm which is right before send.** |
| Instagram @quamcretecoatings, Facebook /QuamcreteCoatings | Verified | their page |
| El Paso, TX 79912, service-area only (no street address) | Verified | Facebook "About" |
| "100% recommend, 12 reviews" | Verified | Facebook reviews tab (as of 2026-09-05) |
| Services: garages, patios, driveways, pool decks, warehouse/industrial, commercial, interior, stairs | Verified | their cover photo lists most of these |
| "Coated in about a day", "10+ years", flake/metallic/solid finishes, diamond grind, "free estimate" | Verified | their own posts make all of these claims |
| **Financing** section + calculator (11.99% APR, 12/24/36 mo) | **Placeholder** | No evidence they offer financing. APR and terms invented. Remove the whole section if they do not finance. |
| Bilingual EN/ES (full site) | **Our addition** | Their posts are English only. Spanish copy is our translation and needs a native check. Drop the `#langToggle` button + `data-es` if they do not want it. |
| Business hours ("By appointment", "confirm hours") | **Placeholder** | FB only says "Open now". |
| Years in business, "50+ floors", licensed / insured / bonded | **Not on the page** | Prospect sheet guessed "4 years / 50+ floors"; unverified, so left off. Add if confirmed. |
| Service-area list incl. Las Cruces / Sunland Park NM | **Partly assumed** | FB says "El Paso & surrounding areas"; prospect sheet says they also serve Las Cruces & Sunland Park. Map + checklist include Sunland Park. Confirm the real radius. |
| Stylized El Paso service-area map (inline SVG) | Decorative | Not a real map. Used because they have no street address (an embedded Google map needs one). |

### Photo caveat, important

Several job photos (blue lap siding, granite landscaping, lush green lawns in
`g4-porch` / `g6-steps` / `g3-walkway`) do not look like El Paso desert. They may be
supplier / portfolio shots, out of town jobs, or the owner's earlier work elsewhere.
**Have the owner confirm which photos are their own El Paso work before this goes live**,
per the pipeline's no-fabrication rule. `before.jpg` / `after.jpg` are a real matched pair
but low resolution (743x559), so the slider is a little soft.

No metallic, solid-color, or commercial/warehouse photos were available. Everything shown
is a flake system (grey, blue/black, tan). The "Finishes" grid still lists all surface
types because their cover photo advertises them.

## Photo mapping

| File | Source (from `assets/originals/`) | Used as |
|---|---|---|
| `hero.jpg` | `garage2.jpg`, cropped to a wide band | hero background |
| `before.jpg` / `after.jpg` | same, gentle compress | before/after slider (real matched pair) |
| `g2-macro.jpg` | `close-up.jpg` | carousel — blue/black flake close-up |
| `g1-flake-garage.jpg` | `garage.jpg` | carousel — grey flake two-car garage |
| `g5-patio.jpg` | `backyard.jpg` | carousel — flake patio, brick border |
| `g3-walkway.jpg` | `photo1.jpg` | carousel — tan flake front walkway |
| `g7-pool.jpg` | `pool.jpg` | carousel — pool deck + coping |
| `g4-porch.jpg` | `photo2.jpg` | carousel — covered porch + step |
| `g6-steps.jpg` | `balcony.jpg` | carousel — front steps + landing |
| `logo.png` | screen capture of their Facebook profile logo | footer lockup |
| `logo-mark.png` | same, cropped to the diamond | header mark |

The logo files are screen captures of their real Facebook logo, not a vector. Ask the owner
for the original file (ideally a transparent PNG or SVG) for a crisp version.

## Palette & type

Dark premium skin. Colors sampled from their logo:

```
--bg        #0b0b0d   near-black ground (logo background)
--accent    #6f9bd1   steel blue (brightened from the logo diamond #9bb2cd / outline #2b476a)
--accent-300 #a9c4e4  light steel — eyebrows, accents
--navy      #22304a   deep brand navy
--ok        #57c2a0   teal-green — checkmarks / "free" cue
```

Type: **Sora** (headings) + **Manrope** (body), Google Fonts. Palette and type are the
first thing to revisit with Mobbin references if the owner wants a different direction.

## Not yet done

- **Mobile QA on a real device.** This machine's headless/automation tools floor small
  viewports, so mobile was not verified. Check on a phone before sending: hero, finishes
  grid, the 5-step "How it's done" row, the SVG map, footer.
- Live check that GitHub Pages serves the fonts and all `assets/` images.

## Hosting

Private repo first, then Kassandra runs (the assistant is blocked from these):

```
gh repo edit Kassandra-Rodriguez/quamcrete-demo --visibility public --accept-visibility-change-consequences
gh api --method POST /repos/Kassandra-Rodriguez/quamcrete-demo/pages -f "source[branch]=main" -f "source[path]=/"
```

Live ~1 min later at `https://kassandra-rodriguez.github.io/quamcrete-demo/`.
`<meta name="robots" content="noindex, nofollow">` is set so it will not compete in search
while it is a concept.

## Outreach talk track

Lead with the compliment plus the gap, not a criticism:

> "Your floors and your branding already look high end. The problem is there is nowhere for
> them to land. Every ad and your WhatsApp button drop people into a chat, and anyone who
> Googles 'epoxy floor El Paso' before they message you finds no gallery, no prices, no way
> to ask for a quote. I built a one page site with your real photos, the one day install
> and 10 year points spelled out, and a form that asks the space, the finish and the rough
> size so you walk into every call already knowing the job. $300 plus hosting. Here is the
> link, tell me what to change."

Reach them via Facebook `/QuamcreteCoatings`, Instagram `@quamcretecoatings`, or the phone
number once confirmed.
