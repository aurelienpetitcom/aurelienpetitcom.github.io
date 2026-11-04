import argparse
import re
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
IGNORED_DIRECTORIES = {".git", ".github", "_site", "scripts"}


def build_site(output: Path) -> None:
    shutil.copytree(
        ROOT,
        output,
        dirs_exist_ok=True,
        ignore=shutil.ignore_patterns(*IGNORED_DIRECTORIES),
    )

    for source in ROOT.rglob("*.html"):
        relative_path = source.relative_to(ROOT)
        if any(part in IGNORED_DIRECTORIES for part in relative_path.parts):
            continue
        if relative_path.parts[0] == "aurelien-home":
            continue
        if source.name in {"index.html", "404.html"}:
            continue

        page = source.read_text(encoding="utf-8")
        if not re.search(r"<base\b", page, flags=re.IGNORECASE):
            page = re.sub(
                r"(<head\b[^>]*>)",
                r'\1\n    <base href="/">',
                page,
                count=1,
                flags=re.IGNORECASE,
            )

        route = output / relative_path.with_suffix("") / "index.html"
        route.parent.mkdir(parents=True, exist_ok=True)
        route.write_text(page, encoding="utf-8")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    build_site(args.output.resolve())
