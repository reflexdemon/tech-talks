# Design: OpenSpec Presentation

## Context

The current `presentations/openspec/intro.md` is a basic outline. We need to expand this into a full-featured presentation that follows the "Spec-Driven Development" philosophy itself. The audience is Java developers, who value structure but also enjoy a good developer joke (especially about boilerplate or design patterns).

## Goals / Non-Goals

**Goals:**
- Design a slide structure that mirrors the OpenSpec workflow with a terminal-themed aesthetic.
- Create 3-4 key Mermaid diagrams:
    1. Vibe Coding vs. SDD.
    2. The OpenSpec Artifact Chain (Proposal -> Design -> Specs -> Tasks).
    3. AI Agent interaction with Specifications.
- Identify 3 relatable MEME spots (e.g., "AI writing Java Boilerplate", "Merging 500 lines of manual code vs. 1 spec change").
- Ensure a premium look and feel using Reveal.js features (fragments, vertical slides) with high-contrast, accessible lighter text.

**Non-Goals:**
- Porting the entire OpenSpec CLI documentation.
- Building a new presentation engine.

## Decisions

- **Slide Framework**: Use existing Reveal.js setup in the repository.
- **Content Separation**: Use multiple markdown files if necessary, or a single well-structured `content.md`.
- **Diagrams**: Use Mermaid.js (handled by reveal.js plugin) for all architectural diagrams to ensure they are searchable and editable.
- **Meme Strategy**: Use `generate_image` for custom illustrations and search for iconic developer memes.

## Risks / Trade-offs

- **Mermaid Complexity**: Too many nodes in a diagram can be hard to read on a slide. We will use simple, focused diagrams.
- **Tone Balance**: Must ensure memes don't overshadow the professional message of SDD.
