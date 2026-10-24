# Prodigy KS3 Science

Buildless revision site for Years 7–9, following the department planning sequence. Related classroom teaching periods are consolidated into focused revision lessons. All explanations and practice papers are original adaptations; the supplied slide decks, assessments and staff allocation records are not redistributed.

Rebuild content with `python scripts/build.py`. Open through a local HTTP server. Shared account and assignment assets are maintained in the ALevelPhysics platform repository.

Each year has two 30-mark original practice papers. Use teacher guidance for calculator use. Numerical checks verify a final value; method marks and extended reasoning use a transparent indicative scheme, with provisional server-side AI feedback when configured and signed in. Self-marking remains available.

All 123 lessons use swipeable slide decks with up to three bullet points per explanation slide, diagrams and interactive models where useful. Buttons and keyboard arrows also work. Students can reveal and rate 288 definition cards, then attempt four questions per lesson. Forty mixed unit checks provide further retrieval and application practice. Card ratings stay separate from assessed marks; the original application-question IDs and saved answers are preserved.

Twenty-three suitable investigations reuse the existing Prodigy GCSE apparatus, with short KS3 instructions and optional harder calculations. Labs load when opened and keep their readings in the KS3 course namespace. Source attribution is recorded in `lab-provenance.json`. Refresh these owned lab sources with `python scripts/import_labs.py` from a checkout alongside GCSECombinedScience and GCSEPhysics. Original GCSE sites are unchanged.

After editing content, run `python scripts/build.py` and rebuild the assessment catalog using the shared ALevelPhysics platform tooling. The course has 193 activity pages and 902 assessed question parts, including the retained papers and model lab.

The October 2026 language review uses BBC Bitesize KS3 as a reading-level and vocabulary guide. Every concept has short original explanations, science terms with meanings, worked steps and plain-language questions. Definitions, answer schemes, model guidance, lab goals and the practical notebook follow the same approach. The department topic order and assessment IDs remain stable.
