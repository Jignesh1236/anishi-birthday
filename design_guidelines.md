# Design Guidelines: Interactive Birthday Page for Amishi

## Design Approach
**Reference-Based Approach** - Drawing inspiration from playful, celebration-focused designs with interactive storytelling elements similar to Google Doodles and modern greeting card websites. The design prioritizes emotional connection, delight, and playful interaction over utility.

## Core Design Principles
1. **Joyful Simplicity**: Clean, uncluttered layouts with generous spacing that focuses attention on interactive elements
2. **Delightful Discovery**: Each interaction reveals surprises that create moments of joy
3. **Playful Personality**: Cute, friendly aesthetic that feels personal and celebratory

## Typography
- **Primary Font**: "Quicksand" (Google Fonts) - Soft, rounded, friendly
- **Accent Font**: "Pacifico" or "Dancing Script" for birthday messages - Handwritten, personal feel
- **Hierarchy**:
  - Birthday greeting: text-6xl to text-8xl, font-bold
  - Section headings: text-3xl to text-4xl, font-semibold  
  - Interactive labels: text-xl, font-medium
  - Body text: text-base to text-lg

## Layout System
**Spacing Units**: Tailwind units of 4, 8, 12, 16, 24 for consistent rhythm
- Primary spacing: p-8, p-12, p-16
- Section gaps: space-y-12, space-y-16, space-y-24
- Component spacing: gap-4, gap-8

**Container Strategy**:
- Full-viewport sections for major interactive moments (min-h-screen)
- Centered content with max-w-6xl for text/cards
- Flexible grid for gift boxes: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Component Library

### Hero Section
Animated birthday greeting with Amishi's name in large, playful typography centered on screen. Floating confetti animation (CSS particles). Subtle pulse animation on text. Include down arrow indicator to encourage scrolling.

### Interactive Birthday Cake
Large, centered cake illustration (image or CSS-drawn). Clickable candles that light up sequentially with smooth transitions. Flame animations using CSS or SVG. "Make a wish!" prompt appears after all candles are lit.

### Gift Box Grid
3 surprise gift boxes arranged in responsive grid. Each box features:
- Cute wrapped gift illustration with ribbon
- Hover state: gentle lift (transform: translateY(-8px))
- Click reveals: Flip animation showing hidden message/surprise inside
- Messages include fun wishes, compliments, memories, or mini-games

### Balloon Pop Game
Floating balloons (6-8) that rise from bottom with staggered timing. Click to "pop" with burst animation and cheerful sound. Score counter tracks popped balloons. Balloons in varied sizes and positions.

### Photo Memory Carousel
Slideshow with birthday-themed decorative frames. Navigation dots below. Smooth slide transitions. Optional: Polaroid-style frames with handwritten captions.

### Background Music Player
Minimal, cute music player in corner (bottom-right). Play/pause toggle with volume control. Plays soft, cheerful birthday tune. Semi-transparent backdrop.

## Interactive Elements & Animations

**Core Interactions**:
- Confetti bursts on page load and special moments
- Smooth scroll-triggered reveals for sections (fade-up)
- Haptic-feel button presses (scale down on click)
- Gentle floating animations on decorative elements

**Animation Principles**:
- Keep timing playful but not chaotic (0.3s - 0.6s durations)
- Use easing: ease-out for entrances, ease-in-out for continuous animations
- Stagger animations for sequential delight (0.1s - 0.2s delays)

**Hover States**:
- Gift boxes: Slight rotation (rotate-2) + lift
- Buttons: Scale up (scale-105) + soft shadow
- Balloons: Gentle sway animation
- Clickable elements: Cursor changes to pointer

## Images

**Hero Decorations**: Cute birthday-themed graphics (party hats, streamers, stars) positioned around the greeting - use playful illustrations, not photos.

**Birthday Cake**: Illustrated layer cake with colorful frosting and candles - cartoon style, not realistic.

**Gift Boxes**: Wrapped present illustrations with bows and ribbons - 3 unique variations.

**Balloons**: Colorful balloon graphics (no hero image needed - this is an interactive celebration page, not a traditional landing page).

## Page Structure

1. **Hero Greeting** (100vh): Animated name reveal with confetti
2. **Birthday Cake Section** (min-h-screen): Interactive candle lighting
3. **Surprise Gifts** (auto-height): 3-column gift grid
4. **Balloon Game** (min-h-screen): Floating balloons to pop
5. **Memory Carousel** (auto-height): Photo slideshow
6. **Final Message** (min-h-screen): Heartfelt birthday wish with celebratory animation

## Accessibility Notes
- All interactive elements keyboard accessible (tab navigation)
- ARIA labels for screen readers on interactive components
- Option to pause/disable animations (respect prefers-reduced-motion)
- Sufficient contrast for all text
- Focus indicators visible on all interactive elements