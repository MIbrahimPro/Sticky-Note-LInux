# Project Specification: Desktop AI Canvas ("Sticky Canvas")

## 1. Overview & Objective

An interactive, borderless desktop companion widget designed for Linux environments (optimized for Zorin OS / GNOME). The application functions like a persistent, AppFlowy-style formatted markdown document anchored directly to the desktop layer. It integrates with Ollama Cloud (`https://ollama.com`) using the `gpt-oss:120b` model to enable contextual document editing, feature generation, and dynamic sandbox widget creation.

## 2. Core Architecture & Tech Stack

To ensure maximum lightweight execution, memory safety, and cross-platform reliability on Linux X11/Wayland backends, the application will use:

- **Framework:** Electron or Tauri (Tauri preferred for lowest memory footprint; Electron accepted for faster Node-based ecosystem alignment).
- **Frontend Layer:** React / Next.js (Static Export) + TypeScript + Tailwind CSS.
- **Editor Engine:** TipTap, Lexical, or a block-based markdown processor mirroring the AppFlowy/Notion aesthetic.
- **API Client:** Ollama Cloud integration utilizing standard Authorization headers and streaming responses.

---

## 3. Desktop Layer & Window Management (Linux Target)

The application must remain pinned behind working windows but sitting cleanly above the native system wallpaper to prevent desktop engine instability.

### Window Properties Configuration:

- `transparent`: `true`
- `frame`: `false`
- `resizable`: `true` (or locked via configuration)
- `movable`: `true` (via a low-profile handle or modifier key drag)
- `skipTaskbar`: `true` (Does not clutter the GNOME top bar or panel)

### Linux Window Leveling (GNOME / X11 / Wayland Support):

To lock the application to the desktop layer, the engine must flag the native window behavior:

```javascript
// Electron Implementation Reference
window.setSkipTaskbar(true);
window.setWindowButtonVisibility(false);
// Set type to 'desktop' or utility to sit cleanly above background
window.setType('desktop');
```

Note for implementation: If Wayland compositor rules restrict `setType('desktop')`, fall back to a borderless window pinned to the bottom layer with `override_redirect: true` or equivalent.

### Autostart Execution:

The codebase must include a `.desktop` entry generator for automatic boot initialization:

```ini
[Desktop Entry]
Type=Application
Exec=sticky-canvas --start-minimized
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
Name=Sticky Canvas
Comment=AI-Powered Markdown Desktop Widget
```

## 4. UI/UX & Functional Requirements

### Visual Aesthetic

- **Container:** Minimalistic, borderless card floating above the wallpaper.
- **Typography & Layout:** Clean typography, AppFlowy-style block structure, markdown parsing out-of-the-box (#, -, [], code blocks).
- **State Modes:**
  - **View Mode:** Renders formatted Markdown smoothly, seamlessly blending into the desktop space.
  - **Edit Mode:** Click-to-edit inline block mutation.

### AI Command Bar & Prompt System

A low-profile AI shortcut trigger opens a conversational input panel targeting Ollama Cloud.

- **In-Line Changes:** Prompting to modify the document updates the block structure in real time.
- **Model Target:** `gpt-oss:120b` via `https://ollama.com` streaming.

## 5. Dynamic Sandbox & Custom Feature Generation

When the user asks the AI bar to "add a feature like a clock, timer, or counter," the app should not rely entirely on static pre-built components. It must support an executable sandbox framework.

### The Sandwich Generation Loop:

1. **Inference:** Ollama Cloud returns a structured code payload (Vanilla HTML, CSS, and isolated JavaScript).
2. **Sanitization & Isolation:** The code is loaded dynamically into an isolated, secure iframe component or a sandboxed React wrapper.
3. **State & Durability:** The code structure is serialized directly inside the root document state (or markdown metadata wrapper). On application reload, the sandbox re-renders the custom widgets natively alongside the note markdown blocks.

## 6. API Configuration & Streaming Implementation

The connection layer must strictly match the Ollama Cloud structural blueprint:

```python
# Conceptual Implementation Target translated to JS/TS
import { Client } from 'ollama'; // or standard fetch streaming handles

const client = new Client({
  host: "https://ollama.com",
  headers: {
    'Authorization': `Bearer ${process.env.OLLAMA_API_KEY}`
  }
});

// Implementation must handle text stream chunk updates directly
// to the frontend viewport using the 'gpt-oss:120b' model string.
```

## 7. Immediate Implementation Steps for Antigravity (agy)

1. **Repo Initialization:** Scaffold out the project workspace using the chosen desktop container framework (Tauri/Electron).
2. **Window Seeding:** Establish the frameless window layer and assert window-type rules to guarantee the app docks right above the Linux wallpaper.
3. **Editor Setup:** Build the block editor component supporting standard markdown input configurations.
4. **Integration Phase:** Connect the Ollama client stream, implement `.env` management for `OLLAMA_API_KEY`, and construct the iframe sandbox renderer.
5. **Autostart Utility:** Add scripts to drop the entry into `~/.config/autostart/`.
