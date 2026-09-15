#!/usr/bin/env python3
"""Extract the user-provided Serveq catalogue into reusable page text.

Usage:
  python3 scripts/extract-serveq-catalog-pdf.py '/path/to/catalogo-serveq-2025.pdf'
"""

import json
import sys
from pathlib import Path

from pypdf import PdfReader


PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_SOURCE = Path('/Users/pm/Downloads/catalogo-serveq-2025 (1).pdf')
OUTPUT = PROJECT_ROOT / 'data' / 'serveq-catalog-pages.json'


def compact(text: str) -> str:
    return '\n'.join(line.rstrip() for line in text.replace('\r', '').splitlines()).strip()


def main() -> None:
    source = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_SOURCE
    if not source.is_file():
        raise SystemExit(f'Catálogo não encontrado: {source}')

    reader = PdfReader(str(source))
    payload = {
        'source': {
            'name': 'Catálogo Serveq 2025',
            'pages': len(reader.pages),
        },
        'pages': [
            {'number': index, 'text': compact(page.extract_text() or '')}
            for index, page in enumerate(reader.pages, start=1)
        ],
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Extraídas {len(reader.pages)} páginas para {OUTPUT.relative_to(PROJECT_ROOT)}')


if __name__ == '__main__':
    main()
