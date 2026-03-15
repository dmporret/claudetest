# Coffee Personality Quiz — Requirements

## Personality → Coffee Pairings

3 personalities total.

| Personality | Coffee | Tagline |
|-------------|--------|---------|
| Cozy Classic | Medium Roast Drip | "Comfort in every cup" |
| Social Butterfly | Cappuccino | "Coffee is better with company" |
| Health Nut | Oat Milk Americano | "Wellness in every sip" |

---

## Result Display

**Show all percentages** — display all three results with percentage breakdowns.

Example: "You're 50% Social Butterfly, 30% Cozy Classic, 20% Health Nut" with all three coffee recommendations shown.

---

## Visual Style

**Bold & Dramatic (Style 3)**
- Dark background (#0d0d0d / #161616)
- Gold accents (#c8a96e)
- Strong typography (Bebas Neue for headings, DM Sans for body)
- High contrast, numbered options, minimal borders

**Header image:** A moody coffee atmosphere photo sits below the progress bar and above the question text.
- Image saved at: `public/header-coffee.jpg`

**Icons:** None — text-only answer options.

---

## Quiz Questions

Each answer maps to a personality. Tally at the end to determine percentage breakdown.

**Q1. It's Saturday morning. What's your ideal plan?**
- Curled up with a book and nowhere to be → Cozy Classic
- Brunch with friends, the more the merrier → Social Butterfly
- Farmers market, yoga, meal prep — the whole routine → Health Nut

**Q2. Pick a Netflix Saturday:**
- A slow, comforting series you've already seen → Cozy Classic
- A new show everyone's talking about so you can discuss it Monday → Social Butterfly
- A documentary about food, nature, or wellness → Health Nut

**Q3. You're at a party. Where do you end up?**
- Finding a quiet corner with one good conversation → Cozy Classic
- Somehow knowing everyone's name by the end → Social Butterfly
- Asking if there are any good mocktails or kombucha → Health Nut

**Q4. Pick a travel vibe:**
- A cozy cabin with no agenda → Cozy Classic
- A group trip — the more chaotic the better → Social Butterfly
- A wellness retreat or hiking adventure → Health Nut

**Q5. What's your ideal lunch?**
- Something homemade and comforting → Cozy Classic
- A long lunch with good company → Social Butterfly
- A grain bowl or something you meal-prepped Sunday → Health Nut

**Q6. A color walks into your life. Which one?**
- Warm amber — like candlelight → Cozy Classic
- Bright yellow — energizing and social → Social Butterfly
- Forest green — grounded and alive → Health Nut

---

## Summary

- 3 personalities, 6 questions, 3 answers each
- Results page shows percentage breakdown for all three personalities
- Dark/dramatic visual style with gold accents
- Hero image below progress bar, above question text
- Text-only answer options (no icons)
- Built with Next.js + JavaScript
