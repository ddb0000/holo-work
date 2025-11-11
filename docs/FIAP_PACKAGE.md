# FIAP Package Checklist

1. **Zip**
   ```bash
   zip -r dist/holo-work-fiap.zip worker ui sql scripts docs README.md LICENSE package.json package-lock.json
   ```
2. **PDF mapping**
   - Export PRD → FIAP requirements mapping (use docs/PRD.md sections). Tools: Google Docs or pandoc.
3. **TXT (RM + nome + link do pitch)**
   ```
   RM123456
   Daniel Alexandre Barcellos de Brito
   https://youtu.be/<pitch>
   ```
4. **Pitch video**
   - 3 min walkthrough (follow `docs/pitch-script.md`).
5. **Contents inside zip**
   - Source code
   - Docs (PRD, DEPLOY, ENV, pitch script, evidence)
   - PDF mapping
   - TXT with RM/Name/Pitch
